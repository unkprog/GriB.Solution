import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');

export namespace Controller.Report.Sales {
    export class Index extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("report$sales"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/sales/index.html", Id: "report-sales-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "filterModel": {},
                "selectedFields": [],
                "labelDateFrom": vars._statres("label$date$from"),
                "labelDateTo": vars._statres("label$date$to"),
                "labelShowFields": vars._statres("label$showfields"),
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
            return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint:true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
        }

        //protected getSaveFilter(): string {
        //    let controller = this;
        //    super.getSaveFilter();
        //    let filterToSave = {
        //        datefrom: controller.Model.get("filterModel.datefrom"), dateto: controller.Model.get("filterModel.dateto")
        //        , salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"), employee: this.Model.get("filterModel.employee"), client: this.Model.get("filterModel.client")
        //        , IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct"), IsShowEmployee: this.Model.get("filterModel.IsShowEmployee"), IsShowClient: this.Model.get("filterModel.IsShowClient")
        //    };
        //    return JSON.stringify(filterToSave);

        //}

        private dateFromControl: JQuery;
        private dateToControl: JQuery;
        private showFieldsControl: JQuery;
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
                    controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                }
            });
            controller.dateToControl = view.find("#report-sales-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
                }
            });

            controller.dateFromControl.val(controller.Model.get("filterModel.datefrom"));
            controller.dateToControl.val(controller.Model.get("filterModel.dateto"));

            controller.showFieldsControl = view.find("#report-sales-view-showfields");
            controller.salepointControl = view.find("#report-sales-view-salepoint-row");
            controller.salepointClearControl = view.find("#report-sales-view-salepoint-clear");
            controller.productControl = view.find("#report-sales-view-product-row");
            controller.productClearControl = view.find("#report-sales-view-product-clear");
            controller.employeeControl = view.find("#report-sales-view-employee-row");
            controller.employeeClearControl = view.find("#report-sales-view-employee-clear");
            controller.clientControl = view.find("#report-sales-view-client-row");
            controller.clientClearControl = view.find("#report-sales-view-client-clear");

            controller.buildButton = view.find("#report-sales-view-btn-build");

            let selectedFields: Array<any> = [];
            let filter: Interfaces.Model.IReportSaleFilter = this.Model.get("filterModel");
            if (filter.IsShowSalepoint) selectedFields.push(1);
            if (filter.IsShowProduct) selectedFields.push(2);
            if (filter.IsShowEmployee) selectedFields.push(3);
            if (filter.IsShowClient) selectedFields.push(4);
            this.Model.set("selectedFields", selectedFields);

            let result: boolean = super.ViewInit(view);
            return result;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            //try {
            //    this.showFieldsControl.formSelect();
            //}
            //catch (ex) {
            //    console.log(JSON.stringify( ex));
            //}
        }

        public ViewShow(e: any): boolean {
            this.showFieldsControl.formSelect();
            return super.ViewShow(e);
        }

        public get Filter(): Interfaces.Model.IReportSaleFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportSaleFilter;
        }

        protected columns(): Interfaces.IReportColumn[] {
            let columns: Interfaces.IReportColumn[] = [];

            if (this.Filter.IsShowSalepoint) columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
            if (this.Filter.IsShowProduct) columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });
            if (this.Filter.IsShowEmployee) columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
            if (this.Filter.IsShowClient) columns.push({ Header: vars._statres("label$client"), Field: "client.name", IsOrder: true });

            columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true  });
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
            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        public destroyEvents(): void {
            this.Model.unbind("change");
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

        private changeModel(e: any): void {
            if (e.field === "selectedFields") {
                let selectedFields: Array<any> = this.Model.get("selectedFields");
                let filter: Interfaces.Model.IReportSaleFilter = this.Model.get("filterModel");
                filter.IsShowSalepoint = false;
                filter.IsShowProduct = false;
                filter.IsShowEmployee = false;
                filter.IsShowClient = false;
                if (selectedFields) {
                    for (let i = 0, icount = selectedFields.length; i < icount; i++) {
                        if (selectedFields[i] == 1) filter.IsShowSalepoint = true;
                        else if (selectedFields[i] == 2) filter.IsShowProduct = true;
                        else if (selectedFields[i] == 3) filter.IsShowEmployee = true;
                        else if (selectedFields[i] == 4) filter.IsShowClient = true;
                    }
                }
                this.Model.set("filterModel", filter);
            }
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
        protected buildButtonClick(e) {
            let self = this;
            super.buildButtonClick(e);
            let filter: Interfaces.Model.IReportSaleFilter = self.Filter;
            this.Service.GetSales(filter, (responseData: any) => {
                self.Model.set("reportModel", responseData);
                self.ReportSettings.Columns = self.columns(); 
                self.setupTable();
            });
        }

        protected OnDetalize(e) {
            let self = this;
            let curfilter: Interfaces.Model.IReportSaleFilter = self.Filter;
            let index: number = +e.currentTarget.id.replace('table-row-', '');
            let item: any = this.Model.get("reportModel")[index];
            vars._app.OpenController({
                urlController: 'report/sales/detalize', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlDetalize: Interfaces.IControllerReport = controller as Interfaces.IControllerReport;
                    let filter: Interfaces.Model.IReportSaleFilter = {
                        datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.client, product: curfilter.product
                    }
                    if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0) filter.salepoint = item.salepoint;
                    if (item.employee && item.employee.id && item.employee.id !== 0) filter.employee = item.employee;
                    if (item.client && item.client.id && item.client.id !== 0) filter.client = item.client;
                    if (item.product && item.product.id && item.product.id !== 0) filter.product = item.product;

                    ctrlDetalize.Model.set("filterModel", filter);
                }
            });
        }
    }
}

vars.registerController("report/sales/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Sales.Index(); });