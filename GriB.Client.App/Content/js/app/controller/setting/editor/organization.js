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
                var Organization = /** @class */ (function (_super) {
                    __extends(Organization, _super);
                    function Organization() {
                        return _super.call(this) || this;
                    }
                    Organization.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/organization.html", Id: "editor-view-organization" };
                    };
                    Organization.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$organization"),
                            "editModel": {},
                            "labelCompanyName": vars._statres("label$companyName"),
                            "labelWebSite": vars._statres("label$website"),
                            "labelEmail": vars._statres("label$email"),
                            "labelPhone": vars._statres("label$phone"),
                        });
                    };
                    Object.defineProperty(Organization.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Organization.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_currency", Load: undefined, Save: $.proxy(this.Service.SetOrganization, this.Service) };
                    };
                    Organization.prototype.ViewInit = function (view) {
                        view.find("#editor-view-organization-name").characterCounter();
                        view.find("#editor-view-organization-website").characterCounter();
                        view.find("#editor-view-organization-email").characterCounter();
                        view.find("#editor-view-organization-phone").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Organization.prototype.loadData = function () {
                        var controller = this;
                        this.Service.GetOrganization(function (responseData) {
                            controller.Model.set("editModel", responseData.record);
                            controller.afterLoad(responseData);
                            controller.endLoad();
                        });
                        return false;
                    };
                    Organization.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidCompanyName") });
                            result = false;
                        }
                        else if (model.name.length > 238) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$companyName"), 238) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.site) && model.site.length > 54) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$website"), 54) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.email) && model.email.length > 54) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$email"), 54) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.phone) && model.phone.length > 18) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$phone"), 18) });
                            result = false;
                        }
                        return result;
                    };
                    return Organization;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Organization = Organization;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=organization.js.map