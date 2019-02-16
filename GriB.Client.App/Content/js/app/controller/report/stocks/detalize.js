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
            var Stocks;
            (function (Stocks) {
                var Detalize = /** @class */ (function (_super) {
                    __extends(Detalize, _super);
                    function Detalize() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings && _this.EditorSettings.ButtonSetings)
                            _this.EditorSettings.ButtonSetings.IsSave = false;
                        _this.Model.set("Header", vars._statres("report$stocks"));
                        return _this;
                    }
                    Detalize.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/stocks/detalize.html", Id: "report-stocks-detalize-view" };
                    };
                    Detalize.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "filterModel": {},
                        });
                    };
                    Object.defineProperty(Detalize.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterStocksDetalize";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Detalize.prototype.getDefaultFilter = function () {
                        return {
                            datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, IsShowSalepoint: true, IsShowProduct: true
                        };
                    };
                    Detalize.prototype.getSaveFilter = function () {
                        var controller = this;
                        var _datefrom = controller.Model.get("filterModel.datefrom");
                        var _dateto = controller.Model.get("filterModel.dateto");
                        var filterToSave = {
                            datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto),
                            salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"),
                            IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct")
                        };
                        return JSON.stringify(filterToSave);
                    };
                    Detalize.prototype.ViewInit = function (view) {
                        var controller = this;
                        var result = _super.prototype.ViewInit.call(this, view);
                        controller.buildButtonClick(undefined);
                        return result;
                    };
                    Object.defineProperty(Detalize.prototype, "Filter", {
                        get: function () {
                            return this.Model.get("filterModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Detalize.prototype.columns = function () {
                        var columns = [];
                        var doctypeTemplate = "#if (doctype === 10) {#" + vars._statres("label$arrival") + "# } else if (doctype === 40) {#" + vars._statres("label$writeoff") + "#} else if (doctype === 50) {#" + vars._statres("label$movement") + "#} else if (doctype === 51) {#" + vars._statres("label$arrival$fromstock") + "#} else {#" + vars._statres("label$sale") + "#}#";
                        columns.push({ Header: vars._statres("label$document"), Field: "doctype", FieldTemplate: doctypeTemplate, IsOrder: true });
                        columns.push({ Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" });
                        columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true });
                        return columns;
                    };
                    Detalize.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                    };
                    Detalize.prototype.destroyEvents = function () {
                        _super.prototype.destroyEvents.call(this);
                    };
                    Detalize.prototype.buildButtonClick = function (e) {
                        var self = this;
                        _super.prototype.buildButtonClick.call(this, e);
                        this.Service.GetStocksDetail(this.Filter, function (responseData) {
                            self.Model.set("reportModel", responseData);
                            self.ReportSettings.Columns = self.columns();
                            self.setupTable();
                        });
                    };
                    Detalize.prototype.OnDetalize = function (e) {
                        var index = +e.currentTarget.id.replace('table-row-', '');
                        var item = this.Model.get("reportModel")[index];
                        var ctrlName = "";
                        var ctrlId = "";
                        if (item.doctype === 0) {
                            ctrlName = 'document/editor/sale';
                            ctrlId = 'id_sale';
                        }
                        else if (item.doctype === 10) {
                            ctrlName = 'document/editor/arrival';
                            ctrlId = 'id_arrival';
                        }
                        else if (item.doctype === 40) {
                            ctrlName = 'document/editor/writeoff';
                            ctrlId = 'id_writeoff';
                        }
                        else if (item.doctype === 50 || item.doctype === 51) {
                            ctrlName = 'document/editor/movement';
                            ctrlId = 'id_movement';
                        }
                        if (ctrlName !== "") {
                            vars._editorData[ctrlId] = item.id;
                            vars._app.OpenController({
                                urlController: ctrlName, isModal: true, onLoadController: function (controller) {
                                    var ctrlSale = controller;
                                    ctrlSale.EditorSettings.ButtonSetings.IsSave = false;
                                }
                            });
                        }
                    };
                    return Detalize;
                }(base.Controller.Report.ReportWithService));
                Stocks.Detalize = Detalize;
            })(Stocks = Report.Stocks || (Report.Stocks = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/stocks/detalize", function (module) { return new module.Controller.Report.Stocks.Detalize(); });
});
//# sourceMappingURL=detalize.js.map