import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');

export namespace Controller.Document.Card {
    export class PaymentCardFilterSettings implements Interfaces.ICardFilterSettings {
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
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelClient": vars._statres("label$client"),
                "labelFind": vars._statres("label$find"),
                "salepoint": {},
                "client": {},
                "datefrom": undefined,
                "dateto": undefined
            });
            if (data) {
                result.set("salepoint", data.salepoint);
                result.set("client", data.salepoint);
                result.set("datefrom", utils.date_from_ddmmyyyy(data.datefrom));
                result.set("dateto", utils.date_from_ddmmyyyy(data.dateto));
            }
            return result;
        }

        public restoreFilter(): any{
            let result: any;
            let saved: any = window.localStorage.getItem(this.fieldSearch);
            if (!saved || saved === "\"{}\"") {
                let dateTime: string = utils.date_ddmmyyyy(this.getDefDate());
                result = { salepoint: {}, client: {}, datefrom: dateTime, dateto: dateTime };
            }
            else
                result = JSON.parse(saved);
            return result;
        }

        public saveFilter() {
            let _datefrom: Date = this._model.get("datefrom");
            let _dateto: Date = this._model.get("dateto");
            let dataToSave = { salepoint: this._model.get("salepoint"), client: this._model.get("client"), datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto) };
            let toSave: string = JSON.stringify(dataToSave);
            window.localStorage.setItem(this.fieldSearch, toSave);
        }

        private filterControl: JQuery;
        private dateFromControl: JQuery;
        private dateToControl: JQuery;
        private salePointControl: JQuery;
        private salePointClear: JQuery;
        private saleClientControl: JQuery;
        private saleClientClear: JQuery;
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
            filterHtml += '    <div id="card-filter-view-client-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
            filterHtml += '       <input id="card-filter-view-client" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: client.name">';
            filterHtml += '       <label for="card-filter-view-client" data-bind="text:labelClient"></label>';
            filterHtml += '       <i id="card-view-client-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
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
            controller.saleClientControl = this.filterControl.find("#card-filter-view-client-col");
            controller.saleClientClear = this.filterControl.find("#card-view-client-clear");
            
            controller.searchButton = controller.filterControl.find("#card-filter-view-btn-find");
            return controller.filterControl;
        }

        public createEvents(): void {
            kendo.bind(this.filterControl, this._model);
            if (this.searchButton) this.SearchButtonClick = utils.createTouchClickEvent(this.searchButton, this.searchButtonClick, this);
            if (this.saleClientControl) this.ClientButtonClick = utils.createTouchClickEvent(this.saleClientControl, this.clientButtonClick, this);
            if (this.saleClientClear) this.ClearClientButtonClick = utils.createTouchClickEvent(this.saleClientClear, this.clearClientButtonClick, this);
            if (this.salePointControl) this.SalePointButtonClick = utils.createTouchClickEvent(this.salePointControl, this.salePointButtonClick, this);
            if (this.salePointClear) this.ClearSalePointButtonClick = utils.createTouchClickEvent(this.salePointClear, this.clearSalePointButtonClick, this);
        }

        public destroyEvents(): void {
            this.saveFilter();
            this.filterControl.unbind();
            if (this.saleClientClear) utils.destroyTouchClickEvent(this.saleClientClear, this.ClearClientButtonClick);
            if (this.saleClientControl) utils.destroyTouchClickEvent(this.saleClientControl, this.ClearClientButtonClick);
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

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e) {
            let self = this;
            self.saveFilter();

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
                this._model.set("client", client);
            M.updateTextFields();
        }

        public ClearClientButtonClick: { (e: any): void; };
        private clearClientButtonClick(e: any) {
            e.preventDefault();
            e.stopPropagation();
            this._model.set("client", {});
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

    export class Payment extends base.Controller.BaseCard {
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
            return new PaymentCardFilterSettings($.proxy(this.loadData, this), this.FilterId);
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
                { Header: "", HeaderStyle: "doc-col-conduct", Field: "options", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((options & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                { Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" },
                { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                { Header: vars._statres("label$client"), Field: "client.name" },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
            ];
        }

        protected get EditIdName(): string {
            return "id_payment";
        }

        protected get EditController(): string {
            return "document/editor/payment";
        }

        protected get FilterId(): string {
            return "PaymentCardFilterSettings";
        }

        protected get SalePoint(): number {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let salepoint: Interfaces.Model.ISalepoint = (settings ? settings.Model.get("salepoint") : undefined);
            return (salepoint ? salepoint.id : 0);
        }

        protected get Client(): number {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let client: Interfaces.Model.IClientModel = (settings ? settings.Model.get("client") : undefined);
            return (client ? client.id : 0);
        }

        protected get DateFrom(): Date {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let date: Date = (settings ? settings.Model.get("datefrom") : undefined);
            return (date ? date : new Date(1899, 11, 30, 0, 0, 0, 0));
        }

        protected get DateTo(): Date {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let date: Date = (settings ? settings.Model.get("dateto") : undefined);
            return (date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) : new Date(1899, 11, 30, 0, 0, 0, 0));
        }

        private getDocs(Callback: (responseData: any) => void) {
            this.CardSettings.FilterSettings.saveFilter();
            let params: Interfaces.Model.IPaymentParams = { id: 0, salepoint: this.SalePoint, client: this.Client, type: 0, datefrom: this.DateFrom, dateto: this.DateTo }
            this.Service.GetPayments(params, (responseData: any) => {
                if (Callback)
                    Callback(responseData);
            });
        }

    }
}

vars.registerController("document/card/payment", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Payment(); });