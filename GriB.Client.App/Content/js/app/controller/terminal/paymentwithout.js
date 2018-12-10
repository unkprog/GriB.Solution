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
            var PaymentWithOut = /** @class */ (function (_super) {
                __extends(PaymentWithOut, _super);
                function PaymentWithOut() {
                    var _this = _super.call(this) || this;
                    _this.Model.set("Header", vars._statres("label$withoutpayment"));
                    return _this;
                }
                PaymentWithOut.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/paymentwithout.html", Id: "paymentwithout-view" };
                };
                PaymentWithOut.prototype.ViewInit = function (view) {
                    this.inputTotalSum = view.find("#paymentwithout-view-totalsum");
                    this.inputReceivedSum = view.find("#paymentwithout-view-received");
                    this.btnPayment = view.find("#btn-num-apply");
                    this.btnPaymentCancel = view.find("#btn-num-cancel");
                    return _super.prototype.ViewInit.call(this, view);
                };
                return PaymentWithOut;
            }(payment.Controller.Terminal.Payment));
            Terminal.PaymentWithOut = PaymentWithOut;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=paymentwithout.js.map