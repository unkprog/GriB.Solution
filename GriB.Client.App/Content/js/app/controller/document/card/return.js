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
                var Return = /** @class */ (function (_super) {
                    __extends(Return, _super);
                    function Return() {
                        return _super.call(this) || this;
                    }
                    Return.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$return"),
                            "cardModel": []
                        });
                    };
                    Object.defineProperty(Return.prototype, "EditIdName", {
                        get: function () {
                            return "id_return";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Return.prototype, "EditController", {
                        get: function () {
                            return "document/editor/return";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Return.prototype, "DocType", {
                        get: function () {
                            return 30;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Return;
                }(card.Controller.Document.Card.Card));
                Card.Return = Return;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/return", function (module) { return new module.Controller.Document.Card.Return(); });
});
//# sourceMappingURL=return.js.map