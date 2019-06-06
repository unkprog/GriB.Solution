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
define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var PaymentType = /** @class */ (function (_super) {
                __extends(PaymentType, _super);
                function PaymentType() {
                    var _this = _super.call(this) || this;
                    _this.selectedPaymentType = 0;
                    return _this;
                }
                PaymentType.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/paymenttype.html", Id: "paymenttype-view" };
                };
                PaymentType.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": vars._statres("label$methodpayment"),
                        "labelPayment": vars._statres("label$payment"),
                        "labelCash": vars._statres("label$cash"),
                        "labelNonCash": vars._statres("label$noncash"),
                        "labelWithOutPayment": vars._statres("label$withoutpayment"),
                        "labelCancel": vars._statres("button$label$cancel")
                    });
                };
                Object.defineProperty(PaymentType.prototype, "SelectedPaymentType", {
                    get: function () { return this.selectedPaymentType; },
                    enumerable: true,
                    configurable: true
                });
                PaymentType.prototype.ViewInit = function (view) {
                    this.btnCash = view.find("#btn-cash");
                    this.btnNonCash = view.find("#btn-noncash");
                    this.btnWithOutPayment = view.find("#btn-witoutpayment");
                    this.btnCancelThis = view.find("#btn-cancel");
                    return _super.prototype.ViewInit.call(this, view);
                };
                PaymentType.prototype.ViewHide = function (e) {
                    _super.prototype.ViewHide.call(this, e);
                };
                PaymentType.prototype.ViewShow = function (e) {
                    var result = _super.prototype.ViewShow.call(this, e);
                    return result;
                };
                PaymentType.prototype.ViewResize = function (e) {
                    _super.prototype.ViewResize.call(this, e);
                };
                PaymentType.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.PaymentCashButtonClick = this.createTouchClickEvent(this.btnCash, this.paymentCashButtonClick);
                    this.PaymentNonCashButtonClick = this.createTouchClickEvent(this.btnNonCash, this.paymentNonCashButtonClick);
                    this.WithOutPaymentButtonClick = this.createTouchClickEvent(this.btnWithOutPayment, this.withOutPaymentButtonClick);
                    this.PaymentCancelButtonClick = this.createTouchClickEvent(this.btnCancelThis, this.paymentCancelButtonClick);
                };
                PaymentType.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent(this.btnCash, this.PaymentCashButtonClick);
                    this.destroyTouchClickEvent(this.btnNonCash, this.PaymentNonCashButtonClick);
                    this.destroyTouchClickEvent(this.btnWithOutPayment, this.WithOutPaymentButtonClick);
                    this.destroyTouchClickEvent(this.btnCancelThis, this.PaymentCancelButtonClick);
                    _super.prototype.destroyEvents.call(this);
                };
                PaymentType.prototype.paymentCancelButtonClick = function (e) {
                    this.CancelButtonClick(e);
                };
                PaymentType.prototype.selectPaymentTypeClick = function (e) {
                    var controller = this;
                    if (this.OnSelectPaymentType)
                        this.OnSelectPaymentType(controller);
                    this.SaveButtonClick(e);
                };
                PaymentType.prototype.paymentCashButtonClick = function (e) {
                    this.selectedPaymentType = 1;
                    this.selectPaymentTypeClick(e);
                };
                PaymentType.prototype.paymentNonCashButtonClick = function (e) {
                    this.selectedPaymentType = 2;
                    this.selectPaymentTypeClick(e);
                };
                PaymentType.prototype.withOutPaymentButtonClick = function (e) {
                    this.selectedPaymentType = 3;
                    this.selectPaymentTypeClick(e);
                };
                return PaymentType;
            }(base.Controller.BaseEditor));
            Terminal.PaymentType = PaymentType;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/paymenttype", function (module) { return new module.Controller.Terminal.PaymentType(); });
});
//# sourceMappingURL=paymenttype.js.map