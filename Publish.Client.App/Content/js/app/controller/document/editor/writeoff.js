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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/document/editor/editor"], function (require, exports, vars, utils, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var WriteOff = /** @class */ (function (_super) {
                    __extends(WriteOff, _super);
                    function WriteOff() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(WriteOff.prototype, "Header", {
                        get: function () {
                            return vars._statres("label$writeoff");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(WriteOff.prototype, "EditIdName", {
                        get: function () {
                            return "id_writeoff";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(WriteOff.prototype, "DocType", {
                        get: function () {
                            return 40;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    WriteOff.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        this.showReason(true);
                        return result;
                    };
                    WriteOff.prototype.validate = function () {
                        var result = _super.prototype.validate.call(this);
                        var model = this.EditorModel;
                        if ((model.options & 1) === 1) {
                            if (!model.reason || !model.reason.id || model.reason.id === 0) {
                                M.toast({ html: vars._statres("msg$error$noreasonspecified") });
                                result = false;
                            }
                            if (utils.isNullOrEmpty(model.comment) === true) {
                                M.toast({ html: vars._statres("msg$error$commentnotfilled") });
                                result = false;
                            }
                        }
                        return result;
                    };
                    return WriteOff;
                }(edit.Controller.Document.Editor.Editor));
                Editor.WriteOff = WriteOff;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/writeoff", function (module) { return new module.Controller.Document.Editor.WriteOff(); });
});
//# sourceMappingURL=writeoff.js.map