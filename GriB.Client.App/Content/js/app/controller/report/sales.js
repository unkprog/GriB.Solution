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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller"], function (require, exports, vars, utils, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Sales = /** @class */ (function (_super) {
                __extends(Sales, _super);
                function Sales() {
                    var _this = _super.call(this) || this;
                    if (_this.EditorSettings && _this.EditorSettings.ButtonSetings)
                        _this.EditorSettings.ButtonSetings.IsSave = false;
                    _this.Model.set("Header", vars._statres("report$sales"));
                    return _this;
                }
                Sales.prototype.createOptions = function () {
                    return { Url: "/Content/view/report/sales.html", Id: "report-sales-view" };
                };
                Sales.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": "",
                        "filterModel": {},
                        "labelDateFrom": vars._statres("label$date$from"),
                        "labelDateTo": vars._statres("label$date$to"),
                    });
                };
                Object.defineProperty(Sales.prototype, "FilterName", {
                    get: function () {
                        return "reportFilterSale";
                    },
                    enumerable: true,
                    configurable: true
                });
                Sales.prototype.getDefaultFilter = function () {
                    return { datefrom: utils.dateToday(), dateto: utils.dateToday() };
                };
                Sales.prototype.getSaveFilter = function () {
                    var controller = this;
                    var _datefrom = controller.Model.get("filterModel.datefrom");
                    var _dateto = controller.Model.get("filterModel.dateto");
                    var filterToSave = { datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto) };
                    return JSON.stringify(filterToSave);
                };
                Sales.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    var controller = this;
                    controller.dateFromControl = view.find("#report-sales-view-date-start");
                    controller.dateFromControl.datepicker({
                        format: "dd.mm.yyyy", onSelect: function (newDate) {
                            controller.Model.set("filterModel.datefrom", newDate);
                        }
                    });
                    controller.dateToControl = view.find("#report-sales-view-date-end");
                    controller.dateToControl.datepicker({
                        format: "dd.mm.yyyy", onSelect: function (newDate) {
                            controller.Model.set("filterModel.dateto", newDate);
                        }
                    });
                    controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
                    controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));
                    return result;
                };
                Sales.prototype.ViewHide = function (e) {
                    _super.prototype.ViewHide.call(this, e);
                };
                return Sales;
            }(base.Controller.BaseReport));
            Report.Sales = Sales;
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/sales", function (module) { return new module.Controller.Report.Sales(); });
});
//# sourceMappingURL=sales.js.map