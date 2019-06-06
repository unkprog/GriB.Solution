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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/terminal/payment"], function (require, exports, vars, utils, payment) {
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
                    this.inputClient = view.find("#paymentwithout-view-client-row");
                    this.btnPayment = view.find("#btn-num-apply");
                    this.btnPaymentCancel = view.find("#btn-num-cancel");
                    return _super.prototype.ViewInit.call(this, view);
                };
                PaymentWithOut.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.ClientClick = this.createTouchClickEvent(this.inputClient, this.clientClick);
                };
                PaymentWithOut.prototype.destroyEvents = function () {
                    if (this.inputClient)
                        this.destroyTouchClickEvent(this.inputClient, this.ClientClick);
                    _super.prototype.destroyEvents.call(this);
                };
                PaymentWithOut.prototype.changeModel = function (e) {
                    if (e.field === "editModel.typeWithOut") {
                        if (this.TypeWithOut == 1)
                            $("#paymentwithout-view-client-row").show();
                        else
                            $("#paymentwithout-view-client-row").hide();
                    }
                    _super.prototype.changeModel.call(this, e);
                };
                PaymentWithOut.prototype.validate = function () {
                    var controller = this;
                    var result = true;
                    if (!this.TypeWithOut || this.TypeWithOut < 1 || this.TypeWithOut > 3) {
                        M.toast({ html: vars._statres("error$without$reasonnotspecified") });
                        result = false;
                    }
                    if (this.TypeWithOut == 1 && (!this.Client || this.Client.id == 0)) {
                        M.toast({ html: vars._statres("error$without$clientnotspecified") });
                        result = false;
                    }
                    if (result === true && this.OnPaymentApply)
                        this.OnPaymentApply(controller);
                    return result;
                };
                PaymentWithOut.prototype.clientClick = function (e) {
                    var self = this;
                    vars._app.OpenController({
                        urlController: 'setting/card/client', isModal: true, onLoadController: function (controller) {
                            var ctrlProduct = controller;
                            ctrlProduct.CardSettings.IsAdd = false;
                            ctrlProduct.CardSettings.IsEdit = false;
                            ctrlProduct.CardSettings.IsDelete = false;
                            ctrlProduct.CardSettings.IsSelect = true;
                            ctrlProduct.OnSelect = $.proxy(self.selectClient, self);
                        }
                    });
                };
                PaymentWithOut.prototype.selectClient = function (controller) {
                    var record = controller.getSelectedRecord();
                    if (record)
                        this.Client = { id: record.id, name: record.name + (utils.isNullOrEmpty(record.phone) ? "" : " (" + record.phone + ")") };
                };
                return PaymentWithOut;
            }(payment.Controller.Terminal.Payment));
            Terminal.PaymentWithOut = PaymentWithOut;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/paymentwithout", function (module) { return new module.Controller.Terminal.PaymentWithOut(); });
});
//# sourceMappingURL=paymentwithout.js.map