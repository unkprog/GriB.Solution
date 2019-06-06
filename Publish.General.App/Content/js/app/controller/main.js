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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/common/variables"], function (require, exports, vars, ctrl, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Main = /** @class */ (function (_super) {
            __extends(Main, _super);
            function Main() {
                var _this = _super.call(this) || this;
                vars._main = _this;
                return _this;
            }
            Main.prototype.createOptions = function () {
                return { Url: "/Content/view/main.html", Id: "main-view" };
            };
            Main.prototype.createModel = function () {
                return new kendo.data.ObservableObject({
                    "Header": "",
                });
            };
            Main.prototype.ControllersInit = function () {
                return vars._controllers;
            };
            Main.prototype.GetContent = function () {
                return this.content;
            };
            Main.prototype.ViewInit = function (view) {
                variables_1._app.SetControlNavigation(this);
                this.content = view.find("#main-view-content");
                this.contentModal = view.find("#main-view-content-modal");
                _super.prototype.ViewInit.call(this, view);
                variables_1._app.OpenController({ urlController: "setting/index" });
                return false;
            };
            Main.prototype.ViewHide = function (e) {
                _super.prototype.ViewHide.call(this, e);
            };
            Main.prototype.createEvents = function () {
            };
            Main.prototype.destroyEvents = function () {
            };
            return Main;
        }(ctrl.Controller.BaseContent));
        Controller.Main = Main;
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=main.js.map