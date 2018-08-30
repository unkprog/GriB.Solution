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
define(["require", "exports", "app/common/basecontroller", "app/services/registerservice", "app/common/variables"], function (require, exports, bc, rs, vars) {
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
                    _this.registerService = new rs.Services.RegisterService(null);
                    return _this;
                }
                Register.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/register.html", Id: "app-register" };
                };
                Register.prototype.createModel = function () {
                    return {
                        "Header": "",
                        "labelTitle": vars._statres("button$label$register"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelEmail": vars._statres("label$email"),
                        "labelRegister": vars._statres("button$label$register"),
                    };
                };
                Register.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
                    this.loadSettings();
                    return false;
                };
                Register.prototype.loadSettings = function () {
                    //this.registerService.GetSR((e) => {
                    //});
                };
                Register.prototype.registerButtonClick = function (e) {
                    //vars._app.OpenView(new rs.Controllers.Security.RegisterController({ Url: "/Content/view/security/register.html", Id: "app-register" }), this);
                };
                return Register;
            }(bc.Controller.Base));
            Security.Register = Register;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=register.js.map