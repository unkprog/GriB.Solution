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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller"], function (require, exports, vars, utils, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var Payment = /** @class */ (function (_super) {
                __extends(Payment, _super);
                function Payment() {
                    return _super.call(this) || this;
                }
                Object.defineProperty(Payment.prototype, "EditorModel", {
                    get: function () {
                        return this.Model.get("editModel").toJSON();
                    },
                    enumerable: true,
                    configurable: true
                });
                Payment.prototype.createModel = function () {
                    var result = new kendo.data.ObservableObject({
                        "Header": "",
                        "editModel": {
                            totalSum: 0,
                            receivedSum: undefined,
                            surrenderSum: undefined,
                            typeWithOut: 0,
                            client: { id: 0, name: "" },
                            comment: ""
                        },
                        "totalSumText": "0.00",
                        "receivedSumText": "",
                        "surrenderSumText": "",
                        "labelTotalToPay": vars._statres("label$topay"),
                        "labelReceiveSum": vars._statres("label$received"),
                        "labelSurrenderSum": vars._statres("label$surrender"),
                        "labelComment": vars._statres("label$comment"),
                        "labelOnCredit": vars._statres("label$oncredit"),
                        "labelOnTheHouse": vars._statres("label$onthehouse"),
                        "labelClientLeft": vars._statres("label$clientleft"),
                        "labelPayment": vars._statres("label$payment"),
                        "labelCancel": vars._statres("button$label$cancel"),
                        "visibleClient": "none",
                    });
                    result.bind("change", $.proxy(this.changeModel, this));
                    return result;
                };
                Object.defineProperty(Payment.prototype, "TotalSum", {
                    get: function () { return this.Model.get("editModel.totalSum"); },
                    set: function (value) { this.Model.set("editModel.totalSum", value); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Payment.prototype, "ReceivedSum", {
                    get: function () { return this.Model.get("editModel.receivedSum"); },
                    set: function (value) { this.Model.set("editModel.receivedSum", value); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Payment.prototype, "SurrenderSum", {
                    get: function () { return this.Model.get("editModel.surrenderSum"); },
                    set: function (value) { this.Model.set("editModel.surrenderSum", value); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Payment.prototype, "TypeWithOut", {
                    get: function () { return this.Model.get("editModel.typeWithOut"); },
                    set: function (value) { this.Model.set("editModel.typeWithOut", value); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Payment.prototype, "Client", {
                    get: function () { return this.Model.get("editModel.client").toJSON(); },
                    set: function (value) { this.Model.set("editModel.client", value); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Payment.prototype, "Comment", {
                    get: function () { return this.Model.get("editModel.comment"); },
                    set: function (value) { this.Model.set("editModel.comment", value); },
                    enumerable: true,
                    configurable: true
                });
                Payment.prototype.changeModel = function (e) {
                    if (e.field === "editModel.totalSum") {
                        this.Model.set("totalSumText", utils.numberToString(this.TotalSum, 2));
                    }
                    else if (e.field === "editModel.receivedSum") {
                        this.SurrenderSum = this.ReceivedSum - this.TotalSum;
                        if (this.inputReceivedSum) {
                            this.inputReceivedSum.val(utils.numberToString(this.ReceivedSum, 2));
                            M.updateTextFields();
                        }
                    }
                    else if (e.field === "editModel.surrenderSum") {
                        if (this.SurrenderSum < 0) {
                            if (this.inputSurrenderSum) {
                                this.inputSurrenderSum.removeClass("green-text");
                                this.inputSurrenderSum.addClass("red-text");
                                this.inputSurrenderSum.val(utils.numberToString(this.SurrenderSum, 2));
                                M.updateTextFields();
                            }
                        }
                        else {
                            if (this.inputSurrenderSum) {
                                this.inputSurrenderSum.removeClass("red-text");
                                this.inputSurrenderSum.addClass("green-text");
                            }
                        }
                        if (this.inputSurrenderSum)
                            this.inputSurrenderSum.val(utils.numberToString(this.SurrenderSum, 2));
                        M.updateTextFields();
                    }
                };
                Payment.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.PaymentButtonClick = this.createTouchClickEvent(this.btnPayment, this.paymentButtonClick);
                    this.PaymentCancelButtonClick = this.createTouchClickEvent(this.btnPaymentCancel, this.paymentCancelButtonClick);
                };
                Payment.prototype.destroyEvents = function () {
                    this.Model.unbind("change");
                    if (this.btnPayment)
                        this.destroyTouchClickEvent(this.btnPayment, this.PaymentButtonClick);
                    if (this.btnPaymentCancel)
                        this.destroyTouchClickEvent(this.btnPaymentCancel, this.PaymentCancelButtonClick);
                    _super.prototype.destroyEvents.call(this);
                };
                Payment.prototype.paymentButtonClick = function (e) {
                    this.SaveButtonClick(e);
                };
                Payment.prototype.validate = function () {
                    var controller = this;
                    var result = _super.prototype.validate.call(this);
                    var curValue = (this.inputReceivedSum ? "" + this.inputReceivedSum.val() : ""); // this.Model.get("receivedSumText");
                    try {
                        this.ReceivedSum = parseFloat(curValue);
                    }
                    catch (_a) {
                        this.ReceivedSum = 0;
                    }
                    if (isNaN(this.ReceivedSum))
                        this.ReceivedSum = 0;
                    if (this.TotalSum > this.ReceivedSum) {
                        M.toast({ html: vars._statres('error$numpad$amountinsufficient') });
                        result = false;
                    }
                    if (result === true && this.OnPaymentApply)
                        this.OnPaymentApply(controller);
                    return result;
                };
                Payment.prototype.paymentCancelButtonClick = function (e) {
                    this.CancelButtonClick(e);
                };
                return Payment;
            }(base.Controller.BaseEditor));
            Terminal.Payment = Payment;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=payment.js.map