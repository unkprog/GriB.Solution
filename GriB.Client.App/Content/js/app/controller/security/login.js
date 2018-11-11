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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/security/account", "app/common/variables"], function (require, exports, vars, utils, acc, variables_1) {
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
                    return new kendo.data.ObservableObject({
                        "Header": "POS Cloud",
                        "labelTitle": vars._statres("label$autorization"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelPassword": vars._statres("label$password"),
                        "labelForgot": vars._statres("button$label$forgot"),
                        "labelRegister": vars._statres("button$label$register"),
                        "labelEnter": vars._statres("button$label$enter"),
                    });
                };
                Login.prototype.createEvents = function () {
                    this.LoginButtonClick = this.createClickEvent("btn-login", this.loginButtonClick);
                    this.RegisterButtonClick = this.createClickEvent("btn-register", this.registerButtonClick);
                    this.ForgotButtonClick = this.createClickEvent("btn-forgot", this.forgotButtonClick);
                };
                Login.prototype.destroyEvents = function () {
                    this.destroyClickEvent("btn-login", this.LoginButtonClick);
                    this.destroyClickEvent("btn-register", this.RegisterButtonClick);
                    this.destroyClickEvent("btn-forgot", this.ForgotButtonClick);
                };
                Login.prototype.loginButtonClick = function (e) {
                    var controller = this;
                    var model = {
                        phone: $('#login-phone').val(),
                        pass: $('#login-pass').val()
                    };
                    if (this.validate(model)) {
                        controller.AccountService.Login(model, function (responseData) {
                            if (responseData.result == "Ok") {
                                vars._identity = responseData.indetity;
                                variables_1._app.OpenController({ urlController: "main" });
                            }
                            else
                                variables_1._app.ShowError(responseData.error);
                        });
                    }
                };
                Login.prototype.validate = function (model) {
                    var result = true;
                    if (!utils.validatePhone(model.phone)) {
                        M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
                        result = false;
                    }
                    if (utils.isNullOrEmpty(model.pass)) {
                        M.toast({ html: vars._statres('msg$error$invalidPassword') });
                        result = false;
                    }
                    return result;
                };
                Login.prototype.registerButtonClick = function (e) {
                    vars._app.OpenController({ urlController: "security/register", backController: this });
                };
                Login.prototype.forgotButtonClick = function (e) {
                    vars._app.OpenController({ urlController: "security/recovery", backController: this });
                };
                return Login;
            }(acc.Controller.Security.Account));
            Security.Login = Login;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=login.js.map