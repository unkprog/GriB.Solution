import vars = require('app/common/variables');
import utils = require('app/common/utils');
import payment = require('app/controller/terminal/payment');

export namespace Controller.Terminal {
    export class PaymentNumPad extends payment.Controller.Terminal.Payment implements Interfaces.IControllerPaymentNumPad {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$payment"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymentnumpad.html", Id: "paymentnumpad-view" };
        }

        private btnNumPad: JQuery;

        public ViewInit(view: JQuery): boolean {
            this.btnNumPad = view.find(".btn-numpad");

            this.inputTotalSum = view.find("#paymentnumpad-view-totalsum");
            this.inputReceivedSum = view.find("#paymentnumpad-view-received");
            this.inputSurrenderSum = view.find("#paymentnumpad-view-surrender");

            this.inputSurrenderSumRow = view.find("#paymentnumpad-view-surrender-row");

            this.btnPayment = view.find("#btn-num-apply");
            this.btnPaymentCancel = view.find("#btn-num-cancel");

            return super.ViewInit(view);
        }

        public ViewHide(e) {
            super.ViewHide(e);
        }

        public ViewShow(e: any): boolean {
            let result: boolean = super.ViewShow(e);
            return result;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
        }

        protected createEvents(): void {
            super.createEvents();
            this.NumberButtonClick = this.createTouchClickEvent(this.btnNumPad, this.numberButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent(this.btnNumPad, this.createEvents);
            super.destroyEvents();
        }

        public NumberButtonClick: { (e: any): void; };
        private numberButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let strValue: string = targetid.replace("btn-num-", "");
            let curValue: string = this.Model.get("receivedSumText");
            let prevValue: string = curValue;
            let numValue: number;
            if (strValue === "colon")
                curValue += ".";
            else if (strValue === "bspace") {
                if (curValue.length > 0)
                    curValue = curValue.substring(0, curValue.length - 1);
            }
            else 
                curValue += strValue;

            try { numValue = parseFloat(curValue); } catch { curValue = prevValue; }
            if (isNaN(numValue)) {
                numValue = 0;
                curValue = "";
            }

            this.ReceivedSum = numValue;
            this.Model.set("receivedSumText", curValue);
            //this.SurrenderSum = numValue - this.TotalSum;
        }
    }
}

vars.registerController("terminal/paymentnumpad", function (module: any): Interfaces.IController { return new module.Controller.Terminal.PaymentNumPad(); });