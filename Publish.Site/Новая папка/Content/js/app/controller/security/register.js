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
define(["require", "exports", "app/common/basecontroller", "app/services/accountservice", "app/common/variables", "app/common/utils"], function (require, exports, bc, acc, vars, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Security;
        (function (Security) {
            var Register = /** @class */ (function (_super) {
                __extends(Register, _super);
                function Register() {
                    var _this = _super.call(this) || this;
                    _this.accountService = new acc.Services.AccountService();
                    return _this;
                }
                Register.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/register.html", Id: "app-register" };
                };
                Register.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": "",
                        "labelTitle": vars._statres("button$label$register"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelEmail": vars._statres("label$email"),
                        "labelPassword": vars._statres("label$password"),
                        "labelConfirmPassword": vars._statres("label$confirmPassword"),
                        "labelRegister": vars._statres("button$label$register"),
                    });
                };
                Register.prototype.createEvents = function () {
                    this.RegisterButtonClick = this.createTouchClickEvent("btn-register", this.registerButtonClick);
                };
                Register.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-register", this.RegisterButtonClick);
                };
                Register.prototype.registerButtonClick = function (e) {
                    var controller = this;
                    var model = {
                        phone: $('#register-phone').val()
                    };
                    if (this.validate(model)) {
                        controller.accountService.Register(model, function (responseData) {
                            if (responseData.result == "Ok")
                                vars._app.ShowMessage(vars._statres("label$passwordRecovery"), vars._statres("msg$success$Register"), function () { vars._app.OpenController({ urlController: "security/login" }); });
                            else
                                vars._app.ShowError(responseData);
                        });
                    }
                };
                Register.prototype.validate = function (model) {
                    var validateMessage = '';
                    if (!utils.validatePhone(model.phone))
                        validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$phoneNumberIncorrect');
                    //if (!utils.isNullOrEmpty(model.email) && !utils.validateEmail(model.email))
                    //    validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$invalidEmailAddress');
                    if (validateMessage !== '')
                        vars._showError(validateMessage);
                    return (validateMessage === '');
                };
                return Register;
            }(bc.Controller.Base));
            Security.Register = Register;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("security/register", function (module) { vars._app.SetControlNavigation(vars._app); return new module.Controller.Security.Register(); });
});
//# sourceMappingURL=register.js.map