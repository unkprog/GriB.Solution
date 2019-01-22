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

        protected columns(): Interfaces.ICardColumn[] {
            let result: Interfaces.ICardColumn[] = super.columns();
            result.splice(4, 0, { Header: vars._statres("label$stockto"), Field: "salepointto.name" });
            return result;
        }

        protected get EditIdName(): string {
            return "id_movement";
        }

        protected get FilterId(): string {
            return "MovementCardFilterSettings";
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