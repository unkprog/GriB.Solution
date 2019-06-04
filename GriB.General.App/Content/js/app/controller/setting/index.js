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
define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/setting/index.html", Id: "setting-view" };
                };
                Index.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": "",
                        "labelSettings": vars._statres("label$settings"),
                        "labelServers": vars._statres("label$servers"),
                        "labelDatabases": vars._statres("label$databases"),
                        "labelUsers": vars._statres("label$users"),
                    });
                };
                Index.prototype.createEvents = function () {
                    this.ServersButtonClick = this.createClickEvent("btn-servers", this.serversButtonClick);
                    this.DataBasesButtonClick = this.createClickEvent("btn-databases", this.dataBasesButtonClick);
                    this.UsersButtonClick = this.createClickEvent("btn-users", this.usersButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyClickEvent("btn-servers", this.ServersButtonClick);
                    this.destroyClickEvent("btn-databases", this.DataBasesButtonClick);
                    this.destroyClickEvent("btn-users", this.UsersButtonClick);
                };
                Index.prototype.serversButtonClick = function (e) {
                    vars._app.OpenController({ urlController: "setting/card/server", backController: this });
                };
                Index.prototype.dataBasesButtonClick = function (e) {
                    vars._app.OpenController({ urlController: "setting/card/database", backController: this });
                };
                Index.prototype.usersButtonClick = function (e) {
                    vars._app.OpenController({ urlController: "setting/card/user", backController: this });
                };
                return Index;
            }(base.Controller.Base));
            Setting.Index = Index;
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/index", function (module) { return new module.Controller.Setting.Index(); });
});
//# sourceMappingURL=index.js.map