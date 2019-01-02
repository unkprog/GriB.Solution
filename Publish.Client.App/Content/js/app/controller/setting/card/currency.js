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
                var Currency = /** @class */ (function (_super) {
                    __extends(Currency, _super);
                    function Currency() {
                        return _super.call(this) || this;
                    }
                    Currency.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$currencies"),
                            "cardModel": []
                        });
                    };
                    Currency.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FieldSearch: "code", ValueIdNew: -1, EditIdName: "id_currency", EditController: "setting/editor/currency",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetCurrencies, this.Service), Delete: $.proxy(this.Service.DelCurrency, this.Service),
                            Columns: [
                                { Header: vars._statres("label$code"), Field: "code" },
                                { Header: vars._statres("label$nameshort"), Field: "nameshort" },
                                { Header: vars._statres("label$name"), HeaderStyle: "hide-on-small-only", Field: "name", FieldStyle: "hide-on-small-only" },
                            ]
                        };
                    };
                    return Currency;
                }(card.Controller.Setting.Card.Card));
                Card.Currency = Currency;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/currency", function (module) { return new module.Controller.Setting.Card.Currency(); });
});
//# sourceMappingURL=currency.js.map