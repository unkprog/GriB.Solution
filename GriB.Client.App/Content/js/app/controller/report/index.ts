import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export namespace Controller.Report {
    export class Index extends base.Controller.Base {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/index.html", Id: "report-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$reports"),
                "labelReports": vars._statres("label$reports"),
                "labelCharts": vars._statres("label$charts"),
                "labelReportSales": vars._statres("report$sales"),
                "labelReportStocks": vars._statres("report$stocks"),
                "labelReportSalesTime": vars._statres("report$sales$time"),
            });
        }

        protected createEvents(): void {
            this.ReportSalesButtonClick = this.createTouchClickEvent("btn-report-sales", this.reportSalesButtonClick);
            this.ReportStocksButtonClick = this.createTouchClickEvent("btn-report-stocks", this.reportStocksButtonClick);
            this.ReportSalesTimeButtonClick = this.createTouchClickEvent("btn-report-salestime", this.reportSalesTimeButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-report-sales", this.ReportSalesButtonClick);
            this.destroyTouchClickEvent("btn-report-stocks", this.ReportStocksButtonClick);
            this.destroyTouchClickEvent("btn-report-salestime", this.ReportSalesTimeButtonClick);
        }

        public ReportSalesButtonClick: { (e: any): void; };
        private reportSalesButtonClick(e) {
            vars._main.OpenController({ urlController: "report/sales/index", backController: this });
        }

        public ReportStocksButtonClick: { (e: any): void; };
        private reportStocksButtonClick(e) {
            vars._main.OpenController({ urlController: "report/stocks/index", backController: this });
        }

        public ReportSalesTimeButtonClick: { (e: any): void; };
        private reportSalesTimeButtonClick(e) {
            vars._main.OpenController({ urlController: "report/dashboard/salestime", backController: this });
        }
    }
}

vars.registerController("report/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Index(); });