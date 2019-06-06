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
define(["require", "exports", "app/controller/document/editor/paymentbase", "app/common/variables"], function (require, exports, base, vars) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var PaymentDeposit = /** @class */ (function (_super) {
                    __extends(PaymentDeposit, _super);
                    function PaymentDeposit() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("label$depositmoney"));
                        return _this;
                    }
                    Object.defineProperty(PaymentDeposit.prototype, "EditIdName", {
                        get: function () {
                            return "id_paymentdeposit";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentDeposit.prototype.getSaveModel = function () {
                        var model = _super.prototype.getSaveModel.call(this);
                        if (model) {
                            model.doctype = 20;
                        }
                        return model;
                    };
                    PaymentDeposit.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        if (this.methodPaymentWitOut)
                            this.methodPaymentWitOut.remove();
                        this.incomeControl.removeClass("hide");
                        return result;
                    };
                    return PaymentDeposit;
                }(base.Controller.Document.Editor.PaymentBase));
                Editor.PaymentDeposit = PaymentDeposit;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/paymentdeposit", function (module) { return new module.Controller.Document.Editor.PaymentDeposit(); });
});
//# sourceMappingURL=paymentdeposit.js.map