import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Movement extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$movement"),
                "cardModel": []
            });
        }

        protected get EditIdName(): string {
            return "id_movement";
        }

        protected get EditController(): string {
            return "document/editor/movement";
        }

        protected get DocType(): number {
            return 50;
        }

    }
}

vars.registerController("document/card/movement", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Movement(); });