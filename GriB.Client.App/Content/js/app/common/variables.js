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
    exports._controllers["security/recovery"] = function (module) { return new module.Controller.Security.Recovery(); };
    exports._controllers["main"] = function (module) { return new module.Controller.Main(); };
    exports._maincontrollers = {};
    exports._maincontrollers["terminal/index"] = function (module) { return new module.Controller.Terminal.Index(); };
    exports._maincontrollers["setting/index"] = function (module) { return new module.Controller.Setting.Index(); };
    exports._maincontrollers["report/index"] = function (module) { return new module.Controller.Report.Index(); };
    exports._maincontrollers["about/index"] = function (module) { return new module.Controller.About.Index(); };
    exports._maincontrollers["setting/editor/organization"] = function (module) { return new module.Controller.Setting.Editor.Organization(); };
    exports._maincontrollers["setting/editor/salepoint"] = function (module) { return new module.Controller.Setting.Editor.SalePoint(); };
    exports._maincontrollers["setting/editor/employee"] = function (module) { return new module.Controller.Setting.Editor.Employee(); };
    exports._maincontrollers["setting/card/salepoint"] = function (module) { return new module.Controller.Setting.Card.SalePoint(); };
    exports._maincontrollers["setting/card/employee"] = function (module) { return new module.Controller.Setting.Card.Employee(); };
});
//# sourceMappingURL=variables.js.map