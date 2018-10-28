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
                            "labelSalePointInfo": vars._statres("label$contacts"),
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
                    SalePoint.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_salepoint", Load: $.proxy(this.Service.GetSalePoint, this.Service), Save: $.proxy(this.Service.SetSalePoint, this.Service) };
                    };
                    SalePoint.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        this.setupListCompany(responseData);
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
                    SalePoint.prototype.getSaveModel = function () {
                        var model = this.EditorModel;
                        var comp = $("#editor-view-company-list").formSelect("getSelectedValues");
                        model.company_id = (comp && comp.length > 0 ? +comp[0] : 0);
                        return model;
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