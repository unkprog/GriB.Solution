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
define(["require", "exports", "app/common/basecontroller", "app/controllers/security/registercontroller", "app/common/variables"], function (require, exports, bc, rc, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controllers;
    (function (Controllers) {
        var Security;
        (function (Security) {
            var LoginController = /** @class */ (function (_super) {
                __extends(LoginController, _super);
                function LoginController(options) {
                    return _super.call(this, options) || this;
                }
                LoginController.prototype.createModel = function () {
                    return {
                        "Header": "POS Cloud",
                        "labelTitle": variables_1._statres("label$autorization"),
                        "labelPhone": variables_1._statres("label$phone"),
                        "labelPassword": variables_1._statres("label$password"),
                        "labelForgot": variables_1._statres("button$label$forgot"),
                        "labelRegister": variables_1._statres("button$label$register"),
                        "labelEnter": variables_1._statres("button$label$enter"),
                    };
                };
                LoginController.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
                    return result;
                };
                LoginController.prototype.ViewShow = function (e) {
                    M.updateTextFields();
                    //$('#app-modal-login').modal();
                    //$('#app-modal-login').modal('open');
                };
                LoginController.prototype.registerButtonClick = function (e) {
                    variables_1._app.OpenView(new rc.Controllers.Security.RegisterController({ Url: "/Content/view/security/register.html", Id: "app-register" }), this);
                };
                return LoginController;
            }(bc.Controllers.BaseController));
            Security.LoginController = LoginController;
        })(Security = Controllers.Security || (Controllers.Security = {}));
    })(Controllers = exports.Controllers || (exports.Controllers = {}));
});
//# sourceMappingURL=logincontroller.js.map