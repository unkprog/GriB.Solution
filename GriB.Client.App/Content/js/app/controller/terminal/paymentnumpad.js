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
            var PaymentNumPad = /** @class */ (function (_super) {
                __extends(PaymentNumPad, _super);
                function PaymentNumPad() {
                    return _super.call(this) || this;
                }
                Object.defineProperty(PaymentNumPad.prototype, "Service", {
                    get: function () {
                        if (!this.service)
                            this.service = new svc.Services.POSTerminalService();
                        return this.service;
                    },
                    enumerable: true,
                    configurable: true
                });
                PaymentNumPad.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/paymentnumpad.html", Id: "paymentnumpad-view" };
                };
                PaymentNumPad.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": " ",
                        "editModel": {
                            totalSum: 253,
                            receivedSum: 500,
                            surrenderSum: 247
                        },
                        "labelTotalToPay": vars._statres("label$topay"),
                        "labelReceiveSum": vars._statres("label$received"),
                        "labelSurrenderSum": vars._statres("label$surrender"),
                    });
                };
                PaymentNumPad.prototype.ViewInit = function (view) {
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
                };
                PaymentNumPad.prototype.destroyEvents = function () {
                    _super.prototype.destroyEvents.call(this);
                };
                return PaymentNumPad;
            }(base.Controller.BaseEditor));
            Terminal.PaymentNumPad = PaymentNumPad;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=paymentnumpad.js.map