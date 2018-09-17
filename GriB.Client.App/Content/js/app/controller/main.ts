import vars = require('app/common/variables');
import ctrl = require('app/common/basecontroller');
import utils = require('app/common/utils');
import { _app } from 'app/common/variables';

export namespace Controller {
    export class Main extends ctrl.Controller.BaseContent {

        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/main.html", Id: "main-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "userName": "Администратор",
                "userDesc": "jdandturk@gmail.com",
                "labelPOSterminal": vars._statres("label$POSterminal"),
                "labelSettings":vars._statres("label$settings"),
                "labelReports":vars._statres("label$reports"),
                "labelAbout":vars._statres("label$about"),
                "labelExit":vars._statres("label$exit"),
            });
        }

        protected ControllersInit(): any {
            return vars._maincontrollers;
        }

        private content: JQuery;
        protected GetContent(): JQuery {
            return this.content;
        }

        private menu: JQuery;
        private sideNav: JQuery;
        private buttonMenu: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.menu = $('<li><a id="app-btn-menu"><i class="material-icons">menu</i></a></li>');
            this.sideNav = view.find('.sidenav');
            this.sideNav.sidenav();
            $("#app-navbar").find(".left").append(this.menu);
            this.buttonMenu = this.menu.find("#app-btn-menu");
            this.content = view.find("#main-view-content");
            super.ViewInit(view);
            return true;
        }

        public ViewHide(e) {
            super.ViewHide(e);
            if (this.menu)
                this.menu.remove();
        }

        protected createEvents(): void {
            this.OpenMenuButtonClick = this.createClickEvent(this.buttonMenu, this.openMenuButtonClick);

            this.MenuPOSTerminalButtonClick = this.createClickEvent("main-view-btn-posterminal", this.menuPOSTerminalButtonClick);
            this.MenuSettingsButtonClick = this.createClickEvent("main-view-btn-settings", this.menuSettingsButtonClick);
            this.MenuReportsButtonClick = this.createClickEvent("main-view-btn-reports", this.menuReportsButtonClick);
            this.MenuAboutButtonClick = this.createClickEvent("main-view-btn-about", this.menuAboutButtonClick);
            this.MenuExitButtonClick = this.createClickEvent("main-view-btn-exit", this.menuExitButtonClick);
           
        }

        protected destroyEvents(): void {
            this.destroyClickEvent(this.buttonMenu, this.OpenMenuButtonClick);

            this.destroyClickEvent("main-view-btn-posterminal", this.MenuPOSTerminalButtonClick);
            this.destroyClickEvent("main-view-btn-settings", this.MenuSettingsButtonClick);
            this.destroyClickEvent("main-view-btn-reports", this.MenuReportsButtonClick);
            this.destroyClickEvent("main-view-btn-about", this.MenuAboutButtonClick);
            this.destroyClickEvent("main-view-btn-exit", this.MenuExitButtonClick);
        }

        public OpenMenuButtonClick: { (e: any): void; };
        private openMenuButtonClick(e) {
            this.sideNav.sidenav('open');
        }

        public MenuPOSTerminalButtonClick: { (e: any): void; };
        private menuPOSTerminalButtonClick(e) {
            this.handleMenuItem("terminal/index");
        }

        public MenuSettingsButtonClick: { (e: any): void; };
        private menuSettingsButtonClick(e) {
            this.handleMenuItem("setting/index");
        }

        public MenuReportsButtonClick: { (e: any): void; };
        private menuReportsButtonClick(e) {
            this.handleMenuItem("report/index");
        }

        public MenuAboutButtonClick: { (e: any): void; };
        private menuAboutButtonClick(e) {
            this.handleMenuItem("about/index");
        }

        public MenuExitButtonClick: { (e: any): void; };
        private menuExitButtonClick(e) {
            this.sideNav.sidenav('close');
            _app.OpenController("security/login");
        }

        private handleMenuItem(urlController: string): void {
            this.sideNav.sidenav('close');
            if (!utils.isNullOrEmpty(urlController))
                this.OpenController(urlController);
        }
    }
}