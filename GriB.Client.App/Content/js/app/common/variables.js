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
        var staticResources = new StaticResources();
        exports._statres = function (id) { return staticResources.GetString(id); };
        exports._absUrl = function (refUrl) {
            return _appData.BaseUrl + refUrl;
        };
    })(App = exports.App || (exports.App = {}));
});
//# sourceMappingURL=variables.js.map