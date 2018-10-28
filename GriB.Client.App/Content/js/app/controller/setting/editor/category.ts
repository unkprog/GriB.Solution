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
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$category"),
                "editModel": {},
                "labelName": vars._statres("label$name"),
                "labelPosTerminal": vars._statres("label$POSterminal"),
                "labelAddPhoto": vars._statres("label$addphoto"),
            });
        }

        public get EditorModel(): Interfaces.Model.ICategory {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "id_category", Load: $.proxy(this.Service.GetCategory, this.Service), Save: $.proxy(this.Service.SetCategory, this.Service) };
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICategory = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            }
            return result;
        }

        private imgDialog: any;
        private controlPhoto: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.imgDialog = view.find("#editor-view-image-input");
            this.controlPhoto = view.find("#editor-view-category-photo");

            let onUpolad = $.proxy(this.uploudImageClick, this);

            this.imgDialog.bind("change", onUpolad);
            //    .change(function (e) {
            //    controller.UploadImage(controller.imgDialog[0].files);
            //});
            return super.ViewInit(view);
        }

        protected createEvents(): void {
            super.createEvents();
            this.AddPhotoButtonClick = this.createClickEvent("editor-view-category-addphoto", this.addPhotoButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("editor-view-category-addphoto", this.AddPhotoButtonClick);
            this.imgDialog.unbind();
            super.destroyEvents();
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
        }

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
    }
}