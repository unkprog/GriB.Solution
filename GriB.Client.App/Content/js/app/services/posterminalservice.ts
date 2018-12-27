﻿import base = require("app/common/baseservice");

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

        public CheckNew(salepoint: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_new", RequestData: { salepoint: salepoint }, Callback: Callback });
        }

        public CheckDelete(check: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_delete", RequestData: { check: check }, Callback: Callback });
        }

        public CheckOpened(salepoint: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_opened", RequestData: { salepoint: salepoint }, Callback: Callback });
        }

        public CheckSetClient(check: number, client: number, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_setclient", RequestData: JSON.stringify({ check: check, client: client }), Callback: Callback });
        }

        public CheckSetDiscount(check: number, discount: number, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_setdiscount", RequestData: JSON.stringify({ check: check, discount: discount }), Callback: Callback });
        }

        public CheckSetComment(check: number, comment: string, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_setcomment", RequestData: JSON.stringify({ check: check, comment: comment }), Callback: Callback });
        }

        public CheckCancel(check: number, comment: string, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_cancel", RequestData: JSON.stringify({ check: check, comment: comment }), Callback: Callback });
        }

        public AddToCheck(check: number, product: number, quantity: number, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_add_pos", RequestData: JSON.stringify({ check: check, product: product, quantity: quantity }), Callback: Callback });
        }

        public CheckClose(checkParamsClose: Interfaces.Model.ICheckCloseParams, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_close", RequestData: JSON.stringify(checkParamsClose), Callback: Callback });
        }
    }
}