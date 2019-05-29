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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor", "app/common/basecontrol", "app/common/poscontrol"], function (require, exports, vars, utils, edit, ctrl, posctrl) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Printer = /** @class */ (function (_super) {
                    __extends(Printer, _super);
                    function Printer() {
                        return _super.call(this) || this;
                    }
                    Printer.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/printer.html", Id: "editor-view-printer" };
                    };
                    Printer.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$printer"),
                            "editModel": {},
                            "labelName": vars._statres("label$name"),
                            "LabelPrintSettings": vars._statres("label$printsettings"),
                            "labelSize": vars._statres("label$papersize"),
                            "label58": "58",
                            "label80": "80",
                            "labelLogo": vars._statres("label$logo"),
                            "labelCheckHeader": vars._statres("label$header"),
                            "labelCheckFooter": vars._statres("label$footer"),
                        });
                    };
                    Object.defineProperty(Printer.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Printer.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_printer", Load: $.proxy(this.Service.GetPrinter, this.Service), Save: $.proxy(this.Service.SetPrinter, this.Service) };
                    };
                    Printer.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.printServerControl = new ctrl.Control.ReferenceFieldControl();
                        controller.printServerControl.InitControl(view.find("#editor-view-printer-printserver-row"), "editor-view-printer-printserver", "editModel.printserver", "editModel.printserver.pskey", vars._statres("label$printserver"), 'setting/card/printserver', controller.Model);
                        controller.salepointControl = new ctrl.Control.ReferenceFieldControl();
                        controller.salepointControl.InitControl(view.find("#editor-view-printer-salepoint-row"), "editor-view-printer-salepoint", "editModel.salepoint", "editModel.salepoint.name", vars._statres("label$salePoint"), 'setting/card/salepoint', controller.Model);
                        controller.controlSize = view.find('#editor-view-printer-labelsize');
                        view.find("#editor-view-printer-name").characterCounter();
                        controller.controlHeader = view.find("#editor-view-printer-header");
                        controller.controlHeader.characterCounter();
                        controller.controlFooter = view.find("#editor-view-printer-footer");
                        controller.controlFooter.characterCounter();
                        controller.controlAddPhoto = view.find("#editor-view-printer-addphoto");
                        controller.imgDialog = view.find("#editor-view-printer-image-input");
                        controller.controlPhoto = view.find("#editor-view-printer-photo");
                        controller.checkViewContainer = view.find("#editor-view-printer-check");
                        controller.checkViewControl = new posctrl.POSControl.CheckViewControl();
                        //controller.checkViewControl.PrintService = new svcPrint.Services.PrintService();
                        controller.checkViewContainer.append(controller.checkViewControl.InitView());
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Printer.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        this.controlSize.formSelect();
                    };
                    Printer.prototype.ViewShow = function (e) {
                        this.controlSize.formSelect();
                        M.textareaAutoResize(this.controlHeader);
                        M.textareaAutoResize(this.controlFooter);
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Printer.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        if (this.EditorModel.logo)
                            this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.logo + ")");
                        M.textareaAutoResize(this.controlHeader);
                        M.textareaAutoResize(this.controlFooter);
                        this.setupCheckView();
                    };
                    Printer.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.printServerControl)
                            this.printServerControl.createEvents();
                        if (this.salepointControl)
                            this.salepointControl.createEvents();
                        this.AddPhotoButtonClick = this.createTouchClickEvent(this.controlAddPhoto, this.addPhotoButtonClick);
                        var onUpload = $.proxy(this.uploudImageClick, this);
                        this.imgDialog.bind("change", onUpload);
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    Printer.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
                        this.imgDialog.unbind();
                        this.destroyTouchClickEvent(this.controlAddPhoto, this.AddPhotoButtonClick);
                        if (this.salepointControl)
                            this.salepointControl.destroyEvents();
                        if (this.printServerControl)
                            this.printServerControl.destroyEvents();
                        _super.prototype.destroyEvents.call(this);
                    };
                    Printer.prototype.changeModel = function (e) {
                        //if (e.field === "editModel.labelsize") {
                        //    this.checkViewControl.Printer = this.EditorModel;
                        //}
                        this.checkViewControl.Printer = this.EditorModel;
                    };
                    Printer.prototype.setupCheckView = function () {
                        var checkData = {
                            id: 0, cd: new Date(), number: 1,
                            discount: 5, discountref: { id: 0, name: '5%', value: 5, accesssalepoints: [] },
                            comment: '', sum: 100, client: undefined, positions: []
                        };
                        var product = { id: 0, name: 'Товар' };
                        for (var i = 1, icount = 11; i < icount; i++) {
                            checkData.positions.push({ index: i, product: product, quantity: 1, price: 50, sum: 50 });
                        }
                        //this.checkViewControl.LabelSize = +this.EditorModel.labelsize;
                        this.checkViewControl.Printer = this.EditorModel;
                        this.checkViewControl.POSCheck = checkData;
                    };
                    Printer.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.name)) {
                            M.toast({ html: vars._statres("msg$error$invalidname") });
                            result = false;
                        }
                        else if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
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
                    };
                    Printer.prototype.addPhotoButtonClick = function (e) {
                        $("#editor-view-printer-image-input").trigger("click");
                    };
                    Printer.prototype.uploudImageClick = function (e) {
                        this.UploadImage(this.imgDialog[0].files);
                    };
                    Printer.prototype.UploadImage = function (files) {
                        var _this = this;
                        var controller = this;
                        if (files.length > 0) {
                            var dataUpload = new FormData();
                            dataUpload.append("type", '1');
                            dataUpload.append("photo", controller.EditorModel.logo);
                            dataUpload.append("file", files[0]);
                            controller.Service.UploadImage(dataUpload, function (responseData) {
                                controller.Model.set("editModel.logo", responseData);
                                if (_this.EditorModel.logo)
                                    _this.controlPhoto.css("backgroundImage", "url(" + controller.EditorModel.logo + ")");
                            });
                        }
                    };
                    return Printer;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Printer = Printer;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/printer", function (module) { return new module.Controller.Setting.Editor.Printer(); });
});
//# sourceMappingURL=printer.js.map