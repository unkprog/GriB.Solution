import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Server extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$servers"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_server", EditController: "setting/editor/server",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetServers, this.Service), Delete: $.proxy(this.Service.DelServer, this.Service),
                Columns: [
                    { Header: vars._statres("label$id"), Field: "id", },
                    { Header: vars._statres("label$address"), Field: "address", },
                    { Header: vars._statres("label$login"), Field: "user", },
                    { Header: vars._statres("label$password"), Field: "pass" }
                ]
            };
        }
    }
}

vars.registerController("setting/card/server", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Server(); });