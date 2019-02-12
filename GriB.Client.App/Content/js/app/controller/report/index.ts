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
                "labelReportSales": vars._statres("report$sales"),
            });
        }

        protected createEvents(): void {
            this.ReportSalesButtonClick = this.createTouchClickEvent("btn-report-sales", this.reportSalesButtonClick);
            this.ReportTestButtonClick = this.createTouchClickEvent("btn-report-test", this.reportTestButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-report-sales", this.ReportSalesButtonClick);
            this.destroyTouchClickEvent("btn-report-test", this.ReportTestButtonClick);
        }

        public ReportSalesButtonClick: { (e: any): void; };
        private reportSalesButtonClick(e) {
            vars._main.OpenController({ urlController: "report/sales/index", backController: this });
        }

        public ReportTestButtonClick: { (e: any): void; };
        private reportTestButtonClick(e) {
            vars._main.OpenController({ urlController: "report/dashboard/test", backController: this });
        }
    }
}

vars.registerController("report/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Index(); });