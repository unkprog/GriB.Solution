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
define(["require", "exports", "app/controller/document/editor/payment", "app/common/variables"], function (require, exports, base, vars) {
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
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(PaymentDeposit.prototype, "EditIdName", {
                        //public get EditorModel(): Interfaces.Model.IPayment {
                        //    let model: Interfaces.Model.IPayment = this.Model.get("editModel").toJSON();
                        //    return model;
                        //}
                        //protected createEditorSettings(): Interfaces.IEditorSettings {
                        //    return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetPayment, this.Service), Save: $.proxy(this.Service.SetPayment, this.Service) };
                        //}
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
                    return PaymentDeposit;
                }(base.Controller.Document.Editor.Payment));
                Editor.PaymentDeposit = PaymentDeposit;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/paymentdeposit", function (module) { return new module.Controller.Document.Editor.PaymentDeposit(); });
});
//# sourceMappingURL=paymentdeposit.js.map