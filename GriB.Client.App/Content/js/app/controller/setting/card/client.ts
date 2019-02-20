import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Client extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$clients"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "id_client", EditController: "setting/editor/client",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetClients, this.Service), Delete: $.proxy(this.Service.DelClient, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$phone"), Field: "phone" },
                ]
            };
        }

        public get CardModel(): Interfaces.Model.IClientModel[] {
            return this.Model.get("cardModel").toJSON();
        }
    }
}

vars.registerController("setting/card/client", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Client(); });