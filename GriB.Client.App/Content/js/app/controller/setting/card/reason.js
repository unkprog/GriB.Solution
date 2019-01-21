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
                var Reason = /** @class */ (function (_super) {
                    __extends(Reason, _super);
                    function Reason() {
                        return _super.call(this) || this;
                    }
                    Reason.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$reasons"),
                            "cardModel": []
                        });
                    };
                    Reason.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_reason", EditController: "setting/editor/reason",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetReasons, this.Service), Delete: $.proxy(this.Service.DelReason, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                            ]
                        };
                    };
                    return Reason;
                }(card.Controller.Setting.Card.Card));
                Card.Reason = Reason;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/reason", function (module) { return new module.Controller.Setting.Card.Reason(); });
});
//# sourceMappingURL=reason.js.map