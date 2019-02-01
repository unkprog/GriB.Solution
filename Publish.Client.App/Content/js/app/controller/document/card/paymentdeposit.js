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
define(["require", "exports", "app/common/variables", "app/controller/document/card/payment"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Card;
            (function (Card) {
                var PaymentDeposit = /** @class */ (function (_super) {
                    __extends(PaymentDeposit, _super);
                    function PaymentDeposit() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("label$deposit"));
                        return _this;
                    }
                    PaymentDeposit.prototype.columns = function () {
                        var payMethod = '#if (ptype === 1) {#<i class="material-icons left">attach_money</i># } else if (ptype === 2) {#<i class="material-icons left">credit_card</i># } else if (ptype === 3) {#<i class="material-icons left">money_off</i>#}#';
                        return [
                            { Header: "", HeaderStyle: "doc-col-conduct", Field: "options", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((options & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                            { Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" },
                            { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                            { Header: vars._statres("label$employee"), Field: "employee.name" },
                            { Header: vars._statres("label$methodpayment"), Field: "ptype", FieldTemplate: payMethod },
                            { Header: vars._statres("label$client"), Field: "client.name" },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                        ];
                    };
                    Object.defineProperty(PaymentDeposit.prototype, "EditIdName", {
                        get: function () {
                            return "id_paymentdeposit";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentDeposit.prototype, "FilterId", {
                        get: function () {
                            return "PaymentDepositCardFilterSettings";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentDeposit.prototype, "EditController", {
                        get: function () {
                            return "document/editor/paymentdeposit";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentDeposit.prototype, "DocType", {
                        get: function () {
                            return 20;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentDeposit.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        var settings = this.CardSettings.FilterSettings;
                        //if (settings) settings.showReason(true);
                        return result;
                    };
                    return PaymentDeposit;
                }(card.Controller.Document.Card.Payment));
                Card.PaymentDeposit = PaymentDeposit;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/paymentdeposit", function (module) { return new module.Controller.Document.Card.PaymentDeposit(); });
});
//# sourceMappingURL=paymentdeposit.js.map