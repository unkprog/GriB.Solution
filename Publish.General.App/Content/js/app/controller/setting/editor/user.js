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
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super.call(this) || this;
                    }
                    User.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/user.html", Id: "editor-view-user" };
                    };
                    User.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$database"),
                            "editModel": {},
                            "labelLogin": vars._statres("label$login"),
                            "labelSurname": vars._statres("label$surname"),
                            "labelName": vars._statres("label$fname"),
                            "labelPatronymic": vars._statres("label$patronymic"),
                            "labelSex": vars._statres("label$sex"),
                            "labelUnspecified": vars._statres("label$unspecified"),
                            "labelMale": vars._statres("label$male"),
                            "labelFemale": vars._statres("label$female"),
                        });
                    };
                    Object.defineProperty(User.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    User.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_user", Load: $.proxy(this.Service.GetUser, this.Service), Save: $.proxy(this.Service.SetUser, this.Service) };
                    };
                    User.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.databaseControl = new ctrl.Control.ReferenceFieldControl();
                        controller.databaseControl.InitControl(view.find("#editor-view-user-database-row"), "editor-view-user-database", "editModel.db", "editModel.db.catalog", vars._statres("label$database"), 'setting/card/database', controller.Model);
                        controller.controlSurmame = view.find('#editor-view-user-surname');
                        controller.controlSurmame.characterCounter();
                        controller.controlName = view.find("#editor-view-user-name");
                        controller.controlName.characterCounter();
                        controller.controlPatronymic = view.find("#editor-view-user-patronymic");
                        controller.controlPatronymic.characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    User.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                    };
                    User.prototype.ViewShow = function (e) {
                        $('#ditor-view-user-sex-list').formSelect();
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    User.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.databaseControl)
                            this.databaseControl.createEvents();
                    };
                    User.prototype.destroyEvents = function () {
                        if (this.databaseControl)
                            this.databaseControl.destroyEvents();
                        _super.prototype.destroyEvents.call(this);
                    };
                    User.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (!utils.isNullOrEmpty(model.person.fname) && model.person.fname.length > 62) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$surname"), 62) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.person.mname) && model.person.mname.length > 62) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$fname"), 62) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.person.lname) && model.person.lname.length > 62) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$patronymic"), 62) });
                            result = false;
                        }
                        return result;
                    };
                    return User;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.User = User;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/user", function (module) { return new module.Controller.Setting.Editor.User(); });
});
//# sourceMappingURL=user.js.map