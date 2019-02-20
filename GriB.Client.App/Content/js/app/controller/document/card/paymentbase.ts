﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');

export namespace Controller.Document.Card {
    export class PaymentCardFilterSettings implements Interfaces.Control.ICardFilterSettings {
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

        protected createModel(): kendo.data.ObservableObject {
            let data: any = this.restoreFilter();
           
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "labelDateFrom": vars._statres("label$date$from"),
                "labelDateTo": vars._statres("label$date$to"),
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelEmployee": vars._statres("label$employee"),
                "labelClient": vars._statres("label$client"),
                "labelFind": vars._statres("label$find"),
                "labelCash": vars._statres("label$cash"),
                "labelNonCash": vars._statres("label$noncash"),
                "labelMethodPayment": vars._statres("label$methodpayment"),
                "labelWithOutPayment": vars._statres("label$withoutpayment"),
                "labelNotSelected": vars._statres("label$notselected"),
                "labelOnCredit": vars._statres("label$oncredit"),
                "labelOnTheHouse": vars._statres("label$onthehouse"),
                "labelClientLeft": vars._statres("label$clientleft"),
                "salepoint": {},
                "employee": {},
                "client": {},
                "type": 0,
                "optionValue": 0,
                "datefrom": '',
                "dateto": ''
            });
            //let payMethod: string = "#if (ptype === 1) {#" + vars._statres("label$cash") + "# } else if (ptype === 2) {#" + vars._statres("label$noncash") + "# } else if (ptype === 3) {#" + vars._statres("label$withoutpayment") + "#}#";
           
            if (data) {
                result.set("salepoint", data.salepoint);
                result.set("employee", data.employee);
                result.set("client", data.client);
                result.set("type", data.type);
                result.set("optionValue", data.type);
                result.set("datefrom", data.datefrom);
                result.set("dateto", data.dateto);
            }
            return result;
        }
    

        public restoreFilter(): any{
            let result: any;
            let saved: any = window.localStorage.getItem(this.fieldSearch);
            if (!saved || saved === "\"{}\"") {
                let dateTime: string = utils.date_ddmmyyyy(utils.dateToday());
                result = { salepoint: {}, employee: {}, client: {}, type: 0, option:0, datefrom: dateTime, dateto: dateTime };
            }
            else
                result = JSON.parse(saved);
            return result;
        }

        public saveFilter() {
            let dataToSave = { salepoint: this._model.get("salepoint"), employee: this._model.get("employee"), client: this._model.get("client"), type: this._model.get("type"), option: this._model.get("optionValue"), datefrom: this._model.get("datefrom"), dateto: this._model.get("dateto") };
            let toSave: string = JSON.stringify(dataToSave);
            window.localStorage.setItem(this.fieldSearch, toSave);
        }

        private filterControl: JQuery;
        private dateFromControl: JQuery;
        private dateToControl: JQuery;
        private salePointControl: JQuery;
        private salePointClear: JQuery;
        private employeeControl: JQuery;
        private employeeClear: JQuery;
        private saleClientControl: JQuery;
        private saleClientClear: JQuery;
        private typeControlRow: JQuery;
        private typeControl: JQuery;
        private typeWithoutControl: JQuery;
        private optionControlRow: JQuery;
        private optionControl: JQuery;
        private searchButton: JQuery;
        
        public InitControls(): JQuery {
            let controller = this;
            let filterHtml: string = '';
            filterHtml += '<div class="row row-inputs">';
            filterHtml += '    <div class="input-field col s12 m6 l6 xl4" style="margin-bottom: 0;">';
            filterHtml += '        <div class="row" style="margin-bottom: 0;">';
            filterHtml += '            <div class="input-field col s6 m6" style="margin-top: 0;margin-bottom: 0;">';
            filterHtml += '                 <input id="card-filter-view-date-start" type="text" class="datepicker">';
            filterHtml += '                 <label for="card-filter-view-date-start" data-bind="text:labelDateFrom"></label>';
            filterHtml += '            </div>';
            filterHtml += '            <div class="input-field col s6 m6" style="margin-top: 0;margin-bottom: 0;">';
            filterHtml += '                <input id="card-filter-view-date-end" type="text" class="datepicker">';
            filterHtml += '                <label for="card-filter-view-date-end" data-bind="text:labelDateTo"></label>';
            filterHtml += '            </div>';
            filterHtml += '        </div>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-salepoint-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
            filterHtml += '       <input id="card-filter-view-salepoint" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: salepoint.name">';
            filterHtml += '       <label for="card-filter-view-salepoint" data-bind="text:labelSalepoint"></label>'; 
            filterHtml += '       <i id="card-view-salepoint-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-employee-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
            filterHtml += '       <input id="card-filter-view-employee" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: employee.name">';
            filterHtml += '       <label for="card-filter-view-employee" data-bind="text:labelEmployee"></label>';
            filterHtml += '       <i id="card-view-employee-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-client-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
            filterHtml += '       <input id="card-filter-view-client" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: client.name">';
            filterHtml += '       <label for="card-filter-view-client" data-bind="text:labelClient"></label>';
            filterHtml += '       <i id="card-view-client-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-type-row" class="input-field col s6 m6 l6 xl4 col-input-numpad">';
            filterHtml += '        <select id="card-filter-view-type" class="validate" data-bind="value:type">';
            filterHtml += '            <option value="0" data-bind="text:labelNotSelected"></option>';
            filterHtml += '            <option value="1" data-bind="text:labelCash"></option>';
            filterHtml += '            <option value="2" data-bind="text:labelNonCash"></option>';
            filterHtml += '            <option id="payment-view-payment-type-without" value="3" data-bind="text:labelWithOutPayment"></option>';
            filterHtml += '        </select>';
            filterHtml += '        <label for="card-filter-view-type" data-bind="text:labelMethodPayment"></label>';
            filterHtml += '    </div>';
            filterHtml += '    <div id="card-filter-view-option-row" class="input-field col s6 m6 l6 xl4 col-input-numpad hide">';
            filterHtml += '        <select id="card-filter-view-option" class="validate" data-bind="value:optionValue">';
            filterHtml += '            <option value="0" data-bind="text:labelNotSelected"></option>';
            filterHtml += '            <option value="1" data-bind="text:labelOnCredit"></option>';
            filterHtml += '            <option value="2" data-bind="text:labelOnTheHouse"></option>';
            filterHtml += '            <option value="3" data-bind="text:labelClientLeft"></option>';
            filterHtml += '        </select>';
            filterHtml += '        <label for="card-filter-view-option" data-bind="text:labelWithOutPayment"></label>';
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
                    controller._model.set("datefrom", utils.date_ddmmyyyy(newDate));
                }
            });
            controller.dateToControl = controller.filterControl.find("#card-filter-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller._model.set("dateto", utils.date_ddmmyyyy(newDate));
                }
            });

            controller.dateFromControl.val(controller._model.get("datefrom"));
            controller.dateToControl.val(controller._model.get("dateto"));


            controller.salePointControl = controller.filterControl.find("#card-filter-view-salepoint-col");
            controller.salePointClear = controller.filterControl.find("#card-view-salepoint-clear");
            controller.employeeControl = controller.filterControl.find("#card-filter-view-employee-col");
            controller.employeeClear = controller.filterControl.find("#card-view-employee-clear");
            controller.saleClientControl = controller.filterControl.find("#card-filter-view-client-col");
            controller.saleClientClear = this.filterControl.find("#card-view-client-clear");

            controller.typeControlRow = controller.filterControl.find("#card-filter-view-type-row");
            controller.typeControl = controller.filterControl.find("#card-filter-view-type");
            controller.typeWithoutControl = controller.filterControl.find("#payment-view-payment-type-without");

            controller.optionControlRow = controller.filterControl.find("#card-filter-view-option-row");
            controller.optionControl = controller.filterControl.find("#card-filter-view-option");

            controller.searchButton = controller.filterControl.find("#card-filter-view-btn-find");
            return controller.filterControl;
        }


        public ViewControls(): void {
            if (this.typeControl)
                this.typeControl.formSelect();
            if (this.optionControl)
                this.optionControl.formSelect();
        }

        public showType(isShow: boolean) {
            if (isShow) {
                this.typeControlRow.removeClass("hide");
            }
            else {
                if (!this.typeControlRow.hasClass("hide")) this.typeControlRow.addClass("hide");
            }
        }

        public showClient(isShow: boolean) {
            if (isShow) {
                this.saleClientControl.removeClass("hide");
            }
            else {
                if (!this.saleClientControl.hasClass("hide")) this.saleClientControl.addClass("hide");
            }
        }

        public showWithout(isShow: boolean) {
            if (isShow) {
                //this.typeWithoutControl.removeClass("hide");
            }
            else {
                if (!this.typeWithoutControl.hasClass("hide")) this.typeWithoutControl.remove();
            }
        }

        public ResizeControls(): void {
            if (this.typeControl)
                this.typeControl.formSelect();
            if (this.optionControl)
                this.optionControl.formSelect();
        }

        public createEvents(): void {
            kendo.bind(this.filterControl, this._model);
            if (this.searchButton) this.SearchButtonClick = utils.createTouchClickEvent(this.searchButton, this.searchButtonClick, this);
            if (this.saleClientControl) this.ClientButtonClick = utils.createTouchClickEvent(this.saleClientControl, this.clientButtonClick, this);
            if (this.saleClientClear) this.ClearClientButtonClick = utils.createTouchClickEvent(this.saleClientClear, this.clearClientButtonClick, this);
            if (this.employeeControl) this.EmployeeButtonClick = utils.createTouchClickEvent(this.employeeControl, this.employeeButtonClick, this);
            if (this.employeeClear) this.ClearEmployeeButtonClick = utils.createTouchClickEvent(this.employeeClear, this.clearEmployeeButtonClick, this);
            if (this.salePointControl) this.SalePointButtonClick = utils.createTouchClickEvent(this.salePointControl, this.salePointButtonClick, this);
            if (this.salePointClear) this.ClearSalePointButtonClick = utils.createTouchClickEvent(this.salePointClear, this.clearSalePointButtonClick, this);
            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        public destroyEvents(): void {
            this.saveFilter();
            this.filterControl.unbind();
            this.Model.unbind("change");
            if (this.saleClientClear) utils.destroyTouchClickEvent(this.saleClientClear, this.ClearClientButtonClick);
            if (this.saleClientControl) utils.destroyTouchClickEvent(this.saleClientControl, this.ClearClientButtonClick);
            if (this.employeeClear) utils.destroyTouchClickEvent(this.employeeClear, this.ClearEmployeeButtonClick);
            if (this.employeeControl) utils.destroyTouchClickEvent(this.employeeControl, this.EmployeeButtonClick);
            if (this.salePointClear) utils.destroyTouchClickEvent(this.salePointClear, this.ClearSalePointButtonClick);
            if (this.salePointControl) utils.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
            if (this.searchButton) utils.destroyTouchClickEvent(this.searchButton, this.SearchButtonClick);
        }

        private changeModel(e: any): void {
            if (e.field === "type") {
                let type: number = this.Model.get("type");
                if (type == 3) {
                    this.optionControlRow.removeClass("hide");
                } else {
                    this.optionControlRow.addClass("hide");
                } 
            }
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

        public EmployeeButtonClick: { (e: any): void; };
        private employeeButtonClick(e) {
            let self = this;
            self.saveFilter();

            vars._app.OpenController({
                urlController: 'setting/card/employee', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlEmployee: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlEmployee.CardSettings.IsAdd = false;
                    ctrlEmployee.CardSettings.IsAddCopy = false;
                    ctrlEmployee.CardSettings.IsDelete = false;
                    ctrlEmployee.CardSettings.IsEdit = false;
                    ctrlEmployee.CardSettings.IsSelect = true;
                    ctrlEmployee.OnSelect = $.proxy(self.selectEmployee, self);
                }
            });
        }

        private selectEmployee(controller: Interfaces.IControllerCard) {
            let employee: Interfaces.Model.IEmployeeModel = controller.getSelectedRecord() as Interfaces.Model.IEmployeeModel;
            if (employee)
                this._model.set("employee", employee);
            M.updateTextFields();
        }

        public ClearEmployeeButtonClick: { (e: any): void; };
        private clearEmployeeButtonClick(e: any) {
            e.preventDefault();
            e.stopPropagation();
            this._model.set("employee", {});
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

    export class PaymentBase extends base.Controller.BaseCard {
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

        protected createCardFilterSettings(): Interfaces.Control.ICardFilterSettings {
            return new PaymentCardFilterSettings($.proxy(this.loadData, this), this.FilterId);
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: this.EditIdName, EditController: this.EditController,
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.getDocs, this), Delete: $.proxy(this.Service.DelDocument, this.Service),
                Columns: this.Columns
            };
        }

        protected get Columns(): Interfaces.Control.IBaseColumn[] {
            return this.columns();
        }

        protected columns(): Interfaces.Control.IBaseColumn[] {
            //let payMethod: string = "#if (ptype === 1) {#" + vars._statres("label$cash") + "# } else if (ptype === 2) {#" + vars._statres("label$noncash") + "# } else if (ptype === 3) {#" + vars._statres("label$withoutpayment") + "#}#";
            let payMethod: string = '#if (ptype === 1) {#<i class="material-icons left">attach_money</i># } else if (ptype === 2) {#<i class="material-icons left">credit_card</i># } else if (ptype === 3) {#<i class="material-icons left">money_off</i>#}#';
            payMethod = payMethod + "#if ((options & 2)===2 || (options & 4)===4 || (options & 8)===8) {# (#if ((options & 2)===2) {#" + vars._statres("label$oncredit") + "# } else if ((options & 4)===4) {#" + vars._statres("label$onthehouse") + "# } else if ((options & 8)===8) {#" + vars._statres("label$clientleft") + "#}#)#}#";


            return [
                { Header: "", HeaderStyle: "doc-col-conduct", Field: "options", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((options & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                { Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" },
                { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                { Header: vars._statres("label$employee"), Field: "employee.name" },
                { Header: vars._statres("label$methodpayment"), Field: "ptype", FieldTemplate: payMethod },
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

        protected get Employee(): number {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let employee: Interfaces.Model.IEmployeeModel = (settings ? settings.Model.get("employee") : undefined);
            return (employee ? employee.id : 0);
        }

        protected get Client(): number {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let client: Interfaces.Model.IClientModel = (settings ? settings.Model.get("client") : undefined);
            return (client ? client.id : 0);
        }

        protected get Type(): number {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let type: number = (settings ? settings.Model.get("type") : 0);
            return type;
        }

        protected get Option(): number {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let option: number = (this.Type == 3 && settings ? settings.Model.get("optionValue") : 0);
            return option;
        }

        protected get DateFrom(): string {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let date: string = (settings ? settings.Model.get("datefrom") : '');
            return (utils.isNullOrEmpty(date) ? '30.12.1899' : date);
        }

        protected get DateTo(): string {
            let settings: PaymentCardFilterSettings = this.CardSettings.FilterSettings as PaymentCardFilterSettings;
            let date: string = (settings ? settings.Model.get("dateto") : '');
            return (utils.isNullOrEmpty(date) ? '30.12.1899' : date);
        }

        protected get DocType(): number {
            return 10;
        }

        private getDocs(Callback: (responseData: any) => void) {
            this.CardSettings.FilterSettings.saveFilter();
            let params: Interfaces.Model.IPaymentParams = { id: 0, doctype: this.DocType, salepoint: this.SalePoint, employee: this.Employee, client: this.Client, type: this.Type, options: this.Option, datefrom: this.DateFrom, dateto: this.DateTo }
            this.Service.GetPayments(params, (responseData: any) => {
                if (Callback)
                    Callback(responseData);
            });
        }

    }
}

