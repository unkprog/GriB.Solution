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
                            "selectedFields": [],
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelShowFields": vars._statres("label$showfields"),
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
                        return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
                    };
                    Index.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.dateFromControl = view.find("#report-sales-view-date-start");
                        controller.dateFromControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateToControl = view.find("#report-sales-view-date-end");
                        controller.dateToControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateFromControl.val(controller.Model.get("filterModel.datefrom"));
                        controller.dateToControl.val(controller.Model.get("filterModel.dateto"));
                        controller.showFieldsControl = view.find("#report-sales-view-showfields");
                        controller.salepointControl = view.find("#report-sales-view-salepoint-row");
                        controller.salepointClearControl = view.find("#report-sales-view-salepoint-clear");
                        controller.productControl = view.find("#report-sales-view-product-row");
                        controller.productClearControl = view.find("#report-sales-view-product-clear");
                        controller.employeeControl = view.find("#report-sales-view-employee-row");
                        controller.employeeClearControl = view.find("#report-sales-view-employee-clear");
                        controller.clientControl = view.find("#report-sales-view-client-row");
                        controller.clientClearControl = view.find("#report-sales-view-client-clear");
                        controller.buildButton = view.find("#report-sales-view-btn-build");
                        var selectedFields = [];
                        var filter = this.Model.get("filterModel");
                        if (filter.IsShowSalepoint)
                            selectedFields.push(1);
                        if (filter.IsShowProduct)
                            selectedFields.push(2);
                        if (filter.IsShowEmployee)
                            selectedFields.push(3);
                        if (filter.IsShowClient)
                            selectedFields.push(4);
                        this.Model.set("selectedFields", selectedFields);
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    Index.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        //try {
                        //    this.showFieldsControl.formSelect();
                        //}
                        //catch (ex) {
                        //    console.log(JSON.stringify( ex));
                        //}
                    };
                    Index.prototype.ViewShow = function (e) {
                        this.showFieldsControl.formSelect();
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Object.defineProperty(Index.prototype, "Filter", {
                        get: function () {
                            return this.Model.get("filterModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Index.prototype, "Columns", {
                        get: function () {
                            var columns = [];
                            if (this.Filter.IsShowSalepoint)
                                columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
                            if (this.Filter.IsShowProduct)
                                columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });
                            if (this.Filter.IsShowEmployee)
                                columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
                            if (this.Filter.IsShowClient)
                                columns.push({ Header: vars._statres("label$client"), Field: "client.name", IsOrder: true });
                            columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                            columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true });
                            return columns;
                        },
                        enumerable: true,
                        configurable: true
                    });
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
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    Index.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
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
                    Index.prototype.changeModel = function (e) {
                        if (e.field === "selectedFields") {
                            var selectedFields = this.Model.get("selectedFields");
                            var filter = this.Model.get("filterModel");
                            filter.IsShowSalepoint = false;
                            filter.IsShowProduct = false;
                            filter.IsShowEmployee = false;
                            filter.IsShowClient = false;
                            if (selectedFields) {
                                for (var i = 0, icount = selectedFields.length; i < icount; i++) {
                                    if (selectedFields[i] == 1)
                                        filter.IsShowSalepoint = true;
                                    else if (selectedFields[i] == 2)
                                        filter.IsShowProduct = true;
                                    else if (selectedFields[i] == 3)
                                        filter.IsShowEmployee = true;
                                    else if (selectedFields[i] == 4)
                                        filter.IsShowClient = true;
                                }
                            }
                            this.Model.set("filterModel", filter);
                        }
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
                        var self = this;
                        _super.prototype.buildButtonClick.call(this, e);
                        var filter = self.Filter;
                        this.Service.GetSales(filter, function (responseData) {
                            self.SetupTable(responseData);
                        });
                    };
                    Index.prototype.OnDetalize = function (row) {
                        var self = this;
                        var curfilter = self.Filter;
                        var item = row;
                        vars._app.OpenController({
                            urlController: 'report/sales/detalize', isModal: true, onLoadController: function (controller) {
                                var ctrlDetalize = controller;
                                var filter = {
                                    datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.client, product: curfilter.product
                                };
                                if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0)
                                    filter.salepoint = item.salepoint;
                                if (item.employee && item.employee.id && item.employee.id !== 0)
                                    filter.employee = item.employee;
                                if (item.client && item.client.id && item.client.id !== 0)
                                    filter.client = item.client;
                                if (item.product && item.product.id && item.product.id !== 0)
                                    filter.product = item.product;
                                ctrlDetalize.Model.set("filterModel", filter);
                            }
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