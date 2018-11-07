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
                        var oo = new kendo.data.ObservableObject({
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
                        return oo;
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
                        else if (model.name.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.name) && model.description.length > 3098) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 3098) });
                            result = false;
                        }
                        return result;
                    };
                    Category.prototype.ViewInit = function (view) {
                        this.controlName = view.find("#editor-view-category-name");
                        this.imgDialog = view.find("#editor-view-image-input");
                        this.controlPhoto = view.find("#editor-view-category-photo");
                        this.categoryList = view.find("#editor-view-category-list");
                        this.controlName.characterCounter();
                        view.find("#editor-view-category-description").characterCounter();
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
                        M.textareaAutoResize($("#editor-view-category-description"));
                        if (this.controlPhoto)
                            this.controlPhoto.height(this.controlPhoto.width());
                    };
                    Category.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        //this.controlTabs.tabs();
                        this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
                        this.setupListCategory(responseData);
                        this.setupTableAccess();
                    };
                    Category.prototype.setupListCategory = function (responseData) {
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
                    Category.prototype.getSaveModel = function () {
                        var model = this.EditorModel;
                        var catg = $("#editor-view-category-list").val();
                        model.pid = +catg; //(catg && catg.length > 0 ? +catg[0] : 0);
                        return model;
                    };
                    return Category;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Category = Category;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=category.js.map