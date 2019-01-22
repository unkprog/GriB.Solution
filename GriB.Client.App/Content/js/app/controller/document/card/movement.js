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
define(["require", "exports", "app/common/variables", "app/controller/document/card/card"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Card;
            (function (Card) {
                var Movement = /** @class */ (function (_super) {
                    __extends(Movement, _super);
                    function Movement() {
                        return _super.call(this) || this;
                    }
                    Movement.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$movement"),
                            "cardModel": []
                        });
                    };
                    Movement.prototype.columns = function () {
                        var result = _super.prototype.columns.call(this);
                        result.splice(4, 0, { Header: vars._statres("label$stockto"), Field: "salepointto.name" });
                        return result;
                    };
                    Object.defineProperty(Movement.prototype, "EditIdName", {
                        get: function () {
                            return "id_movement";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Movement.prototype, "FilterId", {
                        get: function () {
                            return "MovementCardFilterSettings";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Movement.prototype, "EditController", {
                        get: function () {
                            return "document/editor/movement";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Movement.prototype, "DocType", {
                        get: function () {
                            return 50;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Movement;
                }(card.Controller.Document.Card.Card));
                Card.Movement = Movement;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/movement", function (module) { return new module.Controller.Document.Card.Movement(); });
});
//# sourceMappingURL=movement.js.map