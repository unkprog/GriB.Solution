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
                "labelReportCash": vars._statres("report$cash"),
                "labelReportSalesTime": vars._statres("report$sales$time"),
                "labelReportExpressAnalysis": vars._statres("report$expressanalysis"),
            });
        }

        protected createEvents(): void {
            this.ReportSalesButtonClick = this.createTouchClickEvent("btn-report-sales", this.reportSalesButtonClick);
            this.ReportStocksButtonClick = this.createTouchClickEvent("btn-report-stocks", this.reportStocksButtonClick);
            this.ReportCashButtonClick = this.createTouchClickEvent("btn-report-cash", this.reportCashButtonClick);
            this.ReportSalesTimeButtonClick = this.createTouchClickEvent("btn-report-salestime", this.reportSalesTimeButtonClick);
            this.ReportExpressAnalysisButtonClick = this.createTouchClickEvent("btn-report-expressanalysis", this.reportExpressAnalysisButtonClick);
            
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-report-sales", this.ReportSalesButtonClick);
            this.destroyTouchClickEvent("btn-report-stocks", this.ReportStocksButtonClick);
            this.destroyTouchClickEvent("btn-report-cash", this.ReportCashButtonClick);
            this.destroyTouchClickEvent("btn-report-salestime", this.ReportSalesTimeButtonClick);
            this.destroyTouchClickEvent("btn-report-expressanalysis", this.ReportExpressAnalysisButtonClick);
        }

        public ReportSalesButtonClick: { (e: any): void; };
        private reportSalesButtonClick(e) {
            vars._main.OpenController({ urlController: "report/sales/index", backController: this });
        }

        public ReportStocksButtonClick: { (e: any): void; };
        private reportStocksButtonClick(e) {
            vars._main.OpenController({ urlController: "report/stocks/index", backController: this });
        }

        public ReportCashButtonClick: { (e: any): void; };
        private reportCashButtonClick(e) {
            vars._main.OpenController({ urlController: "report/cash/index", backController: this });
        }

        public ReportSalesTimeButtonClick: { (e: any): void; };
        private reportSalesTimeButtonClick(e) {
            vars._main.OpenController({ urlController: "report/dashboard/salestime", backController: this });
        }

        public ReportExpressAnalysisButtonClick: { (e: any): void; };
        private reportExpressAnalysisButtonClick(e) {
            vars._main.OpenController({ urlController: "report/dashboard/expressanalysis", backController: this });
        }
    }
}

vars.registerController("report/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Index(); });