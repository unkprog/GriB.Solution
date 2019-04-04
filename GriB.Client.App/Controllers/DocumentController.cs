using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Managers.POSTerminal;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.POSTerminal;
using GriB.Common.Models.Security;
using GriB.Web.Http;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class DocumentController : BaseController
    {
        #region Документы
        [HttpPost]
        [ActionName("get_docs")]
        public HttpResponseMessage GetDocuments(document_params docpar)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Document.GetDocuments(query, docpar));
            });
        }

        [HttpGet]
        [ActionName("get_doc")]
        public HttpResponseMessage GetDocument(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                document result = Document.GetDocument(query, id);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }


        [HttpGet]
        [ActionName("get_document_newposition")]
        public HttpResponseMessage GetProductNewPosition(int id, int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                document_position result = Document.GetDocumentPositionNew(query, id, salepoint);
                return this.CreateResponse(HttpStatusCode.OK, new { newposition = result });
            });
        }

        [HttpPost]
        [ActionName("post_doc")]
        public HttpResponseMessage PostDocument(document document)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Document.SetDocument(query, document, principal.Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_doc")]
        public HttpResponseMessage DeleteDocument(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Document.DelDocument(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("get_sales")]
        public HttpResponseMessage GetSales(sales_params docpar)
        {
            return TryCatchResponseQuery((query) =>
            {
                return this.CreateResponse(HttpStatusCode.OK, Check.GetSales(query, docpar));
            });
        }

        [HttpGet]
        [ActionName("get_sale")]
        public HttpResponseMessage GetSale(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                check result = Check.GetSale(query, id);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }
        #endregion

        #region Движение денег
        //[HttpPost]
        //[ActionName("get_payments")]
        //public HttpResponseMessage GetPayments(payments_params docpar)
        //{
        //    return TryCatchResponseQuery((query) =>
        //    {
        //        return this.CreateResponse(HttpStatusCode.OK, Payment.GetPayments(query, docpar));
        //    });
        //}

        
        // TODO: Закешировать список сотрудников!!!

        [HttpPost]
        [ActionName("get_payments")]
        public async Task<HttpResponseMessage> GetPayments(payments_params docpar)
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
                       return this.CreateResponse(HttpStatusCode.OK, Payment.GetPayments(query, docpar, employees));
                   });
               })
        );

        [HttpGet]
        [ActionName("get_payment")]
        public HttpResponseMessage GetPayment(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                payment result = Payment.GetPayment(query, id);
                Payment.GetComment(query, result);
                return this.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }

        [HttpPost]
        [ActionName("post_payment")]
        public HttpResponseMessage PostPayment(payment payment)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Payment.SetPayment(query, payment, principal.Data.User.id);
                Payment.SetComment(query, payment);
                return this.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        #endregion
    }
}
