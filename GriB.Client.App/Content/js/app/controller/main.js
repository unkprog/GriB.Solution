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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/common/utils", "app/common/variables"], function (require, exports, vars, ctrl, utils, variables_1) {
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
                    "employee": {},
                    "userDesc": "jdandturk@gmail.com",
                    "labelPOSterminal": vars._statres("label$POSterminal"),
                    "labelSettings": vars._statres("label$settings"),
                    "labelDocuments": vars._statres("label$documents"),
                    "labelReports": vars._statres("label$reports"),
                    "labelAbout": vars._statres("label$about"),
                    "labelExit": vars._statres("label$exit"),
                });
            };
            Main.prototype.ControllersInit = function () {
                //return vars._maincontrollers;
                return vars._controllers;
            };
            Main.prototype.GetContent = function () {
                return this.content;
            };
            Main.prototype.ViewInit = function (view) {
                variables_1._app.SetControlNavigation(this);
                this.Model.set("employee", vars._identity.employee);
                this.menu = $('<li><a id="app-btn-menu"><i class="material-icons">menu</i></a></li>');
                this.sideNav = view.find('#main-view-slide');
                this.sideNav.sidenav({ edge: 'left', closeOnClick: false, draggable: false });
                $("#app-navbar").find(".left").append(this.menu);
                this.buttonMenu = this.menu.find("#app-btn-menu");
                this.content = view.find("#main-view-content");
                this.contentModal = view.find("#main-view-content-modal");
                _super.prototype.ViewInit.call(this, view);
                this.navigateOnStart();
                return false;
            };
            Main.prototype.ViewHide = function (e) {
                _super.prototype.ViewHide.call(this, e);
                if (this.menu)
                    this.menu.remove();
            };
            Main.prototype.createEvents = function () {
                this.OpenMenuButtonClick = this.createTouchClickEvent(this.buttonMenu, this.openMenuButtonClick);
                this.MenuPOSTerminalButtonClick = this.createClickEvent("main-view-btn-posterminal", this.menuPOSTerminalButtonClick);
                this.MenuSettingsButtonClick = this.createClickEvent("main-view-btn-settings", this.menuSettingsButtonClick);
                this.MenuDocumentsButtonClick = this.createClickEvent("main-view-btn-documents", this.menuDocumentsButtonClick);
                this.MenuReportsButtonClick = this.createClickEvent("main-view-btn-reports", this.menuReportsButtonClick);
                this.MenuAboutButtonClick = this.createClickEvent("main-view-btn-about", this.menuAboutButtonClick);
                this.MenuExitButtonClick = this.createClickEvent("main-view-btn-exit", this.menuExitButtonClick);
            };
            Main.prototype.destroyEvents = function () {
                this.destroyTouchClickEvent(this.buttonMenu, this.OpenMenuButtonClick);
                this.destroyClickEvent("main-view-btn-posterminal", this.MenuPOSTerminalButtonClick);
                this.destroyClickEvent("main-view-btn-settings", this.MenuSettingsButtonClick);
                this.destroyClickEvent("main-view-btn-documents", this.MenuDocumentsButtonClick);
                this.destroyClickEvent("main-view-btn-reports", this.MenuReportsButtonClick);
                this.destroyClickEvent("main-view-btn-about", this.MenuAboutButtonClick);
                this.destroyClickEvent("main-view-btn-exit", this.MenuExitButtonClick);
            };
            Main.prototype.navigateOnStart = function () {
                if (vars._identity.employee.openonlogin === 1)
                    this.MenuSettingsButtonClick({});
                else if (vars._identity.employee.openonlogin === 2)
                    this.MenuDocumentsButtonClick({});
                else if (vars._identity.employee.openonlogin === 3)
                    this.MenuReportsButtonClick({});
                else
                    this.MenuPOSTerminalButtonClick({});
            };
            Main.prototype.openMenuButtonClick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.sideNav.sidenav('open');
            };
            Main.prototype.menuPOSTerminalButtonClick = function (e) {
                this.handleMenuItem("terminal/index");
            };
            Main.prototype.menuSettingsButtonClick = function (e) {
                this.handleMenuItem("setting/index");
            };
            Main.prototype.menuDocumentsButtonClick = function (e) {
                this.handleMenuItem("document/index");
            };
            Main.prototype.menuReportsButtonClick = function (e) {
                this.handleMenuItem("report/index");
            };
            Main.prototype.menuAboutButtonClick = function (e) {
                this.handleMenuItem("about/index");
            };
            Main.prototype.menuExitButtonClick = function (e) {
                this.sideNav.sidenav('close');
                variables_1._app.OpenController({ urlController: "security/login" });
            };
            Main.prototype.handleMenuItem = function (urlController) {
                this.sideNav.sidenav('close');
                if (!utils.isNullOrEmpty(urlController))
                    variables_1._app.OpenController({ urlController: urlController });
                // nativeBridge.showMessage('Message from JS');
            };
            return Main;
        }(ctrl.Controller.BaseContent));
        Controller.Main = Main;
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=main.js.map