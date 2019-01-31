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
                var Account = /** @class */ (function (_super) {
                    __extends(Account, _super);
                    function Account() {
                        return _super.call(this) || this;
                    }
                    Account.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/account.html", Id: "editor-view-account" };
                    };
                    Account.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$account"),
                            "editModel": {},
                            "labelName": vars._statres("label$name"),
                            "labelNumber": vars._statres("label$number"),
                        });
                    };
                    Object.defineProperty(Account.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Account.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_account", Load: $.proxy(this.Service.GetAccount, this.Service), Save: $.proxy(this.Service.SetAccount, this.Service) };
                    };
                    Account.prototype.ViewInit = function (view) {
                        view.find("#editor-view-account-name").characterCounter();
                        view.find("#editor-view-account-number").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Account.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        else if (model.name.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.number) && model.number.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("msg$error$invalidnumber"), 20) });
                            result = false;
                        }
                        return result;
                    };
                    return Account;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Account = Account;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/account", function (module) { return new module.Controller.Setting.Editor.Account(); });
});
//# sourceMappingURL=account.js.map