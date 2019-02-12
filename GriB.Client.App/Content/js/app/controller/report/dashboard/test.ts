import base = require('app/common/basecontroller');
import svc = require('app/services/reportsservice');
import vars = require('app/common/variables');

export namespace Controller.Report.Dashboard {
    export class ReportTestDashboard extends base.Controller.BaseReportWithFilter {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/dashboard/test.html", Id: "report-dashboard-test-view" };
        }

        private chartControl: JQuery;
        private chartContainerControl: JQuery;

        public ViewInit(view: JQuery): boolean {

            let controller = this;
            let result: boolean = super.ViewInit(view);

            var Chart = require('chartjs');

            controller.chartContainerControl = view.find('#report-dashboard-test-view-chart-container');
            controller.chartControl = view.find('#report-dashboard-test-view-chart');
            var ctx: any = (controller.chartControl[0] as any).getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            return result;

        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            let chartControl: JQuery = this.chartContainerControl;
            if (chartControl && chartControl.length > 0) {
                chartControl.height($(window).height() - chartControl.offset().top - (0.2 * parseFloat(getComputedStyle(chartControl[0]).fontSize)) - 1);
            }
        }
    }
}

vars.registerController("report/dashboard/test", function (module: any): Interfaces.IController { return new module.Controller.Report.Dashboard.ReportTestDashboard(); });