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
    exports._controllers["security/login"] = function (module) { exports._app.SetControlNavigation(exports._app); return new module.Controller.Security.Login(); };
    exports._controllers["security/register"] = function (module) { exports._app.SetControlNavigation(exports._app); return new module.Controller.Security.Register(); };
    exports._controllers["security/recovery"] = function (module) { exports._app.SetControlNavigation(exports._app); return new module.Controller.Security.Recovery(); };
    exports._controllers["main"] = function (module) { return new module.Controller.Main(); };
    //export declare let _maincontrollers: any;
    //_maincontrollers = {};
    exports._controllers["terminal/index"] = function (module) { return new module.Controller.Terminal.Index(); };
    exports._controllers["setting/index"] = function (module) { return new module.Controller.Setting.Index(); };
    exports._controllers["report/index"] = function (module) { return new module.Controller.Report.Index(); };
    exports._controllers["about/index"] = function (module) { return new module.Controller.About.Index(); };
    exports._controllers["setting/editor/organization"] = function (module) { return new module.Controller.Setting.Editor.Organization(); };
    exports._controllers["setting/editor/salepoint"] = function (module) { return new module.Controller.Setting.Editor.SalePoint(); };
    exports._controllers["setting/editor/employee"] = function (module) { return new module.Controller.Setting.Editor.Employee(); };
    exports._controllers["setting/editor/currency"] = function (module) { return new module.Controller.Setting.Editor.Currency(); };
    exports._controllers["setting/editor/unit"] = function (module) { return new module.Controller.Setting.Editor.Unit(); };
    exports._controllers["setting/editor/category"] = function (module) { return new module.Controller.Setting.Editor.Category(); };
    exports._controllers["setting/editor/product"] = function (module) { return new module.Controller.Setting.Editor.Product(); };
    exports._controllers["setting/card/salepoint"] = function (module) { return new module.Controller.Setting.Card.SalePoint(); };
    exports._controllers["setting/card/employee"] = function (module) { return new module.Controller.Setting.Card.Employee(); };
    exports._controllers["setting/card/currency"] = function (module) { return new module.Controller.Setting.Card.Currency(); };
    exports._controllers["setting/card/unit"] = function (module) { return new module.Controller.Setting.Card.Unit(); };
    exports._controllers["setting/card/category"] = function (module) { return new module.Controller.Setting.Card.Category(); };
    exports._controllers["setting/card/product"] = function (module) { return new module.Controller.Setting.Card.Product(); };
    exports._controllers["setting/card/productselect"] = function (module) { return new module.Controller.Setting.Card.ProductSelect(); };
    exports._editorData = {};
});
//# sourceMappingURL=variables.js.map