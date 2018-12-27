﻿using GriB.Client.App.Managers.POSTerminal;
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
        [ActionName("check_setclient")]
        public HttpResponseMessage PostCheckSetClient(check_setclient_params setclientparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Check.SetClient(query, setclientparams.check, setclientparams.client, principal.Data.User.id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpPost]
        [ActionName("check_setdiscount")]
        public HttpResponseMessage PostCheckSetDiscount(check_setdiscount_params setdiscountparams)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Check.SetDiscount(query, setdiscountparams.check, setdiscountparams.discount, principal.Data.User.id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
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
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
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
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
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
                payment payment = new payment() { ptype = closeparams.paymentType, option = closeparams.paymentOption, sum = closeparams.paymentSum, comment = closeparams.comment };
                payment.check = Check.GetCheck(query, closeparams.check);
                payment.check.client = closeparams.client;
                payment.check.options = ((payment.check.options & check.ciClose) == check.ciClose ? payment.check.options : payment.check.options + check.ciClose);
                payment.check = Check.Close(query, payment.check, principal.Data.User.id);
                payment.client = new Models.Editor.client() { id = closeparams.client };
                payment = Payment.SetPayment(query, payment, principal.Data.User.id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

    }
}