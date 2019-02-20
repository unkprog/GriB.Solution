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
define(["require", "exports", "app/common/basecontroller", "app/common/basecontrol", "app/services/reportsservice", "app/common/variables", "app/common/utils"], function (require, exports, base, ctrl, svc, vars, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Dashboard;
            (function (Dashboard) {
                var ReportExpressAnalysis = /** @class */ (function (_super) {
                    __extends(ReportExpressAnalysis, _super);
                    function ReportExpressAnalysis() {
                        return _super.call(this) || this;
                    }
                    ReportExpressAnalysis.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/dashboard/expressanalysis.html", Id: "report-expana-view" };
                    };
                    ReportExpressAnalysis.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("report$sales$time"),
                            "filterModel": {},
                            "selectedFields": [],
                            "reportModel": { dayweeks: [], times: [] },
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelShowFields": vars._statres("label$showfields"),
                            "labelSalepoint": vars._statres("label$salePoint"),
                            "labelProduct": vars._statres("label$product"),
                            "labelBuild": vars._statres("label$build"),
                        });
                    };
                    Object.defineProperty(ReportExpressAnalysis.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterSalesTime";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ReportExpressAnalysis.prototype.getDefaultFilter = function () {
                        return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
                    };
                    ReportExpressAnalysis.prototype.getSaveFilter = function () {
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
                    ReportExpressAnalysis.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.dateFromControl = view.find("#report-expana-view-date-start");
                        controller.dateFromControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateToControl = view.find("#report-expana-view-date-end");
                        controller.dateToControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
                        controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));
                        controller.salepointControl = view.find("#report-expana-view-salepoint-row");
                        controller.salepointClearControl = view.find("#report-expana-view-salepoint-clear");
                        controller.productControl = view.find("#report-expana-view-product-row");
                        controller.productClearControl = view.find("#report-expana-view-product-clear");
                        controller.buildButton = view.find("#report-expana-view-btn-build");
                        controller.chartWeeksContainerControl = view.find('#report-expana-week-view-chart-container');
                        controller.chartWeeksControl = view.find('#report-expana-week-view-chart');
                        controller.chartTimesContainerControl = view.find('#report-expana-time-view-chart-container');
                        controller.chartTimesControl = view.find('#report-expana-time-view-chart');
                        controller.tableWeekControl = new ctrl.Control.BaseTable();
                        view.find("#report-expana-week-view-table-container").append(controller.tableWeekControl.InitView());
                        controller.tableTimeControl = new ctrl.Control.BaseTable();
                        view.find("#report-expana-time-view-table-container").append(controller.tableTimeControl.InitView());
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    ReportExpressAnalysis.prototype.ViewShow = function (e) {
                        this.buildButtonClick(e);
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    ReportExpressAnalysis.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        var chartControl = this.chartWeeksContainerControl;
                        if (chartControl && chartControl.length > 0) {
                            var height = $(window).height() / 2; // - chartControl.offset().top - (0.2 * parseFloat(getComputedStyle(chartControl[0]).fontSize)) - 1;
                            if (height < 250)
                                height = 250;
                            chartControl.height(height);
                            chartControl = this.chartTimesContainerControl;
                            if (chartControl && chartControl.length > 0) {
                                chartControl.height(height);
                            }
                        }
                    };
                    ReportExpressAnalysis.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.buildButton)
                            this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);
                        this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
                        this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
                        this.ProductButtonClick = this.createTouchClickEvent(this.productControl, this.productButtonClick);
                        this.ClearProductButtonClick = this.createTouchClickEvent(this.productClearControl, this.clearProductButtonClick);
                        //this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    ReportExpressAnalysis.prototype.destroyEvents = function () {
                        //this.Model.unbind("change");
                        this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
                        this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
                        this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
                        this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
                        if (this.buildButton)
                            utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
                        _super.prototype.destroyEvents.call(this);
                    };
                    ReportExpressAnalysis.prototype.salepointButtonClick = function (e) {
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
                    ReportExpressAnalysis.prototype.selectSalepoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("filterModel.salepoint", salepoint);
                        M.updateTextFields();
                    };
                    ReportExpressAnalysis.prototype.clearSalepointButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.salepoint", {});
                        M.updateTextFields();
                        return false;
                    };
                    ReportExpressAnalysis.prototype.productButtonClick = function (e) {
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
                    ReportExpressAnalysis.prototype.selectProduct = function (controller) {
                        var product = controller.getSelectedRecord();
                        if (product)
                            this.Model.set("filterModel.product", product);
                        M.updateTextFields();
                    };
                    ReportExpressAnalysis.prototype.clearProductButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.product", {});
                        M.updateTextFields();
                        return false;
                    };
                    Object.defineProperty(ReportExpressAnalysis.prototype, "Service", {
                        get: function () {
                            if (!this.reportService)
                                this.reportService = new svc.Services.ReportsService();
                            return this.reportService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ReportExpressAnalysis.prototype.buildButtonClick = function (e) {
                        var self = this;
                        //super.buildButtonClick(e);
                        var filter = self.Filter;
                        this.Service.GetExpresAnalysisData(filter, function (responseData) {
                            self.Model.set("reportModel", responseData);
                            self.setupChart();
                            self.setupTable();
                        });
                    };
                    //private weekNames = ["", vars._statres("label$dayweek$sun"), vars._statres("label$dayweek$mon"), vars._statres("label$dayweek$tue"), vars._statres("label$dayweek$wed"), vars._statres("label$dayweek$thu"), vars._statres("label$dayweek$fri"), vars._statres("label$dayweek$sat") ];
                    ReportExpressAnalysis.prototype.getChartData = function () {
                        var controller = this;
                        var result = {
                            weeks: { labels: [], datasets: [{ type: 'line', label: vars._statres("label$sum"), data: [], borderColor: vars.sumTextColor, backgroundColor: '#64b5f6', fill: false }, { label: vars._statres("label$checks"), data: [], borderColor: vars.checkTextColor, backgroundColor: '#ffb74d' }, { type: 'bar', label: vars._statres("label$positions"), data: [], borderColor: vars.positionTextColor, backgroundColor: '#81c784' }] },
                            times: { labels: [], datasets: [{ type: 'line', label: vars._statres("label$sum"), data: [], borderColor: vars.sumTextColor, backgroundColor: '#64b5f6', fill: false }, { label: vars._statres("label$checks"), data: [], borderColor: vars.checkTextColor, backgroundColor: '#ffb74d' }, { type: 'bar', label: vars._statres("label$positions"), data: [], borderColor: vars.positionTextColor, backgroundColor: '#81c784' }] }
                        };
                        var rowsweek = controller.Model.get("reportModel").dayweeks;
                        for (var i = 0, icount = (rowsweek ? rowsweek.length : 0); i < icount; i++) {
                            result.weeks.labels.push(window.WeekNamesByValue[rowsweek[i].dayweek]);
                            result.weeks.datasets[0].data.push(rowsweek[i].sumpercent);
                            result.weeks.datasets[1].data.push(rowsweek[i].countpercent);
                            result.weeks.datasets[2].data.push(rowsweek[i].countpospercent);
                        }
                        var rowstime = controller.Model.get("reportModel").times;
                        for (var i = 0, icount = (rowstime ? rowstime.length : 0); i < icount; i++) {
                            result.times.labels.push(rowstime[i].time);
                            result.times.datasets[0].data.push(rowstime[i].sumpercent);
                            result.times.datasets[1].data.push(rowstime[i].countpercent);
                            result.times.datasets[2].data.push(rowstime[i].countpospercent);
                        }
                        return result;
                    };
                    ReportExpressAnalysis.prototype.setupChart = function () {
                        var controller = this;
                        var chart = require('chartjs');
                        var chartData = controller.getChartData();
                        if (controller.chartWeeks) {
                            controller.chartWeeks.data = chartData.weeks;
                            controller.chartWeeks.update();
                        }
                        else {
                            var ctx = controller.chartWeeksControl[0].getContext('2d');
                            controller.chartWeeks = new chart(ctx, {
                                type: 'bar',
                                data: chartData.weeks,
                                options: {
                                    maintainAspectRatio: false,
                                    title: {
                                        display: true,
                                        text: vars._statres("label$daysofweek") + ', %'
                                    },
                                    scales: {
                                        yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                    },
                                }
                            });
                        }
                        if (controller.chartTimes) {
                            controller.chartTimes.data = chartData.times;
                            controller.chartTimes.update();
                        }
                        else {
                            var ctx = controller.chartTimesControl[0].getContext('2d');
                            controller.chartTimes = new chart(ctx, {
                                type: 'bar',
                                data: chartData.times,
                                options: {
                                    maintainAspectRatio: false,
                                    title: {
                                        display: true,
                                        text: vars._statres("label$intime") + ', %'
                                    },
                                    scales: {
                                        yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                    },
                                }
                            });
                        }
                    };
                    ReportExpressAnalysis.prototype.setupTable = function () {
                        this.tableWeekControl.Rows = this.Model.get("reportModel").dayweeks;
                        this.tableWeekControl.Columns = [
                            { Header: vars._statres("label$weekday"), Field: "dayweek", FieldTemplate: '#=window.WeekNamesByValue[dayweek]#', IsOrder: true },
                            { Header: vars._statres("label$count$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "count", FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpercent", FieldTemplate: '#=numberToString(countpercent,2)#', FieldStyle: "product-col-sum-auto-rigth check-text-color", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$count$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpos", FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpospercent", FieldTemplate: '#=numberToString(countpospercent,2)#', FieldStyle: "product-col-sum-auto-rigth position-text-color", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sumpercent", FieldTemplate: '#=numberToString(sumpercent,2)#', FieldStyle: "product-col-sum-auto-rigth sum-text-color", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$avg$chek"), HeaderStyle: "product-col-sum-auto-rigth", Field: "avgsum", FieldTemplate: '#=numberToString(avgsum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsNumber: true, IsOrder: true },
                        ];
                        this.tableWeekControl.Setup();
                        this.tableTimeControl.Rows = this.Model.get("reportModel").times;
                        this.tableTimeControl.Columns = [
                            { Header: vars._statres("label$intervaltime"), Field: "time", IsOrder: true },
                            { Header: vars._statres("label$count$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "count", FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpercent", FieldTemplate: '#=numberToString(countpercent,2)#', FieldStyle: "product-col-sum-auto-rigth check-text-color", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$count$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpos", FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpospercent", FieldTemplate: '#=numberToString(countpospercent,2)#', FieldStyle: "product-col-sum-auto-rigth position-text-color", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sumpercent", FieldTemplate: '#=numberToString(sumpercent,2)#', FieldStyle: "product-col-sum-auto-rigth sum-text-color", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$avg$chek"), HeaderStyle: "product-col-sum-auto-rigth", Field: "avgsum", FieldTemplate: '#=numberToString(avgsum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsNumber: true, IsOrder: true },
                        ];
                        this.tableTimeControl.Setup();
                    };
                    return ReportExpressAnalysis;
                }(base.Controller.BaseReportWithFilter));
                Dashboard.ReportExpressAnalysis = ReportExpressAnalysis;
            })(Dashboard = Report.Dashboard || (Report.Dashboard = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/dashboard/expressanalysis", function (module) { return new module.Controller.Report.Dashboard.ReportExpressAnalysis(); });
});
//# sourceMappingURL=expressanalysis.js.map