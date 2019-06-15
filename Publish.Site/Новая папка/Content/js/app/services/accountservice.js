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
        var AccountService = /** @class */ (function (_super) {
            __extends(AccountService, _super);
            function AccountService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(AccountService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/account' };
                },
                enumerable: true,
                configurable: true
            });
            AccountService.prototype.Register = function (model, Callback) {
                this.PostApi({ Action: "/register", RequestData: JSON.stringify(model), Callback: Callback });
            };
            AccountService.prototype.Recovery = function (model, Callback) {
                this.PostApi({ Action: "/recovery", RequestData: JSON.stringify(model), Callback: Callback });
            };
            AccountService.prototype.Login = function (model, Callback) {
                this.PostApi({ Action: "/login", RequestData: JSON.stringify(model), Callback: Callback });
            };
            AccountService.prototype.AccountData = function (Callback) {
                this.GetApi({ Action: "/accountdata", Callback: Callback });
            };
            return AccountService;
        }(base.Services.BaseService));
        Services.AccountService = AccountService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=accountservice.js.map