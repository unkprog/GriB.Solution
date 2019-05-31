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
                var Server = /** @class */ (function (_super) {
                    __extends(Server, _super);
                    function Server() {
                        return _super.call(this) || this;
                    }
                    Server.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/server.html", Id: "editor-view-server" };
                    };
                    Server.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$server"),
                            "editModel": {},
                            "labelAddress": vars._statres("label$address"),
                            "LabelLogin": vars._statres("label$login"),
                            "labelPassword": vars._statres("label$password"),
                        });
                    };
                    Object.defineProperty(Server.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Server.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_server", Load: $.proxy(this.Service.GetServer, this.Service), Save: $.proxy(this.Service.SetServer, this.Service) };
                    };
                    Server.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.controlAddress = view.find('#editor-view-server-address');
                        controller.controlAddress.characterCounter();
                        controller.controlLogin = view.find("#editor-view-server-user");
                        controller.controlLogin.characterCounter();
                        controller.controlPassword = view.find("#editor-view-server-password");
                        controller.controlPassword.characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Server.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                    };
                    Server.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Server.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                    };
                    Server.prototype.destroyEvents = function () {
                        _super.prototype.destroyEvents.call(this);
                    };
                    Server.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.address)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        else if (!utils.isNullOrEmpty(model.address) && model.address.length > 50) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$address"), 50) });
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
                    return Server;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Server = Server;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/server", function (module) { return new module.Controller.Setting.Editor.Server(); });
});
//# sourceMappingURL=server.js.map