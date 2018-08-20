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
define(["require", "exports", "app/common/basecontroller", "app/services/registerservice", "app/common/variables"], function (require, exports, bc, rs, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controllers;
    (function (Controllers) {
        var Security;
        (function (Security) {
            var RegisterController = /** @class */ (function (_super) {
                __extends(RegisterController, _super);
                function RegisterController(options) {
                    var _this = _super.call(this, options) || this;
                    _this.registerService = new rs.Services.RegisterService(null);
                    return _this;
                }
                RegisterController.prototype.createModel = function () {
                    return {
                        "Header": "",
                        "labelTitle": variables_1._statres("button$label$register"),
                        "labelPhone": variables_1._statres("label$phone"),
                        "labelRegister": variables_1._statres("button$label$register"),
                    };
                };
                RegisterController.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    //this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
                    this.loadSettings();
                    return false;
                };
                RegisterController.prototype.loadSettings = function () {
                    this.registerService.GetSR(function (e) {
                    });
                };
                return RegisterController;
            }(bc.Controllers.BaseController));
            Security.RegisterController = RegisterController;
        })(Security = Controllers.Security || (Controllers.Security = {}));
    })(Controllers = exports.Controllers || (exports.Controllers = {}));
});
//# sourceMappingURL=registercontroller.js.map