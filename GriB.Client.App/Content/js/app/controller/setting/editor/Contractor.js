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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Contractor = /** @class */ (function (_super) {
                    __extends(Contractor, _super);
                    function Contractor() {
                        return _super.call(this) || this;
                    }
                    Contractor.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/contractor.html", Id: "editor-view-contractor" };
                    };
                    Contractor.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$contractor"),
                            "editModel": {},
                            "labelName": vars._statres("label$name"),
                        });
                    };
                    Object.defineProperty(Contractor.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Contractor.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_contractor", Load: $.proxy(this.Service.GetContractor, this.Service), Save: $.proxy(this.Service.SetContractor, this.Service) };
                    };
                    Contractor.prototype.ViewInit = function (view) {
                        view.find("#editor-view-contractor-name").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Contractor.prototype.validate = function () {
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
                    return Contractor;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Contractor = Contractor;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/contractor", function (module) { return new module.Controller.Setting.Editor.Contractor(); });
});
//# sourceMappingURL=contractor.js.map