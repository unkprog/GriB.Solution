import vars = require('app/common/variables');
import utils = require('app/common/utils');
import ctrl = require('app/common/basecontrol');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Product extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/product.html", Id: "editor-view-product" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let model: kendo.data.ObservableObject = new kendo.data.ObservableObject({
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
        }

        public get EditorModel(): Interfaces.Model.IProduct {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_product", Load: $.proxy(this.Service.GetProduct, this.Service), Save: $.proxy(this.Service.SetProduct, this.Service) };
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IProduct = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (model.name.length > 60) {
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

            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            let isaccess: boolean = false
            for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
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
        }

        private controlType: JQuery;
        private imgDialog: any;
        private controlPhoto: JQuery;
        private categoryControl: ctrl.Control.ReferenceFieldControl;
        private unitControl: ctrl.Control.ReferenceFieldControl;
        private currencyControl: ctrl.Control.ReferenceFieldControl;
        private rightRows: JQuery;
        private techMapButton: JQuery;
        public ViewInit(view: JQuery): boolean {
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
            let result = super.ViewInit(view);

            let tabs: JQuery = view.find("#editor-view-product-tabs");
            let header: JQuery = view.find(".editor-header-nav");

            tabs.remove();
            header.append(tabs);
            header.parent().css('cssText', "height: 88px !important");
            return result;
        }

        protected createEvents(): void {
            super.createEvents();

            let onUpolad = $.proxy(this.uploudImageClick, this);
            this.imgDialog.bind("change", onUpolad);

            if (this.categoryControl) {
                this.categoryControl.createEvents();
                this.categoryControl.SelectValue = $.proxy(this.selectCategoryValue, this);
            }
            if (this.unitControl) this.unitControl.createEvents();
            if (this.currencyControl) this.currencyControl.createEvents();

            this.TechMapButtonClick = this.createTouchClickEvent(this.techMapButton, this.techMapButtonClick);
            this.AddPhotoButtonClick = this.createTouchClickEvent("editor-view-product-addphoto", this.addPhotoButtonClick);
            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        protected destroyEvents(): void {
            this.rightRows.unbind();
            this.Model.unbind("change");
            this.destroyTouchClickEvent("editor-view-product-addphoto", this.AddPhotoButtonClick);
            this.destroyTouchClickEvent(this.techMapButton, this.TechMapButtonClick);

            if (this.currencyControl) this.currencyControl.destroyEvents();
            if (this.unitControl) this.unitControl.destroyEvents();
            if (this.categoryControl) this.categoryControl.destroyEvents();

            this.imgDialog.unbind();
            super.destroyEvents();

        }

        private selectCategoryValue(value: Interfaces.Model.IBaseModel) {
            let valueCategory: any = value;
            if (valueCategory) {
                this.Model.set("editModel.category", { id: valueCategory.id, name: (utils.isNullOrEmpty(valueCategory.parentname) === true ? "" : valueCategory.parentname + '->') + valueCategory.name });
            }
        }

        private changeModel(e: any): void {
            if (e.field === "editModel.type") {
                let model: Interfaces.Model.IProduct = this.EditorModel;
                if (+model.type === 1) {
                    $("#btn-techmap-row").removeClass("hide"); //.show();
                }
                else {
                    if ($("#btn-techmap-row").hasClass("hide") === false)
                        $("#btn-techmap-row").addClass("hide");
                }
            }
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            M.Tabs.getInstance($('#editor-view-product-tabs')).updateTabIndicator();
            this.controlType.formSelect();
            if (this.controlPhoto)
                this.controlPhoto.height(this.controlPhoto.width());
        }

        public ViewShow(e: any): boolean {
            $('#editor-view-product-tabs').tabs();
            M.Tabs.getInstance($('#editor-view-product-tabs')).updateTabIndicator();
            M.textareaAutoResize($("#editor-view-product-description"));
            this.controlType.formSelect();
            return super.ViewShow(e);
        }

        public ViewHide(e) {
            //$('#editor-view-product-tabs').tabs("destroy");
            super.ViewHide(e);
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            if (this.EditorModel.photo)
                this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
            this.changeModel({ field: "editModel.type" });

            let model: Interfaces.Model.IProduct = this.EditorModel;
            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            this.setupTableAccess(this.rightRows, data);
        }

        public TechMapButtonClick: { (e: any): void; };
        private techMapButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/editor/productmapedit', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlMap: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                    ctrlMap.Model.set("editModel", self.EditorModel);
                    ctrlMap.EditorSettings.Save = $.proxy(self.onEditRow, self);
                }
            });
        }

        private onEditRow(model: Interfaces.Model.IEditorModel, callback: (responseData: any) => void) {
           this.Model.set("editModel", model);

            if (callback) {
                callback(undefined);
            }
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

                dataUpload.append("type", '1');
                dataUpload.append("photo", controller.EditorModel.photo);
                dataUpload.append("file", files[0]);

                controller.Service.UploadImage(dataUpload, (responseData: any) => {
                    controller.Model.set("editModel.photo", responseData);
                    if (this.EditorModel.photo)
                        this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.photo + ")");
                });
            }
        }

        protected getSaveModel(): Interfaces.Model.IEditorModel {
            let model: Interfaces.Model.IProduct = this.EditorModel;
            let catg = this.Model.get("editModel.category.id");
            model.pid = +catg; //(catg && catg.length > 0 ? +catg[0] : 0);

            return model;
        }
    }
}

vars.registerController("setting/editor/product", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Product(); });