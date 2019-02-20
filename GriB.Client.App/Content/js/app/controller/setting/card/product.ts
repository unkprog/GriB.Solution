import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Product extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$products"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_product", EditController: "setting/editor/product",
                IsAdd: true, IsAddCopy: true, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetProducts, this.Service), Delete: $.proxy(this.Service.DelProduct, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$type"), Field: "typename" },
                ]
            };
        }

        protected afterLoad(): void {
            let items = this.Model.get("cardModel");
            for (let i = 0, icount = items.length; i < icount; i++)
                items[i].typename = items[i].type === 0 ? vars._statres("label$product") : items[i].type === 1 ? vars._statres("label$production") : vars._statres("label$service");
            super.afterLoad();
        }
    }
}

vars.registerController("setting/card/product", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Product(); });