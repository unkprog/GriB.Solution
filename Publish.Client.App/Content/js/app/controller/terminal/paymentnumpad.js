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
define(["require", "exports", "app/common/variables", "app/controller/terminal/payment"], function (require, exports, vars, payment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var PaymentNumPad = /** @class */ (function (_super) {
                __extends(PaymentNumPad, _super);
                function PaymentNumPad() {
                    var _this = _super.call(this) || this;
                    _this.Model.set("Header", vars._statres("label$payment"));
                    return _this;
                }
                PaymentNumPad.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/paymentnumpad.html", Id: "paymentnumpad-view" };
                };
                PaymentNumPad.prototype.ViewInit = function (view) {
                    this.btnNumPad = view.find(".btn-numpad");
                    this.inputTotalSum = view.find("#paymentnumpad-view-totalsum");
                    this.inputReceivedSum = view.find("#paymentnumpad-view-received");
                    this.inputSurrenderSum = view.find("#paymentnumpad-view-surrender");
                    this.btnPayment = view.find("#btn-num-apply");
                    this.btnPaymentCancel = view.find("#btn-num-cancel");
                    return _super.prototype.ViewInit.call(this, view);
                };
                PaymentNumPad.prototype.ViewHide = function (e) {
                    _super.prototype.ViewHide.call(this, e);
                };
                PaymentNumPad.prototype.ViewShow = function (e) {
                    var result = _super.prototype.ViewShow.call(this, e);
                    return result;
                };
                PaymentNumPad.prototype.ViewResize = function (e) {
                    _super.prototype.ViewResize.call(this, e);
                };
                PaymentNumPad.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.NumberButtonClick = this.createTouchClickEvent(this.btnNumPad, this.numberButtonClick);
                };
                PaymentNumPad.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent(this.btnNumPad, this.createEvents);
                    _super.prototype.destroyEvents.call(this);
                };
                PaymentNumPad.prototype.numberButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var strValue = targetid.replace("btn-num-", "");
                    var curValue = this.Model.get("receivedSumText");
                    var prevValue = curValue;
                    var numValue;
                    if (strValue === "colon")
                        curValue += ".";
                    else if (strValue === "bspace") {
                        if (curValue.length > 0)
                            curValue = curValue.substring(0, curValue.length - 1);
                    }
                    else
                        curValue += strValue;
                    try {
                        numValue = parseFloat(curValue);
                    }
                    catch (_a) {
                        curValue = prevValue;
                    }
                    if (isNaN(numValue)) {
                        numValue = 0;
                        curValue = "";
                    }
                    this.ReceivedSum = numValue;
                    this.Model.set("receivedSumText", curValue);
                    //this.SurrenderSum = numValue - this.TotalSum;
                };
                return PaymentNumPad;
            }(payment.Controller.Terminal.Payment));
            Terminal.PaymentNumPad = PaymentNumPad;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/paymentnumpad", function (module) { return new module.Controller.Terminal.PaymentNumPad(); });
});
//# sourceMappingURL=paymentnumpad.js.map