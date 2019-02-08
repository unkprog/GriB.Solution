using GriB.Client.App.Managers.Reports;
using GriB.Client.App.Models.Report;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class ReportsController : BaseController
    {
        [HttpPost]
        [ActionName("post_sales")]
        public HttpResponseMessage GetDocuments(ReportSaleFilter filter)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Sales.GetSales(query, filter));
            });
        }
    }
}