import vars = require('app/common/variables');
import utils = require('app/common/utils');
import payment = require('app/controller/terminal/payment');


export namespace Controller.Terminal {
    export class PaymentWithOut extends payment.Controller.Terminal.Payment implements Interfaces.IControllerPaymentWithOut {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$withoutpayment"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymentwithout.html", Id: "paymentwithout-view" };
        }

        public ViewInit(view: JQuery): boolean {
            this.inputTotalSum = view.find("#paymentwithout-view-totalsum");
            this.inputReceivedSum = view.find("#paymentwithout-view-received");

            this.btnPayment = view.find("#btn-num-apply");
            this.btnPaymentCancel = view.find("#btn-num-cancel");

            return super.ViewInit(view);
        }
    }
}