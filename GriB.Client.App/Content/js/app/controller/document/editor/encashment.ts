import base = require('app/controller/document/editor/paymentbase');
import vars = require('app/common/variables');

export namespace Controller.Document.Editor {
    export class Encashment extends base.Controller.Document.Editor.PaymentBase {
        constructor() {
            super();
        }

        public get EditIdName(): string {
            return "id_encashment";
        }

        protected getSaveModel(): Interfaces.Model.IPayment {
            let model: Interfaces.Model.IPayment = super.getSaveModel() as Interfaces.Model.IPayment;
            if (model) {
                model.doctype = 40;
            }
            return model;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);

            if (this.methodPaymentWitOut)
                this.methodPaymentWitOut.remove();
            this.accountControl.removeClass("hide");
            this.clientControl.addClass("hide");
            this.methodPaymentRow.addClass("hide");
            return result;
        }
    }
}

vars.registerController("document/editor/encashment", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.Encashment(); });