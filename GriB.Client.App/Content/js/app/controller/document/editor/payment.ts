import base = require('app/controller/document/editor/paymentbase');
import vars = require('app/common/variables');

export namespace Controller.Document.Editor {
    export class Payment extends base.Controller.Document.Editor.PaymentBase {
        constructor() {
            super();
        }

        public get EditIdName(): string {
            return "id_payment";
        }

        protected getSaveModel(): Interfaces.Model.IPayment {
            let model: Interfaces.Model.IPayment = super.getSaveModel() as Interfaces.Model.IPayment;
            if (model) {
                model.doctype = 10;
            }
            return model;
        }

      
    }
}

vars.registerController("document/editor/payment", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.Payment(); });