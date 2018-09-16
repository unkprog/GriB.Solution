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
define(["require", "exports", "app/common/basecontroller"], function (require, exports, ctrl) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Main = /** @class */ (function (_super) {
            __extends(Main, _super);
            function Main() {
                return _super.call(this) || this;
            }
            Main.prototype.createOptions = function () {
                return { Url: "/Content/view/main.html", Id: "main-view" };
            };
            Main.prototype.createModel = function () {
                return new kendo.data.ObservableObject({
                    "Header": "",
                    "userName": "John Doe",
                });
            };
            Main.prototype.ViewInit = function (view) {
                var menu = $('<li><a id="app-btn-menu"><i class="material-icons">menu</i></a></li>');
                this.sideNav = view.find('.sidenav');
                this.sideNav.sidenav();
                $("#app-navbar").find(".left").append(menu);
                this.buttonMenu = menu.find("#app-btn-menu");
                _super.prototype.ViewInit.call(this, view);
                return true;
            };
            Main.prototype.createEvents = function () {
                this.OpenMenuButtonClick = this.createClickEvent(this.buttonMenu, this.openMenuButtonClick);
            };
            Main.prototype.destroyEvents = function () {
                this.destroyClickEvent("btn-recovery", this.OpenMenuButtonClick);
            };
            Main.prototype.openMenuButtonClick = function (e) {
                this.sideNav.sidenav('open');
            };
            return Main;
        }(ctrl.Controller.Base));
        Controller.Main = Main;
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=main.js.map