import vars = require('app/common/variables');
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

        protected getCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id",
                Columns: [
                    { Header: vars._statres("label$code"), Field: "code" },
                    { Header: vars._statres("label$nameshort"), Field: "nameshort" },
                    { Header: vars._statres("label$name"), HeaderStyle: "hide-on-small-only", Field: "name", FieldStyle: "hide-on-small-only" },
                ]
            };
        }

        protected loadData(): boolean {
            let controller = this;
            this.Service.GetCurrencies((responseData) => {
                controller.Model.set("cardModel", responseData);
                controller.afterLoad();
            });
            return false;
        }


        public Add() {
            vars._editorData["id_currency"] = -1;
            vars._app.OpenController("setting/editor/currency", this);
        }

        public Edit(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                if (_id > 0) {
                    vars._editorData["id_currency"] = _id;
                    vars._app.OpenController("setting/editor/currency", this);
                }
            }
        }

        public Delete(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let controller = this;
                this.Service.DelCurrency(_id, (responseData) => {
                    controller.afterDelete();
                });
            }
        }
    }
}