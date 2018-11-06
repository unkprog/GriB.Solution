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
                var Unit = /** @class */ (function (_super) {
                    __extends(Unit, _super);
                    function Unit() {
                        return _super.call(this) || this;
                    }
                    Unit.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/card/unit.html", Id: "card-view-unit" };
                    };
                    Unit.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$units"),
                            "cardModel": []
                        });
                    };
                    Unit.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", ValueIdNew: -1, EditIdName: "id_unit", EditController: "setting/editor/unit",
                            Load: $.proxy(this.Service.GetUnits, this.Service), Delete: $.proxy(this.Service.DelUnit, this.Service),
                            Columns: [
                                { Header: vars._statres("label$code"), Field: "code" },
                                { Header: vars._statres("label$nameshort"), Field: "nameshort" },
                                { Header: vars._statres("label$name"), HeaderStyle: "hide-on-small-only", Field: "name", FieldStyle: "hide-on-small-only" },
                            ]
                        };
                    };
                    return Unit;
                }(card.Controller.Setting.Card.Card));
                Card.Unit = Unit;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=unit.js.map