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
define(["require", "exports", "app/common/variables", "app/controller/document/card/paymentbase"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Card;
            (function (Card) {
                var Payment = /** @class */ (function (_super) {
                    __extends(Payment, _super);
                    function Payment() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Payment.prototype, "EditIdName", {
                        get: function () {
                            return "id_payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Payment.prototype, "FilterId", {
                        get: function () {
                            return "PaymentCardFilterSettings";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Payment.prototype, "EditController", {
                        get: function () {
                            return "document/editor/payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Payment.prototype, "DocType", {
                        get: function () {
                            return 10;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Payment.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        //let settings: card.Controller.Document.Card.PaymentCardFilterSettings = this.CardSettings.FilterSettings as card.Controller.Document.Card.PaymentCardFilterSettings;
                        ////if (settings) settings.showReason(true);
                        return result;
                    };
                    return Payment;
                }(card.Controller.Document.Card.PaymentBase));
                Card.Payment = Payment;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/payment", function (module) { return new module.Controller.Document.Card.Payment(); });
});
//# sourceMappingURL=payment.js.map