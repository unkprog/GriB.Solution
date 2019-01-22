import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Arrival extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$arrival"),
                "cardModel": []
            });
        }

        protected columns(): Interfaces.ICardColumn[] {
            let result: Interfaces.ICardColumn[] = super.columns();
            result.splice(3, 0, { Header: vars._statres("label$contractor"), Field: "contractor.name" },);
            return result;
        }


        protected get EditIdName(): string {
            return "id_arrival";
        }

        protected get EditController(): string {
            return "document/editor/arrival";
        }

        protected get FilterId(): string {
            return "ArrivalCardFilterSettings";
        }

        protected get DocType(): number {
            return 10;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            let settings: card.Controller.Document.Card.DocumentCardFilterSettings = this.CardSettings.FilterSettings as card.Controller.Document.Card.DocumentCardFilterSettings;
            if (settings) settings.showContractor(true);
            return result;
        }
    }
}

vars.registerController("document/card/arrival", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Arrival(); });