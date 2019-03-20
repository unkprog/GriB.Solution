import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class CostIncome extends card.Controller.Setting.Card.Card implements Interfaces.ICardCostIncome {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$articlescostincome"),
                "cardModel": []
            });
        }

        protected createCardFilterSettings(): Interfaces.Control.ICardFilterSettings {
            let result: Interfaces.Control.ICardFilterSettings = super.createCardFilterSettings();
            result.FieldSearch = "name";
            return result;
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_costincome", EditController: "setting/editor/costincome",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.getCardRows, this), Delete: $.proxy(this.Service.DelCostIncome, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$articletype"), Field: "type", FieldTemplate: '#if (type === 1) {#' + vars._statres("label$income") + '#} else {#' + vars._statres("label$cost") + '#}#'},
                ]
            };
        }

        private typeCostIncome: number = 0;
        public get TypeCostIncome(): number {
            return this.typeCostIncome;
        }

        public set TypeCostIncome(value: number) {
            this.typeCostIncome = value;
        }

        private getCardRows(Callback: (responseData: any) => void) {
            this.Service.GetCostIncomes(this.typeCostIncome, (responseData: any) => {
                if (Callback)
                    Callback(responseData);
            });
        }
    }
}

vars.registerController("setting/card/costincome", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.CostIncome(); });