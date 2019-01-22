import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');
import svcSetting = require('app/services/settingsservice');
import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Document.Editor {
    export class Editor extends base.Controller.BaseEditor {
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
            return { Url: "/Content/view/document/editor/document.html", Id: "document-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let oo: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": this.Header,
                "labelDocument": "",
                "editModel": {},
                "labelConduct": vars._statres("label$conduct"),
                "labelDate": vars._statres("label$date"),
                "labelProvider": vars._statres("label$provider"),
                "labelStock": vars._statres("label$stock"),
                "labelReason": vars._statres("label$reason"),
                "labelName": vars._statres("label$name"),
                "labelQuantityShort": vars._statres("label$quantityshort"),
                "labelUnitShort": vars._statres("label$unitshort"),
                "labelPrice": vars._statres("label$price"),
                "labelSum": vars._statres("label$sum"),
                "labelAdd": vars._statres("button$label$add"),
                "labelComment": vars._statres("label$comment"),
                "documentConduct": true,
                "totalSum": 0,
                "totalSumText": "0.00",
            });
            return oo;
        }

        protected get DocType(): number {
            return 0;
        }
        public get EditorModel(): Interfaces.Model.IDocumentModel {
            let model: Interfaces.Model.IDocumentModel = this.Model.get("editModel").toJSON();
            model.doctype = this.DocType;
            return model;
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetDocument, this.Service), Save: $.proxy(this.Service.SetDocument, this.Service) };
        }

        public get EditIdName(): string {
            return "";
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;

            if (!model.positions || model.positions.length < 1) {
                M.toast({ html: vars._statres("msg$error$documentpositionsnotfilled") });
                result = false;
            }
            
            return result;
        }

        protected dateControl: JQuery;
        protected salePointControl: JQuery;
        protected contractorControl: JQuery;
        protected reasonControl: JQuery;
        private positionRows: JQuery;
        private commentControl: JQuery;

        private btnAddPosition: JQuery;
        private btnRemovePosition: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.dateControl = view.find("#document-view-date");
            this.dateControl.datepicker({ format: "dd.mm.yyyy" });

            this.salePointControl = view.find("#document-view-salepoint-row");
            this.contractorControl = view.find("#document-view-contractor-row");
            this.reasonControl = view.find("#document-view-reason-row");
            this.positionRows = view.find("#product-position-rows");
            this.commentControl = view.find("#document-view-comment-row");

            view.find("#document-view-comment").characterCounter();
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            M.textareaAutoResize($("#document-view-comment"));
            return super.ViewShow(e);
        }

        protected showContractor(isShow: boolean): void {
            if (isShow) {
                this.contractorControl.removeClass("hide");
            }
            else {
                if (!this.contractorControl.hasClass("hide"))
                    this.contractorControl.addClass("hide");
            }
        }

        protected showReason(isShow: boolean): void {
            if (isShow) {
                this.reasonControl.removeClass("hide");
            }
            else {
                if (!this.reasonControl.hasClass("hide"))
                    this.reasonControl.addClass("hide");
            }
        }

        protected showComment(isShow: boolean): void {
            if (isShow) {
                this.commentControl.removeClass("hide");
            }
            else {
                if (!this.commentControl.hasClass("hide"))
                    this.commentControl.addClass("hide");
            }
        }

        protected createEvents(): void {
            super.createEvents();
            this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);
            this.ContractorButtonClick = this.createTouchClickEvent(this.contractorControl, this.contractorButtonClick);
            this.ReasonButtonClick = this.createTouchClickEvent(this.reasonControl, this.reasonButtonClick);

            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        protected destroyEvents(): void {
            this.Model.unbind("change");
            if (this.btnAddPosition)
                this.destroyTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);
            if (this.btnRemovePosition)
                this.destroyTouchClickEvent(this.btnRemovePosition, this.removePositionButtonClick);

            this.destroyTouchClickEvent(this.contractorControl, this.ContractorButtonClick);
            this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
            super.destroyEvents();
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);

        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            let dateTime: Date = new Date(responseData.record.date);
            this.dateControl.val(utils.date_ddmmyyyy(dateTime));
            M.Datepicker.getInstance(this.dateControl[0]).setDate(dateTime, true);
            this.Model.set("documentConduct", ((responseData.record.option & 1) === 1));
            this.setupPositions();
        }


        private setupPositions() {

            let self = this;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;
            let data: Interfaces.Model.IDocumentModelPosition[] = model.positions;
            let html: string = '';

            if (this.btnAddPosition)
                this.destroyTouchClickEvent(this.btnAddPosition, this.AddPositionButtonClick);

            this.positionRows.unbind();
            if (data && data.length > 0) {
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    data[i].sum = Math.round((data[i].quantity * data[i].price) * 100) / 100;

                    html += '<tr data-index="' + i + '">';
                    html += '<td class="product-col-name" data-bind="text:editModel.positions[' + i + '].product.name"></td>';
                    html += '<td class="product-col-quantity"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].quantity"/></td>';
                    html += '<td class="product-col-unit" data-bind="text:editModel.positions[' + i + '].product.unit_name"></td>';
                    html += '<td class="product-col-price"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].price"/></td>';
                    html += '<td class="product-col-sum"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].sum"/></td>';
                    html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">close</i></a></td>';
                    html += '</tr>';
                }
            }

            html += '<tr>';
            html += '<td><a id="btn-add-position" class="btn btncol"><span data-bind="text:labelAdd"></span></a></td>';
            html += '</tr>';
            this.positionRows.html(html);

            self.Model.set("editModel", model);
            self.Model.set("totalSum", self.calsTotalSum());

            this.btnAddPosition = this.positionRows.find("#btn-add-position");
            this.btnRemovePosition = this.positionRows.find(".product-col-button-delete");
            this.AddPositionButtonClick = this.createTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);
            this.RemovePositionButtonClick = this.createTouchClickEvent(this.btnRemovePosition, this.removePositionButtonClick);
            kendo.bind(this.positionRows, this.Model);

        }

        private calsTotalSum(): number {
            let result: number = 0;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;
            let data: Interfaces.Model.IDocumentModelPosition[] = model.positions;
            if (data && data.length > 0) {
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    result += data[i].sum;
                }
            }
            return result;
        }

        public ContractorButtonClick: { (e: any): void; };
        private contractorButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/contractor', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlTypePayment: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlTypePayment.CardSettings.IsAdd = false;
                    ctrlTypePayment.CardSettings.IsAddCopy = false;
                    ctrlTypePayment.CardSettings.IsDelete = false;
                    ctrlTypePayment.CardSettings.IsEdit = false;
                    ctrlTypePayment.CardSettings.IsSelect = true;
                    ctrlTypePayment.OnSelect = $.proxy(self.selectContractor, self);
                }
            });
        }

        private selectContractor(controller: Interfaces.IControllerCard) {
            let contractor: Interfaces.Model.IContractor = controller.getSelectedRecord() as Interfaces.Model.IContractor;
            if (contractor)
                this.Model.set("editModel.contractor", contractor);
            M.updateTextFields();
        }

        public SalePointButtonClick: { (e: any): void; };
        private salePointButtonClick(e) {
            let self = this;
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

        public ReasonButtonClick: { (e: any): void; };
        private reasonButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/reason', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlReason: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlReason.CardSettings.IsAdd = false;
                    ctrlReason.CardSettings.IsAddCopy = false;
                    ctrlReason.CardSettings.IsDelete = false;
                    ctrlReason.CardSettings.IsEdit = false;
                    ctrlReason.CardSettings.IsSelect = true;
                    ctrlReason.OnSelect = $.proxy(self.selectReason, self);
                }
            });
        }

        private selectReason(controller: Interfaces.IControllerCard) {
            let reason: Interfaces.Model.IContractor = controller.getSelectedRecord() as Interfaces.Model.IReason;
            if (reason)
                this.Model.set("editModel.reason", reason);
            M.updateTextFields();
        }

        public AddPositionButtonClick: { (e: any): void; };
        private addPositionButtonClick(e) {
            let self = this;
            let salepoint: Interfaces.Model.ISalepoint = this.Model.get("editModel.salepoint") as Interfaces.Model.ISalepoint;
            if (salepoint) {
                vars._app.OpenController({
                    urlController: 'setting/card/product', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlProduct: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                        ctrlProduct.CardSettings.IsAdd = false;
                        ctrlProduct.CardSettings.IsAddCopy = false;
                        ctrlProduct.CardSettings.IsEdit = false;
                        ctrlProduct.CardSettings.IsDelete = false;
                        ctrlProduct.CardSettings.IsSelect = true;
                        ctrlProduct.OnSelect = $.proxy(self.selectPosition, self);
                    }
                });
            }
            else {
                M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
            }
        }

        public RemovePositionButtonClick: { (e: any): void; };
        private removePositionButtonClick(e) {
            let self = this;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;
            let index: number = +$(e.currentTarget).parent().parent().data("index");
            model.positions.splice(index, 1);
            self.Model.set("editModel", model);
            self.setupPositions();
        }

        private selectPosition(controller: Interfaces.IControllerCard) {
            let id: any = controller.getSelectedRowId();
            let self = this;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;
            // TODO: Прикрутить фильтр по доступу по торговой точке
            let salepoint: number = 0;
            self.Service.GetDocumentNewPosition(+id, salepoint, (responseData) => {
                model.positions.push(responseData.newposition);
                self.Model.set("editModel", model);
                self.setupPositions();
            });
        }

        private getPosIndex(field: string, fieldReplace: string): number {
            let sindex: string = field.replace("editModel.positions[", "").replace(("]." + fieldReplace), "");
            let result: number = +sindex;
            return result;
        }

        private changeModel(e: any): void {
            if (e.field.indexOf("editModel.positions[") > -1) {
                let doc: Interfaces.Model.IDocumentModel = this.EditorModel;
                if (e.field.lastIndexOf("].quantity") > -1) {
                    let index: number = this.getPosIndex(e.field, "quantity");
                    doc.positions[index].sum = Math.round((doc.positions[index].quantity * doc.positions[index].price) * 100) / 100;
                    this.Model.set("editModel", doc);
                }
                else if (e.field.lastIndexOf("].price") > -1) {
                    let index: number = this.getPosIndex(e.field, "price");
                    doc.positions[index].sum = Math.round((doc.positions[index].quantity * doc.positions[index].price) * 100) / 100;
                    this.Model.set("editModel", doc);
                }
                else if (e.field.lastIndexOf("].sum") > -1) {
                    let index: number = this.getPosIndex(e.field, "sum");
                    if (doc.positions[index].quantity > 0 && doc.positions[index].sum > 0) {
                        doc.positions[index].price = Math.round((doc.positions[index].sum / doc.positions[index].quantity) * 100) / 100;
                        this.Model.set("editModel", doc);
                    }
                }
                this.Model.set("totalSum", this.calsTotalSum());
            }
            else if (e.field === "documentConduct") {
                let conduct: boolean = this.Model.get("documentConduct");
                let options: number = this.Model.get("editModel.option");
                if (conduct) {
                    if ((options & 1) !== 1) {
                        options = options + 1;
                        this.Model.set("editModel.option", options);
                    }
                }
                else {
                    if ((options & 1) === 1) {
                        options = options - 1;
                        this.Model.set("editModel.option", options);
                    }
                }
            }
            else if (e.field === "totalSum") {
                this.Model.set("totalSumText", utils.numberToString(this.Model.get("totalSum"), 2));

            }
        }

    }
}