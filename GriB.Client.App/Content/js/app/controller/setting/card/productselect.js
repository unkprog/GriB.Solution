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
define(["require", "exports", "app/controller/setting/card/product"], function (require, exports, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card) {
                var ProductSelect = /** @class */ (function (_super) {
                    __extends(ProductSelect, _super);
                    function ProductSelect() {
                        return _super.call(this) || this;
                    }
                    ProductSelect.prototype.createCardSettings = function () {
                        var settings = _super.prototype.createCardSettings.call(this);
                        settings.IsAdd = false;
                        settings.IsEdit = false;
                        settings.IsDelete = false;
                        settings.IsSelect = true;
                        return settings;
                    };
                    return ProductSelect;
                }(card.Controller.Setting.Card.Product));
                Card.ProductSelect = ProductSelect;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=productselect.js.map