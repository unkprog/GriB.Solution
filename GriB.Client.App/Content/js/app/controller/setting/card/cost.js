var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/controller/setting/card/card"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card) {
                var Cost = /** @class */ (function (_super) {
                    __extends(Cost, _super);
                    function Cost() {
                        return _super.call(this) || this;
                    }
                    Cost.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$articlescostincome"),
                            "cardModel": []
                        });
                    };
                    Cost.prototype.createCardFilterSettings = function () {
                        var result = _super.prototype.createCardFilterSettings.call(this);
                        result.FieldSearch = "name";
                        return result;
                    };
                    Cost.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_costincome", EditController: "setting/editor/costincome",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetCostIncomes, this.Service), Delete: $.proxy(this.Service.DelCostIncome, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                                { Header: vars._statres("label$articletype"), Field: "type", FieldTemplate: '#if (type === 1) {#' + vars._statres("label$income") + '#} else {#' + vars._statres("label$cost") + '#}#' },
                            ]
                        };
                    };
                    return Cost;
                }(card.Controller.Setting.Card.Card));
                Card.Cost = Cost;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/cost", function (module) { return new module.Controller.Setting.Card.Cost(); });
});
//# sourceMappingURL=cost.js.map