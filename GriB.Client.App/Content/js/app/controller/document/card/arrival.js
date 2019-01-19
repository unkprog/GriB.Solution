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
                var Arrival = /** @class */ (function (_super) {
                    __extends(Arrival, _super);
                    function Arrival() {
                        return _super.call(this) || this;
                    }
                    Arrival.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$arrival"),
                            "cardModel": []
                        });
                    };
                    Arrival.prototype.columns = function () {
                        var result = _super.prototype.columns.call(this);
                        result.splice(3, 0, { Header: vars._statres("label$contractor"), Field: "contractor.name" });
                        return result;
                    };
                    Object.defineProperty(Arrival.prototype, "EditIdName", {
                        get: function () {
                            return "id_arrival";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Arrival.prototype, "EditController", {
                        get: function () {
                            return "document/editor/arrival";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Arrival.prototype, "DocType", {
                        get: function () {
                            return 10;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Arrival.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        var settings = this.CardSettings.FilterSettings;
                        if (settings)
                            settings.showContractor();
                        return result;
                    };
                    return Arrival;
                }(card.Controller.Document.Card.Card));
                Card.Arrival = Arrival;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/arrival", function (module) { return new module.Controller.Document.Card.Arrival(); });
});
//# sourceMappingURL=arrival.js.map