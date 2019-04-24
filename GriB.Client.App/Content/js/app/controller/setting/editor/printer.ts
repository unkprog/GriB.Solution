import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import ctrl = require('app/common/basecontrol');
import posctrl = require('app/common/poscontrol');

export namespace Controller.Setting.Editor {
    export class Printer extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/printer.html", Id: "editor-view-printer" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$printer"),
                "editModel": {},
                "labelName": vars._statres("label$name"),
                "LabelPrintSettings": vars._statres("label$printsettings"),
                "labelSize": vars._statres("label$papersize"),
                "label58" : "58",
                "label80": "80",
                "labelLogo": vars._statres("label$logo"),
                "labelCheckHeader": vars._statres("label$header"),
                "labelCheckFooter": vars._statres("label$footer"),
            });
        }


        public get EditorModel(): Interfaces.Model.IPrinter {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_printer", Load: $.proxy(this.Service.GetPrinter, this.Service), Save: $.proxy(this.Service.SetPrinter, this.Service) };
        }

        private printServerControl: ctrl.Control.ReferenceFieldControl;
        private salepointControl: ctrl.Control.ReferenceFieldControl;

        private controlSize: JQuery;
        private controlAddPhoto: JQuery;
        private imgDialog: any;
        private controlPhoto: JQuery;
        private controlHeader: JQuery;
        private controlFooter: JQuery;
        protected checkViewContainer: JQuery;
        protected checkViewControl: posctrl.POSControl.CheckViewControl;

        public ViewInit(view: JQuery): boolean {
            let controller = this;
            controller.printServerControl = new ctrl.Control.ReferenceFieldControl();
            controller.printServerControl.InitControl(view.find("#editor-view-printer-printserver-row"), "editor-view-printer-printserver", "editModel.printserver", "editModel.printserver.pskey", vars._statres("label$printserver"), 'setting/card/printserver', controller.Model);

            controller.salepointControl = new ctrl.Control.ReferenceFieldControl();
            controller.salepointControl.InitControl(view.find("#editor-view-printer-salepoint-row"), "editor-view-printer-salepoint", "editModel.salepoint", "editModel.salepoint.name", vars._statres("label$salePoint"), 'setting/card/salepoint', controller.Model);

            controller.controlSize = view.find('#editor-view-printer-labelsize');
            view.find("#editor-view-printer-name").characterCounter();
            controller.controlHeader = view.find("#editor-view-printer-header"); controller.controlHeader.characterCounter();
            controller.controlFooter = view.find("#editor-view-printer-footer"); controller.controlFooter.characterCounter();

            controller.controlAddPhoto = view.find("#editor-view-printer-addphoto");
            controller.imgDialog = view.find("#editor-view-printer-image-input");
            controller.controlPhoto = view.find("#editor-view-printer-photo");

            controller.checkViewContainer = view.find("#editor-view-printer-check");
            controller.checkViewControl = new posctrl.POSControl.CheckViewControl();
            //controller.checkViewControl.PrintService = new svcPrint.Services.PrintService();
            controller.checkViewContainer.append(controller.checkViewControl.InitView());

            return super.ViewInit(view);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            this.controlSize.formSelect();
        }

        public ViewShow(e: any): boolean {
            this.controlSize.formSelect();
            M.textareaAutoResize(this.controlHeader);
            M.textareaAutoResize(this.controlFooter);
            return super.ViewShow(e);
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            if (this.EditorModel.logo)
                this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.logo + ")");
            M.textareaAutoResize(this.controlHeader);
            M.textareaAutoResize(this.controlFooter);
            this.setupCheckView();
        }

        public createEvents(): void {
            super.createEvents();
            if (this.printServerControl) this.printServerControl.createEvents();
            if (this.salepointControl) this.salepointControl.createEvents();
            this.AddPhotoButtonClick = this.createTouchClickEvent(this.controlAddPhoto, this.addPhotoButtonClick);

            let onUpload = $.proxy(this.uploudImageClick, this);
            this.imgDialog.bind("change", onUpload);

            this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        public destroyEvents(): void {
            this.Model.unbind("change");
            this.imgDialog.unbind();
            this.destroyTouchClickEvent(this.controlAddPhoto, this.AddPhotoButtonClick);
            if (this.salepointControl) this.salepointControl.destroyEvents();
            if (this.printServerControl) this.printServerControl.destroyEvents();
            super.destroyEvents();
        }

        private changeModel(e: any): void {
            //if (e.field === "editModel.labelsize") {
            //    this.checkViewControl.Printer = this.EditorModel;
            //}
            this.checkViewControl.Printer = this.EditorModel;
        }

        private setupCheckView() {
            let checkData: Interfaces.Model.IPOSCheck = {
                id: 0, cd: new Date(), number: 1
                , discount: 5, discountref: { id: 0, name: '5%', value: 5, accesssalepoints: [] },
                comment: '', sum: 100, client: undefined, positions: []
            };
            let product: any = { id: 0, name: 'Товар' };
            for (let i = 1, icount = 11; i < icount; i++) {
                checkData.positions.push({ index: i, product: product, quantity: 1, price: 50, sum: 50 });
            }
            //this.checkViewControl.LabelSize = +this.EditorModel.labelsize;
            this.checkViewControl.Printer = this.EditorModel;
            this.checkViewControl.POSCheck = checkData;
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IPrinter = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.header) && model.header.length > 2000) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$checkheader"), 2000) });
                result = false;
            }
            if (!utils.isNullOrEmpty(model.footer) && model.footer.length > 2000) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$checkfooter"), 2000) });
                result = false;
            }
            return result;
        }

        public AddPhotoButtonClick: { (e: any): void; };
        private addPhotoButtonClick(e) {
            $("#editor-view-printer-image-input").trigger("click");
        }

        private uploudImageClick(e) {
            this.UploadImage(this.imgDialog[0].files);
        }

        public UploadImage(files: any) {
            let controller = this;
            if (files.length > 0) {
                var dataUpload = new FormData();

                dataUpload.append("type", '1');
                dataUpload.append("photo", controller.EditorModel.logo);
                dataUpload.append("file", files[0]);

                controller.Service.UploadImage(dataUpload, (responseData: any) => {
                    controller.Model.set("editModel.logo", responseData);
                    if (this.EditorModel.logo)
                        this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.logo + ")");
                });
            }
        }
    }
}

vars.registerController("setting/editor/printer", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Printer(); });