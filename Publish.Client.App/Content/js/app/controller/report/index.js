var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/report/index.html", Id: "report-view" };
                };
                Index.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": vars._statres("label$reports"),
                        "labelReports": vars._statres("label$reports"),
                        "labelCharts": vars._statres("label$charts"),
                        "labelReportSales": vars._statres("report$sales"),
                        "labelReportStocks": vars._statres("report$stocks"),
                        "labelReportSalesTime": vars._statres("report$sales$time"),
                    });
                };
                Index.prototype.createEvents = function () {
                    this.ReportSalesButtonClick = this.createTouchClickEvent("btn-report-sales", this.reportSalesButtonClick);
                    this.ReportStocksButtonClick = this.createTouchClickEvent("btn-report-stocks", this.reportStocksButtonClick);
                    this.ReportSalesTimeButtonClick = this.createTouchClickEvent("btn-report-salestime", this.reportSalesTimeButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-report-sales", this.ReportSalesButtonClick);
                    this.destroyTouchClickEvent("btn-report-stocks", this.ReportStocksButtonClick);
                    this.destroyTouchClickEvent("btn-report-salestime", this.ReportSalesTimeButtonClick);
                };
                Index.prototype.reportSalesButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "report/sales/index", backController: this });
                };
                Index.prototype.reportStocksButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "report/stocks/index", backController: this });
                };
                Index.prototype.reportSalesTimeButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "report/dashboard/salestime", backController: this });
                };
                return Index;
            }(base.Controller.Base));
            Report.Index = Index;
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/index", function (module) { return new module.Controller.Report.Index(); });
});
//# sourceMappingURL=index.js.map