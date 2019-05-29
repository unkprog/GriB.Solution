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
define(["require", "exports", "app/common/variables", "app/controller/terminal/paymentnumpad"], function (require, exports, vars, paymentnumpad) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var QuantityNumPad = /** @class */ (function (_super) {
                __extends(QuantityNumPad, _super);
                function QuantityNumPad() {
                    var _this = _super.call(this) || this;
                    _this.Model.set("Header", vars._statres("label$quantity"));
                    _this.Model.set("labelTotalToPay", vars._statres("label$quantity"));
                    _this.Model.set("labelReceiveSum", vars._statres("label$changequantity"));
                    _this.Model.set("labelPayment", vars._statres("button$label$ok"));
                    return _this;
                }
                QuantityNumPad.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/paymentnumpad.html", Id: "paymentnumpad-view" };
                };
                QuantityNumPad.prototype.ViewInit = function (view) {
                    var result = _super.prototype.ViewInit.call(this, view);
                    if (this.inputSurrenderSumRow)
                        this.inputSurrenderSumRow.addClass("hide");
                    return result;
                };
                QuantityNumPad.prototype.validate = function () {
                    var controller = this;
                    var result = true;
                    var curValue = (this.inputReceivedSum ? "" + this.inputReceivedSum.val() : ""); // this.Model.get("receivedSumText");
                    try {
                        this.ReceivedSum = parseFloat(curValue);
                    }
                    catch (_a) {
                        this.ReceivedSum = 0;
                    }
                    if (isNaN(this.ReceivedSum))
                        this.ReceivedSum = 0;
                    if (this.ReceivedSum <= 0) {
                        M.toast({ html: vars._statres('error$quantity$mustgreaterthanzero') });
                        result = false;
                    }
                    if (result === true && this.OnPaymentApply)
                        this.OnPaymentApply(controller);
                    return result;
                };
                return QuantityNumPad;
            }(paymentnumpad.Controller.Terminal.PaymentNumPad));
            Terminal.QuantityNumPad = QuantityNumPad;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/quantirynumpad", function (module) { return new module.Controller.Terminal.QuantityNumPad(); });
});
//# sourceMappingURL=quantirynumpad.js.map