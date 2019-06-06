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
                var Encashment = /** @class */ (function (_super) {
                    __extends(Encashment, _super);
                    function Encashment() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("label$encashment"));
                        return _this;
                    }
                    Object.defineProperty(Encashment.prototype, "EditIdName", {
                        get: function () {
                            return "id_encashment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Encashment.prototype.getSaveModel = function () {
                        var model = _super.prototype.getSaveModel.call(this);
                        if (model) {
                            model.doctype = 40;
                        }
                        return model;
                    };
                    Encashment.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        if (this.methodPaymentWitOut)
                            this.methodPaymentWitOut.remove();
                        this.accountControl.removeClass("hide");
                        this.clientControl.addClass("hide");
                        this.methodPaymentRow.addClass("hide");
                        return result;
                    };
                    return Encashment;
                }(base.Controller.Document.Editor.PaymentBase));
                Editor.Encashment = Encashment;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/encashment", function (module) { return new module.Controller.Document.Editor.Encashment(); });
});
//# sourceMappingURL=encashment.js.map