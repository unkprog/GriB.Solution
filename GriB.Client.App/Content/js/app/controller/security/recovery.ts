import vars = require('app/common/variables');
import acc = require('app/controller/security/account');
import utils = require('app/common/utils');
import { _app } from 'app/common/variables';

export namespace Controller.Security {
    export class Recovery extends acc.Controller.Security.Account {

        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/security/recovery.html", Id: "app-recovery" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "labelTitle": vars._statres("label$passwordRecovery"),
                "labelPhone": vars._statres("label$phone"),
                "labelRecover": vars._statres("label$recover"),
            });
        }

        protected createEvents(): void {
            this.RecoveryButtonClick = this.createClickEvent("btn-recovery", this.recoveryButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-recovery", this.RecoveryButtonClick);
        }

        public RecoveryButtonClick: { (e: any): void; };
        private recoveryButtonClick(e) {
            let controller = this;
            let model: Interfaces.Model.IRegisterModel = {
                phone: <string>$('#recovery-phone').val(),
            };

            if (this.validate(model)) {
                controller.AccountService.Recovery(model, (responseData) => {
                    if (responseData == "Ok")
                        _app.ShowMessage(vars._statres("label$passwordRecovery"), vars._statres("msg$success$Recovery"), () => { _app.OpenController("security/login"); });
                    else
                        _app.ShowError(responseData);
                });
            }

        }

        private validate(model: Interfaces.Model.IRegisterModel): boolean {
            let validateMessage: string = '';

            if (!utils.validatePhone(model.phone))
                validateMessage = validateMessage + (validateMessage !== '' ? '<br/>' : '') + vars._statres('msg$error$phoneNumberIncorrect');

            if (validateMessage !== '')
                vars._showError(validateMessage);

            return (validateMessage === '');
        }
    }
}