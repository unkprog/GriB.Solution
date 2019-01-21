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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Reason = /** @class */ (function (_super) {
                    __extends(Reason, _super);
                    function Reason() {
                        return _super.call(this) || this;
                    }
                    Reason.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/reason.html", Id: "editor-view-reason" };
                    };
                    Reason.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$reason"),
                            "editModel": {},
                            "labelName": vars._statres("label$name"),
                        });
                    };
                    Object.defineProperty(Reason.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Reason.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_reason", Load: $.proxy(this.Service.GetReason, this.Service), Save: $.proxy(this.Service.SetReason, this.Service) };
                    };
                    Reason.prototype.ViewInit = function (view) {
                        view.find("#editor-view-reason-name").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Reason.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        else if (!utils.isNullOrEmpty(model.name) && model.name.length > 112) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 112) });
                            result = false;
                        }
                        return result;
                    };
                    return Reason;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Reason = Reason;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/reason", function (module) { return new module.Controller.Setting.Editor.Reason(); });
});
//# sourceMappingURL=reason.js.map