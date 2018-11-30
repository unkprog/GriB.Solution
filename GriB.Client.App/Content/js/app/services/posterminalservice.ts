import base = require("app/common/baseservice");

export namespace Services {
    export class POSTerminalService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/posterminal' };
        }

        public Enter(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/enter", Callback: Callback });
        }

        public GetSaleProducts(posparams: Interfaces.Model.IPosParamsSelect, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/sale_products", RequestData: posparams, Callback: Callback });
        }

        public CheckNew(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_new", Callback: Callback });
        }

        public CheckOpened(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_opened", Callback: Callback });
        }
    }
}