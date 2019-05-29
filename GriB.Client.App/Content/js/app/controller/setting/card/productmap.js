var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
                var ProductMap = /** @class */ (function (_super) {
                    __extends(ProductMap, _super);
                    function ProductMap() {
                        return _super.call(this) || this;
                    }
                    ProductMap.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$productmaps"),
                            "cardModel": []
                        });
                    };
                    ProductMap.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_productmap", EditController: "setting/editor/productmap",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetProductMaps, this.Service), Delete: $.proxy(this.Service.DelProduct, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                                { Header: vars._statres("label$category"), Field: "category.name" },
                                { Header: vars._statres("label$unitshort"), Field: "unit.code" },
                            ]
                        };
                    };
                    ProductMap.prototype.afterLoad = function () {
                        var items = this.Model.get("cardModel");
                        _super.prototype.afterLoad.call(this);
                    };
                    return ProductMap;
                }(card.Controller.Setting.Card.Card));
                Card.ProductMap = ProductMap;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/productmap", function (module) { return new module.Controller.Setting.Card.ProductMap(); });
});
//# sourceMappingURL=productmap.js.map