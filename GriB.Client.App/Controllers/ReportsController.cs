using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Reports;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Common.Models.Security;
using GriB.Common.Web.Http;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class ReportsController : BaseController
    {
        //[HttpPost]
        //[ActionName("post_sales")]
        //public HttpResponseMessage GetDocuments(ReportSaleFilter filter)
        //{
        //    return TryCatchResponseQuery((query) =>
        //    {
        //        return Request.CreateResponse(HttpStatusCode.OK, Sales.GetSales(query, filter));
        //    });
        //}
        [HttpPost]
        [ActionName("post_sales")]
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
    }
}