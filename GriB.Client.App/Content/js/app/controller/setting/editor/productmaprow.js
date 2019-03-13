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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontrol", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, ctrl, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var ProductMapRow = /** @class */ (function (_super) {
                    __extends(ProductMapRow, _super);
                    function ProductMapRow() {
                        return _super.call(this) || this;
                    }
                    ProductMapRow.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/productmaprow.html", Id: "editor-view-productmaprow" };
                    };
                    ProductMapRow.prototype.createModel = function () {
                        var model = new kendo.data.ObservableObject({
                            "Header": vars._statres("label$namerawmaterial"),
                            "editModel": {},
                            "labelNetto": vars._statres("label$netto"),
                            "labelBrutto": vars._statres("label$brutto"),
                            "labelPercentCold": vars._statres("label$treatment$percentcold"),
                            "labelExitProduct": vars._statres("label$exitcompletedproduct"),
                            "labelPercentHeat": vars._statres("label$treatment$percentheat"),
                            "labelDescription": vars._statres("label$description$technologicalprocess"),
                        });
                        return model;
                    };
                    Object.defineProperty(ProductMapRow.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ProductMapRow.prototype.ViewInit = function (view) {
                        var controller = this;
                        this.productControl = new ctrl.Control.ReferenceFieldControl();
                        this.productControl.InitControl(view.find("#editor-view-productmaprow-product-row"), "editor-view-productmaprow-product", "editModel.product", "editModel.product.name", vars._statres("label$namerawmaterial"), 'setting/card/product', this.Model);
                        this.unitControl = new ctrl.Control.ReferenceFieldControl();
                        this.unitControl.InitControl(view.find("#editor-view-productmaprow-unit-row"), "editor-view-productmaprow-unit", "editModel.unit", "editModel.unit.code", vars._statres("label$unit"), 'setting/card/unit', this.Model);
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    ProductMapRow.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                    };
                    ProductMapRow.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.productControl) {
                            this.productControl.createEvents();
                            this.productControl.SelectValue = $.proxy(this.selectProductValue, this);
                        }
                        if (this.unitControl)
                            this.unitControl.createEvents();
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    ProductMapRow.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
                        if (this.productControl)
                            this.productControl.destroyEvents();
                        if (this.unitControl)
                            this.unitControl.destroyEvents();
                        _super.prototype.destroyEvents.call(this);
                    };
                    ProductMapRow.prototype.selectProductValue = function (value) {
                        var valueProduct = value;
                        if (valueProduct) {
                            this.Model.set("editModel.product", valueProduct);
                            this.Model.set("editModel.unit", { id: valueProduct.unit.id, code: valueProduct.unit.code });
                        }
                    };
                    ProductMapRow.prototype.changeModel = function (e) {
                        if (e.field === "editModel.brutto" || e.field === "editModel.netto") {
                            var editRow = this.EditorModel;
                            editRow.percentcold = (editRow.brutto && editRow.netto && editRow.brutto > 0 && editRow.netto > 0 ? (100 * (editRow.brutto - editRow.netto) / editRow.brutto) : 0);
                            this.Model.set("editModel", editRow);
                        }
                        else if (e.field === "editModel.netto" || e.field === "editModel.exitproduct") {
                            var editRow = this.EditorModel;
                            editRow.percentheat = (editRow.netto && editRow.exitproduct && editRow.netto > 0 && editRow.exitproduct > 0 ? (100 * (editRow.netto - editRow.exitproduct) / editRow.netto) : 0);
                            this.Model.set("editModel", editRow);
                        }
                        else if (e.field === "editModel.percentcold") {
                            var editRow = this.EditorModel;
                            editRow.netto = (editRow.brutto && editRow.percentcold && editRow.brutto > 0 && editRow.percentcold > 0 ? (editRow.brutto * (100 - editRow.percentcold) / 100) : 0);
                            this.Model.set("editModel", editRow);
                        }
                        else if (e.field === "editModel.percentheat") {
                            var editRow = this.EditorModel;
                            editRow.exitproduct = (editRow.netto && editRow.percentheat && editRow.netto > 0 && editRow.percentheat > 0 ? (editRow.netto * (100 - editRow.percentheat) / 100) : 0);
                            this.Model.set("editModel", editRow);
                        }
                    };
                    ProductMapRow.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.description) === false && model.description.length > 232) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 232) });
                            result = false;
                        }
                        if (!model.brutto && model.brutto <= 0) {
                            M.toast({ html: vars._statres("msg$error$nobruttospecified") });
                            result = false;
                        }
                        return result;
                    };
                    return ProductMapRow;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.ProductMapRow = ProductMapRow;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/productmaprow", function (module) { return new module.Controller.Setting.Editor.ProductMapRow(); });
});
//# sourceMappingURL=productmaprow.js.map