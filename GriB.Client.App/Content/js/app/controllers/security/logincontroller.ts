import bc = require('app/common/basecontroller');
import rc = require('app/controllers/security/registercontroller');
import vars = require('app/common/variables');

export namespace Controllers.Security {
    export class LoginController extends bc.Controllers.BaseController {
        constructor(options: Interfaces.IControllerOptions) {
           super(options);
        }

        protected createModel(): any {
            return {
                "Header": "POS Cloud",
                "labelTitle": vars._statres("label$autorization"),
                "labelPhone": vars._statres("label$phone"),
                "labelPassword": vars._statres("label$password"),

                "labelForgot": vars._statres("button$label$forgot"),
                "labelRegister": vars._statres("button$label$register"),
                "labelEnter": vars._statres("button$label$enter"),
            };
        }

        public ViewInit(view: JQuery): boolean {
            let result :boolean = super.ViewInit(view);
            this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
            return result;
        }

        public ViewShow(e: any): void {
            M.updateTextFields();
          
            //$('#app-modal-login').modal();
            //$('#app-modal-login').modal('open');
        }

        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            vars._app.OpenView(new rc.Controllers.Security.RegisterController({ Url: "/Content/view/security/register.html", Id: "app-register" }), this);
        }
    }
}