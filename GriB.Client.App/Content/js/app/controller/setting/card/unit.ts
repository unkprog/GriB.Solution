import vars = require('app/common/variables');
import utils = require('app/common/utils');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Unit extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/unit.html", Id: "card-view-unit" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$units"),
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
            this.Service.GetUnits((responseData) => {
                controller.Model.set("cardModel", responseData);
                controller.afterLoad();
            });
            return false;
        }


        public Add() {
            vars._editorData["id_unit"] = -1;
            vars._app.OpenController("setting/editor/unit", this);
        }

        public Edit(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                if (_id > 0) {
                    vars._editorData["id_unit"] = _id;
                    vars._app.OpenController("setting/editor/unit", this);
                }
            }
        }

        public Delete(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let controller = this;
                this.Service.DelUnit(_id, (responseData) => {
                    controller.afterDelete();
                });
            }
        }
    }
}