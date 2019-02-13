import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');

export namespace Controller.Report.Stocks {
    export class Index extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("report$stocks"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/stocks/index.html", Id: "report-stocks-view" };
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
                "labelBuild": vars._statres("label$build"),
            });
        }

        protected get FilterName(): string {
            return "reportFilterStock";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportStockFilter {
            return {
                datefrom: utils.dateToday(), dateto: utils.dateToday(), salepoint: undefined, product: undefined, IsShowSalepoint:true, IsShowProduct: false };
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
        private showFieldsControl: JQuery;
        protected salepointControl: JQuery;
        private salepointClearControl: JQuery;
        protected productControl: JQuery;
        private productClearControl: JQuery;

        private buildButton: JQuery;
        public ViewInit(view: JQuery): boolean {
            
            let controller = this;

            controller.dateFromControl = view.find("#report-stocks-view-date-start");
            controller.dateFromControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.datefrom", newDate);
                }
            });
            controller.dateToControl = view.find("#report-stocks-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.dateto", newDate);
                }
            });

            controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
            controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));

            controller.showFieldsControl = view.find("#report-stocks-view-showfields");
            controller.salepointControl = view.find("#report-stocks-view-salepoint-row");
            controller.salepointClearControl = view.find("#report-stocks-view-salepoint-clear");
            controller.productControl = view.find("#report-stocks-view-product-row");
            controller.productClearControl = view.find("#report-stocks-view-product-clear");

            controller.buildButton = view.find("#report-stocks-view-btn-build");

            let selectedFields: Array<any> = [];
            let filter: Interfaces.Model.IReportStockFilter = this.Model.get("filterModel");
            if (filter.IsShowSalepoint) selectedFields.push(1);
            if (filter.IsShowProduct) selectedFields.push(2);
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

        public get Filter(): Interfaces.Model.IReportStockFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportStockFilter;
        }

        protected columns(): Interfaces.IReportColumn[] {
            let columns: Interfaces.IReportColumn[] = [];

            if (this.Filter.IsShowSalepoint) columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
            if (this.Filter.IsShowProduct) columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });

            columns.push({ Header: vars._statres("label$quantity$deb$beg"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDebBeg", FieldTemplate: '#=numberToString(quantityDebBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$quantity$cre$beg"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCreBeg", FieldTemplate: '#=numberToString(quantityCreBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$quantity$deb"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDeb", FieldTemplate: '#=numberToString(quantityDeb,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$quantity$cre"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCre", FieldTemplate: '#=numberToString(quantityCre,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$quantity$deb$end"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDebEnd", FieldTemplate: '#=numberToString(quantityDebEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$quantity$cre$end"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCreEnd", FieldTemplate: '#=numberToString(quantityCreEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            return columns;
        }

        public createEvents(): void {
            super.createEvents();
            if (this.buildButton) this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);

            this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
            this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
            this.ProductButtonClick = this.createTouchClickEvent(this.productControl, this.productButtonClick);
            this.ClearProductButtonClick = this.createTouchClickEvent(this.productClearControl, this.clearProductButtonClick);
            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        public destroyEvents(): void {
            this.Model.unbind("change");
            this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
            this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
            this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
            this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
            if (this.buildButton) utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
            super.destroyEvents();
        }

        private changeModel(e: any): void {
            if (e.field === "selectedFields") {
                let selectedFields: Array<any> = this.Model.get("selectedFields");
                let filter: Interfaces.Model.IReportStockFilter = this.Model.get("filterModel");
                filter.IsShowSalepoint = false;
                filter.IsShowProduct = false;
                if (selectedFields) {
                    for (let i = 0, icount = selectedFields.length; i < icount; i++) {
                        if (selectedFields[i] == 1) filter.IsShowSalepoint = true;
                        else if (selectedFields[i] == 2) filter.IsShowProduct = true;
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

        public BuildButtonClick: { (e: any): void; };
        protected buildButtonClick(e) {
            let self = this;
            super.buildButtonClick(e);
            this.Service.GetStocks(self.Filter as Interfaces.Model.IReportStockFilter , (responseData: any) => {
                self.Model.set("reportModel", responseData);
                self.ReportSettings.Columns = self.columns(); 
                self.setupTable();
            });
        }

        protected OnDetalize(e) {
            let self = this;
            let curfilter: Interfaces.Model.IReportStockFilter = self.Filter;
            let index: number = +e.currentTarget.id.replace('table-row-', '');
            let item: any = this.Model.get("reportModel")[index];
            //vars._app.OpenController({
            //    urlController: 'report/sales/detalize', isModal: true, onLoadController: (controller: Interfaces.IController) => {
            //        let ctrlDetalize: Interfaces.IControllerReport = controller as Interfaces.IControllerReport;
            //        let filter: Interfaces.Model.IReportSaleFilter = {
            //            datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.employee, product: curfilter.product
            //        }
            //        if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0) filter.salepoint = item.salepoint;
            //        if (item.employee && item.employee.id && item.employee.id !== 0) filter.employee = item.employee;
            //        if (item.client && item.client.id && item.client.id !== 0) filter.client = item.client;
            //        if (item.product && item.product.id && item.product.id !== 0) filter.product = item.product;

            //        ctrlDetalize.Model.set("filterModel", filter);
            //    }
            //});
        }
    }
}

vars.registerController("report/stocks/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Stocks.Index(); });