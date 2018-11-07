import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Product extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/product.html", Id: "editor-view-product" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let oo: kendo.data.ObservableObject = new kendo.data.ObservableObject({
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

           

            return oo;
        }

        public get EditorModel(): Interfaces.Model.IProduct {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
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
        private categoryList: JQuery;
        private currencyList: JQuery;
        private unitList: JQuery;
        private rightRows: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.imgDialog = view.find("#editor-view-image-input");
            this.controlPhoto = view.find("#editor-view-product-photo");
            this.categoryList = view.find("#editor-view-category-list");
            this.unitList = view.find("#editor-view-product-unit");
            this.currencyList = view.find("#editor-view-product-currency");
            this.rightRows = view.find("#product-rigths-rows");
            this.controlType = view.find('#editor-view-product-type');
            let onUpolad = $.proxy(this.uploudImageClick, this);

            this.imgDialog.bind("change", onUpolad);

            view.find("#editor-view-product-name").characterCounter();
            view.find("#editor-view-product-description").characterCounter();
            view.find("#editor-view-product-vendorcode").characterCounter();
            view.find("#editor-view-product-barcode").characterCounter();
            return super.ViewInit(view);
        }

        protected createEvents(): void {
            super.createEvents();
            this.AddPhotoButtonClick = this.createClickEvent("editor-view-product-addphoto", this.addPhotoButtonClick);
            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        protected destroyEvents(): void {
            this.Model.unbind("change");
            this.destroyClickEvent("editor-view-product-addphoto", this.AddPhotoButtonClick);
            this.imgDialog.unbind();
            super.destroyEvents();

        }

      
        private changeModel(e: any): void {
            if (e.field === "editModel.type") {
                let model: Interfaces.Model.IProduct = this.EditorModel;
                if (+model.type === 1)
                    $("#editor-view-product-tab2").hide();
                else
                    $("#editor-view-product-tab2").show();
            }
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            $('#editor-view-product-tabs').tabs();
            M.textareaAutoResize($("#editor-view-product-description"));
            this.controlType.formSelect();
            if (this.controlPhoto)
                this.controlPhoto.height(this.controlPhoto.width());
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
            this.setupListCategory(responseData);
            this.setupListUnit(responseData);
            this.setupListCurrencies(responseData);
            this.setupTableAccess();
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

        private setupListUnit(responseData: any) {
            let html: string = '';
            let units = responseData.units;
            html += ' <option value="0"' + (0 === this.EditorModel.pid ? ' selected' : '') + '>' + vars._statres("label$unitnotspecified") + '</option>';
            if (units && units.length > 0) {
                for (let i = 0, icount = units.length; i < icount; i++)
                    html += ' <option value="' + units[i].id + '"' + (units[i].id === this.EditorModel.unit ? ' selected' : '') + '>' + units[i].name + '</option>';
                this.unitList.html(html);
            }
            else
                this.unitList.html('');
            this.unitList.formSelect();
        }

        private setupListCurrencies(responseData: any) {
            let html: string = '';
            let currencies = responseData.currencies;
            html += ' <option value="0"' + (0 === this.EditorModel.pid ? ' selected' : '') + '>' + vars._statres("label$currencynotspecified") + '</option>';
            if (currencies && currencies.length > 0) {
                for (let i = 0, icount = currencies.length; i < icount; i++)
                    html += ' <option value="' + currencies[i].id + '"' + (currencies[i].id === this.EditorModel.currency ? ' selected' : '') + '>' + currencies[i].code + (utils.isNullOrEmpty(currencies[i].name) ? '' : ' - ') + currencies[i].name + '</option>';
                this.currencyList.html(html);
            }
            else
                this.currencyList.html('');
            this.currencyList.formSelect();
        }

        private setupTableAccess(): void {
            let model: Interfaces.Model.IProduct = this.EditorModel;
            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            let html: string = '';

            if (data && data.length > 0) {
                let item: Interfaces.Model.ISalePointAccessModel;
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    item = data[i];
                    item

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
                    this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.photo + ")");
                });
            }
        }

        protected getSaveModel(): Interfaces.Model.IEditorModel {
            let model: Interfaces.Model.IProduct = this.EditorModel;
            let catg = this.categoryList.val();
            model.pid = +catg; //(catg && catg.length > 0 ? +catg[0] : 0);

            return model;
        }
    }
}