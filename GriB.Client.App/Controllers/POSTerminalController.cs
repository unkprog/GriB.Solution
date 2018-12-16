using GriB.Client.App.Managers.POSTerminal;
using GriB.Client.App.Models.POSTerminal;
using GriB.Common.Models.Security;
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
            return Request.CreateResponse(HttpStatusCode.OK, new {employee = AccountController.AccountData(query, principal) });
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
                return Request.CreateResponse(HttpStatusCode.OK, new { items = Terminal.GetSaleProducts(query, new posparamsselect() { category = category, salepoint = salepoint }) });
            });
        }

        [HttpGet]
        [ActionName("check_new")]
        public HttpResponseMessage GetCheckNew(int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                return Request.CreateResponse(HttpStatusCode.OK, new { checknew = Check.NewCheck(query, principal.Data.User.id, salepoint, 0) });
            });
        }

        [HttpGet]
        [ActionName("check_delete")]
        public HttpResponseMessage GetCheckDelete(int check)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                return Request.CreateResponse(HttpStatusCode.OK, new { checkdelete = Check.DeleteCheck(query, principal.Data.User.id, check) });
            });
        }

        

        [HttpGet]
        [ActionName("check_opened")]
        public HttpResponseMessage GetCheckOpened(int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                List<check> checks = Check.NewAll(query, principal.Data.User.id, salepoint, 0);
                foreach (var item in checks)
                {
                    Check.GetPositions(query, item);
                }
                return Request.CreateResponse(HttpStatusCode.OK, new { checkopened = checks });
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
                return Request.CreateResponse(HttpStatusCode.OK, new { newposition = position });
            });
        }

        [HttpPost]
        [ActionName("check_close")]
        public HttpResponseMessage PostChecClose(check_close_params closeparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                payment payment = new payment() { type = closeparams.paymentType, option = closeparams.paymentOption, sum = closeparams.paymentSum, comment = closeparams.comment };
                payment.check = Check.GetCheck(query, closeparams.check);
                payment = Payment.SetPayment(query, payment, principal.Data.User.id);
                //= Check.AddPosition(query, new check_position() { id = addposparams.check, product = new Models.Editor.product() { id = addposparams.product }, quantity = addposparams.quantity });
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");// new { newposition = position });
            });
        }

    }
}