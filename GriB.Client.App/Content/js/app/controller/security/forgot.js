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
define(["require", "exports", "app/common/variables", "app/controller/security/account", "app/common/utils"], function (require, exports, vars, acc, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Security;
        (function (Security) {
            var Forgot = /** @class */ (function (_super) {
                __extends(Forgot, _super);
                function Forgot() {
                    return _super.call(this) || this;
                }
                Forgot.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/forgot.html", Id: "app-forgot" };
                };
                Forgot.prototype.createModel = function () {
                    return {
                        "Header": "",
                        "labelTitle": vars._statres("label$passwordRecovery"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelRecover": vars._statres("label$recover"),
                    };
                };
                Forgot.prototype.createEvents = function () {
                    this.RecoveryButtonClick = this.createClickEvent("btn-recovery", this.recoveryButtonClick);
                };
                Forgot.prototype.destroyEvents = function () {
                    this.destroyClickEvent("btn-recovery", this.RecoveryButtonClick);
                };
                Forgot.prototype.recoveryButtonClick = function (e) {
                    var controller = this;
                    var model = {
                        regtype: 0,
                        phone: $('#recovery-phone').val(),
                        email: ''
                    };
                    if (this.validate(model)) {
                        controller.AccountService.Recovery(model, function (responseData) {
                        });
                    }
                };
                Forgot.prototype.validate = function (model) {
                    var validateMessage = '';
                    if (!utils.validatePhone(model.phone))
                        validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$phoneNumberIncorrect');
                    if (validateMessage !== '')
                        vars._showError(validateMessage);
                    return (validateMessage === '');
                };
                return Forgot;
            }(acc.Controller.Security.Account));
            Security.Forgot = Forgot;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=forgot.js.map