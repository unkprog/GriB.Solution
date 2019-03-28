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

        public GetCash(model: Interfaces.Model.IReportBaseFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/cash", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetCashDetail(model: Interfaces.Model.IReportBaseFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/cashdetail", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetExpresAnalysisData(model: Interfaces.Model.IReportSaleFilter, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/expressanalysis", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetHistorySales(change:number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/historysales", RequestData: { change: change }, Callback: Callback });
        }

        public GetChangeSales(change: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/changesales", RequestData: { change: change }, Callback: Callback });
        }
    }
}