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
            POSTerminalService.prototype.GetSaleProducts = function (posparams, Callback) {
                this.GetApi({ Action: "/sale_products", RequestData: posparams, Callback: Callback });
            };
            POSTerminalService.prototype.CheckNew = function (Callback) {
                this.GetApi({ Action: "/check_new", Callback: Callback });
            };
            POSTerminalService.prototype.CheckDelete = function (check, Callback) {
                this.GetApi({ Action: "/check_delete", RequestData: { check: check }, Callback: Callback });
            };
            POSTerminalService.prototype.CheckOpened = function (Callback) {
                this.GetApi({ Action: "/check_opened", Callback: Callback });
            };
            POSTerminalService.prototype.AddToCheck = function (check, product, quantity, Callback) {
                this.PostApi({ Action: "/check_add_pos", RequestData: JSON.stringify({ check: check, product: product, quantity: quantity }), Callback: Callback });
            };
            return POSTerminalService;
        }(base.Services.BaseService));
        Services.POSTerminalService = POSTerminalService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=posterminalservice.js.map