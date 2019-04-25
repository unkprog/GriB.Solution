import base = require("app/common/baseservice");

export namespace Services {
    export class POSTerminalService extends base.Services.BaseService implements Interfaces.IPOSTerminalService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/posterminal' };
        }

        public Enter(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/enter", Callback: Callback });
        }

        public Change(salepoint: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/change", RequestData: { salepoint: salepoint }, Callback: Callback });
        }

        public ChangeNew(salepoint: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/change_new", RequestData: { salepoint: salepoint }, Callback: Callback });
        }

        public ChangeClose(id: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/change_close", RequestData: { id: id }, Callback: Callback });
        }

        public ChangeSumInCash(salepoint: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/change_sumincash", RequestData: { salepoint: salepoint }, Callback: Callback });
        }
        
        public GetSaleProducts(posparams: Interfaces.Model.IPosParamsSelect, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/sale_products", RequestData: posparams, Callback: Callback });
        }

        public CheckNew(salepoint: number, change: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_new", RequestData: { salepoint: salepoint, change: change}, Callback: Callback });
        }

        public CheckDelete(check: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_delete", RequestData: { check: check }, Callback: Callback });
        }

        public CheckOpened(salepoint: number, chagne: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_opened", RequestData: { salepoint: salepoint, chagne: chagne}, Callback: Callback });
        }

        public GetCheckHistory(id: number,Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/check_history", RequestData: { id: id }, Callback: Callback });
        }

        public CheckSetClient(check: number, client: number, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_setclient", RequestData: JSON.stringify({ check: check, client: client }), Callback: Callback });
        }

        public CheckSetDiscount(check: number, discountref: Interfaces.Model.IDiscountModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_setdiscount", RequestData: JSON.stringify({ check: check, discount: (discountref ? discountref.value : 0), discountref: (discountref ? discountref.id : 0) }), Callback: Callback });
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

        public EditPosCheck(check: number, product: number, quantity: number, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_edit_pos", RequestData: JSON.stringify({ check: check, product: product, quantity: quantity }), Callback: Callback });
        }

        public CheckClose(checkParamsClose: Interfaces.Model.ICheckCloseParams, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/check_close", RequestData: JSON.stringify(checkParamsClose), Callback: Callback });
        }

        public GetPrinters(salepoint: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/getprinters", RequestData: { salepoint: salepoint }, Callback: Callback });
        }
    }
}