var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../basecontroller"], function (require, exports, bc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var controllers;
    (function (controllers) {
        var security;
        (function (security) {
            var LoginController = /** @class */ (function (_super) {
                __extends(LoginController, _super);
                function LoginController(options) {
                    return _super.call(this, options) || this;
                }
                LoginController.prototype.createModel = function () {
                    return {
                        "Header": ""
                    };
                };
                return LoginController;
            }(bc.controllers.BaseController));
            security.LoginController = LoginController;
        })(security = controllers.security || (controllers.security = {}));
    })(controllers = exports.controllers || (exports.controllers = {}));
});
//# sourceMappingURL=logincontroller.js.map