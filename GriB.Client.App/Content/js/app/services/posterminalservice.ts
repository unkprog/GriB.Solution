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

        public CheckDelete(check: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_delete", RequestData: { check: check }, Callback: Callback });
        }

        public CheckOpened(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_opened", Callback: Callback });
        }

        public AddToCheck(check: number, product: number, quantity: number, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_add_pos", RequestData: JSON.stringify( { check: check, product: product, quantity: quantity }), Callback: Callback });
        }
    }
}