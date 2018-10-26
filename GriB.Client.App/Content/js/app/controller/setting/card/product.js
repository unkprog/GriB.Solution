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
                var Category = /** @class */ (function (_super) {
                    __extends(Category, _super);
                    function Category() {
                        return _super.call(this) || this;
                    }
                    Category.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/card/product.html", Id: "card-view-product" };
                    };
                    Category.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$categories"),
                            "cardModel": []
                        });
                    };
                    Category.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", ValueIdNew: -1, EditIdName: "id_product", EditController: "setting/editor/product",
                            Load: $.proxy(this.Service.GetProducts, this.Service), Delete: $.proxy(this.Service.DelProduct, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                            ]
                        };
                    };
                    return Category;
                }(card.Controller.Setting.Card.Card));
                Card.Category = Category;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=product.js.map