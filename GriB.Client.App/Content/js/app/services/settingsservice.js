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
        var SettingsService = /** @class */ (function (_super) {
            __extends(SettingsService, _super);
            function SettingsService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(SettingsService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/settings' };
                },
                enumerable: true,
                configurable: true
            });
            SettingsService.prototype.GetSettings = function (Callback) {
                this.GetApi({ Action: "/settings", Callback: Callback });
            };
            SettingsService.prototype.GetOrganization = function (Callback) {
                this.GetApi({ Action: "/get_organization", Callback: Callback });
            };
            SettingsService.prototype.SetOrganization = function (model, Callback) {
                this.PostApi({ Action: "/post_organization", RequestData: model, Callback: Callback });
            };
            SettingsService.prototype.GetSalePoint = function (id, Callback) {
                this.GetApi({ Action: "/get_salepoint", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetSalePoint = function (model, Callback) {
                this.PostApi({ Action: "/post_salepoint", RequestData: model, Callback: Callback });
            };
            return SettingsService;
        }(base.Services.BaseService));
        Services.SettingsService = SettingsService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=settingsservice.js.map