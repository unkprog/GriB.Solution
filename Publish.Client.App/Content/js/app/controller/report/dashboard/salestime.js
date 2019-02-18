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
define(["require", "exports", "app/common/basecontroller", "app/services/reportsservice", "app/common/variables", "app/common/utils"], function (require, exports, base, svc, vars, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Dashboard;
            (function (Dashboard) {
                var ReportSalesTimeDashboard = /** @class */ (function (_super) {
                    __extends(ReportSalesTimeDashboard, _super);
                    function ReportSalesTimeDashboard() {
                        var _this = _super.call(this) || this;
                        _this.weekNames = ["", "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
                        return _this;
                    }
                    ReportSalesTimeDashboard.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/dashboard/salestime.html", Id: "report-dashboard-salestime-view" };
                    };
                    ReportSalesTimeDashboard.prototype.createModel = function () {
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
                    Object.defineProperty(ReportSalesTimeDashboard.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterSalesTime";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ReportSalesTimeDashboard.prototype.getDefaultFilter = function () {
                        return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
                    };
                    ReportSalesTimeDashboard.prototype.getSaveFilter = function () {
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
                    ReportSalesTimeDashboard.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.dateFromControl = view.find("#report-salestime-view-date-start");
                        controller.dateFromControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateToControl = view.find("#report-salestime-view-date-end");
                        controller.dateToControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
                            }
                        });
                        controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
                        controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));
                        controller.salepointControl = view.find("#report-salestime-view-salepoint-row");
                        controller.salepointClearControl = view.find("#report-salestime-view-salepoint-clear");
                        controller.productControl = view.find("#report-salestime-view-product-row");
                        controller.productClearControl = view.find("#report-salestime-view-product-clear");
                        controller.buildButton = view.find("#report-salestime-view-btn-build");
                        controller.chartWeeksContainerControl = view.find('#report-dashboard-salesweek-view-chart-container');
                        controller.chartWeeksControl = view.find('#report-dashboard-salesweek-view-chart');
                        controller.chartTimesContainerControl = view.find('#report-dashboard-salestime-view-chart-container');
                        controller.chartTimesControl = view.find('#report-dashboard-salestime-view-chart');
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    ReportSalesTimeDashboard.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        var chartControl = this.chartWeeksContainerControl;
                        if (chartControl && chartControl.length > 0) {
                            var height = $(window).height() - chartControl.offset().top - (0.2 * parseFloat(getComputedStyle(chartControl[0]).fontSize)) - 1;
                            if (height < 250)
                                height = 250;
                            chartControl.height(height);
                            chartControl = this.chartTimesContainerControl;
                            if (chartControl && chartControl.length > 0) {
                                chartControl.height(height);
                            }
                        }
                    };
                    ReportSalesTimeDashboard.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.buildButton)
                            this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);
                        this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
                        this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
                        this.ProductButtonClick = this.createTouchClickEvent(this.productControl, this.productButtonClick);
                        this.ClearProductButtonClick = this.createTouchClickEvent(this.productClearControl, this.clearProductButtonClick);
                        //this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    ReportSalesTimeDashboard.prototype.destroyEvents = function () {
                        //this.Model.unbind("change");
                        this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
                        this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
                        this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
                        this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
                        if (this.buildButton)
                            utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
                        _super.prototype.destroyEvents.call(this);
                    };
                    ReportSalesTimeDashboard.prototype.salepointButtonClick = function (e) {
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
                    ReportSalesTimeDashboard.prototype.selectSalepoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("filterModel.salepoint", salepoint);
                        M.updateTextFields();
                    };
                    ReportSalesTimeDashboard.prototype.clearSalepointButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.salepoint", {});
                        M.updateTextFields();
                        return false;
                    };
                    ReportSalesTimeDashboard.prototype.productButtonClick = function (e) {
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
                    ReportSalesTimeDashboard.prototype.selectProduct = function (controller) {
                        var product = controller.getSelectedRecord();
                        if (product)
                            this.Model.set("filterModel.product", product);
                        M.updateTextFields();
                    };
                    ReportSalesTimeDashboard.prototype.clearProductButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("filterModel.product", {});
                        M.updateTextFields();
                        return false;
                    };
                    Object.defineProperty(ReportSalesTimeDashboard.prototype, "Service", {
                        get: function () {
                            if (!this.reportService)
                                this.reportService = new svc.Services.ReportsService();
                            return this.reportService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ReportSalesTimeDashboard.prototype.buildButtonClick = function (e) {
                        var self = this;
                        //super.buildButtonClick(e);
                        var filter = self.Filter;
                        this.Service.GetSalesTime(filter, function (responseData) {
                            self.Model.set("reportModel", responseData);
                            //self.ReportSettings.Columns = self.columns();
                            self.setupChart();
                        });
                    };
                    ReportSalesTimeDashboard.prototype.getChartData = function () {
                        var controller = this;
                        var result = {
                            weeks: { labels: [], datasets: [{ label: 'Чеки', data: [], borderColor: '#f44336', backgroundColor: 'transparent' }, { label: 'Позиции', data: [], borderColor: '#2196f3', backgroundColor: 'transparent' }] },
                            times: { labels: [], datasets: [{ label: 'Чеки', data: [], borderColor: '#f44336', backgroundColor: 'transparent' }, { label: 'Позиции', data: [], borderColor: '#2196f3', backgroundColor: 'transparent' }] }
                        };
                        var rowsweek = controller.Model.get("reportModel").dayweeks;
                        for (var i = 0, icount = (rowsweek ? rowsweek.length : 0); i < icount; i++) {
                            result.weeks.labels.push(this.weekNames[rowsweek[i].dayweek]);
                            result.weeks.datasets[0].data.push(rowsweek[i].count);
                            result.weeks.datasets[1].data.push(rowsweek[i].countpos);
                        }
                        var rowstime = controller.Model.get("reportModel").times;
                        for (var i = 0, icount = (rowstime ? rowstime.length : 0); i < icount; i++) {
                            result.times.labels.push(rowstime[i].time);
                            result.times.datasets[0].data.push(rowstime[i].count);
                            result.times.datasets[1].data.push(rowstime[i].countpos);
                        }
                        return result;
                    };
                    ReportSalesTimeDashboard.prototype.setupChart = function () {
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
                                type: 'line',
                                data: chartData.weeks,
                                options: {
                                    maintainAspectRatio: false,
                                    title: {
                                        display: true,
                                        text: 'По дням недели'
                                    },
                                    scales: {
                                        yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                    },
                                    onClick: function (evt) {
                                        var firstPoint = controller.chartWeeks.getElementAtEvent(evt)[0];
                                        if (firstPoint) {
                                            var label = controller.chartWeeks.data.labels[firstPoint._index];
                                            var value = controller.chartWeeks.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                                        }
                                    }
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
                                type: 'line',
                                data: chartData.times,
                                options: {
                                    maintainAspectRatio: false,
                                    title: {
                                        display: true,
                                        text: 'По времении'
                                    },
                                    scales: {
                                        yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                    },
                                    onClick: function (evt) {
                                        var firstPoint = controller.chartTimes.getElementAtEvent(evt)[0];
                                        if (firstPoint) {
                                            var label = controller.chartTimes.data.labels[firstPoint._index];
                                            var value = controller.chartTimes.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                                        }
                                    }
                                }
                            });
                        }
                    };
                    return ReportSalesTimeDashboard;
                }(base.Controller.BaseReportWithFilter));
                Dashboard.ReportSalesTimeDashboard = ReportSalesTimeDashboard;
            })(Dashboard = Report.Dashboard || (Report.Dashboard = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/dashboard/salestime", function (module) { return new module.Controller.Report.Dashboard.ReportSalesTimeDashboard(); });
});
//# sourceMappingURL=salestime.js.map