import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');
import ctrl = require('app/common/basecontrol');

export namespace Controller.Report.Stocks {

    export class StockTable extends ctrl.Control.BaseTable {

        public Filter: Interfaces.Model.IReportStockFilter;

        protected getTableHeaderHtml(): string {
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;
            let html: string = '';
            let colNum: number = -1;
            this.sumFieldsInfo = { fields: [], sumFied: {}, orderfields: [] };
            let knSupport: any = kendo;
            html += '<tr>';
            if (this.Filter.IsShowSalepoint) {
                colNum = colNum + 1;
                html += '   <th rowspan="2" id="sort_' + colNum + '" class="ccursor report-total-right-border">';
                html += vars._statres("label$salePoint");
                html += '   </th>';
            }

            if (this.Filter.IsShowProduct) {
                colNum = colNum + 1;
                html += '   <th rowspan="2" id="sort_' + colNum + '" class="ccursor report-total-right-border">';
                html += vars._statres("label$product");
                html += '   </th>';
            }

            html += '   <th colspan="3" class="product-col-quantity-auto report-total-right-border">'; html += vars._statres("label$beginofperiod"); html += '   </th>';
            html += '   <th colspan="3" class="product-col-quantity-auto report-total-right-border">'; html += vars._statres("label$overperiod"); html += '   </th>';
            html += '   <th colspan="3" class="product-col-quantity-auto report-total-right-border">'; html += vars._statres("label$endofperiod"); html += '   </th>';
            html += '<th style="width:' + (knSupport.support.browser.chrome === true ? "18" : "17") + 'px;"></th>';
            html += '</tr>';

            html += '<tr>';
            for (let i = colNum + 1, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                html += '   <th';

                if (columns[i].HeaderStyle || columns[i].IsOrder === true) {
                    if (columns[i].IsOrder === true) {
                        html += ' id="sort_' + i + '"';
                    }

                    html += ' class="';
                    if (columns[i].HeaderStyle) html += columns[i].HeaderStyle;
                    if (columns[i].IsOrder === true) {
                        this.sumFieldsInfo.orderfields.push({ field: columns[i].Field, typeSort: 0, index: i });
                        html += (columns[i].HeaderStyle ? ' ' : '') + 'ccursor';
                    }
                    html += '"';
                }
                html += '>';
                html += (columns[i].HeaderTemplate ? columns[i].HeaderTemplate : columns[i].Header);
                if (columns[i].IsSum && columns[i].IsSum === true) {
                    html += ('<br/><span id="' + columns[i].Field + '_sum">0.00</span>');
                    this.sumFieldsInfo.fields.push(columns[i].Field);
                    this.sumFieldsInfo.sumFied[columns[i].Field] = 0;
                }
                html += '</th>';
            }

            html += '<th style="width:' + (knSupport.support.browser.chrome === true ? "18" : "17") + 'px;"></th>';
            html += '</tr>';

            return html;
        }
    }


    export class Index extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("report$stocks"));
            this.Table = new StockTable();
            (this.Table as StockTable).Filter = this.Filter;
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
                datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, IsShowSalepoint:true, IsShowProduct: false };
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
                    controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                }
            });
            controller.dateToControl = view.find("#report-stocks-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
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

        public get Columns(): Interfaces.Control.ITableColumn[] {
            let columns: Interfaces.Control.ITableColumn[] = [];

            if (this.Filter.IsShowSalepoint) columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
            if (this.Filter.IsShowProduct) columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });

            columns.push({ Header: vars._statres("label$arrival"), HeaderGroupName: vars._statres("label$beginofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDebBeg", FieldTemplate: '#=numberToString(quantityDebBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$expense"), HeaderGroupName: vars._statres("label$beginofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCreBeg", FieldTemplate: '#=numberToString(quantityCreBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$total"), HeaderGroupName: vars._statres("label$beginofperiod"), HeaderStyle: "product-col-quantity-auto-right report-total-right-border", Field: "quantityBeg", FieldTemplate: '#=numberToString(quantityBeg,2)#', FieldStyle: "product-col-quantity-auto-right report-total report-total-right-border", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$arrival"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDeb", FieldTemplate: '#=numberToString(quantityDeb,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$expense"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCre", FieldTemplate: '#=numberToString(quantityCre,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$total"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right report-total-right-border", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right report-total report-total-right-border", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$arrival"), HeaderGroupName: vars._statres("label$endofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDebEnd", FieldTemplate: '#=numberToString(quantityDebEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$expense"), HeaderGroupName: vars._statres("label$endofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCreEnd", FieldTemplate: '#=numberToString(quantityCreEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$total"), HeaderGroupName: vars._statres("label$endofperiod"), HeaderStyle: "product-col-quantity-auto-right report-total-right-border", Field: "quantityEnd", FieldTemplate: '#=numberToString(quantityEnd,2)#', FieldStyle: "product-col-quantity-auto-right report-total report-total-right-border", IsSum: true, IsOrder: true })
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
            let filter: Interfaces.Model.IReportStockFilter = self.Filter;
            this.Service.GetStocks(filter, (responseData: any) => {
                (self.Table as StockTable).Filter = this.Filter;
                self.SetupTable(responseData);
            });
        }

        protected OnDetalize(row: Interfaces.Model.ITableRowModel) {
            let self = this;
            let curfilter: Interfaces.Model.IReportStockFilter = self.Filter;
            let item: any = row;

            vars._app.OpenController({
                urlController: 'report/stocks/detalize', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlDetalize: Interfaces.IControllerReport = controller as Interfaces.IControllerReport;
                    let filter: Interfaces.Model.IReportStockFilter = {
                        datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, product: curfilter.product
                    }
                    if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0) filter.salepoint = item.salepoint;
                    if (item.product && item.product.id && item.product.id !== 0) filter.product = item.product;

                    ctrlDetalize.Model.set("filterModel", filter);
                }
            });
        }
    }
}

vars.registerController("report/stocks/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Stocks.Index(); });