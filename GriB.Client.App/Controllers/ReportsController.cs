using System.Linq;
using System.Net;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using GriB.Web.Http;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Reports;
using GriB.Common.Models.Security;
using System;

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
        public async Task<HttpResponseMessage> ReportSalesDetail(ReportSaleDetailFilter filter)
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

        [HttpPost]
        [ActionName("expressanalysis")]
        public HttpResponseMessage ReportExpressAnalysis(ReportSaleFilter filter)
        {
            return TryCatchResponseQuery((query) =>
            {
                List<ReportSaleCategoryDashboardRow> categories = Sales.GetReportSalesCategoriesDashboard(query, filter);
                List<ReportSaleDayWeekTableRow> dayweeks = Sales.GetReportSalesDayWeekDashboard(query, filter);
                List<ReportSaleTimeTableRow> times = Sales.GetReportSalesTimeDashboard(query, filter);
                double avgCheckCategorySum = 0, avgCheckWeekSum = 0, avgCheckTimeSum = 0;
                categories = Sales.CalculateCategoriesDashboardParams(categories, out avgCheckCategorySum);
                dayweeks = Sales.CalculateDashboardParams(dayweeks, out avgCheckWeekSum);
                times = Sales.CalculateDashboardParams(times, out avgCheckTimeSum);

                return Request.CreateResponse(HttpStatusCode.OK, new { categories, avgCheckCategorySum, dayweeks, avgCheckWeekSum, times, avgCheckTimeSum });
            });
        }

        [HttpPost]
        [ActionName("stocks")]
        public HttpResponseMessage ReportStocks(ReportStockFilter  filter)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Stocks.GetStocks(query, filter));
            });
        }

        [HttpPost]
        [ActionName("stocksdetail")]
        public async Task<HttpResponseMessage> ReportStocksDetail(ReportStockFilter filter)
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
                      return Request.CreateResponse(HttpStatusCode.OK, Stocks.GetStocksDetail(query, filter, employees));
                  });
              })
       );

        [HttpPost]
        [ActionName("cash")]
        public HttpResponseMessage ReportCash(ReportBaseFilter filter)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Cash.GetCash(query, filter));
            });
        }

        [HttpPost]
        [ActionName("cashdetail")]
        public async Task<HttpResponseMessage> ReportCashDetail(ReportBaseFilter filter)
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
                      return Request.CreateResponse(HttpStatusCode.OK, Cash.GetCashDetail(query, filter, employees));
                  });
              })
        );

        [HttpGet]
        [ActionName("historysales")]
        public HttpResponseMessage HistorySales(int change)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Sales.GetHistorySales(query, change));
            });
        }

        [HttpGet]
        [ActionName("changesales")]
        public HttpResponseMessage ChangeySales(int change)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Sales.GetChangeSales(query, change));
            });
        }
    }
}