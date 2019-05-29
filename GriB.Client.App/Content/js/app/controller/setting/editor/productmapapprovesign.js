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
define(["require", "exports", "app/common/variables", "app/controller/setting/editor/editor"], function (require, exports, vars, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var ProductMapApproveSign = /** @class */ (function (_super) {
                    __extends(ProductMapApproveSign, _super);
                    function ProductMapApproveSign() {
                        return _super.call(this) || this;
                    }
                    ProductMapApproveSign.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/productmapapprovesign.html", Id: "editor-view-productmapapprovesign" };
                    };
                    ProductMapApproveSign.prototype.createModel = function () {
                        var model = new kendo.data.ObservableObject({
                            "Header": vars._statres("label$approvers"),
                            "editModel": {},
                            "labelApprover": vars._statres("label$document$approver"),
                            "labelSigner": vars._statres("label$document$signer"),
                        });
                        return model;
                    };
                    Object.defineProperty(ProductMapApproveSign.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ProductMapApproveSign.prototype.ViewInit = function (view) {
                        var controller = this;
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    ProductMapApproveSign.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                    };
                    ProductMapApproveSign.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                    };
                    ProductMapApproveSign.prototype.destroyEvents = function () {
                        _super.prototype.destroyEvents.call(this);
                    };
                    ProductMapApproveSign.prototype.validate = function () {
                        var result = true;
                        //let model: Interfaces.Model.IProductComposition = this.EditorModel;
                        //if (utils.isNullOrEmpty(model.description) === false && model.description.length > 232) {
                        //    M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 232) });
                        //    result = false;
                        //}
                        //if (!model.brutto && model.brutto <= 0) {
                        //    M.toast({ html: vars._statres("msg$error$nobruttospecified") });
                        //    result = false;
                        //}
                        return result;
                    };
                    return ProductMapApproveSign;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.ProductMapApproveSign = ProductMapApproveSign;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/productmapapprovesign", function (module) { return new module.Controller.Setting.Editor.ProductMapApproveSign(); });
});
//# sourceMappingURL=productmapapprovesign.js.map