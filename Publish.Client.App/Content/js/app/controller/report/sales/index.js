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
                            "labelSalepoint": vars._statres("label$salePoint"),
                            "labelProduct": vars._statres("label$product"),
                            "labelEmployee": vars._statres("label$employee"),
                            "labelClient": vars._statres("label$client"),
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
                        return {
                            datefrom: utils.dateToday(), dateto: utils.dateToday(), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false
                        };
                    };
                    Index.prototype.getSaveFilter = function () {
                        var controller = this;
                        var _datefrom = controller.Model.get("filterModel.datefrom");
                        var _dateto = controller.Model.get("filterModel.dateto");
                        var filterToSave = {
                            datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto),
                            salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"), employee: this.Model.get("filterModel.employee"), client: this.Model.get("filterModel.client"),
                            IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct"), IsShowEmployee: this.Model.get("filterModel.IsShowEmployee"), IsShowClient: this.Model.get("filterModel.IsShowClient")
                        };
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
                        controller.salepointControl = view.find("#report-sales-view-salepoint-row");
                        controller.salepointClearControl = view.find("#report-sales-view-salepoint-clear");
                        controller.productControl = view.find("#report-sales-view-product-row");
                        controller.productClearControl = view.find("#report-sales-view-product-clear");
                        controller.employeeControl = view.find("#report-sales-view-employee-row");
                        controller.employeeClearControl = view.find("#report-sales-view-employee-clear");
                        controller.clientControl = view.find("#report-sales-view-client-row");
                        controller.clientClearControl = view.find("#report-sales-view-client-clear");
                        controller.buildButton = view.find("#report-sales-view-btn-build");
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    Object.defineProperty(Index.prototype, "Filter", {
                        get: function () {
                            return this.Model.get("filterModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Index.prototype.columns = function () {
                        var columns = [];
                        if (this.Filter.IsShowSalepoint)
                            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name" });
                        if (this.Filter.IsShowProduct)
                            columns.push({ Header: vars._statres("label$product"), Field: "product.name" });
                        if (this.Filter.IsShowEmployee)
                            columns.push({ Header: vars._statres("label$employee"), Field: "employee.name" });
                        if (this.Filter.IsShowClient)
                            columns.push({ Header: vars._statres("label$client"), Field: "client.name" });
                        columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true });
                        return columns;
                    };
                    Index.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.buildButton)
                            this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);
                        this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
                        this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
                        this.ProductButtonClick = this.createTouchClickEvent(this.productControl, this.productButtonClick);
                        this.ClearProductButtonClick = this.createTouchClickEvent(this.productClearControl, this.clearProductButtonClick);
                        this.EmployeeButtonClick = this.createTouchClickEvent(this.employeeControl, this.employeeButtonClick);
                        this.ClearEmployeeButtonClick = this.createTouchClickEvent(this.employeeClearControl, this.clearEmployeeButtonClick);
                        this.ClientButtonClick = this.createTouchClickEvent(this.clientControl, this.clientButtonClick);
                        this.ClearClientButtonClick = this.createTouchClickEvent(this.clientClearControl, this.clearClientButtonClick);
                    };
                    Index.prototype.destroyEvents = function () {
                        this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
                        this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
                        this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
                        this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
                        this.destroyTouchClickEvent(this.employeeClearControl, this.ClearEmployeeButtonClick);
                        this.destroyTouchClickEvent(this.employeeControl, this.EmployeeButtonClick);
                        this.destroyTouchClickEvent(this.clientClearControl, this.ClearClientButtonClick);
                        this.destroyTouchClickEvent(this.clientControl, this.ClientButtonClick);
                        if (this.buildButton)
                            utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
                        _super.prototype.destroyEvents.call(this);
                    };
                    Index.prototype.salepointButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/salepoint', isModal: true, onLoadController: function (controller) {
                                var ctrlSalepoint = controller;
                                ctrlSalepoint.CardSettings.IsAdd = false;
                                ctrlSalepoint.CardSettings.IsAddCopy = false;
                                ctrlSalepoint.CardSettings.IsDelete = false;
                                ctrlSalepoint.CardSettings.IsEdit = false;
                                ctrlSalepoint.CardSettings.IsSelect = true;
                                ctrlSalepoint.OnSelect = $.proxy(self.selectSalepoint, self);
                            }
                        });
                    };
                    Index.prototype.selectSalepoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("filterModel.salepoint", salepoint);
                        M.updateTextFields();
                    };
                    Index.prototype.clearSalepointButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.salepoint", {});
                        M.updateTextFields();
                        return false;
                    };
                    Index.prototype.productButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/product', isModal: true, onLoadController: function (controller) {
                                var ctrlProduct = controller;
                                ctrlProduct.CardSettings.IsAdd = false;
                                ctrlProduct.CardSettings.IsAddCopy = false;
                                ctrlProduct.CardSettings.IsDelete = false;
                                ctrlProduct.CardSettings.IsEdit = false;
                                ctrlProduct.CardSettings.IsSelect = true;
                                ctrlProduct.OnSelect = $.proxy(self.selectProduct, self);
                            }
                        });
                    };
                    Index.prototype.selectProduct = function (controller) {
                        var product = controller.getSelectedRecord();
                        if (product)
                            this.Model.set("filterModel.product", product);
                        M.updateTextFields();
                    };
                    Index.prototype.clearProductButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.product", {});
                        M.updateTextFields();
                        return false;
                    };
                    Index.prototype.employeeButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/employee', isModal: true, onLoadController: function (controller) {
                                var ctrlEmployee = controller;
                                ctrlEmployee.CardSettings.IsAdd = false;
                                ctrlEmployee.CardSettings.IsAddCopy = false;
                                ctrlEmployee.CardSettings.IsDelete = false;
                                ctrlEmployee.CardSettings.IsEdit = false;
                                ctrlEmployee.CardSettings.IsSelect = true;
                                ctrlEmployee.OnSelect = $.proxy(self.selectEmployee, self);
                            }
                        });
                    };
                    Index.prototype.selectEmployee = function (controller) {
                        var employee = controller.getSelectedRecord();
                        if (employee)
                            this.Model.set("filterModel.employee", employee);
                        M.updateTextFields();
                    };
                    Index.prototype.clearEmployeeButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.employee", {});
                        M.updateTextFields();
                        return false;
                    };
                    Index.prototype.clientButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/client', isModal: true, onLoadController: function (controller) {
                                var ctrlClient = controller;
                                ctrlClient.CardSettings.IsAdd = false;
                                ctrlClient.CardSettings.IsAddCopy = false;
                                ctrlClient.CardSettings.IsDelete = false;
                                ctrlClient.CardSettings.IsEdit = false;
                                ctrlClient.CardSettings.IsSelect = true;
                                ctrlClient.OnSelect = $.proxy(self.selectClient, self);
                            }
                        });
                    };
                    Index.prototype.selectClient = function (controller) {
                        var client = controller.getSelectedRecord();
                        if (client)
                            this.Model.set("filterModel.client", client);
                        M.updateTextFields();
                    };
                    Index.prototype.clearClientButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.client", {});
                        M.updateTextFields();
                        return false;
                    };
                    Index.prototype.buildButtonClick = function (e) {
                        var _this = this;
                        var self = this;
                        _super.prototype.buildButtonClick.call(this, e);
                        this.Service.GetSales(this.Filter, function (responseData) {
                            _this.Model.set("reportModel", responseData);
                            _this.ReportSettings.Columns = _this.columns();
                            _this.setupTable();
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