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
define(["require", "exports", "app/common/baseservice"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var RegisterService = /** @class */ (function (_super) {
            __extends(RegisterService, _super);
            function RegisterService(options) {
                return _super.call(this, options) || this;
            }
            RegisterService.prototype.RegisterUser = function (model, Callback) {
                this.PostApi({ Action: "/registerUser", RequestData: JSON.stringify(model), Callback: Callback });
            };
            return RegisterService;
        }(base.Services.BaseService));
        Services.RegisterService = RegisterService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=registerservice.js.map