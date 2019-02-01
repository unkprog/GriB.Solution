import vars = require('app/common/variables');
import card = require('app/controller/document/card/payment');

export namespace Controller.Document.Card {
    export class PaymentDeposit extends card.Controller.Document.Card.Payment {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$deposit"));
        }

        protected columns(): Interfaces.ICardColumn[] {
            let payMethod: string = '#if (ptype === 1) {#<i class="material-icons left">attach_money</i># } else if (ptype === 2) {#<i class="material-icons left">credit_card</i># } else if (ptype === 3) {#<i class="material-icons left">money_off</i>#}#';
            return [
                { Header: "", HeaderStyle: "doc-col-conduct", Field: "options", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((options & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                { Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" },
                { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                { Header: vars._statres("label$employee"), Field: "employee.name" },
                { Header: vars._statres("label$methodpayment"), Field: "ptype", FieldTemplate: payMethod },
                { Header: vars._statres("label$client"), Field: "client.name" },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
            ];
        }

        protected get EditIdName(): string {
            return "id_paymentdeposit";
        }

        protected get FilterId(): string {
            return "PaymentDepositCardFilterSettings";
        }

        protected get EditController(): string {
            return "document/editor/paymentdeposit";
        }

        protected get DocType(): number {
            return 20;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            let settings: card.Controller.Document.Card.PaymentCardFilterSettings = this.CardSettings.FilterSettings as card.Controller.Document.Card.PaymentCardFilterSettings;
            //if (settings) settings.showReason(true);
            return result;
        }

    }
}

vars.registerController("document/card/paymentdeposit", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.PaymentDeposit(); });