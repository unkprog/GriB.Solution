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
                        "labelReportSales": vars._statres("report$sales"),
                    });
                };
                Index.prototype.createEvents = function () {
                    this.ReportSalesButtonClick = this.createTouchClickEvent("btn-report-sales", this.reportSalesButtonClick);
                    this.ReportTestButtonClick = this.createTouchClickEvent("btn-report-test", this.reportTestButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-report-sales", this.ReportSalesButtonClick);
                    this.destroyTouchClickEvent("btn-report-test", this.ReportTestButtonClick);
                };
                Index.prototype.reportSalesButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "report/sales/index", backController: this });
                };
                Index.prototype.reportTestButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "report/dashboard/test", backController: this });
                };
                return Index;
            }(base.Controller.Base));
            Report.Index = Index;
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/index", function (module) { return new module.Controller.Report.Index(); });
});
//# sourceMappingURL=index.js.map