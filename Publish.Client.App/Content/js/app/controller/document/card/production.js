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
                var Production = /** @class */ (function (_super) {
                    __extends(Production, _super);
                    function Production() {
                        return _super.call(this) || this;
                    }
                    Production.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$productionmake"),
                            "cardModel": []
                        });
                    };
                    Object.defineProperty(Production.prototype, "EditIdName", {
                        get: function () {
                            return "id_production";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Production.prototype, "FilterId", {
                        get: function () {
                            return "DocumentFilterProduction";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Production.prototype, "EditController", {
                        get: function () {
                            return "document/editor/production";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Production.prototype, "DocType", {
                        get: function () {
                            return 60;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Production;
                }(card.Controller.Document.Card.Card));
                Card.Production = Production;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/production", function (module) { return new module.Controller.Document.Card.Production(); });
});
//# sourceMappingURL=production.js.map