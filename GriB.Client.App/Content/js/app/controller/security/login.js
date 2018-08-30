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
    var Controller;
    (function (Controller) {
        var Security;
        (function (Security) {
            var Login = /** @class */ (function (_super) {
                __extends(Login, _super);
                function Login() {
                    return _super.call(this) || this;
                }
                Login.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/login.html", Id: "app-login" };
                };
                Login.prototype.createModel = function () {
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
                Login.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
                    this.ForgotButtonClick = this.createClick("btn-forgot", this.forgotButtonClick, this);
                    return result;
                };
                Login.prototype.ViewShow = function (e) {
                    M.updateTextFields();
                };
                Login.prototype.registerButtonClick = function (e) {
                    //vars._app.OpenView(new rc.Controllers.Security.RegisterController(), this);
                    vars._app.OpenController({ Url: "security/register", getController: function (module) { return new module.Controller.Security.Register(); } }, this);
                };
                Login.prototype.forgotButtonClick = function (e) {
                    vars._app.OpenController({ Url: "security/test", getController: function (module) { return new module.Controller.Security.Test(); } }, this);
                };
                return Login;
            }(bc.Controller.Base));
            Security.Login = Login;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=login.js.map