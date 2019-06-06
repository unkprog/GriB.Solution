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
                var CostIncome = /** @class */ (function (_super) {
                    __extends(CostIncome, _super);
                    function CostIncome() {
                        return _super.call(this) || this;
                    }
                    CostIncome.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/costincome.html", Id: "editor-view-costincome" };
                    };
                    CostIncome.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$articlecostincome"),
                            "editModel": {},
                            "labelName": vars._statres("label$name"),
                            "labelArticleType": vars._statres("label$articletype"),
                            "labelIncome": vars._statres("label$income"),
                            "labelCost": vars._statres("label$cost"),
                        });
                    };
                    Object.defineProperty(CostIncome.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    CostIncome.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_costincome", Load: $.proxy(this.Service.GetCostIncome, this.Service), Save: $.proxy(this.Service.SetCostIncome, this.Service) };
                    };
                    CostIncome.prototype.ViewInit = function (view) {
                        view.find("#editor-view-costincome-name").characterCounter();
                        this.typeControl = view.find("#editor-view-costincome-type");
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    CostIncome.prototype.ViewShow = function (e) {
                        this.typeControl.formSelect();
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    CostIncome.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        this.typeControl.formSelect();
                    };
                    CostIncome.prototype.validate = function () {
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
                        if (model.type < 1) {
                            M.toast({ html: vars._statres("msg$error$invalidarticlecostincome") });
                            result = false;
                        }
                        return result;
                    };
                    return CostIncome;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.CostIncome = CostIncome;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/costincome", function (module) { return new module.Controller.Setting.Editor.CostIncome(); });
});
//# sourceMappingURL=costincome.js.map