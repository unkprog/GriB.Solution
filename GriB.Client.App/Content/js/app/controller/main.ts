import vars = require('app/common/variables');
import ctrl = require('app/common/basecontroller');
import utils = require('app/common/utils');
import { _app } from 'app/common/variables';

export namespace Controller {
    export class Main extends ctrl.Controller.Base {

        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/main.html", Id: "main-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "userName": "John Doe",
            });
        }

        private sideNav: JQuery;
        private buttonMenu: JQuery;
        public ViewInit(view: JQuery): boolean {
            let menu: JQuery = $('<li><a id="app-btn-menu"><i class="material-icons">menu</i></a></li>');
            this.sideNav = view.find('.sidenav');
            this.sideNav.sidenav();
            $("#app-navbar").find(".left").append(menu);
            this.buttonMenu = menu.find("#app-btn-menu");
            super.ViewInit(view);
            return true;
        }

        protected createEvents(): void {
            this.OpenMenuButtonClick = this.createClickEvent(this.buttonMenu, this.openMenuButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-recovery", this.OpenMenuButtonClick);
        }

        public OpenMenuButtonClick: { (e: any): void; };
        private openMenuButtonClick(e) {
            this.sideNav.sidenav('open');
        }

        //private validate(model: Interfaces.Model.IRegisterModel): boolean {
        //    let validateMessage: string = '';

        //    if (!utils.validatePhone(model.phone))
        //        validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$phoneNumberIncorrect');

        //    if (validateMessage !== '')
        //        vars._showError(validateMessage);

        //    return (validateMessage === '');
        //}
    }
}