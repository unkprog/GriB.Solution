using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using GriB.Common.Web.Http;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Reports;
using GriB.Common.Models.Security;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class ReportsController : BaseController
    {
        [HttpPost]
        [ActionName("sales")]
        public async Task<HttpResponseMessage> ReportSales(ReportSaleFilter filter)
        => await TryCatchResponseAsync(async () => await CheckResponseError(
               async () =>
               {
                   Principal principal = (Principal)HttpContext.Current.User;
                   return await Common.Net.Json.GetAsync<JObject>(AppSettings.Server.Register, string.Concat("api/account/employees?db=", principal?.Data?.Database?.id));
               }
               , (response) =>
               {
                   HttpEmployeesMessage responseMessage = response.ToObject<HttpEmployeesMessage>();
                   return TryCatchResponseQuery((query) =>
                   {
                       Dictionary<int, employeecard> employees = GetFindEmployees(query, responseMessage);
                       return Request.CreateResponse(HttpStatusCode.OK, Sales.GetSales(query, filter, employees));
                   });
               })
        );

        [HttpPost]
        [ActionName("salesdetail")]
        public async Task<HttpResponseMessage> ReportSalesDetail(ReportSaleFilter filter)
       => await TryCatchResponseAsync(async () => await CheckResponseError(
              async () =>
              {
                  Principal principal = (Principal)HttpContext.Current.User;
                  return await Common.Net.Json.GetAsync<JObject>(AppSettings.Server.Register, string.Concat("api/account/employees?db=", principal?.Data?.Database?.id));
              }
              , (response) =>
              {
                  HttpEmployeesMessage responseMessage = response.ToObject<HttpEmployeesMessage>();
                  return TryCatchResponseQuery((query) =>
                  {
                      Dictionary<int, employeecard> employees = GetFindEmployees(query, responseMessage);
                      return Request.CreateResponse(HttpStatusCode.OK, Sales.GetSalesDetail(query, filter, employees));
                  });
              })
       );
    }
}