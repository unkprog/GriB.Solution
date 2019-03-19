import base = require('app/controller/document/editor/paymentbase');
import vars = require('app/common/variables');

export namespace Controller.Document.Editor {
    export class PaymentDeposit extends base.Controller.Document.Editor.PaymentBase {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$depositmoney"));
        }

        public get EditIdName(): string {
            return "id_paymentdeposit";
        }

        protected getSaveModel(): Interfaces.Model.IPayment {
            let model: Interfaces.Model.IPayment = super.getSaveModel() as Interfaces.Model.IPayment;
            if (model) {
                model.doctype = 20;
            }
            return model;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);

            if (this.methodPaymentWitOut)
                this.methodPaymentWitOut.remove();
            this.incomeControl.removeClass("hide");
            return result;
        }
    }
}

vars.registerController("document/editor/paymentdeposit", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.PaymentDeposit(); });