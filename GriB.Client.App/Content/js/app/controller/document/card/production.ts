import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Production extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$productionmake"),
                "cardModel": []
            });
        }

        protected get EditIdName(): string {
            return "id_production";
        }

        protected get FilterId(): string {
            return "DocumentFilterProduction";
        }

        protected get EditController(): string {
            return "document/editor/production";
        }

        protected get DocType(): number {
            return 60;
        }

    }
}

vars.registerController("document/card/production", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Production(); });