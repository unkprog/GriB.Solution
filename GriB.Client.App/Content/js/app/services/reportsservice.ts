import base = require("app/common/baseservice");

export module Services {
    export class ReportsService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/reports' };
        }

        public GetSales(model: Interfaces.Model.IReportSaleFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/sales", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetSalesDetail(model: Interfaces.Model.IReportSaleFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/salesdetail", RequestData: JSON.stringify(model), Callback: Callback });
        }
    }
}