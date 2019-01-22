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

        protected columns(): Interfaces.ICardColumn[] {
            let result: Interfaces.ICardColumn[] = super.columns();
            result.splice(4, 0, { Header: vars._statres("label$reason"), Field: "reason.name" });
            return result;
        }


        protected get EditIdName(): string {
            return "id_writeoff";
        }

        protected get FilterId(): string {
            return "WriteOffCardFilterSettings";
        }

        protected get EditController(): string {
            return "document/editor/writeoff";
        }

        protected get DocType(): number {
            return 40;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            let settings: card.Controller.Document.Card.DocumentCardFilterSettings = this.CardSettings.FilterSettings as card.Controller.Document.Card.DocumentCardFilterSettings;
            if (settings) settings.showReason(true);
            return result;
        }

    }
}

vars.registerController("document/card/writeoff", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Writeoff(); });