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
                var Payment = /** @class */ (function (_super) {
                    __extends(Payment, _super);
                    function Payment() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Payment.prototype, "EditIdName", {
                        get: function () {
                            return "id_payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Payment.prototype.getSaveModel = function () {
                        var model = _super.prototype.getSaveModel.call(this);
                        if (model) {
                            model.doctype = 10;
                        }
                        return model;
                    };
                    return Payment;
                }(base.Controller.Document.Editor.PaymentBase));
                Editor.Payment = Payment;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/payment", function (module) { return new module.Controller.Document.Editor.Payment(); });
});
//# sourceMappingURL=payment.js.map