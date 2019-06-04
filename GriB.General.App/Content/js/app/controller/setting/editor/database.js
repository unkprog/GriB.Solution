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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor", "app/common/basecontrol"], function (require, exports, vars, utils, edit, ctrl) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Database = /** @class */ (function (_super) {
                    __extends(Database, _super);
                    function Database() {
                        return _super.call(this) || this;
                    }
                    Database.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/database.html", Id: "editor-view-database" };
                    };
                    Database.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$database"),
                            "editModel": {},
                            "labelCatalog": vars._statres("label$catalog"),
                            "labelLogin": vars._statres("label$login"),
                            "labelPassword": vars._statres("label$password"),
                        });
                    };
                    Object.defineProperty(Database.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Database.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_database", Load: $.proxy(this.Service.GetDatabase, this.Service), Save: $.proxy(this.Service.SetDatabase, this.Service) };
                    };
                    Database.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.serverControl = new ctrl.Control.ReferenceFieldControl();
                        controller.serverControl.InitControl(view.find("#editor-view-database-server-row"), "editor-view-database-server", "editModel.sqlsrv", "editModel.sqlsrv.address", vars._statres("label$server"), 'setting/card/server', controller.Model);
                        controller.controlCatalog = view.find('#editor-view-database-catalog');
                        controller.controlCatalog.characterCounter();
                        controller.controlLogin = view.find("#editor-view-database-user");
                        controller.controlLogin.characterCounter();
                        controller.controlPassword = view.find("#editor-view-database-password");
                        controller.controlPassword.characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Database.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                    };
                    Database.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Database.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.serverControl)
                            this.serverControl.createEvents();
                    };
                    Database.prototype.destroyEvents = function () {
                        if (this.serverControl)
                            this.serverControl.destroyEvents();
                        _super.prototype.destroyEvents.call(this);
                    };
                    Database.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.catalog)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        else if (!utils.isNullOrEmpty(model.catalog) && model.catalog.length > 50) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$catalog"), 50) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.user) && model.user.length > 50) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$login"), 50) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.pass) && model.pass.length > 50) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$password"), 50) });
                            result = false;
                        }
                        return result;
                    };
                    return Database;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Database = Database;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/database", function (module) { return new module.Controller.Setting.Editor.Database(); });
});
//# sourceMappingURL=database.js.map