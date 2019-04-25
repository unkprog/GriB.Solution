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
define(["require", "exports", "app/common/baseservice"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var POSTerminalService = /** @class */ (function (_super) {
            __extends(POSTerminalService, _super);
            function POSTerminalService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(POSTerminalService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/posterminal' };
                },
                enumerable: true,
                configurable: true
            });
            POSTerminalService.prototype.Enter = function (Callback) {
                this.GetApi({ Action: "/enter", Callback: Callback });
            };
            POSTerminalService.prototype.Change = function (salepoint, Callback) {
                this.GetApi({ Action: "/change", RequestData: { salepoint: salepoint }, Callback: Callback });
            };
            POSTerminalService.prototype.ChangeNew = function (salepoint, Callback) {
                this.GetApi({ Action: "/change_new", RequestData: { salepoint: salepoint }, Callback: Callback });
            };
            POSTerminalService.prototype.ChangeClose = function (id, Callback) {
                this.GetApi({ Action: "/change_close", RequestData: { id: id }, Callback: Callback });
            };
            POSTerminalService.prototype.ChangeSumInCash = function (salepoint, Callback) {
                this.GetApi({ Action: "/change_sumincash", RequestData: { salepoint: salepoint }, Callback: Callback });
            };
            POSTerminalService.prototype.GetSaleProducts = function (posparams, Callback) {
                this.GetApi({ Action: "/sale_products", RequestData: posparams, Callback: Callback });
            };
            POSTerminalService.prototype.CheckNew = function (salepoint, change, Callback) {
                this.GetApi({ Action: "/check_new", RequestData: { salepoint: salepoint, change: change }, Callback: Callback });
            };
            POSTerminalService.prototype.CheckDelete = function (check, Callback) {
                this.GetApi({ Action: "/check_delete", RequestData: { check: check }, Callback: Callback });
            };
            POSTerminalService.prototype.CheckOpened = function (salepoint, chagne, Callback) {
                this.GetApi({ Action: "/check_opened", RequestData: { salepoint: salepoint, chagne: chagne }, Callback: Callback });
            };
            POSTerminalService.prototype.GetCheckHistory = function (id, Callback) {
                this.GetApi({ Action: "/check_history", RequestData: { id: id }, Callback: Callback });
            };
            POSTerminalService.prototype.CheckSetClient = function (check, client, Callback) {
                this.PostApi({ Action: "/check_setclient", RequestData: JSON.stringify({ check: check, client: client }), Callback: Callback });
            };
            POSTerminalService.prototype.CheckSetDiscount = function (check, discountref, Callback) {
                this.PostApi({ Action: "/check_setdiscount", RequestData: JSON.stringify({ check: check, discount: (discountref ? discountref.value : 0), discountref: (discountref ? discountref.id : 0) }), Callback: Callback });
            };
            POSTerminalService.prototype.CheckSetComment = function (check, comment, Callback) {
                this.PostApi({ Action: "/check_setcomment", RequestData: JSON.stringify({ check: check, comment: comment }), Callback: Callback });
            };
            POSTerminalService.prototype.CheckCancel = function (check, comment, Callback) {
                this.PostApi({ Action: "/check_cancel", RequestData: JSON.stringify({ check: check, comment: comment }), Callback: Callback });
            };
            POSTerminalService.prototype.AddToCheck = function (check, product, quantity, Callback) {
                this.PostApi({ Action: "/check_add_pos", RequestData: JSON.stringify({ check: check, product: product, quantity: quantity }), Callback: Callback });
            };
            POSTerminalService.prototype.EditPosCheck = function (check, product, quantity, Callback) {
                this.PostApi({ Action: "/check_edit_pos", RequestData: JSON.stringify({ check: check, product: product, quantity: quantity }), Callback: Callback });
            };
            POSTerminalService.prototype.CheckClose = function (checkParamsClose, Callback) {
                this.PostApi({ Action: "/check_close", RequestData: JSON.stringify(checkParamsClose), Callback: Callback });
            };
            POSTerminalService.prototype.GetPrinters = function (salepoint, Callback) {
                this.GetApi({ Action: "/getprinters", RequestData: { salepoint: salepoint }, Callback: Callback });
            };
            return POSTerminalService;
        }(base.Services.BaseService));
        Services.POSTerminalService = POSTerminalService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=posterminalservice.js.map