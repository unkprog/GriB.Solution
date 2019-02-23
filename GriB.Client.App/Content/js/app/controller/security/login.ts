import vars = require('app/common/variables');
import utils = require('app/common/utils');
import acc = require('app/controller/security/account');

export namespace Controller.Security {
    export class Login extends acc.Controller.Security.Account {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/security/login.html", Id: "app-login" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "POS Cloud",
                "labelTitle": vars._statres("label$autorization"),
                "labelPhone": vars._statres("label$phone"),
                "labelPassword": vars._statres("label$password"),

                "labelForgot": vars._statres("button$label$forgot"),
                "labelRegister": vars._statres("button$label$register"),
                "labelEnter": vars._statres("button$label$enter"),
            });
        }

        protected createEvents(): void {
            this.LoginButtonClick = this.createTouchClickEvent("btn-login", this.loginButtonClick);
            this.RegisterButtonClick = this.createTouchClickEvent("btn-register", this.registerButtonClick);
            this.ForgotButtonClick = this.createTouchClickEvent("btn-forgot", this.forgotButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-login", this.LoginButtonClick);
            this.destroyTouchClickEvent("btn-register", this.RegisterButtonClick);
            this.destroyTouchClickEvent("btn-forgot", this.ForgotButtonClick);
        }

        public LoginButtonClick: { (e: any): void; };
        private loginButtonClick(e) {
            vars._app.ShowLoading();
            let controller = this;
            let model: Interfaces.Model.ILoginModel = {
                phone: <string>$('#login-phone').val(),
                pass: <string>$('#login-pass').val()
            };

            // TODO: Заглушка на демо-вход
            if (utils.isNullOrEmpty(model.phone) && utils.isNullOrEmpty(model.pass)) {
                model.phone = "9264042915";
                model.pass = "1";
            }

            if (this.validate(model)) {
                controller.AccountService.Login(model, (responseData) => {
                    if (responseData.result == "Ok") {
                        vars._identity = responseData.indetity;
                        vars._app.OpenController({ urlController: "main" });
                    }
                    else
                        vars._app.ShowError(responseData.error);
                });
            }
            else
                vars._app.HideLoading();
        }

        private validate(model: Interfaces.Model.ILoginModel): boolean {
            let result: boolean = true;

            if (!utils.validatePhone(model.phone)) {
                M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
                result = false;
            }

            if (utils.isNullOrEmpty(model.pass)) {
                M.toast({ html: vars._statres('msg$error$invalidPassword') });
                result = false;
            }

            return result;
        }

        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            vars._app.OpenController({ urlController: "security/register", backController: this });
        }

        public ForgotButtonClick: { (e: any): void; };
        private forgotButtonClick(e) {
            vars._app.OpenController({ urlController: "security/recovery", backController: this });
        }
    }
}

vars.registerController("security/login", function (module: any): Interfaces.IController { vars._app.SetControlNavigation(vars._app); return new module.Controller.Security.Login(); });