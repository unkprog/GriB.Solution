/// <amd-dependency path="i18n!nls/strings" />
define(["require", "exports", "i18n!nls/strings"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        var StaticRes = /** @class */ (function () {
            function StaticRes() {
                var sr = this;
                sr.i18nData = require("i18n!nls/strings");
                exports._statres = function (id) { return sr.GetString(id); };
            }
            StaticRes.prototype.GetString = function (id) {
                return (this.i18nData && this.i18nData[id]) ? this.i18nData[id] : "";
            };
            return StaticRes;
        }());
        App.StaticRes = StaticRes;
        new StaticRes();
    })(App = exports.App || (exports.App = {}));
});
//# sourceMappingURL=variables.js.map