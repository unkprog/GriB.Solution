/// <amd-dependency path="i18n!nls/strings" />
define(["require", "exports", "i18n!nls/strings"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        var StaticResources = /** @class */ (function () {
            function StaticResources() {
                this.i18nData = require("i18n!nls/strings");
            }
            StaticResources.prototype.GetString = function (id) {
                return (this.i18nData && this.i18nData[id]) ? this.i18nData[id] : "";
            };
            return StaticResources;
        }());
        App.StaticResources = StaticResources;
    })(App || (App = {}));
    var staticResources = new App.StaticResources();
    exports._statres = function (id) { return staticResources.GetString(id); };
    exports._showError = function (error) { exports._app.ShowError(error); };
    exports._controllers = {};
    exports._controllers["security/login"] = function (module) { return new module.Controller.Security.Login(); };
    exports._controllers["security/register"] = function (module) { return new module.Controller.Security.Register(); };
});
//# sourceMappingURL=variables.js.map