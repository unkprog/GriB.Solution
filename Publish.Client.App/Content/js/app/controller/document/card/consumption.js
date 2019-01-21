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
                var Consumption = /** @class */ (function (_super) {
                    __extends(Consumption, _super);
                    function Consumption() {
                        return _super.call(this) || this;
                    }
                    Consumption.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$consumption"),
                            "cardModel": []
                        });
                    };
                    Object.defineProperty(Consumption.prototype, "EditIdName", {
                        get: function () {
                            return "id_consumption";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Consumption.prototype, "FilterId", {
                        get: function () {
                            return "DocumentFilterConsumption";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Consumption.prototype, "EditController", {
                        get: function () {
                            return "document/editor/Consumption";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Consumption.prototype, "DocType", {
                        get: function () {
                            return 20;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Consumption;
                }(card.Controller.Document.Card.Card));
                Card.Consumption = Consumption;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/consumption", function (module) { return new module.Controller.Document.Card.Consumption(); });
});
//# sourceMappingURL=consumption.js.map