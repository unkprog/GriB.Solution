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
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("report$expressanalysis"));
                        return _this;
                    }
                    ReportExpressAnalysis.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/dashboard/expressanalysis.html", Id: "report-expana-view" };
                    };
                    ReportExpressAnalysis.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("report$sales$time"),
                            "filterModel": {},
                            "reportModel": { dayweeks: [], times: [] },
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelShowFields": vars._statres("label$showfields"),
                            "labelSalepoint": vars._statres("label$salePoint"),
                            "labelProduct": vars._statres("label$product"),
                            "labelBuild": vars._statres("label$build"),
                            "labelRevenueByCategory": vars._statres("label$revenue$bycategory"),
                            "labelDaysOfWeek": vars._statres("label$revenue$daysofweek") + ', %',
                            "labelInTime": vars._statres("label$revenue$intime") + ', %',
                        });
                    };
                    Object.defineProperty(ReportExpressAnalysis.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterSalesExpressAnalysis";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ReportExpressAnalysis.prototype.getDefaultFilter = function () {
                        return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, category: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
                    };
                    Object.defineProperty(ReportExpressAnalysis.prototype, "Filter", {
                        get: function () {
                            return this.Model.get("filterModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
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
                        controller.tableCategoriesControl = new ctrl.Control.BaseTable();
                        controller.tableCategoriesControl.OnDetalize = $.proxy(controller.OnDetalizeCategories, controller);
                        view.find("#report-expana-categories-view-table-container").append(controller.tableCategoriesControl.InitView());
                        controller.tableWeekControl = new ctrl.Control.BaseTable();
                        controller.tableWeekControl.OnDetalize = $.proxy(controller.OnDetalizeDayWeek, controller);
                        view.find("#report-expana-week-view-table-container").append(controller.tableWeekControl.InitView());
                        controller.tableTimeControl = new ctrl.Control.BaseTable();
                        controller.tableTimeControl.OnDetalize = $.proxy(controller.OnDetalizeTime, controller);
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
                        vars._app.ShowLoading();
                        //super.buildButtonClick(e);
                        var filter = self.Filter;
                        this.Service.GetExpresAnalysisData(filter, function (responseData) {
                            self.Model.set("reportModel", responseData);
                            self.setupChart();
                            self.setupTable();
                            vars._app.HideLoading();
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
                                    //title: {
                                    //    display: true,
                                    //    text: vars._statres("label$daysofweek") + ', %'
                                    //},
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
                                    //title: {
                                    //    display: true,
                                    //    text: vars._statres("label$intime") + ', %'
                                    //},
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
                        this.tableCategoriesControl.Rows = this.Model.get("reportModel").categories;
                        this.tableCategoriesControl.Columns = [
                            { Header: vars._statres("label$category"), Field: "categoryname", IsOrder: true },
                            { Header: vars._statres("label$quantityshort"), HeaderStyle: "product-col-sum-auto-rigth", Field: "quantity", FieldTemplate: '#=numberToString(quantity, 0)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth #if(sumzone===4){# grade-30 #} else if(sumzone===3){# grade-50 #} else if(sumzone===2){# grade-70 #} else if(sumzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sumpercent", FieldTemplate: '#=numberToString(sumpercent,2)#', FieldStyle: "product-col-sum-auto-rigth #if(sumzone===4){# grade-30 #} else if(sumzone===3){# grade-50 #} else if(sumzone===2){# grade-70 #} else if(sumzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                        ];
                        this.tableCategoriesControl.Setup();
                        this.tableWeekControl.Rows = this.Model.get("reportModel").dayweeks;
                        this.tableWeekControl.Columns = [
                            { Header: vars._statres("label$weekday"), Field: "dayweek", FieldTemplate: '#=window.WeekNamesByValue[dayweek]#', IsOrder: true },
                            { Header: vars._statres("label$count$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "count", FieldStyle: "product-col-sum-auto-rigth #if(countzone===4){# grade-30 #} else if(countzone===3){# grade-50 #} else if(countzone===2){# grade-70 #} else if(countzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpercent", FieldTemplate: '#=numberToString(countpercent,2)#', FieldStyle: "product-col-sum-auto-rigth check-text-color #if(countzone===4){# grade-30 #} else if(countzone===3){# grade-50 #} else if(countzone===2){# grade-70 #} else if(countzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$count$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpos", FieldStyle: "product-col-sum-auto-rigth #if(countposzone===4){# grade-30 #} else if(countposzone===3){# grade-50 #} else if(countposzone===2){# grade-70 #} else if(countposzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpospercent", FieldTemplate: '#=numberToString(countpospercent,2)#', FieldStyle: "product-col-sum-auto-rigth position-text-color #if(countposzone===4){# grade-30 #} else if(countposzone===3){# grade-50 #} else if(countposzone===2){# grade-70 #} else if(countposzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth #if(sumzone===4){# grade-30 #} else if(sumzone===3){# grade-50 #} else if(sumzone===2){# grade-70 #} else if(sumzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sumpercent", FieldTemplate: '#=numberToString(sumpercent,2)#', FieldStyle: "product-col-sum-auto-rigth sum-text-color #if(sumzone===4){# grade-30 #} else if(sumzone===3){# grade-50 #} else if(sumzone===2){# grade-70 #} else if(sumzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$avg$chek"), HeaderStyle: "product-col-sum-auto-rigth", Field: "avgsum", FieldTemplate: '#=numberToString(avgsum,2)#', FieldStyle: "product-col-sum-auto-rigth #if(avgsumzone===4){# grade-30 #} else if(avgsumzone===3){# grade-50 #} else if(avgsumzone===2){# grade-70 #} else if(avgsumzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                        ];
                        this.tableWeekControl.Setup();
                        this.tableTimeControl.Rows = this.Model.get("reportModel").times;
                        this.tableTimeControl.Columns = [
                            { Header: vars._statres("label$intervaltime"), Field: "time", IsOrder: true },
                            { Header: vars._statres("label$count$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "count", FieldStyle: "product-col-sum-auto-rigth #if(countzone===4){# grade-30 #} else if(countzone===3){# grade-50 #} else if(countzone===2){# grade-70 #} else if(countzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpercent", FieldTemplate: '#=numberToString(countpercent,2)#', FieldStyle: "product-col-sum-auto-rigth check-text-color #if(countzone===4){# grade-30 #} else if(countzone===3){# grade-50 #} else if(countzone===2){# grade-70 #} else if(countzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$count$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpos", FieldStyle: "product-col-sum-auto-rigth #if(countposzone===4){# grade-30 #} else if(countposzone===3){# grade-50 #} else if(countposzone===2){# grade-70 #} else if(countposzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpospercent", FieldTemplate: '#=numberToString(countpospercent,2)#', FieldStyle: "product-col-sum-auto-rigth position-text-color #if(countposzone===4){# grade-30 #} else if(countposzone===3){# grade-50 #} else if(countposzone===2){# grade-70 #} else if(countposzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth #if(sumzone===4){# grade-30 #} else if(sumzone===3){# grade-50 #} else if(sumzone===2){# grade-70 #} else if(sumzone===1){# grade-85 #} else {# grade-other #}#", IsSum: true, IsOrder: true },
                            { Header: vars._statres("label$percent$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sumpercent", FieldTemplate: '#=numberToString(sumpercent,2)#', FieldStyle: "product-col-sum-auto-rigth sum-text-color #if(sumzone===4){# grade-30 #} else if(sumzone===3){# grade-50 #} else if(sumzone===2){# grade-70 #} else if(sumzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                            { Header: vars._statres("label$avg$chek"), HeaderStyle: "product-col-sum-auto-rigth", Field: "avgsum", FieldTemplate: '#=numberToString(avgsum,2)#', FieldStyle: "product-col-sum-auto-rigth #if(avgsumzone===4){# grade-30 #} else if(avgsumzone===3){# grade-50 #} else if(avgsumzone===2){# grade-70 #} else if(avgsumzone===1){# grade-85 #} else {# grade-other #}#", IsNumber: true, IsOrder: true },
                        ];
                        this.tableTimeControl.Setup();
                    };
                    ReportExpressAnalysis.prototype.OnDetalizeCategories = function (row) {
                        var self = this;
                        var curfilter = self.Filter;
                        var item = row;
                        var category = { id: item.id };
                        vars._app.OpenController({
                            urlController: 'report/sales/detalize', isModal: true, onLoadController: function (controller) {
                                var ctrlDetalize = controller;
                                var time = item.time;
                                if (time && time.length > 1)
                                    time = time.substring(0, 2);
                                var filter = {
                                    datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.client, product: curfilter.product, dayweek: 0, time: time, category: category
                                };
                                if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0)
                                    filter.salepoint = item.salepoint;
                                if (item.product && item.product.id && item.product.id !== 0)
                                    filter.product = item.product;
                                ctrlDetalize.Model.set("filterModel", filter);
                            }
                        });
                    };
                    ReportExpressAnalysis.prototype.OnDetalizeDayWeek = function (row) {
                        var self = this;
                        var curfilter = self.Filter;
                        var item = row;
                        vars._app.OpenController({
                            urlController: 'report/sales/detalize', isModal: true, onLoadController: function (controller) {
                                var ctrlDetalize = controller;
                                var time = item.time;
                                if (time && time.length > 1)
                                    time = time.substring(0, 2);
                                var filter = {
                                    datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.client, product: curfilter.product, dayweek: item.dayweek, time: '', category: undefined
                                };
                                if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0)
                                    filter.salepoint = item.salepoint;
                                if (item.product && item.product.id && item.product.id !== 0)
                                    filter.product = item.product;
                                ctrlDetalize.Model.set("filterModel", filter);
                            }
                        });
                    };
                    ReportExpressAnalysis.prototype.OnDetalizeTime = function (row) {
                        var self = this;
                        var curfilter = self.Filter;
                        var item = row;
                        vars._app.OpenController({
                            urlController: 'report/sales/detalize', isModal: true, onLoadController: function (controller) {
                                var ctrlDetalize = controller;
                                var time = item.time;
                                if (time && time.length > 1)
                                    time = time.substring(0, 2);
                                var filter = {
                                    datefrom: curfilter.datefrom, dateto: curfilter.dateto,
                                    salepoint: curfilter.salepoint, employee: curfilter.employee, client: curfilter.client, product: curfilter.product, category: undefined,
                                    dayweek: 0, time: time
                                };
                                if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0)
                                    filter.salepoint = item.salepoint;
                                if (item.product && item.product.id && item.product.id !== 0)
                                    filter.product = item.product;
                                ctrlDetalize.Model.set("filterModel", filter);
                            }
                        });
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