import vars = require('app/common/variables');
import utils = require('app/common/utils');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Unit extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/unit.html", Id: "card-view-unit" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$units"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", ValueIdNew: -1, EditIdName: "id_unit", EditController: "setting/editor/unit",
                Load: $.proxy(this.Service.GetUnits, this.Service), Delete: $.proxy(this.Service.DelUnit, this.Service),
                Columns: [
                    { Header: vars._statres("label$code"), Field: "code" },
                    { Header: vars._statres("label$nameshort"), Field: "nameshort" },
                    { Header: vars._statres("label$name"), HeaderStyle: "hide-on-small-only", Field: "name", FieldStyle: "hide-on-small-only" },
                ]
            };
        }
    }
}