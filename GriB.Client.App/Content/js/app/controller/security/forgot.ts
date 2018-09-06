import bc = require('app/common/basecontroller');
import vars = require('app/common/variables');

export namespace Controller.Security {
    export class Forgot extends bc.Controller.Base {

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

    }
}