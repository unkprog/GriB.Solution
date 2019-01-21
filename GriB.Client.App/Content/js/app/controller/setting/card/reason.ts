import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Reason extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$reasons"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_reason", EditController: "setting/editor/reason",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetReasons, this.Service), Delete: $.proxy(this.Service.DelReason, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                ]
            };
        }
    }
}

vars.registerController("setting/card/reason", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Reason(); });