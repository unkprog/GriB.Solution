import vars = require('app/common/variables');
import card = require('app/controller/document/card/paymentbase');

export namespace Controller.Document.Card {
    export class Payment extends card.Controller.Document.Card.PaymentBase {
        constructor() {
            super();
        }

        protected get EditIdName(): string {
            return "id_payment";
        }

        protected get FilterId(): string {
            return "PaymentCardFilterSettings";
        }

        protected get EditController(): string {
            return "document/editor/payment";
        }

        protected get DocType(): number {
            return 10;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            //let settings: card.Controller.Document.Card.PaymentCardFilterSettings = this.CardSettings.FilterSettings as card.Controller.Document.Card.PaymentCardFilterSettings;
            ////if (settings) settings.showReason(true);
            return result;
        }

    }
}

vars.registerController("document/card/payment", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Payment(); });