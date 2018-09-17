import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import { _app } from 'app/common/variables';

export namespace Controller.About {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/about/index.html", Id: "about-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "POS Cloud",
            });
        }

        public ViewInit(view): boolean {
            return super.ViewInit(view);
        }

        public ViewHide(e) {
            super.ViewHide(e);
        }
    }
}