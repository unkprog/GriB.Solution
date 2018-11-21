import vars = require('app/common/variables');
import utils = require('app/common/utils');
import acc = require('app/controller/security/account');
import { _app } from 'app/common/variables';

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
            this.LoginButtonClick = this.createClickEvent("btn-login", this.loginButtonClick);
            this.RegisterButtonClick = this.createClickEvent("btn-register", this.registerButtonClick);
            this.ForgotButtonClick = this.createClickEvent("btn-forgot", this.forgotButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-login", this.LoginButtonClick);
            this.destroyClickEvent("btn-register", this.RegisterButtonClick);
            this.destroyClickEvent("btn-forgot", this.ForgotButtonClick);
        }

        public LoginButtonClick: { (e: any): void; };
        private loginButtonClick(e) {
            _app.ShowLoading();
            let controller = this;
            let model: Interfaces.Model.ILoginModel = {
                phone: <string>$('#login-phone').val(),
                pass: <string>$('#login-pass').val()
            };

            if (this.validate(model)) {
                controller.AccountService.Login(model, (responseData) => {
                    if (responseData.result == "Ok") {
                        vars._identity = responseData.indetity;
                        _app.OpenController({ urlController: "main" });
                    }
                    else
                        _app.ShowError(responseData.error);
                });
            }
            else
                _app.HideLoading();
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