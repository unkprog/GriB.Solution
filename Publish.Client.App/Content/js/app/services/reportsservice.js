var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/baseservice"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var ReportsService = /** @class */ (function (_super) {
            __extends(ReportsService, _super);
            function ReportsService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(ReportsService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/reports' };
                },
                enumerable: true,
                configurable: true
            });
            ReportsService.prototype.GetSales = function (model, Callback) {
                this.PostApi({ Action: "/sales", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetSalesDetail = function (model, Callback) {
                this.PostApi({ Action: "/salesdetail", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetStocks = function (model, Callback) {
                this.PostApi({ Action: "/stocks", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetStocksDetail = function (model, Callback) {
                this.PostApi({ Action: "/stocksdetail", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetCash = function (model, Callback) {
                this.PostApi({ Action: "/cash", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetCashDetail = function (model, Callback) {
                this.PostApi({ Action: "/cashdetail", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetExpresAnalysisData = function (model, Callback) {
                this.PostApi({ Action: "/expressanalysis", RequestData: JSON.stringify(model), Callback: Callback });
            };
            ReportsService.prototype.GetHistorySales = function (change, Callback) {
                this.GetApi({ Action: "/historysales", RequestData: { change: change }, Callback: Callback });
            };
            ReportsService.prototype.GetChangeSales = function (change, Callback) {
                this.GetApi({ Action: "/changesales", RequestData: { change: change }, Callback: Callback });
            };
            return ReportsService;
        }(base.Services.BaseService));
        Services.ReportsService = ReportsService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=reportsservice.js.map