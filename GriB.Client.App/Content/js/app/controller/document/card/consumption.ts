import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Consumption extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$consumption"),
                "cardModel": []
            });
        }

        protected get EditIdName(): string {
            return "id_consumption";
        }

        protected get EditController(): string {
            return "document/editor/Consumption";
        }

        protected get DocType(): number {
            return 20;
        }

    }
}

vars.registerController("document/card/consumption", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Consumption(); });