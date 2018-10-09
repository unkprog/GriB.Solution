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
                var SalePoint = /** @class */ (function (_super) {
                    __extends(SalePoint, _super);
                    function SalePoint() {
                        return _super.call(this) || this;
                    }
                    SalePoint.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/salepoint.html", Id: "editor-view-salepoint" };
                    };
                    SalePoint.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$salePoint"),
                            "editModel": {},
                            "labelCompany": vars._statres("label$organization"),
                            "labelSalepointName": vars._statres("label$salePointName"),
                            "labelCity": vars._statres("label$city"),
                            "labelAddress": vars._statres("label$address"),
                            "labelSchedule": vars._statres("label$schedule"),
                        });
                    };
                    Object.defineProperty(SalePoint.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    SalePoint.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    SalePoint.prototype.ViewShow = function (e) {
                        _super.prototype.ViewShow.call(this, e);
                        return false;
                    };
                    SalePoint.prototype.loadData = function () {
                        var _this = this;
                        var controller = this;
                        var id = (vars._editorData["id_salepoint"] ? vars._editorData["id_salepoint"] : 0);
                        this.Service.GetSalePoint(id, function (responseData) {
                            controller.Model.set("editModel", responseData.salepoint);
                            _this.setupListCompany(responseData);
                            controller.afterLoad();
                        });
                        return false;
                    };
                    SalePoint.prototype.setupListCompany = function (responseData) {
                        var html = '';
                        var companies = responseData.companies;
                        var list = $("#editor-view-company-list");
                        if (companies && companies.length > 0) {
                            for (var i = 0, icount = companies.length; i < icount; i++)
                                html += ' <option value="' + companies[i].id + '"' + (i === 0 ? ' selected' : '') + '>' + companies[i].name + '</option>';
                            list.html(html);
                        }
                        else
                            list.html('');
                        list.formSelect();
                    };
                    SalePoint.prototype.Save = function () {
                        var controller = this;
                        var comp = $("#editor-view-company-list").formSelect("getSelectedValues");
                        var model = this.EditorModel;
                        model.company_id = (comp && comp.length > 0 ? +comp[0] : 0);
                        this.Service.SetSalePoint(model, function (responseData) {
                            controller.afterSave();
                        });
                    };
                    SalePoint.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidSalePointName") });
                            result = false;
                        }
                        //if (utils.isNullOrEmpty(model.city)) {
                        //    M.toast({ html: vars._statres("msg$error$invalidCity") });
                        //    result = false;
                        //}
                        return result;
                    };
                    return SalePoint;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.SalePoint = SalePoint;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=salepoint.js.map