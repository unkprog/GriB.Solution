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

        protected columns(): Interfaces.Control.IBaseColumn[] {
            let result: Interfaces.Control.IBaseColumn[] = super.columns();
            result[2].Header = vars._statres("label$stock$from");
            result.splice(3, 0, { Header: vars._statres("label$stock$to"), Field: "salepointto.name" });
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

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            let settings: card.Controller.Document.Card.DocumentCardFilterSettings = this.CardSettings.FilterSettings as card.Controller.Document.Card.DocumentCardFilterSettings;
            if (settings) {
                settings.Model.set("labelSalepoint", vars._statres("label$stock$from"));
                settings.showSalePointTo(true);
            }
            return result;
        }

    }
}

vars.registerController("document/card/movement", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Movement(); });