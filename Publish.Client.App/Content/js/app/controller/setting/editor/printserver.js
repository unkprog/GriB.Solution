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
                var PrintServer = /** @class */ (function (_super) {
                    __extends(PrintServer, _super);
                    function PrintServer() {
                        return _super.call(this) || this;
                    }
                    PrintServer.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/printserver.html", Id: "editor-view-printserver" };
                    };
                    PrintServer.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$printserver"),
                            "editModel": {},
                            "labelName": vars._statres("label$name"),
                            "labelKey": vars._statres("label$printserverkey"),
                            "labelDescription": vars._statres("label$description"),
                        });
                    };
                    Object.defineProperty(PrintServer.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PrintServer.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_printserver", Load: $.proxy(this.Service.GetPrintServer, this.Service), Save: $.proxy(this.Service.SetPrintServer, this.Service) };
                    };
                    PrintServer.prototype.ViewInit = function (view) {
                        view.find("#editor-view-printserver-name").characterCounter();
                        view.find("#editor-view-printserver-description").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    PrintServer.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        else if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.description) && model.description.length > 250) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 250) });
                            result = false;
                        }
                        return result;
                    };
                    return PrintServer;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.PrintServer = PrintServer;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/printserver", function (module) { return new module.Controller.Setting.Editor.PrintServer(); });
});
//# sourceMappingURL=printserver.js.map