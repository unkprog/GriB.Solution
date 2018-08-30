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
            var TestController = /** @class */ (function (_super) {
                __extends(TestController, _super);
                function TestController() {
                    return _super.call(this) || this;
                }
                TestController.prototype.createOptions = function () {
                    return { Url: "/Content/view/security/test.html", Id: "app-test" };
                };
                TestController.prototype.createModel = function () {
                    return {
                        "Header": "",
                        "labelTitle": vars._statres("button$label$register"),
                        "labelPhone": vars._statres("label$phone"),
                        "labelEmail": vars._statres("label$email"),
                        "labelRegister": vars._statres("button$label$register"),
                    };
                };
                TestController.prototype.ViewInit = function (view) {
                    //let result: boolean = super.ViewInit(view);
                    //this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
                    //this.loadSettings();
                    return true;
                };
                return TestController;
            }(bc.Controllers.BaseController));
            Security.TestController = TestController;
        })(Security = Controllers.Security || (Controllers.Security = {}));
    })(Controllers = exports.Controllers || (exports.Controllers = {}));
});
//# sourceMappingURL=testcontroller.js.map