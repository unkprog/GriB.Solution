import base = require('app/common/basecontroller');
import ctrl = require('app/common/basecontrol');
import svc = require('app/services/reportsservice');
import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Report.Dashboard {
    export class ReportExpressAnalysis extends base.Controller.BaseReportWithFilter {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/dashboard/expressanalysis.html", Id: "report-expana-view" };
        }


        protected createModel(): kendo.data.ObservableObject {
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

        private tableWeekControl: Interfaces.Control.IControlTable;
        private tableTimeControl: Interfaces.Control.IControlTable;

        public ViewInit(view: JQuery): boolean {
            let controller = this;
          
            controller.dateFromControl = view.find("#report-expana-view-date-start");
            controller.dateFromControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                }
            });
            controller.dateToControl = view.find("#report-expana-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
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

            let result: boolean = super.ViewInit(view);
            return result;

        }

        public ViewShow(e): boolean {
            this.buildButtonClick(e);
            return super.ViewShow(e);
        }
       

        public ViewResize(e: any): void {
            super.ViewResize(e);
            let chartControl: JQuery = this.chartWeeksContainerControl;

            if (chartControl && chartControl.length > 0) {
                let height = $(window).height() /2 ;// - chartControl.offset().top - (0.2 * parseFloat(getComputedStyle(chartControl[0]).fontSize)) - 1;
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
            this.Service.GetExpresAnalysisData(filter, (responseData: any) => {
                self.Model.set("reportModel", responseData);
                self.setupChart();
                self.setupTable();
            });
        }

        //private weekNames = ["", vars._statres("label$dayweek$sun"), vars._statres("label$dayweek$mon"), vars._statres("label$dayweek$tue"), vars._statres("label$dayweek$wed"), vars._statres("label$dayweek$thu"), vars._statres("label$dayweek$fri"), vars._statres("label$dayweek$sat") ];
        private getChartData(): any {
            let controller = this;
            let result = {
                weeks: { labels: [], datasets: [{ type: 'line', label: vars._statres("label$sum"), data: [], borderColor: vars.sumTextColor, backgroundColor: '#64b5f6', fill: false }, { label: vars._statres("label$checks"), data: [], borderColor: vars.checkTextColor, backgroundColor: '#ffb74d' }, { type: 'bar', label: vars._statres("label$positions"), data: [], borderColor: vars.positionTextColor, backgroundColor: '#81c784' }] },
                times: { labels: [], datasets: [{ type: 'line', label: vars._statres("label$sum"), data: [], borderColor: vars.sumTextColor, backgroundColor: '#64b5f6', fill: false }, { label: vars._statres("label$checks"), data: [], borderColor: vars.checkTextColor, backgroundColor: '#ffb74d' }, { type: 'bar', label: vars._statres("label$positions"), data: [], borderColor: vars.positionTextColor, backgroundColor: '#81c784' }] }
            };

            let rowsweek: Array<any> = controller.Model.get("reportModel").dayweeks;
            for (let i = 0, icount = (rowsweek ? rowsweek.length : 0); i < icount; i++) {
                result.weeks.labels.push(window.WeekNamesByValue[rowsweek[i].dayweek]);
                result.weeks.datasets[0].data.push(rowsweek[i].sumpercent);
                result.weeks.datasets[1].data.push(rowsweek[i].countpercent);
                result.weeks.datasets[2].data.push(rowsweek[i].countpospercent);
            }

            let rowstime: Array<any> = controller.Model.get("reportModel").times;
            for (let i = 0, icount = (rowstime ? rowstime.length : 0); i < icount; i++) {
                result.times.labels.push(rowstime[i].time);
                result.times.datasets[0].data.push(rowstime[i].sumpercent);
                result.times.datasets[1].data.push(rowstime[i].countpercent);
                result.times.datasets[2].data.push(rowstime[i].countpospercent);
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


        protected setupTable() {
            this.tableWeekControl.Rows = this.Model.get("reportModel").dayweeks;
            this.tableWeekControl.Columns = [
                { Header: vars._statres("label$weekday"), Field: "dayweek", FieldTemplate: '#=window.WeekNamesByValue[dayweek]#', IsOrder: true },
                { Header: vars._statres("label$count$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "count", FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                { Header: vars._statres("label$percent$cheks"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpercent", FieldTemplate: '#=numberToString(countpercent,2)#', FieldStyle: "product-col-sum-auto-rigth check-text-color", IsNumber: true, IsOrder: true },
                { Header: vars._statres("label$count$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpos", FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                { Header: vars._statres("label$percent$positions"), HeaderStyle: "product-col-sum-auto-rigth", Field: "countpospercent", FieldTemplate: '#=numberToString(countpospercent,2)#', FieldStyle: "product-col-sum-auto-rigth position-text-color", IsNumber: true, IsOrder: true },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true },
                { Header: vars._statres("label$percent$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sumpercent", FieldTemplate: '#=numberToString(sumpercent,2)#', FieldStyle: "product-col-sum-auto-rigth sum-text-color", IsNumber: true, IsOrder: true },
                { Header: vars._statres("label$avg$chek"), HeaderStyle: "product-col-sum-auto-rigth", Field: "avgsum", FieldTemplate: '#=numberToString(avgsum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsNumber:true, IsOrder: true },
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
        }
    }
}

vars.registerController("report/dashboard/expressanalysis", function (module: any): Interfaces.IController { return new module.Controller.Report.Dashboard.ReportExpressAnalysis(); });