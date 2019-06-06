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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/security/account"], function (require, exports, vars, utils, acc) {
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
                        "Header": "POS Cloud Admin",
                        "labelTitle": vars._statres("label$autorization"),
                        "labelLogin": vars._statres("label$login"),
                        "labelPassword": vars._statres("label$password"),
                        "labelEnter": vars._statres("button$label$enter"),
                    });
                };
                Login.prototype.createEvents = function () {
                    this.LoginButtonClick = this.createTouchClickEvent("btn-login", this.loginButtonClick);
                };
                Login.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-login", this.LoginButtonClick);
                };
                Login.prototype.loginButtonClick = function (e) {
                    vars._app.ShowLoading();
                    var controller = this;
                    var model = {
                        phone: $('#login-phone').val(),
                        pass: $('#login-pass').val()
                    };
                    // TODO: Заглушка на демо-вход
                    if (utils.isNullOrEmpty(model.phone) && utils.isNullOrEmpty(model.pass)) {
                        model.phone = "admin";
                        model.pass = "1";
                    }
                    if (this.validate(model)) {
                        controller.AccountService.Login(model, function (responseData) {
                            if (responseData.result == "Ok") {
                                vars._identity = responseData.indetity;
                                vars._app.OpenController({ urlController: "main" });
                            }
                            else
                                vars._app.ShowError(responseData.error);
                        });
                    }
                    else
                        vars._app.HideLoading();
                };
                Login.prototype.validate = function (model) {
                    var result = true;
                    //if (!utils.validatePhone(model.phone)) {
                    //    M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
                    //    result = false;
                    //}
                    //if (utils.isNullOrEmpty(model.pass)) {
                    //    M.toast({ html: vars._statres('msg$error$invalidPassword') });
                    //    result = false;
                    //}
                    return result;
                };
                return Login;
            }(acc.Controller.Security.Account));
            Security.Login = Login;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("security/login", function (module) { vars._app.SetControlNavigation(vars._app); return new module.Controller.Security.Login(); });
});
//# sourceMappingURL=login.js.map