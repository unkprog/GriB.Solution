﻿import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');
import svcSetting = require('app/services/settingsservice');
import vars = require('app/common/variables');

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
                "editModel": {},
                "conduct": true,
                "labelConduct": vars._statres("label$conduct"),
                "labelDate": vars._statres("label$date"),
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelName": vars._statres("label$name"),
                "labelQuantityShort": vars._statres("label$quantityshort"),
                "labelUnitShort": vars._statres("label$unitshort"),
                "labelSum": vars._statres("label$sum"),
                "labelAdd": vars._statres("button$label$add")
            });
            return oo;
        }

        public get EditorModel(): Interfaces.Model.IDocumentModel {
            return this.Model.get("editModel").toJSON();
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


            return result;
        }

        protected dateControl: JQuery;
        protected salePointControl: JQuery;
        private positionRows: JQuery;
        private btnAddPosition: JQuery;
        private btnRemovePosition: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.dateControl = view.find("#document-view-date");
            this.dateControl.datepicker();

            this.salePointControl = view.find("#document-view-salepoint-row");
            this.positionRows = view.find("#product-position-rows");
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
            this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);

            this.Model.bind("change", $.proxy(this.changeModel, this));
       }

        protected destroyEvents(): void {
            this.Model.unbind("change");
            if (this.btnAddPosition)
                this.destroyTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);
            if (this.btnRemovePosition)
                this.destroyTouchClickEvent(this.btnRemovePosition, this.removePositionButtonClick);

            this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
            super.destroyEvents();
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
          
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.setupPositions();
        }

        private changeModel(e: any): void {
        }

        private setupPositions() {
          
            let self = this;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;
            let data: Interfaces.Model.IDocumentModelPosition[] = model.positions;
            let html: string = '';

            if (this.btnAddPosition)
                this.destroyTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);

            this.positionRows.unbind();
            if (data && data.length > 0) {
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    data[i].sum = Math.round((data[i].quantity * data[i].product.sellingprice) * 100) / 100;

                    html += '<tr data-index="' + i + '">';
                    html += '<td class="product-col-name" data-bind="text:editModel.positions[' + i + '].product.name"></td>';
                    html += '<td class="product-col-quantity"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].quantity"/></td>';
                    html += '<td class="product-col-unit" data-bind="text:editModel.positions[' + i + '].product.unit_name"></td>';
                    html += '<td class="product-col-sum hide-on-small-only" data-bind="text:editModel.positions[' + i + '].sum"></td>';
                    html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">close</i></a></td>';
                    html += '</tr>';
                }
            }

            html += '<tr>';
            html += '<td><a id="btn-add-position" class="btn btncol"><span data-bind="text:labelAdd"></span></a></td>';
            html += '</tr>';
            this.positionRows.html(html);

            self.Model.set("editModel", model);

            this.btnAddPosition = this.positionRows.find("#btn-add-composition");
            this.btnRemovePosition = this.positionRows.find(".editor-header-button");
            this.AddPositionButtonClick = this.createTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);
            this.RemovePositionButtonClick = this.createTouchClickEvent(this.btnRemovePosition, this.removePositionButtonClick);
            kendo.bind(this.positionRows, this.Model);

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

        public AddPositionButtonClick: { (e: any): void; };
        private addPositionButtonClick(e) {
            let self = this;

            vars._app.OpenController({
                urlController: 'setting/card/product', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlProduct: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlProduct.CardSettings.IsAdd = false;
                    ctrlProduct.CardSettings.IsEdit = false;
                    ctrlProduct.CardSettings.IsDelete = false;
                    ctrlProduct.CardSettings.IsSelect = true;
                    ctrlProduct.OnSelect = $.proxy(self.selectPosition, self);
                }
            });
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
            self.SettingService.GetProductNewComposition(+id, (responseData) => {
                model.positions.push(responseData.newcomposition);
                self.Model.set("editModel", model);
                self.setupPositions();
            });
        }
    }
}