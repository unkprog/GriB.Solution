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
            var Forgot = /** @class */ (function (_super) {
                __extends(Forgot, _super);
                function Forgot() {
                    return _super.call(this) || this;
                }
                Forgot.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/test.html", Id: "app-test" };
                };
                Forgot.prototype.createModel = function () {
                    return {
                        "Header": "",
                        "labelTitle": vars._statres("button$label$register"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelEmail": vars._statres("label$email"),
                        "labelRegister": vars._statres("button$label$register"),
                    };
                };
                return Forgot;
            }(bc.Controller.Base));
            Security.Forgot = Forgot;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=forgot.js.map