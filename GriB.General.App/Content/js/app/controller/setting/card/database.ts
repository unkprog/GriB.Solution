import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Database extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$databases"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_database", EditController: "setting/editor/database",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetDatabases, this.Service), Delete: $.proxy(this.Service.DelDatabase, this.Service),
                Columns: [
                    { Header: vars._statres("label$id"), Field: "id" },
                    { Header: vars._statres("label$server"), Field: "sqlsrv.address" },
                    { Header: vars._statres("label$catalog"), Field: "catalog" },
                    { Header: vars._statres("label$login"), Field: "user" },
                    { Header: vars._statres("label$password"), Field: "pass" }
                ]
            };
        }
    }
}

vars.registerController("setting/card/database", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Database(); });