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
                var Product = /** @class */ (function (_super) {
                    __extends(Product, _super);
                    function Product() {
                        return _super.call(this) || this;
                    }
                    Product.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$products"),
                            "cardModel": []
                        });
                    };
                    Product.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_product", EditController: "setting/editor/product",
                            IsAdd: true, IsAddCopy: true, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetProducts, this.Service), Delete: $.proxy(this.Service.DelProduct, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                                { Header: vars._statres("label$type"), Field: "typename" },
                            ]
                        };
                    };
                    Product.prototype.afterLoad = function () {
                        var items = this.Model.get("cardModel");
                        for (var i = 0, icount = items.length; i < icount; i++)
                            items[i].typename = items[i].type === 0 ? vars._statres("label$product") : items[i].type === 1 ? vars._statres("label$production") : vars._statres("label$service");
                        _super.prototype.afterLoad.call(this);
                    };
                    return Product;
                }(card.Controller.Setting.Card.Card));
                Card.Product = Product;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/product", function (module) { return new module.Controller.Setting.Card.Product(); });
});
//# sourceMappingURL=product.js.map