import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');
import svcSetting = require('app/services/settingsservice');
import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Document.Editor {
    export class PaymentBase extends base.Controller.BaseEditor implements Interfaces.IControllerEditorPayment {
        constructor() {
            super();
        }

        private documentService: svc.Services.DocumentService;
        protected get Service(): svc.Services.DocumentService {
            if (!this.documentService)
                this.documentService = new svc.Services.DocumentService();
            return this.documentService;
        }

        private settingService: svcSetting.Services.SettingsService;
        protected get SettingService(): svcSetting.Services.SettingsService {
            if (!this.settingService)
                this.settingService = new svcSetting.Services.SettingsService();
            return this.settingService;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/document/editor/payment.html", Id: "payment-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let oo: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": this.Header,
                "labelDocument": "",
                "editModel": {},
                "labelConduct": vars._statres("label$conduct"),
                "labelDate": vars._statres("label$date"),
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelClient": vars._statres("label$client"),
                "labelName": vars._statres("label$name"),
                "labelSum": vars._statres("label$sum"),
                "labelComment": vars._statres("label$comment"),
                "labelMethodPayment": vars._statres("label$methodpayment"),
                "labelCash": vars._statres("label$cash"),
                "labelNonCash": vars._statres("label$noncash"),
                "labelWithOutPayment": vars._statres("label$withoutpayment"),

                "labelNotSelected": vars._statres("label$notselected"),
                "labelOnCredit": vars._statres("label$oncredit"),
                "labelOnTheHouse": vars._statres("label$onthehouse"),
                "labelClientLeft": vars._statres("label$clientleft"),

                "labelIncome": vars._statres("label$articleincome"),
                "labelCost": vars._statres("label$articlecost"),
                "labelAccount": vars._statres("label$account"),

                "paymentConduct": true,
                "optionValue": 1,
                "totalSumText": "0.00",
            });
            return oo;
        }

        public get EditorModel(): Interfaces.Model.IPayment {
            let model: Interfaces.Model.IPayment = this.Model.get("editModel").toJSON();
            return model;
        }

        protected getSaveModel(): Interfaces.Model.IPayment {
            let model: Interfaces.Model.IPayment = super.getSaveModel() as Interfaces.Model.IPayment;
            if (model) {
                model.doctype = 10;
            }
            return model;
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetPayment, this.Service), Save: $.proxy(this.Service.SetPayment, this.Service) };
        }

        public get EditIdName(): string {
            return "id_payment";
        }

        protected validateStock(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IPayment = this.EditorModel;
            if ((model.options & 1) === 1) {
                if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                    M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
                    result = false;
                }
            }
            return result;
        }

        protected validate(): boolean {
            let result: boolean = this.validateStock();
            let model: Interfaces.Model.IPayment = this.EditorModel;

            if ((model.options & 1) === 1) {

                if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                    M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
                    result = false;
                }

                if (utils.isNullOrEmpty(model.comment) === true) {
                    M.toast({ html: vars._statres("msg$error$commentnotfilled") });
                    result = false;
                }
                else if (model.comment.length > 510) {
                    M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$comment"), 510) });
                    result = false;
                }

                let type: number = this.Model.get("editModel.ptype");
                if (type == 3) {
                    if (!model.client || !model.client.id || model.client.id === 0) {
                        M.toast({ html: vars._statres("error$without$clientnotspecified") });
                        result = false;
                    }
                }

            }
            return result;
        }

        protected dateControl: JQuery;
        protected salePointControl: JQuery;
        protected clientControl: JQuery;
        private clientClearControl: JQuery;
        protected incomeControl: JQuery;
        private incomeClearControl: JQuery;
        protected costControl: JQuery;
        private costClearControl: JQuery;
        protected accountControl: JQuery;
        private accountClearControl: JQuery;
        protected methodPaymentRow: JQuery;
        private methodPayment: JQuery;
        protected methodPaymentWitOut: JQuery;
        private optionPayment: JQuery;
        protected optionPaymentRow: JQuery;
        private commentControl: JQuery;

        protected get DocFormatDate(): string {
            return "dd.mm.yyyy";
        }

        public ViewInit(view: JQuery): boolean {
            this.dateControl = view.find("#payment-view-date");
            this.dateControl.datepicker({ format: this.DocFormatDate });

            this.salePointControl = view.find("#payment-view-salepoint-row");
            this.clientControl = view.find("#payment-view-client-row");
            this.clientClearControl = view.find("#payment-view-client-clear");

            this.incomeControl = view.find("#payment-view-income-row");
            this.incomeClearControl = view.find("#payment-view-income-clear");
            this.costControl = view.find("#payment-view-cost-row");
            this.costClearControl = view.find("#payment-view-cost-clear");
            this.accountControl = view.find("#payment-view-account-row");
            this.accountClearControl = view.find("#payment-view-account-clear");

            this.methodPaymentRow = view.find("#payment-view-payment-type-row");
            this.methodPayment = view.find("#payment-view-payment-type");
            this.methodPaymentWitOut = view.find("#payment-view-payment-type-without");

            this.optionPaymentRow = view.find("#payment-view-payment-option-row");
            this.optionPayment = view.find("#payment-view-payment-option");

            this.commentControl = view.find("#payment-view-comment-row");

             view.find("#payment-view-comment").characterCounter();

            if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === false) {
                this.dateControl.attr('disabled', 'disabled'); 
                view.find("#payment-view-comment").attr('disabled', 'disabled'); 
                view.find("#payment-view-conduct").attr('disabled', 'disabled'); 
            }
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            this.methodPayment.formSelect();
            this.optionPayment.formSelect();
            M.textareaAutoResize($("#payment-view-comment"));
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
            if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
                this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);
                this.ClientButtonClick = this.createTouchClickEvent(this.clientControl, this.clientButtonClick);
                this.ClearClientButtonClick = this.createTouchClickEvent(this.clientClearControl, this.clearClientButtonClick);
                this.IncomeButtonClick = this.createTouchClickEvent(this.incomeControl, this.incomeButtonClick);
                this.ClearIncomeButtonClick = this.createTouchClickEvent(this.incomeClearControl, this.clearIncomeButtonClick);
                this.CostButtonClick = this.createTouchClickEvent(this.costControl, this.costButtonClick);
                this.ClearCostButtonClick = this.createTouchClickEvent(this.costClearControl, this.clearCostButtonClick);
                this.AccountButtonClick = this.createTouchClickEvent(this.accountControl, this.accountButtonClick);
                this.ClearAccountButtonClick = this.createTouchClickEvent(this.accountClearControl, this.clearAccountButtonClick);
            }
            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        protected destroyEvents(): void {
            this.Model.unbind("change");
            if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
                this.destroyTouchClickEvent(this.accountClearControl, this.ClearAccountButtonClick);
                this.destroyTouchClickEvent(this.accountControl, this.AccountButtonClick);
                this.destroyTouchClickEvent(this.costClearControl, this.ClearCostButtonClick);
                this.destroyTouchClickEvent(this.costControl, this.CostButtonClick);
                this.destroyTouchClickEvent(this.incomeClearControl, this.ClearIncomeButtonClick);
                this.destroyTouchClickEvent(this.incomeControl, this.IncomeButtonClick);

                this.destroyTouchClickEvent(this.clientClearControl, this.ClearClientButtonClick);
                this.destroyTouchClickEvent(this.clientControl, this.ClientButtonClick);
                this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
            }
            super.destroyEvents();
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            // TODO: Разобраться, почему падает
            try {
                this.methodPayment.formSelect();
                this.optionPayment.formSelect();
            }
            catch { }
        }

        protected loadData(): boolean {
            return super.loadData();
        }

        public SetupAfterLoad: { (controller: Interfaces.IControllerEditorPayment): void; }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            let dateTime: Date = new Date(responseData.record.cd);
            this.dateControl.val(utils.date_ddmmyyyy(dateTime));
            M.Datepicker.getInstance(this.dateControl[0]).setDate(dateTime, true);
            this.Model.set("paymentConduct", ((responseData.record.options & 1) === 1));
            this.Model.set("optionValue", ((responseData.record.options & 2) === 2 ? 1 : (responseData.record.options & 4) === 4 ? 2 : 3));
            this.changeModel({ field: "editModel.ptype" });
            this.isUpdateSum = true;
            this.Model.set("totalSumText", utils.numberToString(responseData.record.sum, 2));
            this.isUpdateSum = false;

            if (this.SetupAfterLoad)
                this.SetupAfterLoad(this);
        }

        protected afterLoad1(responseData?: any): void {
        }

        public SetupAfterSave: { (controller: Interfaces.IControllerEditorPayment): void; }
        protected endSave() {
            if (this.SetupAfterSave)
                this.SetupAfterSave(this);
            super.endSave();
        }

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/client', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlTypePayment: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlTypePayment.CardSettings.IsAdd = false;
                    ctrlTypePayment.CardSettings.IsAddCopy = false;
                    ctrlTypePayment.CardSettings.IsDelete = false;
                    ctrlTypePayment.CardSettings.IsEdit = false;
                    ctrlTypePayment.CardSettings.IsSelect = true;
                    ctrlTypePayment.OnSelect = $.proxy(self.selectClient, self);
                }
            });
        }

        private selectClient(controller: Interfaces.IControllerCard) {
            let client: Interfaces.Model.IClientModel = controller.getSelectedRecord() as Interfaces.Model.IClientModel;
            if (client)
                this.Model.set("editModel.client", client);
            M.updateTextFields();
        }

        public ClearClientButtonClick: { (e: any): void; };
        private clearClientButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("editModel.client", {});
            M.updateTextFields();
            return false;
        }

        private isDisableSalepount: boolean = false;
        public get IsDisableSalepoint(): boolean {
            return this.isDisableSalepount;
        }

        public set IsDisableSalepoint(value: boolean) {
            this.isDisableSalepount = value;
        }

        public SalePointButtonClick: { (e: any): void; };
        private salePointButtonClick(e) {
            let self = this;
            if (self.isDisableSalepount === false)
                vars._app.OpenController({
                    urlController: 'setting/card/salepoint', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlTypePayment: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                        ctrlTypePayment.CardSettings.IsAdd = false;
                        ctrlTypePayment.CardSettings.IsAddCopy = false;
                        ctrlTypePayment.CardSettings.IsDelete = false;
                        ctrlTypePayment.CardSettings.IsEdit = false;
                        ctrlTypePayment.CardSettings.IsSelect = true;
                        ctrlTypePayment.OnSelect = $.proxy(self.selectSalePoint, self);
                    }
                });
        }

        private selectSalePoint(controller: Interfaces.IControllerCard) {
            let salepoint: Interfaces.Model.ISalepoint = controller.getSelectedRecord() as Interfaces.Model.ISalepoint;
            if (salepoint)
                this.Model.set("editModel.salepoint", salepoint);
            M.updateTextFields();
        }

        private typeCostIncome: number = 0;
        public get TypeCostIncome(): number {
            return this.typeCostIncome;
        }

        public set TypeCostIncome(value: number) {
            this.typeCostIncome = value;
        }

        public IncomeButtonClick: { (e: any): void; };
        private incomeButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/costincome', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlIncome: Interfaces.ICardCostIncome = controller as Interfaces.ICardCostIncome;
                    ctrlIncome.CardSettings.IsAdd = false;
                    ctrlIncome.CardSettings.IsAddCopy = false;
                    ctrlIncome.CardSettings.IsDelete = false;
                    ctrlIncome.CardSettings.IsEdit = false;
                    ctrlIncome.CardSettings.IsSelect = true;
                    ctrlIncome.TypeCostIncome = self.TypeCostIncome;
                    ctrlIncome.OnSelect = $.proxy(self.selectIncome, self);
                }
            });
        }

        private selectIncome(controller: Interfaces.IControllerCard) {
            let income: Interfaces.Model.ICostIncome = controller.getSelectedRecord() as Interfaces.Model.ICostIncome;
            if (income)
                this.Model.set("editModel.costincome", income);
            M.updateTextFields();
        }

        public ClearIncomeButtonClick: { (e: any): void; };
        private clearIncomeButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("editModel.costincome", {});
            M.updateTextFields();
            return false;
        }

        public CostButtonClick: { (e: any): void; };
        private costButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/cost', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlCost: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlCost.CardSettings.IsAdd = false;
                    ctrlCost.CardSettings.IsAddCopy = false;
                    ctrlCost.CardSettings.IsDelete = false;
                    ctrlCost.CardSettings.IsEdit = false;
                    ctrlCost.CardSettings.IsSelect = true;
                    ctrlCost.OnSelect = $.proxy(self.selectCost, self);
                }
            });
        }

        private selectCost(controller: Interfaces.IControllerCard) {
            let cost: Interfaces.Model.ICostIncome = controller.getSelectedRecord() as Interfaces.Model.ICostIncome;
            if (cost)
                this.Model.set("editModel.costincome", cost);
            M.updateTextFields();
        }

        public ClearCostButtonClick: { (e: any): void; };
        private clearCostButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("editModel.costincome", {});
            M.updateTextFields();
            return false;
        }

        public AccountButtonClick: { (e: any): void; };
        private accountButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/account', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlAccount: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlAccount.CardSettings.IsAdd = false;
                    ctrlAccount.CardSettings.IsAddCopy = false;
                    ctrlAccount.CardSettings.IsDelete = false;
                    ctrlAccount.CardSettings.IsEdit = false;
                    ctrlAccount.CardSettings.IsSelect = true;
                    ctrlAccount.OnSelect = $.proxy(self.selectAccount, self);
                }
            });
        }

        private selectAccount(controller: Interfaces.IControllerCard) {
            let account: Interfaces.Model.IAccount = controller.getSelectedRecord() as Interfaces.Model.IAccount;
            if (account)
                this.Model.set("editModel.account", account);
            M.updateTextFields();
        }

        public ClearAccountButtonClick: { (e: any): void; };
        private clearAccountButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("editModel.account", {});
            M.updateTextFields();
            return false;
        }

        private isUpdateSum: boolean = false;
        private changeModel(e: any): void {
            if (e.field === "paymentConduct") {
                let conduct: boolean = this.Model.get("paymentConduct");
                let options: number = this.Model.get("editModel.options");
                if (conduct) {
                    if ((options & 1) !== 1) {
                        options = options + 1;
                        this.Model.set("editModel.options", options);
                    }
                }
                else {
                    if ((options & 1) === 1) {
                        options = options - 1;
                        this.Model.set("editModel.options", options);
                    }
                }
            }
            else if (e.field === "totalSumText") {
                if (this.isUpdateSum == false) {
                    let sumResult: number = +this.Model.get("totalSumText");
                    if (sumResult && sumResult > 0) {
                        this.Model.set("editModel.sum", sumResult);
                        this.isUpdateSum = true;
                        this.Model.set("totalSumText", utils.numberToString(sumResult, 2));
                        this.isUpdateSum = false;
                    }
                    else {
                        this.isUpdateSum = true;
                        this.Model.set("totalSumText", utils.numberToString(this.Model.get("editModel.sum"), 2));
                        this.isUpdateSum = false;
                    }

                }
            }
            else if (e.field === "editModel.ptype") {
                let type: number = this.Model.get("editModel.ptype");
                if (type == 3) {
                    this.optionPaymentRow.removeClass("hide");
                } else {
                    this.optionPaymentRow.addClass("hide");
                }
            }
        }

    }
}
