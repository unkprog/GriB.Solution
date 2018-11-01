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
                var Product = /** @class */ (function (_super) {
                    __extends(Product, _super);
                    function Product() {
                        return _super.call(this) || this;
                    }
                    Product.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/product.html", Id: "editor-view-product" };
                    };
                    Product.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$product"),
                            "editModel": {},
                            "labelSpecifications": vars._statres("label$specifications"),
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
                        });
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
                        return result;
                    };
                    Product.prototype.ViewInit = function (view) {
                        this.imgDialog = view.find("#editor-view-image-input");
                        this.controlPhoto = view.find("#editor-view-product-photo");
                        this.categoryList = view.find("#editor-view-category-list");
                        this.unitList = view.find("#editor-view-product-unit");
                        this.currencyList = view.find("#editor-view-product-currency");
                        this.rightRows = view.find("#product-rigths-rows");
                        this.controlType = view.find('#editor-view-product-type');
                        var onUpolad = $.proxy(this.uploudImageClick, this);
                        this.imgDialog.bind("change", onUpolad);
                        view.find("#editor-view-product-name").characterCounter();
                        view.find("#editor-view-product-description").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Product.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        this.AddPhotoButtonClick = this.createClickEvent("editor-view-product-addphoto", this.addPhotoButtonClick);
                    };
                    Product.prototype.destroyEvents = function () {
                        this.destroyClickEvent("editor-view-product-addphoto", this.AddPhotoButtonClick);
                        this.imgDialog.unbind();
                        _super.prototype.destroyEvents.call(this);
                    };
                    Product.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        $('#editor-view-product-tabs').tabs();
                        M.textareaAutoResize($("#editor-view-product-description"));
                        this.controlType.formSelect();
                        if (this.controlPhoto)
                            this.controlPhoto.height(this.controlPhoto.width());
                    };
                    Product.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
                        this.setupListCategory(responseData);
                        this.setupListUnit(responseData);
                        this.setupListCurrencies(responseData);
                        this.setupTableAccess();
                    };
                    Product.prototype.setupListCategory = function (responseData) {
                        var html = '';
                        var categories = responseData.categories;
                        html += ' <option value="0"' + (0 === this.EditorModel.pid ? ' selected' : '') + '>' + vars._statres("label$categorynotspecified") + '</option>';
                        if (categories && categories.length > 0) {
                            for (var i = 0, icount = categories.length; i < icount; i++)
                                html += ' <option value="' + categories[i].id + '"' + (categories[i].id === this.EditorModel.pid ? ' selected' : '') + '>' + categories[i].name + '</option>';
                            this.categoryList.html(html);
                        }
                        else
                            this.categoryList.html('');
                        this.categoryList.formSelect();
                    };
                    Product.prototype.setupListUnit = function (responseData) {
                        var html = '';
                        var units = responseData.units;
                        html += ' <option value="0"' + (0 === this.EditorModel.pid ? ' selected' : '') + '>' + vars._statres("label$unitnotspecified") + '</option>';
                        if (units && units.length > 0) {
                            for (var i = 0, icount = units.length; i < icount; i++)
                                html += ' <option value="' + units[i].id + '"' + (units[i].id === this.EditorModel.unit ? ' selected' : '') + '>' + units[i].name + '</option>';
                            this.unitList.html(html);
                        }
                        else
                            this.unitList.html('');
                        this.unitList.formSelect();
                    };
                    Product.prototype.setupListCurrencies = function (responseData) {
                        var html = '';
                        var currencies = responseData.currencies;
                        html += ' <option value="0"' + (0 === this.EditorModel.pid ? ' selected' : '') + '>' + vars._statres("label$currencynotspecified") + '</option>';
                        if (currencies && currencies.length > 0) {
                            for (var i = 0, icount = currencies.length; i < icount; i++)
                                html += ' <option value="' + currencies[i].id + '"' + (currencies[i].id === this.EditorModel.currency ? ' selected' : '') + '>' + currencies[i].code + (utils.isNullOrEmpty(currencies[i].name) ? '' : ' - ') + currencies[i].name + '</option>';
                            this.currencyList.html(html);
                        }
                        else
                            this.currencyList.html('');
                        this.currencyList.formSelect();
                    };
                    Product.prototype.setupTableAccess = function () {
                        var model = this.EditorModel;
                        var data = model.accesssalepoints;
                        var html = '';
                        if (data && data.length > 0) {
                            var item = void 0;
                            for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                                item = data[i];
                                item;
                                html += '<tr>';
                                html += '<td data-bind="text:editModel.accesssalepoints[' + i + '].salepoint.name"></td>';
                                html += '<td>';
                                html += '<div class="switch valign-wrapper">';
                                html += '    <label>';
                                html += '        <input type="checkbox" data-bind="checked:editModel.accesssalepoints[' + i + '].isaccess">';
                                html += '        <span class="lever"></span>';
                                html += '     </label>';
                                html += '</div>';
                                html += '</td>';
                                html += '</tr>';
                            }
                        }
                        this.rightRows.html(html);
                        kendo.bind(this.rightRows, this.Model);
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
                                _this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.photo + ")");
                            });
                        }
                    };
                    Product.prototype.getSaveModel = function () {
                        var model = this.EditorModel;
                        var catg = this.categoryList.val();
                        model.pid = +catg; //(catg && catg.length > 0 ? +catg[0] : 0);
                        return model;
                    };
                    return Product;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Product = Product;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=product.js.map