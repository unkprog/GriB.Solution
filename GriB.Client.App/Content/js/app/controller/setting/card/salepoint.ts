import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class SalePoint extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$salesPoints"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FieldSearch: "name", ValueIdNew: 0, EditIdName: "id_salepoint", EditController: "setting/editor/salepoint",
                IsAdd: true, IsAddCopy: false,IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetSalePoints, this.Service), Delete: $.proxy(this.Service.DelSalePoint, this.Service),
                Columns: [
                    { Header: "Наименование", Field: "name" },
                    { Header: "Город", Field: "city" },
                    { Header: "Адрес", HeaderStyle: "hide-on-small-only", Field: "address", FieldStyle: "hide-on-small-only" },
                    { Header: "Расписание", HeaderStyle: "hide-on-small-only", Field: "schedule", FieldStyle: "hide-on-small-only" },
                ]
            };
        }
    }
}