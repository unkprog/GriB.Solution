var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/basecontroller", "app/services/accountservice"], function (require, exports, bc, acc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Security;
        (function (Security) {
            var Account = /** @class */ (function (_super) {
                __extends(Account, _super);
                function Account() {
                    var _this = _super.call(this) || this;
                    _this.accountService = new acc.Services.AccountService();
                    return _this;
                }
                Object.defineProperty(Account.prototype, "AccountService", {
                    get: function () {
                        return this.accountService;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Account;
            }(bc.Controller.Base));
            Security.Account = Account;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=account.js.map