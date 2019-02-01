import base = require('app/controller/document/editor/payment');
import vars = require('app/common/variables');

export namespace Controller.Document.Editor {
    export class PaymentWithdrawal extends base.Controller.Document.Editor.Payment {
        constructor() {
            super();
        }

        //public get EditorModel(): Interfaces.Model.IPayment {
        //    let model: Interfaces.Model.IPayment = this.Model.get("editModel").toJSON();
        //    return model;
        //}

        //protected createEditorSettings(): Interfaces.IEditorSettings {
        //    return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetPayment, this.Service), Save: $.proxy(this.Service.SetPayment, this.Service) };
        //}

        public get EditIdName(): string {
            return "id_paymentwithdrawal";
        }

        protected getSaveModel(): Interfaces.Model.IPayment {
            let model: Interfaces.Model.IPayment = super.getSaveModel() as Interfaces.Model.IPayment;
            if (model) {
                model.doctype = 30;
            }
            return model;
        }
        //protected validateStock(): boolean {
        //    let result: boolean = true;
        //    let model: Interfaces.Model.IPayment = this.EditorModel;
        //    if ((model.options & 1) === 1) {
        //        if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
        //            M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
        //            result = false;
        //        }
        //    }
        //    return result;
        //}

        //protected validate(): boolean {
        //    let result: boolean = this.validateStock();
        //    let model: Interfaces.Model.IPayment = this.EditorModel;

        //    if ((model.options & 1) === 1) {

        //        if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
        //            M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
        //            result = false;
        //        }

        //        if (model.comment.length > 510) {
        //            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$comment"), 510) });
        //            result = false;
        //        }
        //    }
        //    return result;
        //}

        //protected dateControl: JQuery;
        //protected salePointControl: JQuery;
        //protected clientControl: JQuery;
        //private clientClearControl: JQuery;
        //private methodPayment: JQuery;
        //private commentControl: JQuery;

        //protected get DocFormatDate(): string {
        //    return "dd.mm.yyyy";
        //}

        //public ViewInit(view: JQuery): boolean {
        //    this.dateControl = view.find("#payment-view-date");
        //    this.dateControl.datepicker({ format: this.DocFormatDate });

        //    this.salePointControl = view.find("#payment-view-salepoint-row");
        //    this.clientControl = view.find("#payment-view-client-row");
        //    this.clientClearControl = view.find("#payment-view-client-clear");

        //    this.methodPayment = view.find("#payment-view-payment-type");

        //    this.commentControl = view.find("#payment-view-comment-row");

        //    view.find("#payment-view-comment").characterCounter();

        //    if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === false) {
        //        this.dateControl.attr('disabled', 'disabled'); 
        //        view.find("#payment-view-comment").attr('disabled', 'disabled'); 
        //        view.find("#payment-view-conduct").attr('disabled', 'disabled'); 
        //    }
        //    return super.ViewInit(view);
        //}

        //public ViewShow(e: any): boolean {
        //    this.methodPayment.formSelect();
        //    M.textareaAutoResize($("#payment-view-comment"));
        //    return super.ViewShow(e);
        //}

        //protected createEvents(): void {
        //    super.createEvents();
        //    if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
        //        this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);
        //        this.ClientButtonClick = this.createTouchClickEvent(this.clientControl, this.clientButtonClick);
        //        this.ClearClientButtonClick = this.createTouchClickEvent(this.clientClearControl, this.clearClientButtonClick);
        //    }
        //    this.Model.bind("change", $.proxy(this.changeModel, this));
        //}

        //protected destroyEvents(): void {
        //    this.Model.unbind("change");
        //    if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
        //        this.destroyTouchClickEvent(this.clientControl, this.ClientButtonClick);
        //        this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
        //    }
        //    super.destroyEvents();
        //}

        //public ViewResize(e: any): void {
        //    super.ViewResize(e);
        //    this.methodPayment.formSelect();

        //}

        //protected afterLoad(responseData?: any): void {
        //    super.afterLoad(responseData);
        //    let dateTime: Date = new Date(responseData.record.cd);
        //    this.dateControl.val(utils.date_ddmmyyyy(dateTime));
        //    M.Datepicker.getInstance(this.dateControl[0]).setDate(dateTime, true);
        //    this.Model.set("paymentConduct", ((responseData.record.options & 1) === 1));
        //    this.isUpdateSum = true;
        //    this.Model.set("totalSumText", utils.numberToString(responseData.record.sum, 2));
        //    this.isUpdateSum = false;
        //}

        //public ClientButtonClick: { (e: any): void; };
        //private clientButtonClick(e) {
        //    let self = this;
        //    vars._app.OpenController({
        //        urlController: 'setting/card/client', isModal: true, onLoadController: (controller: Interfaces.IController) => {
        //            let ctrlTypePayment: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
        //            ctrlTypePayment.CardSettings.IsAdd = false;
        //            ctrlTypePayment.CardSettings.IsAddCopy = false;
        //            ctrlTypePayment.CardSettings.IsDelete = false;
        //            ctrlTypePayment.CardSettings.IsEdit = false;
        //            ctrlTypePayment.CardSettings.IsSelect = true;
        //            ctrlTypePayment.OnSelect = $.proxy(self.selectClient, self);
        //        }
        //    });
        //}

        //private selectClient(controller: Interfaces.IControllerCard) {
        //    let client: Interfaces.Model.IClientModel = controller.getSelectedRecord() as Interfaces.Model.IClientModel;
        //    if (client)
        //        this.Model.set("editModel.client", client);
        //    M.updateTextFields();
        //}

        //public ClearClientButtonClick: { (e: any): void; };
        //private clearClientButtonClick(e) {
        //    e.preventDefault();
        //    e.stopPropagation();
        //    this.Model.set("editModel.client", {});
        //    M.updateTextFields();
        //    return false;
        //}

        //public SalePointButtonClick: { (e: any): void; };
        //private salePointButtonClick(e) {
        //    let self = this;
        //    vars._app.OpenController({
        //        urlController: 'setting/card/salepoint', isModal: true, onLoadController: (controller: Interfaces.IController) => {
        //            let ctrlTypePayment: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
        //            ctrlTypePayment.CardSettings.IsAdd = false;
        //            ctrlTypePayment.CardSettings.IsAddCopy = false;
        //            ctrlTypePayment.CardSettings.IsDelete = false;
        //            ctrlTypePayment.CardSettings.IsEdit = false;
        //            ctrlTypePayment.CardSettings.IsSelect = true;
        //            ctrlTypePayment.OnSelect = $.proxy(self.selectSalePoint, self);
        //        }
        //    });
        //}

        //private selectSalePoint(controller: Interfaces.IControllerCard) {
        //    let salepoint: Interfaces.Model.ISalepoint = controller.getSelectedRecord() as Interfaces.Model.ISalepoint;
        //    if (salepoint)
        //        this.Model.set("editModel.salepoint", salepoint);
        //    M.updateTextFields();
        //}

        //private isUpdateSum: boolean = false;
        //private changeModel(e: any): void {
        //    if (e.field === "paymentConduct") {
        //        let conduct: boolean = this.Model.get("paymentConduct");
        //        let options: number = this.Model.get("editModel.options");
        //        if (conduct) {
        //            if ((options & 1) !== 1) {
        //                options = options + 1;
        //                this.Model.set("editModel.options", options);
        //            }
        //        }
        //        else {
        //            if ((options & 1) === 1) {
        //                options = options - 1;
        //                this.Model.set("editModel.options", options);
        //            }
        //        }
        //    }
        //    else if (e.field === "totalSumText") {
        //        if (this.isUpdateSum == false) {
        //            let sumResult: number = +this.Model.get("totalSumText");
        //            if (sumResult && sumResult > 0) {
        //                this.Model.set("editModel.sum", sumResult);
        //                this.isUpdateSum = true;
        //                this.Model.set("totalSumText", utils.numberToString(sumResult, 2));
        //                this.isUpdateSum = false;
        //            }
        //            else {
        //                this.isUpdateSum = true;
        //                this.Model.set("totalSumText", utils.numberToString(this.Model.get("editModel.sum"), 2));
        //                this.isUpdateSum = false;
        //            }

        //        }
        //    }
        //}

    }
}

vars.registerController("document/editor/paymentwithdrawal", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.PaymentWithdrawal(); });