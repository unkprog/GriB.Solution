import vars = require('app/common/variables');
import utils = require('app/common/utils');
import payment = require('app/controller/terminal/payment');


export namespace Controller.Terminal {
    export class PaymentNonCash extends payment.Controller.Terminal.Payment implements Interfaces.IControllerPaymentNonCash {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$noncash"));
        }


        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymentnoncash.html", Id: "paymentnoncash-view" };
        }

        public ViewInit(view: JQuery): boolean {
            this.inputTotalSum = view.find("#paymentnoncash-view-totalsum");
            this.inputReceivedSum = view.find("#paymentnoncash-view-received");
            this.inputSurrenderSum = view.find("#paymentnoncash-view-surrender");

            this.btnPayment = view.find("#btn-num-apply");
            this.btnPaymentCancel = view.find("#btn-num-cancel");

            this.ReceivedSum = this.TotalSum;
            this.SurrenderSum = 0;
            this.changeModel({ field: "editModel.receivedSum" });
            this.inputReceivedSum.val(utils.numberToString(this.ReceivedSum, 2))
            this.inputSurrenderSum.val(utils.numberToString(this.SurrenderSum, 2))

            return super.ViewInit(view);
        }
    }
}

vars.registerController("terminal/paymentnoncash", function (module: any): Interfaces.IController { return new module.Controller.Terminal.PaymentNonCash(); });