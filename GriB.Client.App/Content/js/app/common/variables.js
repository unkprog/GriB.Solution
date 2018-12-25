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
    exports._controllers["main"] = function (module) { return new module.Controller.Main(); };
    function registerController(crtlId, funcConstructor) {
        if (!exports._controllers[crtlId])
            exports._controllers[crtlId] = funcConstructor;
    }
    exports.registerController = registerController;
    function unRegisterController(crtlId) {
        if (exports._controllers[crtlId])
            delete exports._controllers[crtlId];
    }
    exports.unRegisterController = unRegisterController;
    exports._editorData = {};
});
//# sourceMappingURL=variables.js.map