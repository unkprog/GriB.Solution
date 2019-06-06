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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/report/basereport"], function (require, exports, vars, utils, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Cash;
            (function (Cash) {
                var Index = /** @class */ (function (_super) {
                    __extends(Index, _super);
                    function Index() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("report$cash"));
                        return _this;
                    }
                    Index.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/cash/index.html", Id: "report-cash-view" };
                    };
                    Index.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "filterModel": {},
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelShowFields": vars._statres("label$showfields"),
                            "labelSalepoint": vars._statres("label$salePoint"),
                            "labelBuild": vars._statres("label$build"),
                        });
                    };
                    Object.defineProperty(Index.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterCash";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Index.prototype.getDefaultFilter = function () {
                        return {
                            datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined
                        };
                    };
                    Index.prototype.getSaveFilter = function () {
                        var controller = this;
                        var _datefrom = controller.Model.get("filterModel.datefrom");
                        var _dateto = controller.Model.get("filterModel.dateto");
                        var filterToSave = {
                            datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto),
                            salepoint: this.Model.get("filterModel.salepoint")
                        };
                        return JSON.stringify(filterToSave);
                    };
                    Index.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.dateFromControl = view.find("#report-cash-view-date-start");
                        controller.dateFromControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateToControl = view.find("#report-cash-view-date-end");
                        controller.dateToControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
                        controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));
                        controller.salepointControl = view.find("#report-cash-view-salepoint-row");
                        controller.salepointClearControl = view.find("#report-cash-view-salepoint-clear");
                        controller.buildButton = view.find("#report-cash-view-btn-build");
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
                            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
                            columns.push({ Header: vars._statres("label$beginofperiod"), HeaderGroupName: vars._statres("label$beginofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumBeg", FieldTemplate: '#=numberToString(sumBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                            columns.push({ Header: vars._statres("label$arrival"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumDeb", FieldTemplate: '#=numberToString(sumDeb,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                            columns.push({ Header: vars._statres("label$expense"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumCre", FieldTemplate: '#=numberToString(sumCre,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
                            columns.push({ Header: vars._statres("label$endofperiod"), HeaderGroupName: vars._statres("label$endofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumEnd", FieldTemplate: '#=numberToString(sumEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true });
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
                    };
                    Index.prototype.destroyEvents = function () {
                        this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
                        this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
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
                    Index.prototype.buildButtonClick = function (e) {
                        var self = this;
                        _super.prototype.buildButtonClick.call(this, e);
                        var filter = self.Filter;
                        this.Service.GetCash(filter, function (responseData) {
                            self.SetupTable(responseData);
                        });
                    };
                    Index.prototype.OnDetalize = function (row) {
                        var self = this;
                        var curfilter = self.Filter;
                        var item = row;
                        vars._app.OpenController({
                            urlController: 'report/cash/detalize', isModal: true, onLoadController: function (controller) {
                                var ctrlDetalize = controller;
                                var filter = { datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint };
                                if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0)
                                    filter.salepoint = item.salepoint;
                                ctrlDetalize.Model.set("filterModel", filter);
                            }
                        });
                    };
                    return Index;
                }(base.Controller.Report.ReportWithService));
                Cash.Index = Index;
            })(Cash = Report.Cash || (Report.Cash = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/cash/index", function (module) { return new module.Controller.Report.Cash.Index(); });
});
//# sourceMappingURL=index.js.map