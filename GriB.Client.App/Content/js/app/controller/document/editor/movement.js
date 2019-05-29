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
define(["require", "exports", "app/common/variables", "app/controller/document/editor/editor"], function (require, exports, vars, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var Movement = /** @class */ (function (_super) {
                    __extends(Movement, _super);
                    function Movement() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("labelStock", vars._statres("label$stock$from"));
                        return _this;
                    }
                    Object.defineProperty(Movement.prototype, "Header", {
                        get: function () {
                            return vars._statres("label$movement");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Movement.prototype, "EditIdName", {
                        get: function () {
                            return "id_movement";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Movement.prototype, "DocType", {
                        get: function () {
                            return 50;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Movement.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        this.showSalePointTo(true);
                        return result;
                    };
                    Movement.prototype.validateStock = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if ((model.options & 1) === 1) {
                            if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                                M.toast({ html: vars._statres("msg$error$nowarehouse$fromspecified") });
                                result = false;
                            }
                            if (!model.salepointto || !model.salepointto.id || model.salepointto.id === 0) {
                                M.toast({ html: vars._statres("msg$error$nowarehouse$tospecified") });
                                result = false;
                            }
                            if (result === true && model.salepoint.id === model.salepointto.id) {
                                M.toast({ html: vars._statres("msg$error$warehousedifferentspecified") });
                                result = false;
                            }
                        }
                        return result;
                    };
                    return Movement;
                }(edit.Controller.Document.Editor.Editor));
                Editor.Movement = Movement;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/movement", function (module) { return new module.Controller.Document.Editor.Movement(); });
});
//# sourceMappingURL=movement.js.map