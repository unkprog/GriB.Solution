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
define(["require", "exports", "app/common/basecontroller", "app/common/variables"], function (require, exports, base, vars) {
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
                        return _super.call(this) || this;
                    }
                    ReportSalesTimeDashboard.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/dashboard/salestime.html", Id: "report-dashboard-salestime-view" };
                    };
                    ReportSalesTimeDashboard.prototype.ViewInit = function (view) {
                        var controller = this;
                        var result = _super.prototype.ViewInit.call(this, view);
                        var Chart = require('chartjs');
                        controller.chartContainerControl = view.find('#report-dashboard-salestime-view-chart-container');
                        controller.chartControl = view.find('#report-dashboard-salestime-view-chart');
                        var ctx = controller.chartControl[0].getContext('2d');
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
                    };
                    ReportSalesTimeDashboard.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        var chartControl = this.chartContainerControl;
                        if (chartControl && chartControl.length > 0) {
                            chartControl.height($(window).height() - chartControl.offset().top - (0.2 * parseFloat(getComputedStyle(chartControl[0]).fontSize)) - 1);
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