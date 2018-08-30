import bc = require('app/common/basecontroller');
import vars = require('app/common/variables');

export namespace Controller.Security {
    export class Test extends bc.Controller.Base {

        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/security/test.html", Id: "app-test" };
        }

        protected createModel(): any {
            return {
                "Header": "",
                "labelTitle": vars._statres("button$label$register"),
                "labelPhone": vars._statres("label$phone"),
                "labelEmail": vars._statres("label$email"),
                "labelRegister": vars._statres("button$label$register"),

            };
        }

        public ViewInit(view: JQuery): boolean {
            //let result: boolean = super.ViewInit(view);
            //this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
            //this.loadSettings();
            return true;
        }

    }
}