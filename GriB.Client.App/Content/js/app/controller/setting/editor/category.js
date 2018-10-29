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
                var Category = /** @class */ (function (_super) {
                    __extends(Category, _super);
                    function Category() {
                        return _super.call(this) || this;
                    }
                    Category.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/category.html", Id: "editor-view-category" };
                    };
                    Category.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$category"),
                            "editModel": {},
                            "labelAccessRight": vars._statres("label$accessright"),
                            "labelCategory": vars._statres("label$category"),
                            "labelName": vars._statres("label$name"),
                            "labelIncludedInCategory": vars._statres("label$includedincategory"),
                            "labelPosTerminal": vars._statres("label$POSterminal"),
                            "labelAddPhoto": vars._statres("label$addphoto"),
                            "labelDescription": vars._statres("label$description"),
                            "labelSalePoint": vars._statres("label$salePoint"),
                            "labelAccess": vars._statres("label$access"),
                        });
                    };
                    Object.defineProperty(Category.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Category.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_category", Load: $.proxy(this.Service.GetCategory, this.Service), Save: $.proxy(this.Service.SetCategory, this.Service) };
                    };
                    Category.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        return result;
                    };
                    Category.prototype.ViewInit = function (view) {
                        this.imgDialog = view.find("#editor-view-image-input");
                        this.controlPhoto = view.find("#editor-view-category-photo");
                        var onUpolad = $.proxy(this.uploudImageClick, this);
                        this.imgDialog.bind("change", onUpolad);
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Category.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        this.AddPhotoButtonClick = this.createClickEvent("editor-view-category-addphoto", this.addPhotoButtonClick);
                    };
                    Category.prototype.destroyEvents = function () {
                        this.destroyClickEvent("editor-view-category-addphoto", this.AddPhotoButtonClick);
                        this.imgDialog.unbind();
                        _super.prototype.destroyEvents.call(this);
                    };
                    Category.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        $('#editor-view-category-tabs').tabs();
                        if (this.controlPhoto)
                            this.controlPhoto.height(this.controlPhoto.width());
                    };
                    Category.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
                        $("#editor-view-category-list").formSelect();
                        M.textareaAutoResize($("#editor-view-category-description"));
                        this.setupTableAccess();
                    };
                    Category.prototype.setupTableAccess = function () {
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
                        $("#category-rigths-rows").html(html);
                        kendo.bind($("#category-rigths-rows"), this.Model);
                    };
                    Category.prototype.addPhotoButtonClick = function (e) {
                        $("#editor-view-image-input").trigger("click");
                    };
                    Category.prototype.uploudImageClick = function (e) {
                        this.UploadImage(this.imgDialog[0].files);
                    };
                    Category.prototype.UploadImage = function (files) {
                        var _this = this;
                        var controller = this;
                        if (files.length > 0) {
                            var dataUpload = new FormData();
                            dataUpload.append("type", '0');
                            dataUpload.append("photo", controller.EditorModel.photo);
                            dataUpload.append("file", files[0]);
                            controller.Service.UploadImage(dataUpload, function (responseData) {
                                controller.Model.set("editModel.photo", responseData);
                                _this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.photo + ")");
                            });
                        }
                    };
                    return Category;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Category = Category;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=category.js.map