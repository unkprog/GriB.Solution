using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Models;
using GriB.Client.App.Models.Editor;
using GriB.Common.Models.pos.settings;
using GriB.Common.Models.Security;
using GriB.Web.Http;
using Newtonsoft.Json.Linq;
using System.Web.Hosting;
using System.IO;
using GriB.Common.Models.Print;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class SettingsController : BaseController
    {
        [AllowAnonymous]
        [HttpGet]
        [ActionName("settings")]
        public HttpResponseMessage GetSettings()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            System.Reflection.AssemblyName assemblyName = assembly.GetName();
            Version version = assemblyName.Version;

            return this.CreateResponse(HttpStatusCode.OK, new
            {
                IsDebug =
#if DEBUG
                true,
#else
                false,
#endif
                Version = version.ToString(),
                Language = "ru"
            });
        }

        #region Компания
        [HttpGet]
        [ActionName("get_organization")]
        public HttpResponseMessage GetOrganization()
        {
            return TryCatchResponseQuery((query) =>
            {
                List<t_org> orgs = Organization.GetOrganizations(query, Organization.typeCompany);
                t_org org = Organization.GetOrganizationInfo(query, (orgs != null && orgs.Count > 0 ? orgs[0] : new t_org() { type = Organization.typeCompany }));
                return this.CreateResponse(HttpStatusCode.OK, new { record = new company() { id = org.id, name = org.name, site = org.info?.site, email = org.info?.email, phone = org.info?.phone, defcurrency = org.defcurrency }});
            });
        }

        [HttpPost]
        [ActionName("post_organization")]
        public HttpResponseMessage PostOrganization(company company)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                t_org _org = new t_org() { id = company.id, type = Organization.typeCompany, cu = principal.Data.User.id, uu = principal.Data.User.id, name = company.name, defcurrency = new unit() { id = company.defcurrency == null ? 0 : company.defcurrency.id }, info = new t_org_info() { site = company.site, email = company.email, phone = company.phone } };
                Organization.SetOrganization(query, _org);
                Organization.SetOrganizationInfo(query, _org);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Торговая точка
        [HttpGet]
        [ActionName("get_salepoints")]
        public HttpResponseMessage GetSalePoints()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Organization.GetSalepoints(query));

            });
        }

        [HttpGet]
        [ActionName("get_salepoint")]
        public HttpResponseMessage GetSalePoint(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                List<t_org> orgs = Organization.GetOrganizations(query, Organization.typeCompany);
                t_org org = Organization.GetOrganization(query, id);
                if (org == null || org.id == 0)
                    org = new t_org() { type = Organization.typeDivision };
                org = Organization.GetOrganizationInfo1(query, org);
                org.parent = Organization.GetOrganization(query, org.pid);

                salepoint result = new salepoint() { id = org.id, name = org.name, company_id = (int)org.parent?.pid, city = org.parent?.name, address = org.info1?.address, schedule = org.info1?.schedule };
                return this.CreateResponse(HttpStatusCode.OK, new { companies = orgs, record = result });

            });
        }

        [HttpPost]
        [ActionName("post_salepoint")]
        public HttpResponseMessage PostSalepoint(salepoint salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;

                t_org org = new t_org() { id = salepoint.id, type = Organization.typeDivision, cu = principal.Data.User.id, uu = principal.Data.User.id, name = salepoint.name, info1 = new t_org_info1() { address = salepoint.address, schedule = salepoint.schedule } };


                t_org _city = new t_org() { type = Organization.typeCity, cu = principal.Data.User.id, uu = principal.Data.User.id, pid = salepoint.company_id, name = salepoint.city };
                Organization.SetOrganization(query, _city);

                org.pid = _city.id;
                Organization.SetOrganization(query, org);
                Organization.SetOrganizationInfo1(query, org);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_salepoint")]
        public HttpResponseMessage DeleteSalepoint(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Organization.DelOrganization(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Сотрудники
        [HttpGet]
        [ActionName("get_employees")]
        public async Task<HttpResponseMessage> Employees()
        => await TryCatchResponseAsync(async () => await CheckResponseError(
               async () =>
               {
                   Principal principal = (Principal)HttpContext.Current.User;
                   return await Common.Net.Json.GetAsync<JObject>(AppSettings.Server.Register, string.Concat("api/account/employees?db=", principal?.Data?.Database?.id));
               }
               , (response) =>
               {
                   HttpEmployeesMessage responseMessage = response.ToObject<HttpEmployeesMessage>();
                   List<Models.Editor.employeecard> employees = new List<Models.Editor.employeecard>();
                   return TryCatchResponseQuery((query) =>
                   {
                       Models.Editor.employeecard employee;
                       foreach (var emp in responseMessage.Employees)
                       {
                           employee = (employeecard)Managers.Editors.Employee.GetEmployee(query, new Models.Editor.employeecard(emp));
                           employees.Add(employee);
                       }
                       return this.CreateResponse(HttpStatusCode.OK, employees);
                   });
               })
        );

        [HttpGet]
        [ActionName("get_employee")]
        public async Task<HttpResponseMessage> Employee(int id)
        => await TryCatchResponseAsync(async () => await CheckResponseError(
               async () =>
               {
                   return await Common.Net.Json.GetAsync<JObject>(AppSettings.Server.Register, string.Concat("api/account/employee?id=", id));
               }
               , (response) =>
               {
                   return TryCatchResponseQuery((query) =>
                   {
                       HttpEmployeeMessage responseMessage = response.ToObject<HttpEmployeeMessage>();
                       Models.Editor.employee result = new Models.Editor.employee(responseMessage.Employee);
                       Managers.Editors.Employee.GetEmployee(query, result);
                       Managers.Editors.Employee.GetEmployeeSalepointAccess(query, result);

                       return this.CreateResponse(HttpStatusCode.OK, new { record = result });
                   });
               })
        );

        [HttpPost]
        [ActionName("post_employee")]
        public async Task<HttpResponseMessage> PostEmployee(Models.Editor.employee empl)
        => await TryCatchResponseAsync(async () => await CheckResponseError(
              async () =>
              {
                  Principal principal = (Principal)HttpContext.Current.User;
                  return await Common.Net.Json.PostAsync<JObject, Object>(AppSettings.Server.Register, "api/account/upd_employee", new employeedb (){ db = principal.Data.Database.id, empl = empl });
              }
              , (response) =>
              {
                  return TryCatchResponseQuery((query) =>
                  {
                      HttpEmployeeMessage responseMessage = response.ToObject<HttpEmployeeMessage>();
                      empl.id = responseMessage.Employee.id;
                      Managers.Editors.Employee.SetEmployee(query, empl);
                      Managers.Editors.Employee.SetEmployeeSalepointAccess(query, empl);
                      return this.CreateResponse(HttpStatusCode.OK, "Ok");
                  });
              })
        );
        
        [HttpGet]
        [ActionName("del_employee")]
        public async Task<HttpResponseMessage> DeleteEmployee(int id)
        => await TryCatchResponseAsync(async () => await CheckResponseError(
              async () =>
              {
                  return await Common.Net.Json.GetAsync<JObject>(AppSettings.Server.Register, string.Concat("api/account/del_employee?id=", id));
              }
              , (response) =>
              {
                  return TryCatchResponseQuery((query) =>
                  {
                      HttpEmployeeMessage responseMessage = response.ToObject<HttpEmployeeMessage>();
                      Models.Editor.employee result = new Models.Editor.employee(responseMessage.Employee);
                      Managers.Editors.Employee.GetEmployeeSalepointAccess(query, result);

                      return this.CreateResponse(HttpStatusCode.OK, "Ok");
                  });
              })
        );
        #endregion

        #region Счет
        [HttpGet]
        [ActionName("get_accounts")]
        public HttpResponseMessage GetAccounts()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Account.GetAccounts(query));
            });
        }

        [HttpGet]
        [ActionName("get_account")]
        public HttpResponseMessage GetAccount(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = Account.GetAccount(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_account")]
        public HttpResponseMessage PostAccount(account account)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Account.SetAccount(query, account, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_account")]
        public HttpResponseMessage DeleteAccount(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Account.DelAccount(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Статья расходов и доходов
        [HttpGet]
        [ActionName("get_costincomes")]
        public HttpResponseMessage GetCostIncomes(int typecostincome)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, CostIncome.GetCostIncomes(query, typecostincome));
            });
        }

        [HttpGet]
        [ActionName("get_costs")]
        public HttpResponseMessage GetCosts()
        {
            return GetCostIncomes(2);
        }

        [HttpGet]
        [ActionName("get_incomes")]
        public HttpResponseMessage GetIncomes()
        {
            return GetCostIncomes(1);
        }

        [HttpGet]
        [ActionName("get_costincome")]
        public HttpResponseMessage GetCostIncome(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = CostIncome.GetCostIncome(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_costincome")]
        public HttpResponseMessage PostCostIncome(costincome costincome)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                CostIncome.SetCostIncome(query, costincome, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_costincome")]
        public HttpResponseMessage DeleteCostIncome(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                CostIncome.DelCostIncome(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Валюта
        [HttpGet]
        [ActionName("get_currencies")]
        public HttpResponseMessage GetCurrencies()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Unit.GetUnits(query, Unit.typeCurrency));
            });
        }

        [HttpGet]
        [ActionName("get_currency")]
        public HttpResponseMessage GetCurrency(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = Unit.GetUnit(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_currency")]
        public HttpResponseMessage PostCurrency(unit unit)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Unit.SetUnit(query, unit, Unit.typeCurrency, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_currency")]
        public HttpResponseMessage DeleteCurrency(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Unit.DelUnit(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Единица измерения
        [HttpGet]
        [ActionName("get_units")]
        public HttpResponseMessage GetUnits()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Unit.GetUnits(query, Unit.typeUnit));
            });
        }

        [HttpGet]
        [ActionName("get_unit")]
        public HttpResponseMessage GetUnit(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = Unit.GetUnit(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_unit")]
        public HttpResponseMessage PostUnit(unit unit)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Unit.SetUnit(query, unit, Unit.typeUnit, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_unit")]
        public HttpResponseMessage DeleteUnit(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Unit.DelUnit(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Категории
        [HttpGet]
        [ActionName("get_categories")]
        public HttpResponseMessage GetCategories()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Category.GetCategoriesCard(query));
            });
        }

        [HttpGet]
        [ActionName("get_category")]
        public HttpResponseMessage GetCategory(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                category result = Category.GetCategory(query, id);
                Category.GetCategoryDescription(query, result);
                Category.GetCategorySalepointAccess(query, result);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result, categories = Category.GetCategoriesNotThis(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_category")]
        public HttpResponseMessage PostCategory(category category)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                category result = Category.SetCategory(query, category, principal.Data.User.id);
                Category.SetCategoryDescription(query, category);
                Category.SetCategorySalepointAccess(query, category);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_category")]
        public HttpResponseMessage DeleteCategory(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Category.DelCategory(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Товары, услуги
        [HttpGet]
        [ActionName("get_products")]
        public HttpResponseMessage GetProducts()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Product.GetProducts(query));
            });
        }

        [HttpGet]
        [ActionName("get_productmaps")]
        public HttpResponseMessage GetProductMaps()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Product.GetProductMaps(query));
            });
        }

        [HttpGet]
        [ActionName("get_product")]
        public HttpResponseMessage GetProduct(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                product result = Product.GetProduct(query, id);
                Product.GetProductAccount(query, result);
                Product.GetProductDescription(query, result);
                Product.GetProductSalepointAccess(query, result);
                Product.GetProductCost(query, result);
                Product.GetProductSale(query, result);
                Product.GetProductMap(query, result);
                Product.GetProductComposition(query, result);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }


        //[HttpGet]
        //[ActionName("get_product_newcomposition")]
        //public HttpResponseMessage GetProductNewComposition(int id)
        //{
        //    return TryCatchResponseQuery((query) =>
        //    {
        //        product_composition result = Product.GetProductCompositionNew(query, id);
        //        return this.CreateResponse(HttpStatusCode.OK, new { newcomposition = result });
        //    });
        //}

        [HttpPost]
        [ActionName("post_product")]
        public HttpResponseMessage PostProduct(product product)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                product result = Product.SetProduct(query, product, principal.Data.User.id);
                Product.SetProductAccount(query, product);
                Product.SetProductDescription(query, product);
                Product.SetProductSalepointAccess(query, product);
                Product.SetProductCost(query, product, principal.Data.User.id);
                Product.SetProductSale(query, product, principal.Data.User.id);
                Product.SetProductMap(query, product);
                Product.SetProductComposition(query, product);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_product")]
        public HttpResponseMessage DeleteProduct(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Product.DelProduct(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        [HttpPost]
        [ActionName("uploadimage")]
        public async Task<HttpResponseMessage> UploadReportImage()
        {
            return await TryCatchResponseAsync(async () =>
            {
                // type = 0 - category
                // type = 1 - product
                if (!Request.Content.IsMimeMultipartContent())
                    throw new System.Web.Http.HttpResponseException(HttpStatusCode.UnsupportedMediaType);

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                var fileContent = provider.Contents.First(x => x.Headers.ContentDisposition.Name == "\"file\"");
                var typeContent = provider.Contents.First(x => x.Headers.ContentDisposition.Name == "\"type\"");
                var photoContent = provider.Contents.First(x => x.Headers.ContentDisposition.Name == "\"photo\"");
                byte[] image = await fileContent.ReadAsByteArrayAsync();
                string type = await typeContent.ReadAsStringAsync();
                string photo = await photoContent.ReadAsStringAsync();
                string ext = fileContent.Headers.ContentDisposition.FileName.Trim('\"');
                ext = ext.Substring(ext.LastIndexOf('.'));

                Principal principal = (Principal)HttpContext.Current.User;

                string path = HostingEnvironment.ApplicationPhysicalPath;
                path = string.Concat(path, path.LastIndexOf("\\") > 0 ? string.Empty : "\\", "Images");
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                path = string.Concat(path, "\\Databases");
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                path = string.Concat(path, "\\", principal.Data.Database.catalog);
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                if (type == "0")
                    path = string.Concat(path, "\\category");
                else if (type == "1")
                    path = string.Concat(path, "\\product");
                else
                    path = string.Concat(path, "\\other");

                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);

                photo = string.Concat(HostingEnvironment.ApplicationPhysicalPath, photo);
                if (!string.IsNullOrEmpty(photo) && File.Exists(photo))
                    File.Delete(photo);

                photo = Guid.NewGuid().ToString().Replace("-", ""); // string.Concat(Guid.NewGuid().ToString().Replace("-", ""), ext);

                //else
                //{
                //    photo = photo.Substring(photo.LastIndexOf('/') + 1);
                //    photo = photo.Substring(0, photo.LastIndexOf('.'));
                //    //string.Concat(Guid.NewGuid().ToString().Replace("-", ""), ext);
                //}
                path = string.Concat(path, "\\", photo, ext);
                File.WriteAllBytes(path, image);

                string result = string.Concat("/", path.Replace(HostingEnvironment.ApplicationPhysicalPath, "").Replace("\\", "/"));
                return this.CreateResponse(HttpStatusCode.OK, result);
            });
        }


        #region Клиенты
        [HttpGet]
        [ActionName("get_clients")]
        public HttpResponseMessage GetClients()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Managers.Editors.Client.GetClients(query));
            });
        }

        [HttpGet]
        [ActionName("get_client")]
        public HttpResponseMessage GetClient(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                client result = Managers.Editors.Client.GetClientPerson(query, id);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }

        [HttpPost]
        [ActionName("post_client")]
        public HttpResponseMessage PostClient(client client)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                client result = Managers.Editors.Client.SetClientPerson(query, client, principal.Data.User.id);
               
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_client")]
        public HttpResponseMessage DeleteClient(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Managers.Editors.Client.DelClient(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Crblrf
        [HttpGet]
        [ActionName("get_discounts")]
        public HttpResponseMessage GetDiscounts()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Discount.GetDiscounts(query));

            });
        }

        [HttpGet]
        [ActionName("get_discount")]
        public HttpResponseMessage GetDiscount(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                List<t_org> orgs = Organization.GetOrganizations(query, Organization.typeCompany);
                t_org org = Organization.GetOrganization(query, id);
                if (org == null || org.id == 0)
                    org = new t_org() { type = Organization.typeDivision };
                org = Organization.GetOrganizationInfo1(query, org);
                org.parent = Organization.GetOrganization(query, org.pid);

                discount result = Discount.GetDiscount(query, id);
                result = Discount.GetDiscountSalepointAccess(query, result);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result });

            });
        }

        [HttpPost]
        [ActionName("post_discount")]
        public HttpResponseMessage PostDisocunt(discount discount)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Discount.SetDiscount(query, discount, principal.Data.User.id);
                Discount.SetDiscountSalepointAccess(query, discount);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_discount")]
        public HttpResponseMessage DeleteDiscount(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Discount.DelDiscount(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Контрагент
        [HttpGet]
        [ActionName("get_contractors")]
        public HttpResponseMessage GetContractors()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Contractor.GetContractors(query));
            });
        }

        [HttpGet]
        [ActionName("get_contractor")]
        public HttpResponseMessage GetContractor(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = Contractor.GetContractor(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_contractor")]
        public HttpResponseMessage PostContractor(contractor contractor)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Contractor.SetContractor(query, contractor, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_contractor")]
        public HttpResponseMessage DeleteContractor(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Contractor.DelContractor(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Причина
        [HttpGet]
        [ActionName("get_reasons")]
        public HttpResponseMessage GetReasons()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Reason.GetReasons(query));
            });
        }

        [HttpGet]
        [ActionName("get_reason")]
        public HttpResponseMessage GetReason(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = Reason.GetReason(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_reason")]
        public HttpResponseMessage PostReason(reason reason)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Reason.SetReason(query, reason, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_reason")]
        public HttpResponseMessage DeleteReason(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Reason.DelReason(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Принт-сервер
        [HttpGet]
        [ActionName("get_printservers")]
        public HttpResponseMessage GetPrintServers()
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Managers.Editors.PrintServer.GetPrintServers(query));
            });
        }

        [HttpGet]
        [ActionName("get_printserver")]
        public HttpResponseMessage GetPrintServer(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, new { record = Managers.Editors.PrintServer.GetPrintServer(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_printserver")]
        public HttpResponseMessage PostPrintServer(printserver printserver)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Managers.Editors.PrintServer.SetPrintServer(query, printserver, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_printserver")]
        public HttpResponseMessage DeletePrintServer(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Managers.Editors.PrintServer.DelPrintServer(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion
    }
}