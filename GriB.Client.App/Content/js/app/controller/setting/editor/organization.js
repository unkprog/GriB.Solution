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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller", "app/services/settingsservice"], function (require, exports, vars, utils, base, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Organization = /** @class */ (function (_super) {
                    __extends(Organization, _super);
                    function Organization() {
                        var _this = _super.call(this) || this;
                        _this.settingService = new svc.Services.SettingsService();
                        return _this;
                    }
                    Organization.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/organization.html", Id: "editor-view-organization" };
                    };
                    Organization.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$organization"),
                            "editModel": {}
                        });
                    };
                    Object.defineProperty(Organization.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Organization.prototype.loadData = function () {
                        var controller = this;
                        this.settingService.GetOrganization(function (responseData) {
                            controller.Model.set("editModel", responseData);
                            controller.afterLoad();
                        });
                        return false;
                    };
                    Organization.prototype.Save = function () {
                        var controller = this;
                        this.settingService.SetOrganization(controller.EditorModel, function (responseData) {
                            controller.afterSave();
                        });
                    };
                    Organization.prototype.validate = function () {
                        var result = true;
                        var errMessage = '';
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidCompanyName") });
                            //errMessage += vars._statres("msg$error$invalidCompanyName") + '<br/>';
                            result = false;
                        }
                        //result = utils.isNullOrEmpty(errMessage);
                        //if (!result)
                        //    _app.ShowError(errMessage);
                        return result;
                    };
                    return Organization;
                }(base.Controller.BaseEditor));
                Editor.Organization = Organization;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=organization.js.map