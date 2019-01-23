import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');

export namespace Controller.Document.Card {
    export class DocumentCardFilterSettings implements Interfaces.ICardFilterSettings {
        constructor(setupRows: { (): void; }, fieldSearch:string) {
            this.fieldSearch = fieldSearch;
            this.setupRows = setupRows;
            this._model = this.createModel();
        }
       
        private setupRows: { (): void; };

        private fieldSearch: string;
        public get FieldSearch(): string {
            return this.fieldSearch;
        }
        public set FieldSearch(val: string) {
            this.fieldSearch = val;
        }

        private _model: kendo.data.ObservableObject;
        public get Model(): kendo.data.ObservableObject {
            return this._model;
        }

        private getDefDate(): Date {
            let dateTime: Date = new Date();
            dateTime.setHours(0, 0, 0, 0);// = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 0, 0, 0, 0);
            return dateTime;
        }

        protected createModel(): kendo.data.ObservableObject {
            let data: any = this.restoreFilter();
           
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "labelDateFrom": vars._statres("label$date$from"),
                "labelDateTo": vars._statres("label$date$to"),
                "labelSalepoint": vars._statres("label$stock"),
                "labelSalepointTo": vars._statres("label$stock$to"),
                "labelContractor": vars._statres("label$contractor"),
                "labelReason": vars._statres("label$reason"),
                "labelFind": vars._statres("label$find"),
                "salepoint": {},
                "salepointto": {},
                "contractor": {},
                "reason": {},
                "datefrom": undefined,
                "dateto": undefined
            });
            if (data) {
                result.set("salepoint", data.salepoint);
                result.set("salepointto", data.salepointto);
                result.set("contractor", data.contractor);
                result.set("reason", data.reason);
                result.set("datefrom", utils.date_from_ddmmyyyy(data.datefrom));
                result.set("dateto", utils.date_from_ddmmyyyy(data.dateto));
            }
            return result;
        }

        public restoreFilter(): any{
            let result: any;
            //localStorage.clear();
            let saved: any = window.localStorage.getItem(this.fieldSearch);
            if (!saved || saved === "\"{}\"") {
                let dateTime: string = utils.date_ddmmyyyy(this.getDefDate());
                result = { salepoint: {}, salepointto: {}, contractor: {}, reason: {}, datefrom: dateTime, dateto: dateTime };
            }
            else
                result = JSON.parse(saved);
            return result;
        }

        public saveFilter() {
            let _datefrom: Date = this._model.get("datefrom");
            let _dateto: Date = this._model.get("dateto");
            let dataToSave = { salepoint: this._model.get("salepoint"), salepointto: this._model.get("salepointto"), contractor: this._model.get("contractor"), reason: this._model.get("reason"), datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto) };
            let toSave: string = JSON.stringify(dataToSave);
            window.localStorage.setItem(this.fieldSearch, toSave);
        }

        private filterControl: JQuery;
        private dateFromControl: JQuery;
        private dateToControl: JQuery;
        private salePointControl: JQuery;
        private salePointClear: JQuery;
        private salePointToControl: JQuery;
        private salePointToClear: JQuery;
        private contractorControl: JQuery;
        private contractorClear: JQuery;
        private reasonControl: JQuery;
        private reasonClear: JQuery;
        private searchButton: JQuery;
        
        public InitControls(): JQuery {
            let controller = this;
            let filterHtml: string = '';
            filterHtml += '<div class="row row-inputs">';
            filterHtml += '    <div class="input-field col s6 m4 l3 xl2">';
            filterHtml += '       <input id="card-filter-view-date-start" type="text" class="datepicker">';
            filterHtml += '       <label for="card-filter-view-date-start" data-bind="text:labelDateFrom"></label>';
            filterHtml += '    </div>';
            filterHtml += '    <div class="input-field col s6 m4 l3 xl2">';
            filterHtml += '       <input id="card-filter-view-date-end" type="text" class="datepicker">';
            filterHtml += '       <label for="card-filter-view-date-end" data-bind="text:labelDateTo"></label>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-salepoint-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
            filterHtml += '       <input id="card-filter-view-salepoint" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: salepoint.name">';
            filterHtml += '       <label for="card-filter-view-salepoint" data-bind="text:labelSalepoint"></label>'; 
            filterHtml += '       <i id="card-view-salepoint-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-salepointto-col" class="input-field col s12 m6 l6 xl4 col-input-numpad hide">';
            filterHtml += '       <input id="card-filter-view-salepointto" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: salepointto.name">';
            filterHtml += '       <label for="card-filter-view-salepointto" data-bind="text:labelSalepoint"></label>';
            filterHtml += '       <i id="card-view-salepointto-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-contractor-col" class="input-field col s12 m6 l6 xl4 col-input-numpad hide">';
            filterHtml += '       <input id="card-filter-view-contractor" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: contractor.name">';
            filterHtml += '       <label for="card-filter-view-contractor" data-bind="text:labelContractor"></label>'; 
            filterHtml += '       <i id="card-view-contractor-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-reason-col" class="input-field col s12 m6 l6 xl4 col-input-numpad  hide">';
            filterHtml += '       <input id="card-filter-view-reason" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: reason.name">';
            filterHtml += '       <label for="card-filter-view-reason" data-bind="text:labelReason"></label>';
            filterHtml += '       <i id="card-view-reason-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '</div>';
            filterHtml += '<div class="row row-inputs">';
            filterHtml += '    <div class="input-field col s12 m12 l12 xl12 col-input-numpad" style="margin-top: 0;">';
            filterHtml += '        <a id="card-filter-view-btn-find" class="btn btncol"  data-bind="text:labelFind"></a>'; // data-bind="text:labelDate"
            filterHtml += '    </div>';
            filterHtml += '</div>';
            filterHtml += '';
            controller.filterControl = $(filterHtml);
            controller.dateFromControl = controller.filterControl.find("#card-filter-view-date-start");
            controller.dateFromControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller._model.set("datefrom", newDate);
                }
            });
            controller.dateToControl = controller.filterControl.find("#card-filter-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller._model.set("dateto", newDate);
                }
            });

            controller.dateFromControl.val(utils.date_ddmmyyyy(controller._model.get("datefrom")));
            controller.dateToControl.val(utils.date_ddmmyyyy(controller._model.get("dateto")));


            controller.salePointControl = this.filterControl.find("#card-filter-view-salepoint-col");
            controller.salePointClear = this.filterControl.find("#card-view-salepoint-clear");
            controller.salePointToControl = this.filterControl.find("#card-filter-view-salepointto-col");
            controller.salePointToClear = this.filterControl.find("#card-view-salepointto-clear");
            controller.contractorControl = this.filterControl.find("#card-filter-view-contractor-col");
            controller.contractorClear = this.filterControl.find("#card-view-contractor-clear");
            controller.reasonControl = this.filterControl.find("#card-filter-view-reason-col");
            controller.reasonClear = this.filterControl.find("#card-view-reason-clear");
            
            controller.searchButton = controller.filterControl.find("#card-filter-view-btn-find");
            return controller.filterControl;
        }

        public showSalePointTo(isShow: boolean) {
            if (isShow) {
                this.salePointToControl.removeClass("hide");
                this.salePointToClear.removeClass("hide")
            }
            else {
                if (!this.salePointToControl.hasClass("hide")) this.salePointToControl.addClass("hide");
                if (!this.salePointToClear.hasClass("hide")) this.salePointToClear.addClass("hide");
            }
        }

        public showContractor(isShow: boolean) {
            if (isShow) {
                this.contractorControl.removeClass("hide");
                this.contractorClear.removeClass("hide")
            }
            else {
                if (!this.contractorControl.hasClass("hide")) this.contractorControl.addClass("hide");
                if (!this.contractorClear.hasClass("hide")) this.contractorClear.addClass("hide");
            }
        }

        public showReason(isShow: boolean) {
            if (isShow) {
                this.reasonControl.removeClass("hide");
                this.reasonClear.removeClass("hide")
            }
            else {
                if (!this.reasonControl.hasClass("hide")) this.reasonControl.addClass("hide");
                if (!this.reasonClear.hasClass("hide")) this.reasonClear.addClass("hide");
            }
        }

        public createEvents(): void {
            kendo.bind(this.filterControl, this._model);
            if (this.searchButton) this.SearchButtonClick = utils.createTouchClickEvent(this.searchButton, this.searchButtonClick, this);
            if (this.salePointControl) this.SalePointButtonClick = utils.createTouchClickEvent(this.salePointControl, this.salePointButtonClick, this);
            if (this.salePointClear) this.ClearSalePointButtonClick = utils.createTouchClickEvent(this.salePointClear, this.clearSalePointButtonClick, this);
            if (this.salePointToControl) this.SalePointToButtonClick = utils.createTouchClickEvent(this.salePointToControl, this.salePointToButtonClick, this);
            if (this.salePointToClear) this.ClearSalePointToButtonClick = utils.createTouchClickEvent(this.salePointToClear, this.clearSalePointToButtonClick, this);
            if (this.contractorControl) this.ContractorButtonClick = utils.createTouchClickEvent(this.contractorControl, this.contractorButtonClick, this);
            if (this.contractorClear) this.ClearContractorButtonClick = utils.createTouchClickEvent(this.contractorClear, this.clearContractorButtonClick, this);
            if (this.reasonControl) this.ReasonButtonClick = utils.createTouchClickEvent(this.reasonControl, this.reasonButtonClick, this);
            if (this.reasonClear) this.ClearReasonButtonClick = utils.createTouchClickEvent(this.reasonClear, this.clearReasonButtonClick, this);
        }

        public destroyEvents(): void {
            this.saveFilter();
            this.filterControl.unbind();
            if (this.reasonClear) utils.destroyTouchClickEvent(this.reasonClear, this.ClearReasonButtonClick);
            if (this.reasonControl) utils.destroyTouchClickEvent(this.reasonControl, this.ReasonButtonClick);
            if (this.contractorClear) utils.destroyTouchClickEvent(this.contractorClear, this.ClearContractorButtonClick);
            if (this.contractorControl) utils.destroyTouchClickEvent(this.contractorControl, this.ContractorButtonClick);
            if (this.salePointToClear) utils.destroyTouchClickEvent(this.salePointToClear, this.ClearSalePointToButtonClick);
            if (this.salePointToControl) utils.destroyTouchClickEvent(this.salePointToControl, this.SalePointToButtonClick);
            if (this.salePointClear) utils.destroyTouchClickEvent(this.salePointClear, this.ClearSalePointButtonClick);
            if (this.salePointControl) utils.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
            if (this.searchButton) utils.destroyTouchClickEvent(this.searchButton, this.SearchButtonClick);
        }

        public SalePointButtonClick: { (e: any): void; };
        private salePointButtonClick(e) {
            let self = this;
            self.saveFilter();

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
                this._model.set("salepoint", salepoint);
            M.updateTextFields();
        }

        public ClearSalePointButtonClick: { (e: any): void; };
        private clearSalePointButtonClick(e: any) {
            e.preventDefault();
            e.stopPropagation();
            this._model.set("salepoint", {});
            M.updateTextFields();
            return false;
        }

        public SalePointToButtonClick: { (e: any): void; };
        private salePointToButtonClick(e) {
            let self = this;
            self.saveFilter();

            vars._app.OpenController({
                urlController: 'setting/card/salepoint', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlTypePayment: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlTypePayment.CardSettings.IsAdd = false;
                    ctrlTypePayment.CardSettings.IsAddCopy = false;
                    ctrlTypePayment.CardSettings.IsDelete = false;
                    ctrlTypePayment.CardSettings.IsEdit = false;
                    ctrlTypePayment.CardSettings.IsSelect = true;
                    ctrlTypePayment.OnSelect = $.proxy(self.selectSalePointTo, self);
                }
            });
        }

        private selectSalePointTo(controller: Interfaces.IControllerCard) {
            let salepoint: Interfaces.Model.ISalepoint = controller.getSelectedRecord() as Interfaces.Model.ISalepoint;
            if (salepoint)
                this._model.set("salepointto", salepoint);
            M.updateTextFields();
        }

        public ClearSalePointToButtonClick: { (e: any): void; };
        private clearSalePointToButtonClick(e: any) {
            e.preventDefault();
            e.stopPropagation();
            this._model.set("salepointto", {});
            M.updateTextFields();
            return false;
        }

        public ContractorButtonClick: { (e: any): void; };
        private contractorButtonClick(e) {
            let self = this;
            self.saveFilter();

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
                this._model.set("contractor", contractor);
            M.updateTextFields();
        }

        public ClearContractorButtonClick: { (e: any): void; };
        private clearContractorButtonClick(e: any) {
            e.preventDefault();
            e.stopPropagation();
            this._model.set("contractor", {});
            M.updateTextFields();
            return false;
        }

        public ReasonButtonClick: { (e: any): void; };
        private reasonButtonClick(e) {
            let self = this;
            self.saveFilter();

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
            let reason: Interfaces.Model.IReason = controller.getSelectedRecord() as Interfaces.Model.IReason;
            if (reason)
                this._model.set("reason", reason);
            M.updateTextFields();
        }

        public ClearReasonButtonClick: { (e: any): void; };
        private clearReasonButtonClick(e: any) {
            e.preventDefault();
            e.stopPropagation();
            this._model.set("reason", {});
            M.updateTextFields();
            return false;
        }

        public SearchButtonClick: { (e: any): void; };
        private searchButtonClick(e: any) {
            e.preventDefault();
            if (this.setupRows)
                this.setupRows();
            return false;
        }


        public GetItemsForView(data: Interfaces.Model.IEditorModel[]): Interfaces.Model.IEditorModel[] {
            let result: Interfaces.Model.IEditorModel[] = data; //[];
            return result;
        }
    }

    export class Card extends base.Controller.BaseCard {
        constructor() {
            super();
        }

        private documentService: svc.Services.DocumentService;
        protected get Service(): svc.Services.DocumentService {
            if (!this.documentService)
                this.documentService = new svc.Services.DocumentService();
            return this.documentService;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/document/card/card.html", Id: "card-view" };
        }

        protected createCardFilterSettings(): Interfaces.ICardFilterSettings {
            return new DocumentCardFilterSettings($.proxy(this.loadData, this), this.FilterId);
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: this.EditIdName, EditController: this.EditController,
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.getDocs, this), Delete: $.proxy(this.Service.DelDocument, this.Service),
                Columns: this.Columns
            };
        }

        protected get Columns(): Interfaces.ICardColumn[] {
            return this.columns();
        }

        protected columns(): Interfaces.ICardColumn[] {
            return [
                { Header: "", HeaderStyle: "doc-col-conduct", Field: "option", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((option & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                { Header: vars._statres("label$date"), Field: "date", FieldTemplate: "#=date_ddmmyyyy(new Date(date))#" },
                { Header: vars._statres("label$stock"), Field: "salepoint.name" },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto" },
            ];
        }

        protected get EditIdName(): string {
            return "";
        }

        protected get EditController(): string {
            return "";
        }

        protected get FilterId(): string {
            return "DocumentCardFilterSettings";
        }

        protected get DocType(): number {
            return 0;
        }


        protected get SalePoint(): number {
            let settings: DocumentCardFilterSettings = this.CardSettings.FilterSettings as DocumentCardFilterSettings;
            let salepoint: Interfaces.Model.ISalepoint = (settings ? settings.Model.get("salepoint") : undefined);
            return (salepoint ? salepoint.id : 0);
        }

        protected get SalePointTo(): number {
            let settings: DocumentCardFilterSettings = this.CardSettings.FilterSettings as DocumentCardFilterSettings;
            let salepointto: Interfaces.Model.ISalepoint = (settings ? settings.Model.get("salepointto") : undefined);
            return (salepointto ? salepointto.id : 0);
        }

        protected get Contractor(): number {
            let settings: DocumentCardFilterSettings = this.CardSettings.FilterSettings as DocumentCardFilterSettings;
            let contractor: Interfaces.Model.IContractor = (settings ? settings.Model.get("contractor") : undefined);
            return (contractor ? contractor.id : 0);
        }

        protected get Reason(): number {
            let settings: DocumentCardFilterSettings = this.CardSettings.FilterSettings as DocumentCardFilterSettings;
            let reason: Interfaces.Model.IContractor = (settings ? settings.Model.get("reason") : undefined);
            return (reason ? reason.id : 0);
        }

        protected get DateFrom(): Date {
            let settings: DocumentCardFilterSettings = this.CardSettings.FilterSettings as DocumentCardFilterSettings;
            let date: Date = (settings ? settings.Model.get("datefrom") : undefined);
            return (date ? date : new Date(1899, 11, 30, 0, 0, 0, 0));
        }

        protected get DateTo(): Date {
            let settings: DocumentCardFilterSettings = this.CardSettings.FilterSettings as DocumentCardFilterSettings;
            let date: Date = (settings ? settings.Model.get("dateto") : undefined);
            return (date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) : new Date(1899, 11, 30, 0, 0, 0, 0));
        }

        private getDocs(Callback: (responseData: any) => void) {
            this.CardSettings.FilterSettings.saveFilter();
            let params: Interfaces.Model.IDocumentParams = { id: 0, doctype: this.DocType, salepoint: this.SalePoint, salepointto: this.SalePointTo, contractor: this.Contractor, reason: this.Reason, datefrom: this.DateFrom, dateto: this.DateTo }
            this.Service.GetDocuments(params, (responseData: any) => {
                if (Callback)
                    Callback(responseData);
            });
        }

    }
}