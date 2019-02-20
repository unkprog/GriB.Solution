﻿import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Category extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$categories"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_category", EditController: "setting/editor/category",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetCategries, this.Service), Delete: $.proxy(this.Service.DelCategory, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$group"), Field: "parentname" },
                    
                ]
            };
        }
    }
}

vars.registerController("setting/card/category", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Category(); });