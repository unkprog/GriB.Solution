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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/report/basereport"], function (require, exports, vars, utils, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Sales;
            (function (Sales) {
                var Index = /** @class */ (function (_super) {
                    __extends(Index, _super);
                    function Index() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings && _this.EditorSettings.ButtonSetings)
                            _this.EditorSettings.ButtonSetings.IsSave = false;
                        _this.Model.set("Header", vars._statres("report$sales"));
                        return _this;
                    }
                    Index.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/sales/index.html", Id: "report-sales-view" };
                    };
                    Index.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "filterModel": {},
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelBuild": vars._statres("label$build"),
                        });
                    };
                    Object.defineProperty(Index.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterSale";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Index.prototype.getDefaultFilter = function () {
                        return { datefrom: utils.dateToday(), dateto: utils.dateToday() };
                    };
                    Index.prototype.getSaveFilter = function () {
                        var controller = this;
                        var _datefrom = controller.Model.get("filterModel.datefrom");
                        var _dateto = controller.Model.get("filterModel.dateto");
                        var filterToSave = { datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto) };
                        return JSON.stringify(filterToSave);
                    };
                    Index.prototype.ViewInit = function (view) {
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
                        controller.buildButton = view.find("#report-sales-view-btn-build");
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    Index.prototype.columns = function () {
                        return [
                            { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                            { Header: vars._statres("label$product"), Field: "product.name" },
                            { Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true },
                        ];
                    };
                    Index.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.buildButton)
                            this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);
                    };
                    Index.prototype.destroyEvents = function () {
                        if (this.buildButton)
                            utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
                    };
                    Index.prototype.buildButtonClick = function (e) {
                        var _this = this;
                        var self = this;
                        this.Service.GetSales(this.Filter, function (responseData) {
                            _this.Model.set("reportModel", responseData);
                            _this.setupRows();
                        });
                    };
                    return Index;
                }(base.Controller.Report.ReportWithService));
                Sales.Index = Index;
            })(Sales = Report.Sales || (Report.Sales = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/sales/index", function (module) { return new module.Controller.Report.Sales.Index(); });
});
//# sourceMappingURL=index.js.map