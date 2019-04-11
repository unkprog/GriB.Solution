import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class PrintServer extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$printservers"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_printserver", EditController: "setting/editor/printserver",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetPrintServers, this.Service), Delete: $.proxy(this.Service.DelPrintServer, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name", },
                    { Header: vars._statres("label$printserverkey"), Field: "pskey", },
                    { Header: vars._statres("label$description"), Field: "description" }
                ]
            };
        }
    }
}

vars.registerController("setting/card/printserver", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.PrintServer(); });