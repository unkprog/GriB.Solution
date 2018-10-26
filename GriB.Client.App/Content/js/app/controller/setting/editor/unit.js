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
                var Unit = /** @class */ (function (_super) {
                    __extends(Unit, _super);
                    function Unit() {
                        return _super.call(this) || this;
                    }
                    Unit.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/unit.html", Id: "editor-view-unit" };
                    };
                    Unit.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$unit"),
                            "editModel": {},
                            "labelCode": vars._statres("label$code"),
                            "labelNameShort": vars._statres("label$nameshort"),
                            "labelName": vars._statres("label$name"),
                        });
                    };
                    Object.defineProperty(Unit.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Unit.prototype.loadData = function () {
                        var controller = this;
                        var id = (vars._editorData["id_unit"] ? vars._editorData["id_unit"] : 0);
                        this.Service.GetUnit(id, function (responseData) {
                            controller.Model.set("editModel", responseData);
                            controller.afterLoad();
                        });
                        return false;
                    };
                    Unit.prototype.Save = function () {
                        var controller = this;
                        var model = this.EditorModel;
                        this.Service.SetUnit(model, function (responseData) {
                            controller.afterSave();
                        });
                    };
                    Unit.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.code)) {
                            M.toast({ html: vars._statres("msg$error$invalidcode") });
                            result = false;
                        }
                        return result;
                    };
                    return Unit;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Unit = Unit;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=unit.js.map