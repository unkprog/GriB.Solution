import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export namespace Controller.Terminal {
    export class PaymentType extends base.Controller.BaseEditor implements Interfaces.IControllerPaymentType {
        constructor() {
           super();
        }


        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymenttype.html", Id: "paymenttype-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$methodpayment"),
                "labelPayment": vars._statres("label$payment"),

                "labelCash": vars._statres("label$cash"),
                "labelNonCash": vars._statres("label$noncash"),
                "labelWithOutPayment": vars._statres("label$withoutpayment"),
                "labelCancel": vars._statres("button$label$cancel")
            });
        }

        private selectedPaymentType: number = 0;
        public get SelectedPaymentType() { return this.selectedPaymentType; }

        private btnCash: JQuery;
        private btnNonCash: JQuery;
        private btnWithOutPayment: JQuery;
        private btnCancelThis: JQuery;
       
        public ViewInit(view: JQuery): boolean {

            this.btnCash = view.find("#btn-cash");
            this.btnNonCash = view.find("#btn-noncash");
            this.btnWithOutPayment = view.find("#btn-witoutpayment");
            this.btnCancelThis = view.find("#btn-cancel");

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
            this.PaymentCashButtonClick = this.createTouchClickEvent(this.btnCash, this.paymentCashButtonClick);
            this.PaymentNonCashButtonClick = this.createTouchClickEvent(this.btnNonCash, this.paymentNonCashButtonClick);
            this.WithOutPaymentButtonClick = this.createTouchClickEvent(this.btnWithOutPayment, this.withOutPaymentButtonClick);
            this.PaymentCancelButtonClick = this.createTouchClickEvent(this.btnCancelThis, this.paymentCancelButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent(this.btnCash, this.PaymentCashButtonClick);
            this.destroyTouchClickEvent(this.btnNonCash, this.PaymentNonCashButtonClick);
            this.destroyTouchClickEvent(this.btnWithOutPayment, this.WithOutPaymentButtonClick);
            this.destroyTouchClickEvent(this.btnCancelThis, this.PaymentCancelButtonClick);
            super.destroyEvents();
        }

        public PaymentCancelButtonClick: { (e: any): void; };
        private paymentCancelButtonClick(e) {
            this.CancelButtonClick(e);
        }

        public OnSelectPaymentType: { (controller: Interfaces.IControllerPaymentType): void; };
        private selectPaymentTypeClick(e): void {
            let controller: Interfaces.IControllerPaymentType = this;
            if (this.OnSelectPaymentType)
                this.OnSelectPaymentType(controller);
            this.SaveButtonClick(e);
        }

        public PaymentCashButtonClick: { (e: any): void; };
        private paymentCashButtonClick(e): void {
            this.selectedPaymentType = 1;
            this.selectPaymentTypeClick(e);
        }

        public PaymentNonCashButtonClick: { (e: any): void; };
        private paymentNonCashButtonClick(e): void {
            this.selectedPaymentType = 2;
            this.selectPaymentTypeClick(e);
        }

        public WithOutPaymentButtonClick: { (e: any): void; };
        private withOutPaymentButtonClick(e): void {
            this.selectedPaymentType = 3;
            this.selectPaymentTypeClick(e);
        }

    }
}

vars.registerController("terminal/paymenttype", function (module: any): Interfaces.IController { return new module.Controller.Terminal.PaymentType(); });