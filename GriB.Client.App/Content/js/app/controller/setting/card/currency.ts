﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Currency extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/currency.html", Id: "card-view-currency" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$currencies"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", ValueIdNew: -1, EditIdName: "id_currency", EditController: "setting/editor/currency",
                Load: $.proxy(this.Service.GetCurrencies, this.Service), Delete: $.proxy(this.Service.DelCurrency, this.Service),
                Columns: [
                    { Header: vars._statres("label$code"), Field: "code" },
                    { Header: vars._statres("label$nameshort"), Field: "nameshort" },
                    { Header: vars._statres("label$name"), HeaderStyle: "hide-on-small-only", Field: "name", FieldStyle: "hide-on-small-only" },
                ]
            };
        }
    }
}