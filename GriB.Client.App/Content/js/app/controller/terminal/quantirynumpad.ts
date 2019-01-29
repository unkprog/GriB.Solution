import vars = require('app/common/variables');
import utils = require('app/common/utils');
import paymentnumpad = require('app/controller/terminal/paymentnumpad');

export namespace Controller.Terminal {
    export class QuantityNumPad extends paymentnumpad.Controller.Terminal.PaymentNumPad {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$quantity"));
            this.Model.set("labelTotalToPay", vars._statres("label$quantity"));
            this.Model.set("labelReceiveSum", vars._statres("label$changequantity"));
            this.Model.set("labelPayment", vars._statres("button$label$ok"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymentnumpad.html", Id: "paymentnumpad-view" };
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            if (this.inputSurrenderSumRow)
                this.inputSurrenderSumRow.addClass("hide");
            return result;
        }

        public validate(): boolean {
            let controller: Interfaces.IControllerPayment = this;
            let result: boolean = true;

            let curValue: string = (this.inputReceivedSum ? "" + this.inputReceivedSum.val() : "");// this.Model.get("receivedSumText");
            try { this.ReceivedSum = parseFloat(curValue); } catch { this.ReceivedSum = 0; }
            if (isNaN(this.ReceivedSum)) this.ReceivedSum = 0;

            if (this.ReceivedSum <= 0) {
                M.toast({ html: vars._statres('error$quantity$mustgreaterthanzero') });
                result = false;
            }

            if (result === true && this.OnPaymentApply)
                this.OnPaymentApply(controller);
            return result;
        }
    }
}

vars.registerController("terminal/quantirynumpad", function (module: any): Interfaces.IController { return new module.Controller.Terminal.QuantityNumPad(); });