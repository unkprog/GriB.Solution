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
                var Writeoff = /** @class */ (function (_super) {
                    __extends(Writeoff, _super);
                    function Writeoff() {
                        return _super.call(this) || this;
                    }
                    Writeoff.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$writeoff"),
                            "cardModel": []
                        });
                    };
                    Writeoff.prototype.columns = function () {
                        var result = _super.prototype.columns.call(this);
                        result.splice(4, 0, { Header: vars._statres("label$reason"), Field: "reason.name" });
                        return result;
                    };
                    Object.defineProperty(Writeoff.prototype, "EditIdName", {
                        get: function () {
                            return "id_writeoff";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Writeoff.prototype, "FilterId", {
                        get: function () {
                            return "DocumentFilterWriteoff";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Writeoff.prototype, "EditController", {
                        get: function () {
                            return "document/editor/writeoff";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Writeoff.prototype, "DocType", {
                        get: function () {
                            return 40;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Writeoff.prototype, "Contractor", {
                        get: function () {
                            return 0;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Writeoff.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        var settings = this.CardSettings.FilterSettings;
                        if (settings)
                            settings.showReason(true);
                        return result;
                    };
                    return Writeoff;
                }(card.Controller.Document.Card.Card));
                Card.Writeoff = Writeoff;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/writeoff", function (module) { return new module.Controller.Document.Card.Writeoff(); });
});
//# sourceMappingURL=writeoff.js.map