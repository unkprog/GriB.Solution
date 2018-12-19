import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');

export namespace Controller.Terminal {
    export class Payment extends base.Controller.BaseEditor implements Interfaces.IControllerPayment {
        constructor() {
           super();
        }

        public get EditorModel(): Interfaces.Model.IPaymentModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": "",
                "editModel": {
                    totalSum: 0,
                    receivedSum: undefined,
                    surrenderSum: undefined,
                    typeWithOut: 0,
                    client: { id: 0, name: "" },
                    comment: ""

                },
                "totalSumText": "0.00",
                "receivedSumText": "",
                "surrenderSumText": "",
                "labelTotalToPay": vars._statres("label$topay"),
                "labelReceiveSum": vars._statres("label$received"),
                "labelSurrenderSum": vars._statres("label$surrender"),
                "labelComment": vars._statres("label$comment"),
                "visibleClient": "none",

            });
            result.bind("change", $.proxy(this.changeModel, this));
            return result;
        }

        public OnPaymentApply: { (controller: Interfaces.IControllerPayment): void; };

        public get TotalSum(): number { return this.Model.get("editModel.totalSum"); }
        public set TotalSum(value: number) { this.Model.set("editModel.totalSum", value); }

        public get ReceivedSum(): number { return this.Model.get("editModel.receivedSum"); }
        public set ReceivedSum(value: number) { this.Model.set("editModel.receivedSum", value); }

        public get SurrenderSum(): number { return this.Model.get("editModel.surrenderSum"); }
        public set SurrenderSum(value: number) { this.Model.set("editModel.surrenderSum", value); }

        public get TypeWithOut(): number { return this.Model.get("editModel.typeWithOut"); }
        public set TypeWithOut(value: number) { this.Model.set("editModel.typeWithOut", value); }

        public get Client(): Interfaces.Model.IReferenceModel { return this.Model.get("editModel.client").toJSON(); }
        public set Client(value: Interfaces.Model.IReferenceModel) { this.Model.set("editModel.client", value); }

        public get Comment(): string { return this.Model.get("editModel.comment"); }
        public set Comment(value: string) { this.Model.set("editModel.comment", value); }

        protected btnPayment: JQuery;
        protected btnPaymentCancel: JQuery;
        protected inputTotalSum: JQuery;
        protected inputReceivedSum: JQuery;
        protected inputSurrenderSum: JQuery;

        protected changeModel(e: any): void {
            if (e.field === "editModel.totalSum") {
                this.Model.set("totalSumText", utils.numberToString(this.TotalSum, 2))
            }
            else if (e.field === "editModel.receivedSum") {
                this.SurrenderSum = this.ReceivedSum - this.TotalSum;
                if (this.inputReceivedSum) {
                    this.inputReceivedSum.val(utils.numberToString(this.ReceivedSum, 2));
                    M.updateTextFields();
                }
            }
            else if (e.field === "editModel.surrenderSum") {
                if (this.SurrenderSum < 0) {
                    if (this.inputSurrenderSum) {
                        this.inputSurrenderSum.removeClass("green-text");
                        this.inputSurrenderSum.addClass("red-text");
                        this.inputSurrenderSum.val(utils.numberToString(this.SurrenderSum, 2));
                        M.updateTextFields();
                    }
                }
                else {
                    if (this.inputSurrenderSum) {
                        this.inputSurrenderSum.removeClass("red-text");
                        this.inputSurrenderSum.addClass("green-text");
                    }
                }
                if (this.inputSurrenderSum)
                    this.inputSurrenderSum.val(utils.numberToString(this.SurrenderSum, 2));
                M.updateTextFields();
            }
        }

        protected createEvents(): void {
            super.createEvents();

            this.PaymentButtonClick = this.createTouchClickEvent(this.btnPayment, this.paymentButtonClick);
            this.PaymentCancelButtonClick = this.createTouchClickEvent(this.btnPaymentCancel, this.paymentCancelButtonClick);
        }

        protected destroyEvents(): void {
            this.Model.unbind("change");
            if (this.btnPayment) this.destroyTouchClickEvent(this.btnPayment, this.PaymentButtonClick);
            if (this.btnPaymentCancel) this.destroyTouchClickEvent(this.btnPaymentCancel, this.PaymentCancelButtonClick);
            super.destroyEvents();
        }

        public PaymentButtonClick: { (e: any): void; };
        private paymentButtonClick(e): void {
            this.SaveButtonClick(e);
        }

        public validate(): boolean {
            let controller: Interfaces.IControllerPayment = this;
            let result: boolean = super.validate();

            let curValue: string = (this.inputReceivedSum ? "" + this.inputReceivedSum.val() : "");// this.Model.get("receivedSumText");
            try { this.ReceivedSum = parseFloat(curValue); } catch { this.ReceivedSum = 0; }
            if (isNaN(this.ReceivedSum)) this.ReceivedSum = 0;

            if (this.TotalSum > this.ReceivedSum) {
                M.toast({ html: vars._statres('error$numpad$amountinsufficient') });
                result = false;
            }

            if (result === true && this.OnPaymentApply)
                this.OnPaymentApply(controller);
            return result;
        }

        public PaymentCancelButtonClick: { (e: any): void; };
        private paymentCancelButtonClick(e): void {
            this.CancelButtonClick(e);
        }
    }
}