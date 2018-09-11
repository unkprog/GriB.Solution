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

        protected createEvents(): void {
            this.LoginButtonClick = this.createClickEvent("btn-login", this.loginButtonClick);//, this);
            this.RegisterButtonClick = this.createClickEvent("btn-register", this.registerButtonClick);//, this);
            this.ForgotButtonClick = this.createClickEvent("btn-forgot", this.forgotButtonClick);//, this);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-login", this.RegisterButtonClick);
            this.destroyClickEvent("btn-register", this.RegisterButtonClick);
            this.destroyClickEvent("btn-forgot", this.RegisterButtonClick);
        }

        public ViewShow(e: any): void {
            super.ViewShow(e);
        }

        public LoginButtonClick: { (e: any): void; };
        private loginButtonClick(e) {
        }

        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            vars._app.OpenController("security/register", this);

        }

        public ForgotButtonClick: { (e: any): void; };
        private forgotButtonClick(e) {
            vars._showError("Ntcnjdjt cjj,otybt");
        }
    }
}