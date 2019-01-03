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

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FieldSearch: "name", ValueIdNew: -1, EditIdName: "id_arrival", EditController: "document/editor/arrival",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetCategries, this.Service), Delete: $.proxy(this.Service.DelCategory, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$group"), Field: "parentname" },

                ]
            };
        }
    }
}

vars.registerController("document/card/arrival", function (module: any): Interfaces.IController { return new module.Controller.Document.Card.Arrival(); });