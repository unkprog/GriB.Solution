import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Contractor extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$contractors"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FieldSearch: "code", ValueIdNew: -1, EditIdName: "id_contractor", EditController: "setting/editor/contractor",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetContractors, this.Service), Delete: $.proxy(this.Service.DelContractor, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                ]
            };
        }
    }
}

vars.registerController("setting/card/contractor", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Contractor(); });