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
define(["require", "exports", "app/controller/document/editor/paymentbase", "app/common/variables"], function (require, exports, base, vars) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var PaymentWithdrawal = /** @class */ (function (_super) {
                    __extends(PaymentWithdrawal, _super);
                    function PaymentWithdrawal() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("label$withdrawingmoney"));
                        return _this;
                    }
                    Object.defineProperty(PaymentWithdrawal.prototype, "EditIdName", {
                        get: function () {
                            return "id_paymentwithdrawal";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentWithdrawal.prototype.getSaveModel = function () {
                        var model = _super.prototype.getSaveModel.call(this);
                        if (model) {
                            model.doctype = 30;
                        }
                        return model;
                    };
                    PaymentWithdrawal.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        if (this.methodPaymentWitOut)
                            this.methodPaymentWitOut.remove();
                        this.costControl.removeClass("hide");
                        if (this.clientControl)
                            this.clientControl.addClass("hide");
                        return result;
                    };
                    return PaymentWithdrawal;
                }(base.Controller.Document.Editor.PaymentBase));
                Editor.PaymentWithdrawal = PaymentWithdrawal;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/paymentwithdrawal", function (module) { return new module.Controller.Document.Editor.PaymentWithdrawal(); });
});
//# sourceMappingURL=paymentwithdrawal.js.map