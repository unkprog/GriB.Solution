import vars = require('app/common/variables');
import card = require('app/controller/document/card/card');

export namespace Controller.Document.Card {
    export class Return extends card.Controller.Document.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$return"),
                "cardModel": []
            });
        }

        protected get EditIdName(): string {
            return "id_return";
        }

        protected get FilterId(): string {
            return "DocumentFilterReturn";
        }

        protected get EditController(): string {
            return "document/editor/return";
        }

        protected get DocType(): number {
            return 30;
        }

    }
}

vars.registerController("document/card/return", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Return(); });