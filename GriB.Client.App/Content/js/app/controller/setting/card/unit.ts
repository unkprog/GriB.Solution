import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Unit extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$units"),
                "cardModel": []
            });
        }

        protected createCardFilterSettings(): Interfaces.ICardFilterSettings {
            let result: Interfaces.ICardFilterSettings = super.createCardFilterSettings();
            result.FieldSearch = "code";
            return result;
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_unit", EditController: "setting/editor/unit",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
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

vars.registerController("setting/card/unit", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Unit(); });