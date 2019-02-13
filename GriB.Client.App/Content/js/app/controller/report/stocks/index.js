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
                var Index = /** @class */ (function (_super) {
                    __extends(Index, _super);
                    function Index() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("report$stocks"));
                        return _this;
                    }
                    Index.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/stocks/index.html", Id: "report-stocks-view" };
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
                            "labelBuild": vars._statres("label$build"),
                        });
                    };
                    Object.defineProperty(Index.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterStock";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Index.prototype.getDefaultFilter = function () {
                        return {
                            datefrom: utils.dateToday(), dateto: utils.dateToday(), salepoint: undefined, product: undefined, IsShowSalepoint: true, IsShowProduct: false
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
                        controller.dateFromControl = view.find("#report-stocks-view-date-start");
                        controller.dateFromControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.datefrom", newDate);
                            }
                        });
                        controller.dateToControl = view.find("#report-stocks-view-date-end");
                        controller.dateToControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.dateto", newDate);
                            }
                        });
                        controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
                        controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));
                        controller.showFieldsControl = view.find("#report-stocks-view-showfields");
                        controller.salepointControl = view.find("#report-stocks-view-salepoint-row");
                        controller.salepointClearControl = view.find("#report-stocks-view-salepoint-clear");
                        controller.productControl = view.find("#report-stocks-view-product-row");
                        controller.productClearControl = view.find("#report-stocks-view-product-clear");
                        controller.buildButton = view.find("#report-stocks-view-btn-build");
                        var selectedFields = [];
                        var filter = this.Model.get("filterModel");
                        if (filter.IsShowSalepoint)
                            selectedFields.push(1);
                        if (filter.IsShowProduct)
                            selectedFields.push(2);
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
                    Index.prototype.columns = function () {
                        var columns = [];
                        if (this.Filter.IsShowSalepoint)
                            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
                        if (this.Filter.IsShowProduct)
                            columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity$deb$beg"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDebBeg", FieldTemplate: '#=numberToString(quantityDebBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity$cre$beg"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCreBeg", FieldTemplate: '#=numberToString(quantityCreBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity$deb"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDeb", FieldTemplate: '#=numberToString(quantityDeb,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity$cre"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCre", FieldTemplate: '#=numberToString(quantityCre,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity$deb$end"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityDebEnd", FieldTemplate: '#=numberToString(quantityDebEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                        columns.push({ Header: vars._statres("label$quantity$cre$end"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantityCreEnd", FieldTemplate: '#=numberToString(quantityCreEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
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
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    Index.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
                        this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
                        this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
                        this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
                        this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
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
                            if (selectedFields) {
                                for (var i = 0, icount = selectedFields.length; i < icount; i++) {
                                    if (selectedFields[i] == 1)
                                        filter.IsShowSalepoint = true;
                                    else if (selectedFields[i] == 2)
                                        filter.IsShowProduct = true;
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
                    Index.prototype.buildButtonClick = function (e) {
                        var self = this;
                        _super.prototype.buildButtonClick.call(this, e);
                        this.Service.GetStocks(self.Filter, function (responseData) {
                            self.Model.set("reportModel", responseData);
                            self.ReportSettings.Columns = self.columns();
                            self.setupTable();
                        });
                    };
                    Index.prototype.OnDetalize = function (e) {
                        var self = this;
                        var curfilter = self.Filter;
                        var index = +e.currentTarget.id.replace('table-row-', '');
                        var item = this.Model.get("reportModel")[index];
                        //vars._app.OpenController({
                        //    urlController: 'report/sales/detalize', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        //        let ctrlDetalize: Interfaces.IControllerReport = controller as Interfaces.IControllerReport;
                        //        let filter: Interfaces.Model.IReportSaleFilter = {
                        //            datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.employee, product: curfilter.product
                        //        }
                        //        if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0) filter.salepoint = item.salepoint;
                        //        if (item.employee && item.employee.id && item.employee.id !== 0) filter.employee = item.employee;
                        //        if (item.client && item.client.id && item.client.id !== 0) filter.client = item.client;
                        //        if (item.product && item.product.id && item.product.id !== 0) filter.product = item.product;
                        //        ctrlDetalize.Model.set("filterModel", filter);
                        //    }
                        //});
                    };
                    return Index;
                }(base.Controller.Report.ReportWithService));
                Stocks.Index = Index;
            })(Stocks = Report.Stocks || (Report.Stocks = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/stocks/index", function (module) { return new module.Controller.Report.Stocks.Index(); });
});
//# sourceMappingURL=index.js.map