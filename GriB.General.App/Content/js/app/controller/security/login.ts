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
                "Header": "POS Cloud Admin",
                "labelTitle": vars._statres("label$autorization"),
                "labelLogin": vars._statres("label$login"),
                "labelPassword": vars._statres("label$password"),
                "labelEnter": vars._statres("button$label$enter"),
            });
        }

        protected createEvents(): void {
            this.LoginButtonClick = this.createTouchClickEvent("btn-login", this.loginButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-login", this.LoginButtonClick);
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
                model.phone = "admin";
                model.pass = "1";
            }

            if (this.validate(model)) {
                controller.AccountService.Login(model, (responseData) => {
                    if (responseData.result == "Ok") {
                        vars._identity = responseData.indetity;
                        vars._app.OpenController({ urlController: "setting/index" });
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

            //if (!utils.validatePhone(model.phone)) {
            //    M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
            //    result = false;
            //}

            //if (utils.isNullOrEmpty(model.pass)) {
            //    M.toast({ html: vars._statres('msg$error$invalidPassword') });
            //    result = false;
            //}

            return result;
        }
    }
}

vars.registerController("security/login", function (module: any): Interfaces.IController { vars._app.SetControlNavigation(vars._app); return new module.Controller.Security.Login(); });