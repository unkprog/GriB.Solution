import vars = require('app/common/variables');
import utils = require('app/common/utils');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Category extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/category.html", Id: "card-view-category" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$categories"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", ValueIdNew: -1, EditIdName: "id_category", EditController: "setting/editor/category",
                Load: $.proxy(this.Service.GetCategries, this.Service), Delete: $.proxy(this.Service.DelCategory, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$group"), Field: "parentname" },
                    
                ]
            };
        }
    }
}