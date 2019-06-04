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
            SettingsService.prototype.GetServers = function (Callback) {
                this.GetApi({ Action: "/get_servers", Callback: Callback });
            };
            SettingsService.prototype.GetServer = function (id, Callback) {
                this.GetApi({ Action: "/get_server", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetServer = function (model, Callback) {
                this.PostApi({ Action: "/post_server", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelServer = function (id, Callback) {
                this.GetApi({ Action: "/del_server", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.GetDatabases = function (Callback) {
                this.GetApi({ Action: "/get_databases", Callback: Callback });
            };
            SettingsService.prototype.GetDatabase = function (id, Callback) {
                this.GetApi({ Action: "/get_database", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetDatabase = function (model, Callback) {
                this.PostApi({ Action: "/post_database", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelDatabase = function (id, Callback) {
                this.GetApi({ Action: "/del_database", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.GetUsers = function (Callback) {
                this.GetApi({ Action: "/get_users", Callback: Callback });
            };
            SettingsService.prototype.GetUser = function (id, Callback) {
                this.GetApi({ Action: "/get_user", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetUser = function (model, Callback) {
                this.PostApi({ Action: "/post_usere", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelUser = function (id, Callback) {
                this.GetApi({ Action: "/del_user", RequestData: { id: id }, Callback: Callback });
            };
            return SettingsService;
        }(base.Services.BaseService));
        Services.SettingsService = SettingsService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=settingsservice.js.map