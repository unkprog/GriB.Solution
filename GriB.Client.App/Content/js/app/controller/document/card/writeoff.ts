import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Writeoff extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$writeoff"),
                "cardModel": []
            });
        }

        protected get EditIdName(): string {
            return "id_writeoff";
        }

        protected get EditController(): string {
            return "document/editor/writeoff";
        }

        protected get DocType(): number {
            return 40;
        }

    }
}

vars.registerController("document/card/writeoff", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Writeoff(); });