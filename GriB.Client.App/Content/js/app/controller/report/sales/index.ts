﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');

export namespace Controller.Report.Sales {
    export class Index extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            if (this.EditorSettings && this.EditorSettings.ButtonSetings)
                this.EditorSettings.ButtonSetings.IsSave = false;


            this.Model.set("Header", vars._statres("report$sales"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/sales/index.html", Id: "report-sales-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "filterModel": {},
                "labelDateFrom": vars._statres("label$date$from"),
                "labelDateTo": vars._statres("label$date$to"),
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelProduct": vars._statres("label$product"),
                "labelEmployee": vars._statres("label$employee"),
                "labelClient": vars._statres("label$client"),
                "labelBuild": vars._statres("label$build"),
            });
        }

        protected get FilterName(): string {
            return "reportFilterSale";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportSaleFilter {
            return {
                datefrom: utils.dateToday(), dateto: utils.dateToday(), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint:true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
        }

        protected getSaveFilter(): string {
            let controller = this;
            let _datefrom: Date = controller.Model.get("filterModel.datefrom");
            let _dateto: Date = controller.Model.get("filterModel.dateto");
            let filterToSave = {
                datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto)
                , salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"), employee: this.Model.get("filterModel.employee"), client: this.Model.get("filterModel.client")
                , IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct"), IsShowEmployee: this.Model.get("filterModel.IsShowEmployee"), IsShowClient: this.Model.get("filterModel.IsShowClient")
            };
            return JSON.stringify(filterToSave);

        }

        private dateFromControl: JQuery;
        private dateToControl: JQuery;

        protected salepointControl: JQuery;
        private salepointClearControl: JQuery;
        protected productControl: JQuery;
        private productClearControl: JQuery;
        protected employeeControl: JQuery;
        private employeeClearControl: JQuery;
        protected clientControl: JQuery;
        private clientClearControl: JQuery;

        private buildButton: JQuery;
        public ViewInit(view: JQuery): boolean {
            
            let controller = this;

            controller.dateFromControl = view.find("#report-sales-view-date-start");
            controller.dateFromControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.datefrom", newDate);
                }
            });
            controller.dateToControl = view.find("#report-sales-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.dateto", newDate);
                }
            });

            controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
            controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));

            controller.salepointControl = view.find("#report-sales-view-salepoint-row");
            controller.salepointClearControl = view.find("#report-sales-view-salepoint-clear");
            controller.productControl = view.find("#report-sales-view-product-row");
            controller.productClearControl = view.find("#report-sales-view-product-clear");
            controller.employeeControl = view.find("#report-sales-view-employee-row");
            controller.employeeClearControl = view.find("#report-sales-view-employee-clear");
            controller.clientControl = view.find("#report-sales-view-client-row");
            controller.clientClearControl = view.find("#report-sales-view-client-clear");

            controller.buildButton = view.find("#report-sales-view-btn-build");
            let result: boolean = super.ViewInit(view);
            return result;
        }

        public get Filter(): Interfaces.Model.IReportSaleFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportSaleFilter;
        }

        protected columns(): Interfaces.IReportColumn[] {
            let columns: Interfaces.IReportColumn[] = [];

            if (this.Filter.IsShowSalepoint) columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name" });
            if (this.Filter.IsShowProduct) columns.push({ Header: vars._statres("label$product"), Field: "product.name" });
            if (this.Filter.IsShowEmployee) columns.push({ Header: vars._statres("label$employee"), Field: "employee.name" });
            if (this.Filter.IsShowClient) columns.push({ Header: vars._statres("label$client"), Field: "client.name" });

            columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true })
            columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true });
            return columns;
        }

        public createEvents(): void {
            super.createEvents();
            if (this.buildButton) this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);

            this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
            this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
            this.ProductButtonClick = this.createTouchClickEvent(this.productControl, this.productButtonClick);
            this.ClearProductButtonClick = this.createTouchClickEvent(this.productClearControl, this.clearProductButtonClick);
            this.EmployeeButtonClick = this.createTouchClickEvent(this.employeeControl, this.employeeButtonClick);
            this.ClearEmployeeButtonClick = this.createTouchClickEvent(this.employeeClearControl, this.clearEmployeeButtonClick);
            this.ClientButtonClick = this.createTouchClickEvent(this.clientControl, this.clientButtonClick);
            this.ClearClientButtonClick = this.createTouchClickEvent(this.clientClearControl, this.clearClientButtonClick);
        }

        public destroyEvents(): void {
            this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
            this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
            this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
            this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
            this.destroyTouchClickEvent(this.employeeClearControl, this.ClearEmployeeButtonClick);
            this.destroyTouchClickEvent(this.employeeControl, this.EmployeeButtonClick);
            this.destroyTouchClickEvent(this.clientClearControl, this.ClearClientButtonClick);
            this.destroyTouchClickEvent(this.clientControl, this.ClientButtonClick);

            if (this.buildButton) utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
            super.destroyEvents();
        }

        public SalepointButtonClick: { (e: any): void; };
        private salepointButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/salepoint', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlSalepoint: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlSalepoint.CardSettings.IsAdd = false;
                    ctrlSalepoint.CardSettings.IsAddCopy = false;
                    ctrlSalepoint.CardSettings.IsDelete = false;
                    ctrlSalepoint.CardSettings.IsEdit = false;
                    ctrlSalepoint.CardSettings.IsSelect = true;
                    ctrlSalepoint.OnSelect = $.proxy(self.selectSalepoint, self);
                }
            });
        }

        private selectSalepoint(controller: Interfaces.IControllerCard) {
            let salepoint: Interfaces.Model.ISalepoint = controller.getSelectedRecord() as Interfaces.Model.ISalepoint;
            if (salepoint)
                this.Model.set("filterModel.salepoint", salepoint);
            M.updateTextFields();
        }

        public ClearSalepointButtonClick: { (e: any): void; };
        private clearSalepointButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.salepoint", {});
            M.updateTextFields();
            return false;
        }

        public ProductButtonClick: { (e: any): void; };
        private productButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/product', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlProduct: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlProduct.CardSettings.IsAdd = false;
                    ctrlProduct.CardSettings.IsAddCopy = false;
                    ctrlProduct.CardSettings.IsDelete = false;
                    ctrlProduct.CardSettings.IsEdit = false;
                    ctrlProduct.CardSettings.IsSelect = true;
                    ctrlProduct.OnSelect = $.proxy(self.selectProduct, self);
                }
            });
        }

        private selectProduct(controller: Interfaces.IControllerCard) {
            let product: Interfaces.Model.IProduct = controller.getSelectedRecord() as Interfaces.Model.IProduct;
            if (product)
                this.Model.set("filterModel.product", product);
            M.updateTextFields();
        }

        public ClearProductButtonClick: { (e: any): void; };
        private clearProductButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.product", {});
            M.updateTextFields();
            return false;
        }

        public EmployeeButtonClick: { (e: any): void; };
        private employeeButtonClick(e) {
            let self = this;
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
                this.Model.set("filterModel.employee", employee);
            M.updateTextFields();
        }

        public ClearEmployeeButtonClick: { (e: any): void; };
        private clearEmployeeButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.employee", {});
            M.updateTextFields();
            return false;
        }

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/client', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlClient: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlClient.CardSettings.IsAdd = false;
                    ctrlClient.CardSettings.IsAddCopy = false;
                    ctrlClient.CardSettings.IsDelete = false;
                    ctrlClient.CardSettings.IsEdit = false;
                    ctrlClient.CardSettings.IsSelect = true;
                    ctrlClient.OnSelect = $.proxy(self.selectClient, self);
                }
            });
        }

        private selectClient(controller: Interfaces.IControllerCard) {
            let client: Interfaces.Model.IClientModel = controller.getSelectedRecord() as Interfaces.Model.IClientModel;
            if (client)
                this.Model.set("filterModel.client", client);
            M.updateTextFields();
        }

        public ClearClientButtonClick: { (e: any): void; };
        private clearClientButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.client", {});
            M.updateTextFields();
            return false;
        }

        public BuildButtonClick: { (e: any): void; };
        private buildButtonClick(e) {
            let self = this;
            this.Service.GetSales(this.Filter as Interfaces.Model.IReportSaleFilter , (responseData: any) => {
                this.Model.set("reportModel", responseData);
                this.ReportSettings.Columns = this.columns(); 
                this.setupTable();
            });
        }
    }
}

vars.registerController("report/sales/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Sales.Index(); });