﻿import base = require('app/common/basecontroller');
import svc = require('app/services/reportsservice');
import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Report.Dashboard {
    export class ReportSalesTimeDashboard extends base.Controller.BaseReportWithFilter {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/dashboard/salestime.html", Id: "report-dashboard-salestime-view" };
        }


        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("report$sales$time"),
                "filterModel": {},
                "selectedFields": [],
                "labelDateFrom": vars._statres("label$date$from"),
                "labelDateTo": vars._statres("label$date$to"),
                "labelShowFields": vars._statres("label$showfields"),
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelProduct": vars._statres("label$product"),
                "labelBuild": vars._statres("label$build"),
            });
        }

        protected get FilterName(): string {
            return "reportFilterSalesTime";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportSaleFilter {
            return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint: true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
        }

        protected getSaveFilter(): string {
            let controller = this;
            let _datefrom: Date = controller.Model.get("filterModel.datefrom");
            let _dateto: Date = controller.Model.get("filterModel.dateto");
            let filterToSave = {
                datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto)
                , salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"), employee: this.Model.get("filterModel.employee"), client: this.Model.get("filterModel.client")
                , IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct"), IsShowEmployee: this.Model.get("filterModel.IsShowEmployee"), IsShowClient: this.Model.get("filterModel.IsShowClient")
            };
            return JSON.stringify(filterToSave);

        }

        private dateFromControl: JQuery;
        private dateToControl: JQuery;
        protected salepointControl: JQuery;
        private salepointClearControl: JQuery;
        protected productControl: JQuery;
        private productClearControl: JQuery;

        private buildButton: JQuery;
        private chartWeeksControl: JQuery;
        private chartWeeksContainerControl: JQuery;
        private chartTimesControl: JQuery;
        private chartTimesContainerControl: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controller = this;
          
            controller.dateFromControl = view.find("#report-salestime-view-date-start");
            controller.dateFromControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                }
            });
            controller.dateToControl = view.find("#report-salestime-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
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
           

            let result: boolean = super.ViewInit(view);
            return result;

        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            let chartControl: JQuery = this.chartWeeksContainerControl;

            if (chartControl && chartControl.length > 0) {
                let height = $(window).height() - chartControl.offset().top - (0.2 * parseFloat(getComputedStyle(chartControl[0]).fontSize)) - 1;
                if (height < 250) height = 250;
                chartControl.height(height);
                chartControl = this.chartTimesContainerControl;
                if (chartControl && chartControl.length > 0) {
                    chartControl.height(height);
                }
            }
        }

        public createEvents(): void {
            super.createEvents();
            if (this.buildButton) this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);

            this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
            this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
            this.ProductButtonClick = this.createTouchClickEvent(this.productControl, this.productButtonClick);
            this.ClearProductButtonClick = this.createTouchClickEvent(this.productClearControl, this.clearProductButtonClick);
            //this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        public destroyEvents(): void {
            //this.Model.unbind("change");
            this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
            this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
            this.destroyTouchClickEvent(this.productClearControl, this.ClearProductButtonClick);
            this.destroyTouchClickEvent(this.productControl, this.ProductButtonClick);
            if (this.buildButton) utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
            super.destroyEvents();
        }

        public SalepointButtonClick: { (e: any): void; };
        private salepointButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/salepoint', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlSalepoint: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlSalepoint.CardSettings.IsAdd = false;
                    ctrlSalepoint.CardSettings.IsAddCopy = false;
                    ctrlSalepoint.CardSettings.IsDelete = false;
                    ctrlSalepoint.CardSettings.IsEdit = false;
                    ctrlSalepoint.CardSettings.IsSelect = true;
                    ctrlSalepoint.OnSelect = $.proxy(self.selectSalepoint, self);
                }
            });
        }

        private selectSalepoint(controller: Interfaces.IControllerCard) {
            let salepoint: Interfaces.Model.ISalepoint = controller.getSelectedRecord() as Interfaces.Model.ISalepoint;
            if (salepoint)
                this.Model.set("filterModel.salepoint", salepoint);
            M.updateTextFields();
        }

        public ClearSalepointButtonClick: { (e: any): void; };
        private clearSalepointButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.salepoint", {});
            M.updateTextFields();
            return false;
        }

        public ProductButtonClick: { (e: any): void; };
        private productButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/product', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlProduct: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlProduct.CardSettings.IsAdd = false;
                    ctrlProduct.CardSettings.IsAddCopy = false;
                    ctrlProduct.CardSettings.IsDelete = false;
                    ctrlProduct.CardSettings.IsEdit = false;
                    ctrlProduct.CardSettings.IsSelect = true;
                    ctrlProduct.OnSelect = $.proxy(self.selectProduct, self);
                }
            });
        }

        private selectProduct(controller: Interfaces.IControllerCard) {
            let product: Interfaces.Model.IProduct = controller.getSelectedRecord() as Interfaces.Model.IProduct;
            if (product)
                this.Model.set("filterModel.product", product);
            M.updateTextFields();
        }

        public ClearProductButtonClick: { (e: any): void; };
        private clearProductButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.product", {});
            M.updateTextFields();
            return false;
        }

        private reportService: svc.Services.ReportsService;
        protected get Service(): svc.Services.ReportsService {
            if (!this.reportService)
                this.reportService = new svc.Services.ReportsService();
            return this.reportService;
        }

        public BuildButtonClick: { (e: any): void; };
        protected buildButtonClick(e) {
            let self = this;
            //super.buildButtonClick(e);
            let filter: Interfaces.Model.IReportSaleFilter = self.Filter as Interfaces.Model.IReportSaleFilter;
            this.Service.GetSalesTime(filter, (responseData: any) => {
                self.Model.set("reportModel", responseData);
                //self.ReportSettings.Columns = self.columns();
                self.setupChart();
            });
        }

        private weekNames = ["", vars._statres("label$dayweek$sun"), vars._statres("label$dayweek$mon"), vars._statres("label$dayweek$tue"), vars._statres("label$dayweek$wed"), vars._statres("label$dayweek$thu"), vars._statres("label$dayweek$fri"), vars._statres("label$dayweek$sat") ];
        private getChartData(): any {
            let controller = this;
            let result = {
                weeks: { labels: [], datasets: [{ label: vars._statres("label$checks"), data: [], borderColor: '#f44336', backgroundColor: 'transparent' }, { label: vars._statres("label$positions"), data: [], borderColor: '#2196f3', backgroundColor: 'transparent' }] },
                times: { labels: [], datasets: [{ label: vars._statres("label$checks"), data: [], borderColor: '#f44336', backgroundColor: 'transparent' }, { label: vars._statres("label$positions"), data: [], borderColor: '#2196f3', backgroundColor: 'transparent' }] }
            };

            let rowsweek: Array<any> = controller.Model.get("reportModel").dayweeks;
            for (let i = 0, icount = (rowsweek ? rowsweek.length : 0); i < icount; i++) {
                result.weeks.labels.push(this.weekNames[rowsweek[i].dayweek]);
                result.weeks.datasets[0].data.push(rowsweek[i].count);
                result.weeks.datasets[1].data.push(rowsweek[i].countpos);
            }

            let rowstime: Array<any> = controller.Model.get("reportModel").times;
            for (let i = 0, icount = (rowstime ? rowstime.length : 0); i < icount; i++) {
                result.times.labels.push(rowstime[i].time);
                result.times.datasets[0].data.push(rowstime[i].count);
                result.times.datasets[1].data.push(rowstime[i].countpos);
            }
            return result;
        }

        private chartTimes: any;
        private chartWeeks: any;
        protected setupChart() {
            let controller = this;
            let chart = require('chartjs');
            let chartData: any = controller.getChartData();

            if (controller.chartWeeks) {
                controller.chartWeeks.data = chartData.weeks;
                controller.chartWeeks.update();
            }
            else {
                let ctx: any = (controller.chartWeeksControl[0] as any).getContext('2d');
                controller.chartWeeks = new chart(ctx, {
                    type: 'line',
                    data: chartData.weeks,
                    options: {
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: vars._statres("label$daysofweek")
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        //onClick: function (evt) {
                        //    let firstPoint = controller.chartWeeks.getElementAtEvent(evt)[0];

                        //    if (firstPoint) {
                        //        var label = controller.chartWeeks.data.labels[firstPoint._index];
                        //        var value = controller.chartWeeks.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                        //    }
                        //}
                    }
                });
            }

            if (controller.chartTimes) {
                controller.chartTimes.data = chartData.times;
                controller.chartTimes.update();
            }
            else {
                let ctx: any = (controller.chartTimesControl[0] as any).getContext('2d');
                controller.chartTimes = new chart(ctx, {
                    type: 'line',
                    data: chartData.times,
                    options: {
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: vars._statres("label$intime")
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                        //onClick: function (evt) {
                        //    let firstPoint = controller.chartTimes.getElementAtEvent(evt)[0];

                        //    if (firstPoint) {
                        //        var label = controller.chartTimes.data.labels[firstPoint._index];
                        //        var value = controller.chartTimes.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                        //    }
                        //}
                    }
                });
            }
        }
    }
}

vars.registerController("report/dashboard/salestime", function (module: any): Interfaces.IController { return new module.Controller.Report.Dashboard.ReportSalesTimeDashboard(); });