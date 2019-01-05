import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Arrival extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$categories"),
                "cardModel": []
            });
        }

        protected get EditIdName(): string {
            return "id_arrival";
        }

        protected get EditController(): string {
            return "document/editor/arrival";
        }

        protected get DocType(): number {
            return 0;
        }

    }
}

vars.registerController("document/card/arrival", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Arrival(); });