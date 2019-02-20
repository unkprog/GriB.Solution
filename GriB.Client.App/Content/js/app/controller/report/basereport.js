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
define(["require", "exports", "app/common/basecontroller", "app/services/reportsservice"], function (require, exports, base, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var ReportWithService = /** @class */ (function (_super) {
                __extends(ReportWithService, _super);
                function ReportWithService() {
                    return _super.call(this) || this;
                }
                Object.defineProperty(ReportWithService.prototype, "Service", {
                    get: function () {
                        if (!this.reportService)
                            this.reportService = new svc.Services.ReportsService();
                        return this.reportService;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ReportWithService;
            }(base.Controller.BaseReportTable));
            Report.ReportWithService = ReportWithService;
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=basereport.js.map