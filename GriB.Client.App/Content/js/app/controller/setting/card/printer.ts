import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Printer extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$printers"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_printer", EditController: "setting/editor/printer",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetPrinters, this.Service), Delete: $.proxy(this.Service.DelPrinter, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name", },
                    { Header: vars._statres("label$printserver"), Field: "printserver.pskey", },
                    { Header: vars._statres("label$salePoint"), Field: "salepoint.name", },
                    { Header: vars._statres("label$papersize"), Field: "labelsize", FieldTemplate: '#if (labelsize === 1) {# 80 #} else {# 58 #}#' }
                ]
            };
        }
    }
}

vars.registerController("setting/card/printer", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Printer(); });