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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/services/posterminalservice"], function (require, exports, vars, base, svc) {
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
                Object.defineProperty(Payment.prototype, "Service", {
                    get: function () {
                        if (!this.service)
                            this.service = new svc.Services.POSTerminalService();
                        return this.service;
                    },
                    enumerable: true,
                    configurable: true
                });
                Payment.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/payment.html", Id: "payment-view" };
                };
                Payment.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": " ",
                        "POSData": {
                            "CurrentSalePoint": { "name": "" }
                        },
                        "labelPayment": vars._statres("label$payment"),
                    });
                };
                Payment.prototype.ViewInit = function (view) {
                    return _super.prototype.ViewInit.call(this, view);
                };
                Payment.prototype.ViewHide = function (e) {
                    _super.prototype.ViewHide.call(this, e);
                };
                Payment.prototype.ViewShow = function (e) {
                    var result = _super.prototype.ViewShow.call(this, e);
                    return result;
                };
                Payment.prototype.ViewResize = function (e) {
                    _super.prototype.ViewResize.call(this, e);
                };
                Payment.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                };
                Payment.prototype.destroyEvents = function () {
                    _super.prototype.destroyEvents.call(this);
                };
                return Payment;
            }(base.Controller.BaseEditor));
            Terminal.Payment = Payment;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=payment.js.map