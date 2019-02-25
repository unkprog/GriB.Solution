import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Category extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/category.html", Id: "editor-view-category" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let oo: kendo.data.ObservableObject = new kendo.data.ObservableObject({
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
        }

        public get EditorModel(): Interfaces.Model.ICategory {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_category", Load: $.proxy(this.Service.GetCategory, this.Service), Save: $.proxy(this.Service.SetCategory, this.Service) };
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICategory = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.name) && model.description.length > 3098) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 3098) });
                result = false;
            }

            return result;
        }

        private imgDialog: any;
        private controlName: JQuery;
        private controlPhoto: JQuery;
        private categoryList: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.controlName = view.find("#editor-view-category-name"); 
            this.imgDialog = view.find("#editor-view-image-input");
            this.controlPhoto = view.find("#editor-view-category-photo");
            this.categoryList = view.find("#editor-view-category-list");

            this.controlName.characterCounter();
            view.find("#editor-view-category-description").characterCounter();

            let onUpolad = $.proxy(this.uploudImageClick, this);

            this.imgDialog.bind("change", onUpolad);
            let result = super.ViewInit(view);

            let tabs: JQuery = view.find("#editor-view-category-tabs");
            let header: JQuery = view.find(".editor-header-nav");

            tabs.remove();
            header.append(tabs);
            header.parent().css('cssText', "height: 88px !important");
            return result;
        }

        public ViewShow(e: any): boolean {
            $('#editor-view-category-tabs').tabs();
            M.Tabs.getInstance($('#editor-view-category-tabs')).updateTabIndicator();
            M.textareaAutoResize($("#editor-view-category-description"));
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
            this.AddPhotoButtonClick = this.createTouchClickEvent("editor-view-category-addphoto", this.addPhotoButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("editor-view-category-addphoto", this.AddPhotoButtonClick);
            this.imgDialog.unbind();
            super.destroyEvents();
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            M.Tabs.getInstance($('#editor-view-category-tabs')).updateTabIndicator();
            if (this.controlPhoto)
                this.controlPhoto.height(this.controlPhoto.width());
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            //this.controlTabs.tabs();
            this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
            this.setupListCategory(responseData);

            let model: Interfaces.Model.ICategory = this.EditorModel;
            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            this.setupTableAccess($("#category-rigths-rows"), data);
        }

        private setupListCategory(responseData: any) {
            let html: string = '';
            let categories = responseData.categories;
            html += ' <option value="0"' + (0 === this.EditorModel.pid ? ' selected' : '') + '>' + vars._statres("label$categorynotspecified") + '</option>';
            if (categories && categories.length > 0) {
                for (let i = 0, icount = categories.length; i < icount; i++)
                    html += ' <option value="' + categories[i].id + '"' + (categories[i].id === this.EditorModel.pid ? ' selected' : '') + '>' + categories[i].name + '</option>';
                this.categoryList.html(html);
            }
            else
                this.categoryList.html('');
            this.categoryList.formSelect();
        }

        //private setupTableAccess(): void {
        //    let model: Interfaces.Model.ICategory = this.EditorModel;
        //    let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
        //    let html: string = '';

        //    if (data && data.length > 0) {
        //        let item: Interfaces.Model.ISalePointAccessModel;
        //        for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
        //            item = data[i];
        //            item

        //            html += '<tr>';
        //            html += '<td data-bind="text:editModel.accesssalepoints[' + i + '].salepoint.name"></td>';

        //            html += '<td>';
        //            html += '<div class="switch valign-wrapper">';
        //            html += '    <label>';
        //            html += '        <input type="checkbox" data-bind="checked:editModel.accesssalepoints[' + i + '].isaccess">';
        //            html += '        <span class="lever"></span>';
        //            html += '     </label>';
        //            html += '</div>';
        //            html += '</td>';
        //            html += '</tr>';
        //        }
        //    }

        //    $("#category-rigths-rows").html(html);
        //    kendo.bind($("#category-rigths-rows"), this.Model);
        //}

        public AddPhotoButtonClick: { (e: any): void; };
        private addPhotoButtonClick(e) {
            $("#editor-view-image-input").trigger("click");
        }

        private uploudImageClick(e) {
            this.UploadImage(this.imgDialog[0].files);
        }

        public UploadImage(files: any) {
            let controller = this;
            if (files.length > 0) {
                var dataUpload = new FormData();

                dataUpload.append("type", '0');
                dataUpload.append("photo", controller.EditorModel.photo);
                dataUpload.append("file", files[0]);

                controller.Service.UploadImage(dataUpload, (responseData: any) => {
                    controller.Model.set("editModel.photo", responseData);
                    this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.photo + ")");
                });
            }
        }

        protected getSaveModel(): Interfaces.Model.IEditorModel {
            let model: Interfaces.Model.ICategory = this.EditorModel;
            let catg = $("#editor-view-category-list").val();
            model.pid = +catg; //(catg && catg.length > 0 ? +catg[0] : 0);
            return model;
        }

       
    }
}

vars.registerController("setting/editor/category", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Category(); });