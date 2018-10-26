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
                    Currency.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/card/currency.html", Id: "card-view-currency" };
                    };
                    Currency.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$currencies"),
                            "cardModel": []
                        });
                    };
                    Currency.prototype.getCardSettings = function () {
                        return {
                            FieldId: "id",
                            Columns: [
                                { Header: vars._statres("label$code"), Field: "code" },
                                { Header: vars._statres("label$nameshort"), Field: "nameshort" },
                                { Header: vars._statres("label$name"), HeaderStyle: "hide-on-small-only", Field: "name", FieldStyle: "hide-on-small-only" },
                            ]
                        };
                    };
                    Currency.prototype.loadData = function () {
                        var controller = this;
                        this.Service.GetCurrencies(function (responseData) {
                            controller.Model.set("cardModel", responseData);
                            controller.afterLoad();
                        });
                        return false;
                    };
                    Currency.prototype.Add = function () {
                        vars._editorData["id_currency"] = 0;
                        vars._app.OpenController("setting/editor/currency", this);
                    };
                    Currency.prototype.Edit = function () {
                        var id = this.getSelectedRowId();
                        if (id) {
                            var _id = +id;
                            if (_id > 0) {
                                vars._editorData["id_currency"] = _id;
                                vars._app.OpenController("setting/editor/currency", this);
                            }
                        }
                    };
                    Currency.prototype.Delete = function () {
                        var id = this.getSelectedRowId();
                        if (id) {
                            var _id = +id;
                            var controller_1 = this;
                            this.Service.DelCurrency(_id, function (responseData) {
                                controller_1.afterDelete();
                            });
                        }
                    };
                    return Currency;
                }(card.Controller.Setting.Card.Card));
                Card.Currency = Currency;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=currency.js.map