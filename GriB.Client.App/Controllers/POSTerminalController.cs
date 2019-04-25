using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Managers.POSTerminal;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.POSTerminal;
using GriB.Client.App.Models.Report;
using GriB.Common.Models.Print;
using GriB.Common.Models.Security;
using GriB.Common.Sql;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    public class POSTerminalController : BaseController
    {
        [HttpGet]
        [ActionName("enter")]
        public HttpResponseMessage GetEnter()
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                // principal.Data.User.id
                return CreateResponse(HttpStatusCode.OK, new { employee = AccountController.AccountData(query, principal) });
            });
        }

        private double SumInCash(Query query, int salepoint)
        {
            string date = DateTime.Now.ToString(Constants.dateFormatWitTime);
            ReportCashRow cashRow = Managers.Reports.Cash.GetCashToPOS(query, new ReportBaseFilter() { datefrom = date, dateto = "30.12.1899", salepoint = new salepoint() { id = salepoint } });
            return cashRow == null ? 0 : cashRow.sumEnd;
        }

        [HttpGet]
        [ActionName("change")]
        public HttpResponseMessage GetChange(int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                return CreateResponse(HttpStatusCode.OK, new { change = Change.GetOpen(query, salepoint) });
            });
        }


        [HttpGet]
        [ActionName("change_new")]
        public HttpResponseMessage GetChangeNew(int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                return CreateResponse(HttpStatusCode.OK, new { change = Change.New(query, principal.Data.User.id, salepoint) });
            });
        }

        [HttpGet]
        [ActionName("change_close")]
        public HttpResponseMessage GetChangeClose(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Change.Close(query, principal.Data.User.id, id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("change_sumincash")]
        public HttpResponseMessage GetChangeSumInCash(int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                return CreateResponse(HttpStatusCode.OK, new { cashSum = SumInCash(query, salepoint) });
            });
        }

        [HttpGet]
        [ActionName("sale_products")]
        public HttpResponseMessage GetSaleProducts(int category, int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;

                // principal.Data.User.id
                return CreateResponse(HttpStatusCode.OK, new { items = Terminal.GetSaleProducts(query, new posparamsselect() { category = category, salepoint = salepoint }) });
            });
        }

        [HttpGet]
        [ActionName("check_new")]
        public HttpResponseMessage GetCheckNew(int salepoint, int change)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                return CreateResponse(HttpStatusCode.OK, new { checknew = Check.NewCheck(query, principal.Data.User.id, salepoint, change) });
            });
        }

        [HttpGet]
        [ActionName("check_delete")]
        public HttpResponseMessage GetCheckDelete(int check)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                return CreateResponse(HttpStatusCode.OK, new { checkdelete = Check.DeleteCheck(query, principal.Data.User.id, check) });
            });
        }

        

        [HttpGet]
        [ActionName("check_opened")]
        public HttpResponseMessage GetCheckOpened(int salepoint, int chagne)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                List<check> checks = Check.NewAll(query, principal.Data.User.id, salepoint, chagne);
                foreach (var item in checks)
                {
                    Check.GetPositions(query, item);
                }
                return CreateResponse(HttpStatusCode.OK, new { checkopened = checks });
            });
        }

        [HttpGet]
        [ActionName("check_history")]
        public HttpResponseMessage GetCheck(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                check check = Check.GetCheck(query, id);
                check = Check.GetPositions(query, check);
                return CreateResponse(HttpStatusCode.OK, check);
            });
        }

        [HttpPost]
        [ActionName("check_setclient")]
        public HttpResponseMessage PostCheckSetClient(check_setclient_params setclientparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Check.SetClient(query, setclientparams.check, setclientparams.client, principal.Data.User.id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("check_setdiscount")]
        public HttpResponseMessage PostCheckSetDiscount(check_setdiscount_params setdiscountparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Check.SetDiscount(query, setdiscountparams.check, setdiscountparams.discount, setdiscountparams.discountref, principal.Data.User.id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("check_setcomment")]
        public HttpResponseMessage PostCheckSetComment(check_setcomment_params setcommentparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Check.SetComment(query, setcommentparams.check, setcommentparams.comment, principal.Data.User.id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("check_cancel")]
        public HttpResponseMessage PostCheckCancel(check_setcomment_params cancelparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                check check = Check.GetCheck(query, cancelparams.check);
                if((check.options & check.ciCancel) != check.ciCancel)
                    check.options = check.options + check.ciCancel;
                check.comment = cancelparams.comment;
                Check.Cancel(query, check, principal.Data.User.id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("check_add_pos")]
        public HttpResponseMessage PostCheckAddPos(check_add_pos_params addposparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                check_position position = Check.AddPosition(query, new check_position() { id = addposparams.check, product = new Models.Editor.product() { id = addposparams.product }, quantity = addposparams.quantity });
                return CreateResponse(HttpStatusCode.OK, new { newposition = position });
            });
        }

        [HttpPost]
        [ActionName("check_edit_pos")]
        public HttpResponseMessage PostCheckEditPos(check_add_pos_params addposparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                check_position position = Check.SetPosition(query, new check_position() { id = addposparams.check, product = new Models.Editor.product() { id = addposparams.product }, quantity = addposparams.quantity });
                return CreateResponse(HttpStatusCode.OK, new { newposition = position });
            });
        }

        [HttpPost]
        [ActionName("check_close")]
        public HttpResponseMessage PostCheckClose(check_close_params closeparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                payment payment = new payment() { doctype = payment.DocTypeDefault, ptype = closeparams.paymentType, options = 1 + (closeparams.paymentOption > 0 ? 1 << closeparams.paymentOption : 0), sum = closeparams.paymentSum, comment = closeparams.comment, salepoint = new salepoint() { id = closeparams.salepoint } };
                payment.check = Check.GetCheck(query, closeparams.check);
                payment.check.client = new client() { id = closeparams.client };
                payment.check.options = ((payment.check.options & check.ciClose) == check.ciClose ? payment.check.options : payment.check.options + check.ciClose);
                payment.check = Check.Close(query, payment.check, principal.Data.User.id);
                payment.client = new client() { id = closeparams.client };

                payment = Payment.SetPayment(query, payment, principal.Data.User.id);
                Payment.SetComment(query, payment);

                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("getprinters")]
        public HttpResponseMessage GetPrinters(int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                List<printer> printers = Printer.GetPrinters(query, salepoint);
                return CreateResponse(HttpStatusCode.OK, printers);
            });
        }
    }
}