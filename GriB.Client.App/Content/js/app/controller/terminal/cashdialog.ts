import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');


export namespace Controller.Terminal {
    export class CashDialog extends base.Controller.BaseEditor implements Interfaces.IControllerCashDialog {
        constructor() {
            super();
            if (this.EditorSettings) {
                if (this.EditorSettings.ButtonSetings) {
                    this.EditorSettings.ButtonSetings.IsSave = false;
                    this.EditorSettings.ButtonSetings.IsCancel = false;
                }
            }
            this.Model.set("editModel.result", -1);
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/cashdialog.html", Id: "cashdialog-view" };
        }

        public get EditorModel(): Interfaces.Model.ICheckCommetModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": "",
                "HeaderCash": "",
                "editModel": {
                    result: -1
                },
                "labelEncashment": vars._statres("label$encashment"),
                "labelDeposit": vars._statres("label$depositmoney"),
                "labelWithDrawing": vars._statres("label$withdrawingmoney"),
                "labelCancel": vars._statres("button$label$cancel"),
            });

            return result;
        }

        public get Result(): number {
            return this.Model.get("editModel.result");
        };

        public OnResult: { (controller: Interfaces.IControllerCashDialog): void; };

        protected btnEncashment: JQuery;
        protected btnDeposit: JQuery;
        protected btnWithDrawing: JQuery;
        protected btnCancelButton: JQuery;

        public ViewInit(view: JQuery): boolean {
            this.btnEncashment = view.find("#tn-cash-encashment");
            this.btnDeposit = view.find("#btn-cash-deposit");
            this.btnWithDrawing = view.find("#btn-cash-withdrawing");
            this.btnCancelButton = view.find("#btn-cash-cancel");
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();

            this.EncashmentButtonClick = this.createTouchClickEvent(this.btnEncashment, this.encashmentButtonClick);
            this.DepositButtonClick = this.createTouchClickEvent(this.btnDeposit, this.depositButtonClick);
            this.WithdrawalButtonClick = this.createTouchClickEvent(this.btnWithDrawing, this.withdrawalButtonClick);
            this._CancelButtonClick = this.createTouchClickEvent(this.btnCancelButton, this._cancelButtonClick);
        }

        protected destroyEvents(): void {
            if (this.btnEncashment) this.destroyTouchClickEvent(this.btnEncashment, this.EncashmentButtonClick);
            if (this.btnDeposit) this.destroyTouchClickEvent(this.btnDeposit, this.DepositButtonClick);
            if (this.btnWithDrawing) this.destroyTouchClickEvent(this.btnWithDrawing, this.WithdrawalButtonClick);
            if (this.btnCancelButton) this.destroyTouchClickEvent(this.btnCancelButton, this._CancelButtonClick);
            super.destroyEvents();
        }

        public EncashmentButtonClick: { (e: any): void; };
        private encashmentButtonClick(e) {
            this.Model.set("editModel.result", 1);
            this.SaveButtonClick(e);
        }

        public DepositButtonClick: { (e: any): void; };
        private depositButtonClick(e) {
            this.Model.set("editModel.result", 2);
            this.SaveButtonClick(e);
        }

        public WithdrawalButtonClick: { (e: any): void; };
        private withdrawalButtonClick(e) {
            this.Model.set("editModel.result", 3);
            this.SaveButtonClick(e)
        }

        public _CancelButtonClick: { (e: any): void; };
        private _cancelButtonClick(e) {
            this.Model.set("editModel.result", 0);
            this.SaveButtonClick(e)
        }

        public validate(): boolean {
            let controller = this;
            let result: boolean = super.validate();

            if (result === true && this.OnResult)
                this.OnResult(controller);
            return result;
        }
    }
}

vars.registerController("terminal/cashdialog", function (module: any): Interfaces.IController { return new module.Controller.Terminal.CashDialog(); });