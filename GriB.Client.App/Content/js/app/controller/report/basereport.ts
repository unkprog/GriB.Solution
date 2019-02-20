import base = require('app/common/basecontroller');
import svc = require('app/services/reportsservice');

export namespace Controller.Report {
    export class ReportWithService extends base.Controller.BaseReportTable {
        constructor() {
            super();
        }

        private reportService: svc.Services.ReportsService;
        protected get Service(): svc.Services.ReportsService {
            if (!this.reportService)
                this.reportService = new svc.Services.ReportsService();
            return this.reportService;
        }
    }
}