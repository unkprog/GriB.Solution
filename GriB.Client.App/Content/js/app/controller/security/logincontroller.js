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
define(["require", "exports", "app/common/basecontroller", "app/common/variables"], function (require, exports, bc, vars) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controllers;
    (function (Controllers) {
        var Security;
        (function (Security) {
            var LoginController = /** @class */ (function (_super) {
                __extends(LoginController, _super);
                function LoginController() {
                    return _super.call(this) || this;
                }
                LoginController.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/login.html", Id: "app-login" };
                };
                LoginController.prototype.createModel = function () {
                    return {
                        "Header": "POS Cloud",
                        "labelTitle": vars._statres("label$autorization"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelPassword": vars._statres("label$password"),
                        "labelForgot": vars._statres("button$label$forgot"),
                        "labelRegister": vars._statres("button$label$register"),
                        "labelEnter": vars._statres("button$label$enter"),
                    };
                };
                LoginController.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
                    this.ForgotButtonClick = this.createClick("btn-forgot", this.forgotButtonClick, this);
                    return result;
                };
                LoginController.prototype.ViewShow = function (e) {
                    M.updateTextFields();
                };
                LoginController.prototype.registerButtonClick = function (e) {
                    //vars._app.OpenView(new rc.Controllers.Security.RegisterController(), this);
                    vars._app.OpenController({ Url: "security/registercontroller", getController: function (module) { return new module.Controllers.Security.RegisterController(); } }, this);
                };
                LoginController.prototype.forgotButtonClick = function (e) {
                    vars._app.OpenController({ Url: "security/testcontroller", getController: function (module) { return new module.Controllers.Security.TestController(); } }, this);
                };
                return LoginController;
            }(bc.Controllers.BaseController));
            Security.LoginController = LoginController;
        })(Security = Controllers.Security || (Controllers.Security = {}));
    })(Controllers = exports.Controllers || (exports.Controllers = {}));
});
//# sourceMappingURL=logincontroller.js.map