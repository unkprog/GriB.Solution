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
                var Detalize = /** @class */ (function (_super) {
                    __extends(Detalize, _super);
                    function Detalize() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings && _this.EditorSettings.ButtonSetings)
                            _this.EditorSettings.ButtonSetings.IsSave = false;
                        _this.Model.set("Header", vars._statres("report$sales"));
                        return _this;
                    }
                    Detalize.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/sales/detalize.html", Id: "report-sales-detalize-view" };
                    };
                    Detalize.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "filterModel": {},
                        });
                    };
                    Object.defineProperty(Detalize.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterSaleDetalize";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Detalize.prototype.getDefaultFilter = function () {
                        return {
                            datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false
                        };
                    };
                    Detalize.prototype.getSaveFilter = function () {
                        var controller = this;
                        var filterToSave = {
                            datefrom: controller.Model.get("filterModel.datefrom"), dateto: controller.Model.get("filterModel.dateto"),
                            salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"), employee: this.Model.get("filterModel.employee"), client: this.Model.get("filterModel.client"),
                            IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct"), IsShowEmployee: this.Model.get("filterModel.IsShowEmployee"), IsShowClient: this.Model.get("filterModel.IsShowClient")
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
                        columns.push({ Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" });
                        columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$client"), Field: "client.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$discount"), HeaderStyle: "product-col-quantity-auto-right", Field: "discount", FieldTemplate: '#=discount#', FieldStyle: "product-col-quantity-auto-right", IsSum: false, IsOrder: true });
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
                        this.Service.GetSalesDetail(this.Filter, function (responseData) {
                            self.Model.set("reportModel", responseData);
                            self.ReportSettings.Columns = self.columns();
                            self.setupTable();
                        });
                    };
                    Detalize.prototype.OnDetalize = function (e) {
                        var cur = e.currentTarget;
                        var self = this;
                        var curfilter = self.Filter;
                        var index = +e.currentTarget.id.replace('table-row-', '');
                        var item = this.Model.get("reportModel")[index];
                        vars._editorData["id_sale"] = item.id;
                        vars._app.OpenController({
                            urlController: 'document/editor/sale', isModal: true, onLoadController: function (controller) {
                                var ctrlSale = controller;
                                ctrlSale.EditorSettings.ButtonSetings.IsSave = false;
                            }
                        });
                    };
                    return Detalize;
                }(base.Controller.Report.ReportWithService));
                Sales.Detalize = Detalize;
            })(Sales = Report.Sales || (Report.Sales = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/sales/detalize", function (module) { return new module.Controller.Report.Sales.Detalize(); });
});
//# sourceMappingURL=detalize.js.map