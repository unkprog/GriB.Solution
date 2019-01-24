﻿using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Managers.POSTerminal;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.POSTerminal;
using GriB.Common.Models.Security;
using System.Net;
using System.Net.Http;
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
                return Request.CreateResponse(HttpStatusCode.OK, Document.GetDocuments(query, docpar));
            });
        }

        [HttpGet]
        [ActionName("get_doc")]
        public HttpResponseMessage GetDocument(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                document result = Document.GetDocument(query, id);
                return Request.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }


        [HttpGet]
        [ActionName("get_document_newposition")]
        public HttpResponseMessage GetProductNewPosition(int id, int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                document_position result = Document.GetDocumentPositionNew(query, id, salepoint);
                return Request.CreateResponse(HttpStatusCode.OK, new { newposition = result });
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
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_doc")]
        public HttpResponseMessage DeleteDocument(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Document.DelDocument(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("get_sales")]
        public HttpResponseMessage GetSales(sales_params docpar)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Check.GetSales(query, docpar));
            });
        }

        [HttpGet]
        [ActionName("get_sale")]
        public HttpResponseMessage GetSale(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                check result = Check.GetSale(query, id);
                return Request.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }
        #endregion

        #region Движение денег
        [HttpPost]
        [ActionName("get_payments")]
        public HttpResponseMessage GetPayments(payments_params docpar)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Payment.GetPayments.GetSales(query, docpar));
            });
        }

        [HttpGet]
        [ActionName("get_payment")]
        public HttpResponseMessage GetPayment(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                payment result = Payment.GetPayment(query, id);
                return Request.CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }

        #endregion
    }
}
