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
                var SalePoint = /** @class */ (function (_super) {
                    __extends(SalePoint, _super);
                    function SalePoint() {
                        return _super.call(this) || this;
                    }
                    SalePoint.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$salesPoints"),
                            "cardModel": []
                        });
                    };
                    SalePoint.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "id_salepoint", EditController: "setting/editor/salepoint",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetSalePoints, this.Service), Delete: $.proxy(this.Service.DelSalePoint, this.Service),
                            Columns: [
                                { Header: "Наименование", Field: "name" },
                                { Header: "Город", Field: "city" },
                                { Header: "Адрес", HeaderStyle: "hide-on-small-only", Field: "address", FieldStyle: "hide-on-small-only" },
                                { Header: "Расписание", HeaderStyle: "hide-on-small-only", Field: "schedule", FieldStyle: "hide-on-small-only" },
                            ]
                        };
                    };
                    return SalePoint;
                }(card.Controller.Setting.Card.Card));
                Card.SalePoint = SalePoint;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/salepoint", function (module) { return new module.Controller.Setting.Card.SalePoint(); });
});
//# sourceMappingURL=salepoint.js.map