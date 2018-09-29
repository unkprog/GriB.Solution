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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/services/settingsservice"], function (require, exports, vars, base, svc) {
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
                    Organization.prototype.loadData = function (afterLoad) {
                        var controller = this;
                        this.settingService.GetOrganization(function (responseData) {
                            controller.editModel = responseData;
                            controller.Model.set("editModel", controller.editModel);
                            if (afterLoad)
                                afterLoad();
                        });
                        return false;
                    };
                    Organization.prototype.Save = function (data, afterSave) {
                        var controller = this;
                        this.settingService.GetOrganization(function (responseData) {
                            controller.editModel = responseData;
                            if (afterSave)
                                afterSave();
                        });
                    };
                    Organization.prototype.getDataToSave = function () {
                        var result = this.editModel;
                        return result;
                    };
                    Organization.prototype.validate = function (data) {
                        var result = true;
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