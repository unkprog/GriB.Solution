import vars = require('app/common/variables');
import ctrl = require('app/common/basecontroller');
import utils = require('app/common/utils');
import { _app, _main } from 'app/common/variables';

export namespace Controller {
    export class Main extends ctrl.Controller.BaseContent {

        constructor() {
            super();
            vars._main = this;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/main.html", Id: "main-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
            });
        }

        protected ControllersInit(): any {
            return vars._controllers;
        }

        private content: JQuery;
        private contentModal: JQuery;
        protected GetContent(): JQuery {
            return this.content;
        }

        public ViewInit(view: JQuery): boolean {
            _app.SetControlNavigation(this);
            this.content = view.find("#main-view-content");
            this.contentModal = view.find("#main-view-content-modal");
            super.ViewInit(view);
            _app.OpenController({ urlController: "setting/index" });
            return false;
        }

        public ViewHide(e) {
            super.ViewHide(e);
           
        }

        protected createEvents(): void {
          
        }

        protected destroyEvents(): void {
           
        }

       
    }
}