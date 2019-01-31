import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Account extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$accounts"),
                "cardModel": []
            });
        }

        protected createCardFilterSettings(): Interfaces.ICardFilterSettings {
            let result: Interfaces.ICardFilterSettings = super.createCardFilterSettings();
            result.FieldSearch = "name";
            return result;
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_account", EditController: "setting/editor/account",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetAccounts, this.Service), Delete: $.proxy(this.Service.DelAccount, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$number"), Field: "number" },
                ]
            };
        }
    }
}

vars.registerController("setting/card/account", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Account(); });