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

        public GetSalesDetail(model: Interfaces.Model.IReportSaleDetailFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/salesdetail", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetStocks(model: Interfaces.Model.IReportStockFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/stocks", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetStocksDetail(model: Interfaces.Model.IReportStockFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/stocksdetail", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetExpresAnalysisData(model: Interfaces.Model.IReportSaleFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/expressanalysis", RequestData: JSON.stringify(model), Callback: Callback });
        }
        
    }
}