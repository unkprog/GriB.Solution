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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/terminal/payment"], function (require, exports, vars, utils, payment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var PaymentNonCash = /** @class */ (function (_super) {
                __extends(PaymentNonCash, _super);
                function PaymentNonCash() {
                    var _this = _super.call(this) || this;
                    _this.Model.set("Header", vars._statres("label$noncash"));
                    return _this;
                }
                PaymentNonCash.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/paymentnoncash.html", Id: "paymentnoncash-view" };
                };
                PaymentNonCash.prototype.ViewInit = function (view) {
                    this.inputTotalSum = view.find("#paymentnoncash-view-totalsum");
                    this.inputReceivedSum = view.find("#paymentnoncash-view-received");
                    this.inputSurrenderSum = view.find("#paymentnoncash-view-surrender");
                    this.btnPayment = view.find("#btn-num-apply");
                    this.btnPaymentCancel = view.find("#btn-num-cancel");
                    this.ReceivedSum = this.TotalSum;
                    this.SurrenderSum = 0;
                    this.changeModel({ field: "editModel.receivedSum" });
                    this.inputReceivedSum.val(utils.numberToString(this.ReceivedSum, 2));
                    this.inputSurrenderSum.val(utils.numberToString(this.SurrenderSum, 2));
                    return _super.prototype.ViewInit.call(this, view);
                };
                return PaymentNonCash;
            }(payment.Controller.Terminal.Payment));
            Terminal.PaymentNonCash = PaymentNonCash;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/paymentnoncash", function (module) { return new module.Controller.Terminal.PaymentNonCash(); });
});
//# sourceMappingURL=paymentnoncash.js.map