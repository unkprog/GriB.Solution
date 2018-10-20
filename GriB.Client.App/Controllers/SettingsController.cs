using System;
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
using GriB.Common.Models.pos;
using GriB.Common.Models.pos.settings;
using GriB.Common.Models.Security;
using GriB.Common.Web.Http;
using Newtonsoft.Json.Linq;

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

            return Request.CreateResponse(HttpStatusCode.OK, new
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

        [HttpGet]
        [ActionName("get_organization")]
        public HttpResponseMessage GetOrganization()
        {
            return TryCatchResponseQuery((query) =>
            {
                List<t_org> orgs = Organization.GetOrganizations(query, Organization.typeCompany);
                t_org org = Organization.GetOrganizationInfo(query, (orgs != null && orgs.Count > 0 ? orgs[0] : new t_org() { type = Organization.typeCompany }));
                return Request.CreateResponse(HttpStatusCode.OK, new company() { id = org.id, name = org.name, site = org.info?.site, email = org.info?.email, phone = org.info?.phone });
            });
        }

        [HttpPost]
        [ActionName("post_organization")]
        public HttpResponseMessage PostOrganization(company company)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                t_org _org = new t_org() { id = company.id, type = Organization.typeCompany, cu = principal.Data.User.id, uu = principal.Data.User.id, name = company.name, info = new t_org_info() { site = company.site, email = company.email, phone = company.phone } };
                Organization.SetOrganization(query, _org);
                Organization.SetOrganizationInfo(query, _org);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }


        [HttpGet]
        [ActionName("get_salepoints")]
        public HttpResponseMessage GetSalePoints()
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Organization.GetSalepoints(query));

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
                return Request.CreateResponse(HttpStatusCode.OK, new { companies = orgs, salepoint = result });

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
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_salepoint")]
        public HttpResponseMessage DeleteSalepoint(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Organization.DelOrganization(query, id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }


        //[HttpPost]
        //[ActionName("employees")]
        //public HttpResponseMessage Employees()
        //{
        //    return TryCatchResponse(() =>
        //    {
        //        List<employee> result = Managers.pos.Settings.Employee.GetEmployees(_query, db);
        //        return Request.CreateResponse(HttpStatusCode.OK, result);
        //    });
        //}

        [HttpGet]
        [ActionName("get_employees")]
        public async Task<HttpResponseMessage> Employees()
        => await TryCatchResponseAsync(async () => await CheckResponseError(
               async () =>
                   await Common.Net.Json.GetAsync<JObject>(AppSettings.Server.Register, "api/account/employees?db=1")
                   , (response) =>
                   {
                       HttpEmployeesMessage responseMessage = response.ToObject<HttpEmployeesMessage>();
                       return Request.CreateResponse(HttpStatusCode.OK, responseMessage.Employees);
                   }));

    }
}