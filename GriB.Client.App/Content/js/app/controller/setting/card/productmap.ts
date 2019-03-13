import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');
import ctrl = require('app/common/basecontrol');

export namespace Controller.Setting.Card {
    export class ProductMap extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$productmaps"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_productmap", EditController: "setting/editor/productmap",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetProductMaps, this.Service), Delete: $.proxy(this.Service.DelProduct, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$category"), Field: "category.name" },
                    { Header: vars._statres("label$unitshort"), Field: "unit.code" },
                ]
            };
        }

        protected afterLoad(): void {
            let items = this.Model.get("cardModel");
            super.afterLoad();
        }
    }
}

vars.registerController("setting/card/productmap", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.ProductMap(); });