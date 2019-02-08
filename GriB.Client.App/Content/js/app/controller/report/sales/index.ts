import vars = require('app/common/variables');
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
                "labelBuild": vars._statres("label$build"),
            });
        }

        protected get FilterName(): string {
            return "reportFilterSale";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportSaleFilter {
            return { datefrom: utils.dateToday(), dateto: utils.dateToday() };
        }

        protected getSaveFilter(): string {
            let controller = this;
            let _datefrom: Date = controller.Model.get("filterModel.datefrom");
            let _dateto: Date = controller.Model.get("filterModel.dateto");
            let filterToSave = { datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto) };
            return JSON.stringify(filterToSave);

        }

        private dateFromControl: JQuery;
        private dateToControl: JQuery;
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

            controller.buildButton = view.find("#report-sales-view-btn-build");
            let result: boolean = super.ViewInit(view);
            return result;
        }

        protected columns(): Interfaces.IReportColumn[] {
            return [
                { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                { Header: vars._statres("label$product"), Field: "product.name" },
                { Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right" },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
            ];
        }

        public createEvents(): void {
            super.createEvents();
            if (this.buildButton) this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);
        }

        public destroyEvents(): void {
            if (this.buildButton) utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
        }

        public BuildButtonClick: { (e: any): void; };
        private buildButtonClick(e) {
            let self = this;
            this.Service.GetSales(this.Filter, (responseData: any) => {
                this.Model.set("reportModel", responseData);
                this.setupRows();
            });
        }
    }
}

vars.registerController("report/sales/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Sales.Index(); });