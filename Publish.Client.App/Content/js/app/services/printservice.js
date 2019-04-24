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
define(["require", "exports", "app/common/baseservice"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var PrintService = /** @class */ (function (_super) {
            __extends(PrintService, _super);
            function PrintService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(PrintService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/print' };
                },
                enumerable: true,
                configurable: true
            });
            PrintService.prototype.PrintCheck = function (pskey, document, Callback, Error) {
                this.PostApi({ Action: "/printcheck", RequestData: JSON.stringify({ pskey: pskey, document: document }), Callback: Callback, Error: Error });
            };
            return PrintService;
        }(base.Services.BaseService));
        Services.PrintService = PrintService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=printservice.js.map