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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontrol", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, ctrl, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Product = /** @class */ (function (_super) {
                    __extends(Product, _super);
                    function Product() {
                        return _super.call(this) || this;
                    }
                    Product.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/product.html", Id: "editor-view-product" };
                    };
                    Product.prototype.createModel = function () {
                        var model = new kendo.data.ObservableObject({
                            "Header": vars._statres("label$productsgoods"),
                            "editModel": {},
                            "isNotLoadInitView": false,
                            "labelSpecifications": vars._statres("label$specifications"),
                            "labelComposition": vars._statres("label$composition"),
                            "labelAccessRight": vars._statres("label$accessright"),
                            "labelType": vars._statres("label$type"),
                            "labelProduct": vars._statres("label$product"),
                            "labelProduction": vars._statres("label$production"),
                            "labelService": vars._statres("label$service"),
                            "labelName": vars._statres("label$name"),
                            "labelIncludedInCategory": vars._statres("label$includedincategory"),
                            "labelVendorCode": vars._statres("label$vendorcode"),
                            "labelBarCode": vars._statres("label$barcode"),
                            "labelPosTerminal": vars._statres("label$POSterminal"),
                            "labelPutOnSale": vars._statres("label$putonsale"),
                            "labelAddPhoto": vars._statres("label$addphoto"),
                            "labelDescription": vars._statres("label$description"),
                            "labelSalePoint": vars._statres("label$salePoint"),
                            "labelAccess": vars._statres("label$access"),
                            "labelAccounting": vars._statres("label$accounting"),
                            "labelAccountingParameters": vars._statres("label$accountingparameters"),
                            "labelQuantity": vars._statres("label$quantity"),
                            "labelUnit": vars._statres("label$unit"),
                            "labelCurrency": vars._statres("label$currency"),
                            "labelCostPrice": vars._statres("label$costprice"),
                            "labelSellingPrice": vars._statres("label$sellingprice"),
                            "labelTechnologicalMap": vars._statres("label$technologicalmap"),
                        });
                        return model;
                    };
                    Object.defineProperty(Product.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Product.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_product", Load: $.proxy(this.Service.GetProduct, this.Service), Save: $.proxy(this.Service.SetProduct, this.Service) };
                    };
                    Product.prototype.validate = function () {
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
                        if (!utils.isNullOrEmpty(model.vendorcode) && model.vendorcode.length > 61) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$vendorcode"), 61) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.barcode) && model.barcode.length > 61) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$barcode"), 61) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.name) && model.description.length > 3098) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 3098) });
                            result = false;
                        }
                        var data = model.accesssalepoints;
                        var isaccess = false;
                        for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                            if (data[i].isaccess === true) {
                                isaccess = true;
                                break;
                            }
                        }
                        if (isaccess === false) {
                            M.toast({ html: vars._statres('msg$error$noaccessspecified') });
                            result = false;
                        }
                        return result;
                    };
                    Product.prototype.ViewInit = function (view) {
                        this.imgDialog = view.find("#editor-view-image-input");
                        this.controlPhoto = view.find("#editor-view-product-photo");
                        this.rightRows = view.find("#product-rigths-rows");
                        this.controlType = view.find('#editor-view-product-type');
                        this.techMapButton = view.find("#btn-techmap");
                        this.categoryControl = new ctrl.Control.ReferenceFieldControl();
                        this.categoryControl.InitControl(view.find("#editor-view-product-category-row"), "editor-view-product-category", "editModel.category", "editModel.category.name", vars._statres("label$includedincategory"), 'setting/card/category', this.Model);
                        this.unitControl = new ctrl.Control.ReferenceFieldControl();
                        this.unitControl.InitControl(view.find("#editor-view-product-unit-row"), "editor-view-product-unit", "editModel.unit", "editModel.unit.name", vars._statres("label$unit"), 'setting/card/unit', this.Model);
                        this.currencyControl = new ctrl.Control.ReferenceFieldControl();
                        this.currencyControl.InitControl(view.find("#editor-view-product-currency-row"), "editor-view-product-currency", "editModel.currency", "editModel.currency.name", vars._statres("label$currency"), 'setting/card/currency', this.Model);
                        view.find("#editor-view-product-name").characterCounter();
                        view.find("#editor-view-product-description").characterCounter();
                        view.find("#editor-view-product-vendorcode").characterCounter();
                        view.find("#editor-view-product-barcode").characterCounter();
                        var result = _super.prototype.ViewInit.call(this, view);
                        var tabs = view.find("#editor-view-product-tabs");
                        var header = view.find(".editor-header-nav");
                        tabs.remove();
                        header.append(tabs);
                        header.parent().css('cssText', "height: 88px !important");
                        return result;
                    };
                    Product.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        var onUpolad = $.proxy(this.uploudImageClick, this);
                        this.imgDialog.bind("change", onUpolad);
                        if (this.categoryControl) {
                            this.categoryControl.createEvents();
                            this.categoryControl.SelectValue = $.proxy(this.selectCategoryValue, this);
                        }
                        if (this.unitControl)
                            this.unitControl.createEvents();
                        if (this.currencyControl)
                            this.currencyControl.createEvents();
                        this.TechMapButtonClick = this.createTouchClickEvent(this.techMapButton, this.techMapButtonClick);
                        this.AddPhotoButtonClick = this.createTouchClickEvent("editor-view-product-addphoto", this.addPhotoButtonClick);
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    Product.prototype.destroyEvents = function () {
                        this.rightRows.unbind();
                        this.Model.unbind("change");
                        this.destroyTouchClickEvent("editor-view-product-addphoto", this.AddPhotoButtonClick);
                        this.destroyTouchClickEvent(this.techMapButton, this.TechMapButtonClick);
                        if (this.currencyControl)
                            this.currencyControl.destroyEvents();
                        if (this.unitControl)
                            this.unitControl.destroyEvents();
                        if (this.categoryControl)
                            this.categoryControl.destroyEvents();
                        this.imgDialog.unbind();
                        _super.prototype.destroyEvents.call(this);
                    };
                    Product.prototype.selectCategoryValue = function (value) {
                        var valueCategory = value;
                        if (valueCategory) {
                            this.Model.set("editModel.category", { id: valueCategory.id, name: (utils.isNullOrEmpty(valueCategory.parentname) === true ? "" : valueCategory.parentname + '->') + valueCategory.name });
                        }
                    };
                    Product.prototype.changeModel = function (e) {
                        if (e.field === "editModel.type") {
                            var model = this.EditorModel;
                            if (+model.type === 1) {
                                $("#btn-techmap-row").removeClass("hide"); //.show();
                            }
                            else {
                                if ($("#btn-techmap-row").hasClass("hide") === false)
                                    $("#btn-techmap-row").addClass("hide");
                            }
                        }
                    };
                    Product.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        M.Tabs.getInstance($('#editor-view-product-tabs')).updateTabIndicator();
                        this.controlType.formSelect();
                        if (this.controlPhoto)
                            this.controlPhoto.height(this.controlPhoto.width());
                    };
                    Product.prototype.ViewShow = function (e) {
                        $('#editor-view-product-tabs').tabs();
                        M.Tabs.getInstance($('#editor-view-product-tabs')).updateTabIndicator();
                        M.textareaAutoResize($("#editor-view-product-description"));
                        this.controlType.formSelect();
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Product.prototype.ViewHide = function (e) {
                        //$('#editor-view-product-tabs').tabs("destroy");
                        _super.prototype.ViewHide.call(this, e);
                    };
                    Product.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        if (this.EditorModel.photo)
                            this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
                        this.changeModel({ field: "editModel.type" });
                        var model = this.EditorModel;
                        var data = model.accesssalepoints;
                        this.setupTableAccess(this.rightRows, data);
                    };
                    Product.prototype.techMapButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/editor/productmapedit', isModal: true, onLoadController: function (controller) {
                                var ctrlMap = controller;
                                ctrlMap.Model.set("editModel", self.EditorModel);
                                ctrlMap.EditorSettings.Save = $.proxy(self.onEditRow, self);
                            }
                        });
                    };
                    Product.prototype.onEditRow = function (model, callback) {
                        this.Model.set("editModel", model);
                        if (callback) {
                            callback(undefined);
                        }
                    };
                    Product.prototype.addPhotoButtonClick = function (e) {
                        $("#editor-view-image-input").trigger("click");
                    };
                    Product.prototype.uploudImageClick = function (e) {
                        this.UploadImage(this.imgDialog[0].files);
                    };
                    Product.prototype.UploadImage = function (files) {
                        var _this = this;
                        var controller = this;
                        if (files.length > 0) {
                            var dataUpload = new FormData();
                            dataUpload.append("type", '1');
                            dataUpload.append("photo", controller.EditorModel.photo);
                            dataUpload.append("file", files[0]);
                            controller.Service.UploadImage(dataUpload, function (responseData) {
                                controller.Model.set("editModel.photo", responseData);
                                if (_this.EditorModel.photo)
                                    _this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.photo + ")");
                            });
                        }
                    };
                    Product.prototype.getSaveModel = function () {
                        var model = this.EditorModel;
                        var catg = this.Model.get("editModel.category.id");
                        model.pid = +catg; //(catg && catg.length > 0 ? +catg[0] : 0);
                        return model;
                    };
                    return Product;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Product = Product;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/product", function (module) { return new module.Controller.Setting.Editor.Product(); });
});
//# sourceMappingURL=product.js.map