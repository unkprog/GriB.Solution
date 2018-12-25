import bc = require('app/common/basecontroller');
import acc = require('app/services/accountservice');
import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Security {
    export class Register extends bc.Controller.Base {

        accountService: acc.Services.AccountService;
        constructor() {
            super();
            this.accountService = new acc.Services.AccountService();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/security/register.html", Id: "app-register" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "labelTitle": vars._statres("button$label$register"),
                "labelPhone": vars._statres("label$phone"),
                "labelEmail": vars._statres("label$email"),
                "labelPassword": vars._statres("label$password"),
                "labelConfirmPassword": vars._statres("label$confirmPassword"),
                "labelRegister": vars._statres("button$label$register"),
            });
        }

        protected createEvents(): void {
            this.RegisterButtonClick = this.createTouchClickEvent("btn-register", this.registerButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-register", this.RegisterButtonClick);
        }

        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            let controller = this;
            let model: Interfaces.Model.IRegisterModel = {
                phone: <string>$('#register-phone').val()
            };

            if (this.validate(model)) {
                controller.accountService.Register(model, (responseData) => {
                    if (responseData.result == "Ok")
                        vars._app.ShowMessage(vars._statres("label$passwordRecovery"), vars._statres("msg$success$Register"), () => { vars._app.OpenController({ urlController: "security/login" }); });
                    else
                        vars._app.ShowError(responseData);
                });
            }
           
        }

        private validate(model: Interfaces.Model.IRegisterModel): boolean {
            let validateMessage: string = '';

            if (!utils.validatePhone(model.phone))
                validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$phoneNumberIncorrect');

            //if (!utils.isNullOrEmpty(model.email) && !utils.validateEmail(model.email))
            //    validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$invalidEmailAddress');

            if (validateMessage !== '')
                vars._showError(validateMessage);

            return (validateMessage === '');
        }
    }
}

vars.registerController("security/register", function (module: any): Interfaces.IController { vars._app.SetControlNavigation(vars._app); return new module.Controller.Security.Register(); });