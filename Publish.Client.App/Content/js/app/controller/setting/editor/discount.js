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
                var Discount = /** @class */ (function (_super) {
                    __extends(Discount, _super);
                    function Discount() {
                        return _super.call(this) || this;
                    }
                    Discount.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/discount.html", Id: "editor-view-discount" };
                    };
                    Discount.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "editModel": {},
                            "labelDiscountInformation": vars._statres("label$discountinformation"),
                            "labelName": vars._statres("label$name"),
                            "labelValuePercent": vars._statres("label$valuepercent")
                        });
                    };
                    Object.defineProperty(Discount.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Discount.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_discount", Load: $.proxy(this.Service.GetDiscount, this.Service), Save: $.proxy(this.Service.SetDiscount, this.Service) };
                    };
                    Discount.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                    };
                    Discount.prototype.ViewInit = function (view) {
                        view.find("#discount-name").characterCounter();
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    Discount.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Discount.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                            result = false;
                        }
                        if (model.value < 0 || model.value > 100) {
                            M.toast({ html: vars._statres("msg$error$discountrange") });
                            result = false;
                        }
                        return result;
                    };
                    return Discount;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Discount = Discount;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/discount", function (module) { return new module.Controller.Setting.Editor.Discount(); });
});
//# sourceMappingURL=discount.js.map