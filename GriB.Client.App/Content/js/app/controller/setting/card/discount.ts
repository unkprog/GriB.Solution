import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Discount extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$discounts"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FieldSearch: "name", ValueIdNew: -1, EditIdName: "id_discount", EditController: "setting/editor/discount",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetDiscounts, this.Service), Delete: $.proxy(this.Service.DelDiscount, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$value"), Field: "value" },
                ]
            };
        }

        protected afterLoad(): void {
            super.afterLoad();
        }
    }
}

vars.registerController("setting/card/discount", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Discount(); });