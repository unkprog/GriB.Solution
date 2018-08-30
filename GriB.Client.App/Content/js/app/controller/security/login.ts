import bc = require('app/common/basecontroller');
import rc = require('app/controller/security/register');
import vars = require('app/common/variables');

export namespace Controller.Security {
    export class Login extends bc.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/security/login.html", Id: "app-login" };
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
            this.ForgotButtonClick = this.createClick("btn-forgot", this.forgotButtonClick, this);
            return result;
        }

        public ViewShow(e: any): void {
            M.updateTextFields();
        }

        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            //vars._app.OpenView(new rc.Controllers.Security.RegisterController(), this);
            vars._app.OpenController({ Url: "security/register", getController: function (module: any) { return new module.Controller.Security.Register(); } }, this);

        }

        public ForgotButtonClick: { (e: any): void; };
        private forgotButtonClick(e) {
            vars._app.OpenController({ Url: "security/test", getController: function (module: any) { return new module.Controller.Security.Test(); } }, this);
        }
    }
}