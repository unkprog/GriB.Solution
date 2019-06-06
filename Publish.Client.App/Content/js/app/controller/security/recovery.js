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
            var Recovery = /** @class */ (function (_super) {
                __extends(Recovery, _super);
                function Recovery() {
                    return _super.call(this) || this;
                }
                Recovery.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/recovery.html", Id: "app-recovery" };
                };
                Recovery.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": "",
                        "labelTitle": vars._statres("label$passwordRecovery"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelRecover": vars._statres("label$recover"),
                    });
                };
                Recovery.prototype.createEvents = function () {
                    this.RecoveryButtonClick = this.createTouchClickEvent("btn-recovery", this.recoveryButtonClick);
                };
                Recovery.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-recovery", this.RecoveryButtonClick);
                };
                Recovery.prototype.recoveryButtonClick = function (e) {
                    var controller = this;
                    var model = {
                        phone: $('#recovery-phone').val(),
                    };
                    if (this.validate(model)) {
                        controller.AccountService.Recovery(model, function (responseData) {
                            if (responseData.result == "Ok")
                                vars._app.ShowMessage(vars._statres("label$passwordRecovery"), vars._statres("msg$success$Recovery"), function () { vars._app.OpenController({ urlController: "security/login" }); });
                            else
                                vars._app.ShowError(responseData);
                        });
                    }
                };
                Recovery.prototype.validate = function (model) {
                    var validateMessage = '';
                    if (!utils.validatePhone(model.phone))
                        validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$phoneNumberIncorrect');
                    if (validateMessage !== '')
                        vars._showError(validateMessage);
                    return (validateMessage === '');
                };
                return Recovery;
            }(acc.Controller.Security.Account));
            Security.Recovery = Recovery;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("security/recovery", function (module) { vars._app.SetControlNavigation(vars._app); return new module.Controller.Security.Recovery(); });
});
//# sourceMappingURL=recovery.js.map