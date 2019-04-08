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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontrol", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, ctrl, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var ProductMapBase = /** @class */ (function (_super) {
                    __extends(ProductMapBase, _super);
                    function ProductMapBase() {
                        var _this = _super.call(this) || this;
                        _this.EditorSettings.ButtonSetings.IsPrint = true;
                        return _this;
                    }
                    ProductMapBase.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/productmap.html", Id: "editor-view-productmap" };
                    };
                    ProductMapBase.prototype.createModel = function () {
                        var model = new kendo.data.ObservableObject({
                            "Header": vars._statres("label$technologicalmap"),
                            "editModel": {},
                            "HeaderTechMap": vars._statres("label$technologicalmap"),
                            "labelApprove": vars._statres("label$approve"),
                            "labelFinishedProduct": vars._statres("label$output$finishedproduct"),
                            "labelFinishedDish": vars._statres("label$output$finisheddish"),
                            "labelMapMade": vars._statres("label$technologicalmap$made"),
                            "labelAddRow": vars._statres("label$add$row"),
                            "labelEditRow": vars._statres("label$edit$row"),
                            "labelDeleteRow": vars._statres("label$delete$row"),
                        });
                        return model;
                    };
                    Object.defineProperty(ProductMapBase.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ProductMapBase.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.imgDialog = view.find("#editor-view-productmap-image-input");
                        controller.controlPhoto = view.find("#editor-view-productmap-photo");
                        controller.OnContextMenu = $.proxy(controller.onContextMenu, controller);
                        controller.OnHeaderContextMenu = $.proxy(controller.onHeaderContextMenu, controller);
                        controller.tableMapControl = new ctrl.Control.BaseEditTable();
                        controller.tableMapControl.IsScroll = false;
                        controller.tableMapControl.OnContextMenu = controller.OnContextMenu;
                        //controller.tableMapControl.OnHeaderContextMenu = controller.OnHeaderContextMenu;
                        view.find("#editor-view-productmap-table-container").append(controller.tableMapControl.InitView());
                        controller.addRowControl = view.find("#editor-view-productmap-menu-add");
                        controller.addRowHControl = view.find("#editor-view-productmap-menuh-add");
                        controller.editRowControl = view.find("#editor-view-productmap-menu-edit");
                        controller.delRowControl = view.find("#editor-view-productmap-menu-del");
                        controller.editApproveControl = view.find("#editor-view-productmap-approve");
                        controller.editSignControl = view.find("#editor-view-productmap-sign");
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    ProductMapBase.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    ProductMapBase.prototype.ViewHide = function (e) {
                        _super.prototype.ViewHide.call(this, e);
                    };
                    ProductMapBase.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        if (this.EditorModel.photo)
                            this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");
                        if (utils.isNullOrEmpty(this.EditorModel.approver) == true)
                            this.Model.set("editModel.approver", vars._statres("label$headenterprise"));
                        if (utils.isNullOrEmpty(this.EditorModel.signer) == true)
                            this.Model.set("editModel.signer", vars._statres("label$chefcook"));
                        this.setupTableComposition();
                    };
                    ProductMapBase.prototype.setupTableComposition = function () {
                        var rows = this.Model.get("editModel").composition;
                        for (var i = 0, icount = (rows ? rows.length : 0); i < icount; i++) {
                            rows[i].numorder = i + 1;
                        }
                        this.tableMapControl.Columns = [
                            { Header: vars._statres("label$numorder"), HeaderStyle: "product-map-col-order", Field: "index", FieldTemplate: '#=(index)#', FieldStyle: "product-map-col-order" },
                            { Header: '', HeaderTemplate: '<a id="btn-add-map" class="btn tooltipped left"><i class="material-icons">add</i></a><span>' + vars._statres("label$namerawmaterial") + '</span>', HeaderStyle: "product-map-col-rawmaterial border-left center-align", Field: "product.name", FieldStyle: "product-map-col-rawmaterial border-left" },
                            { Header: vars._statres("label$unitshort"), HeaderStyle: "product-map-col-unit border-left", Field: "unit.code", FieldStyle: "product-map-col-unit border-left" },
                            { Header: vars._statres("label$brutto"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", Field: "brutto", FieldTemplate: '#=brutto#', FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:brutto" />' },
                            { Header: vars._statres("label$treatment$percentcold"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", FieldTemplate: '#=numberToString(percentcold, 2)#', Field: "percentcold", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:percentcold" />' },
                            { Header: vars._statres("label$netto"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", Field: "netto", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:netto" />' },
                            { Header: vars._statres("label$treatment$percentheat"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", FieldTemplate: '#=numberToString(percentheat, 2)#', Field: "percentheat", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:percentheat" />' },
                            { Header: vars._statres("label$exitcompletedproduct"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", Field: "exitproduct", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:exitproduct" />' },
                            { Header: vars._statres("label$description$technologicalprocess"), HeaderStyle: "product-map-col-description border-left center-align", Field: "description", FieldStyle: "product-map-col-description border-left", FieldEditTemplate: '<input data-bind="value:description" />' },
                        ];
                        this.tableMapControlSetup(rows);
                        this.AddHeaderButtonClick = this.createTouchClickEvent('btn-add-map', this.addHeaderButtonClick);
                    };
                    ProductMapBase.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        var onUpolad = $.proxy(this.uploudImageClick, this);
                        this.imgDialog.bind("change", onUpolad);
                        this.AddRowButtonClick = this.createTouchClickEvent(this.addRowControl, this.addRowButtonClick);
                        this.AddRowButtonClick = this.createTouchClickEvent(this.addRowHControl, this.addRowButtonClick);
                        this.EditRowButtonClick = this.createTouchClickEvent(this.editRowControl, this.editRowButtonClick);
                        this.DelRowButtonClick = this.createTouchClickEvent(this.delRowControl, this.delRowButtonClick);
                        this.AddPhotoButtonClick = this.createTouchClickEvent("editor-view-productmap-addphoto", this.addPhotoButtonClick);
                        this.EditApproverButtonClick = this.createTouchClickEvent(this.editApproveControl, this.editApproverButtonClick);
                        this.EditSignButtonClick = this.createTouchClickEvent(this.editSignControl, this.editSignButtonClick);
                        //this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    ProductMapBase.prototype.destroyEvents = function () {
                        //this.compositionRows.unbind();
                        //this.rightRows.unbind();
                        //this.Model.unbind("change");
                        this.destroyCellEdit();
                        this.destroyTouchClickEvent('btn-add-map', this.AddHeaderButtonClick);
                        this.destroyTouchClickEvent(this.addRowControl, this.AddRowButtonClick);
                        this.destroyTouchClickEvent(this.editRowControl, this.EditRowButtonClick);
                        this.destroyTouchClickEvent(this.delRowControl, this.DelRowButtonClick);
                        this.destroyTouchClickEvent("editor-view-productmap-addphoto", this.AddPhotoButtonClick);
                        this.destroyTouchClickEvent(this.editApproveControl, this.EditApproverButtonClick);
                        this.destroyTouchClickEvent(this.editSignControl, this.EditSignButtonClick);
                        this.imgDialog.unbind();
                        _super.prototype.destroyEvents.call(this);
                    };
                    ProductMapBase.prototype.onHeaderContextMenu = function (e) {
                        //this.compositionRow = (undefined as Interfaces.Model.IProductComposition);
                        //if (!this.menuHRowsControl) {
                        //    this.menuHRowsControl = this.View.find("#editor-view-productmap-menuh-trigger");
                        //    this.menuHRowsControl.dropdown();
                        //}
                        //let instance: any = this.menuHRowsControl[0];
                        //instance.M_Dropdown.el = e.currentTarget;
                        //instance.M_Dropdown.open();
                    };
                    ProductMapBase.prototype.onContextMenu = function (e, row) {
                        this.compositionRow = row;
                        this.rowControl = $(e.currentTarget);
                        if (!this.menuRowsControl) {
                            this.menuRowsControl = this.View.find("#editor-view-productmap-menu-trigger");
                            this.menuRowsControl.dropdown();
                        }
                        var instance = this.menuRowsControl[0];
                        instance.M_Dropdown.el = e.currentTarget;
                        instance.M_Dropdown.open();
                    };
                    ProductMapBase.prototype.setRowsTable = function (rows) {
                        this.Model.set("editModel.composition", rows);
                        this.tableMapControlSetup(rows);
                    };
                    ProductMapBase.prototype.tableMapControlSetup = function (rows) {
                        this.destroyEditEvents();
                        this.tableMapControl.Rows = rows;
                        this.tableMapControl.Setup();
                        this.attachEditEvents();
                    };
                    ProductMapBase.prototype.attachEditEvents = function () {
                        this.EditCellClick = this.createTouchClickEvent($('.product-col-sum-auto-rigth'), this.editCellClick);
                    };
                    ProductMapBase.prototype.destroyEditEvents = function () {
                        this.destroyTouchClickEvent($('.product-col-sum-auto-rigth'), this.EditCellClick);
                    };
                    ProductMapBase.prototype.editCellClick = function (e) {
                        if (this.inpurNumber)
                            this.inpurNumber.remove();
                        else {
                            this.inpurNumber = $('<input class="edit-number">');
                            this.EditCellBlur = utils.createBlurEvent(this.inpurNumber, this.editCellBlur, this);
                        }
                        if (this.currentCell)
                            this.currentCell.removeClass('td-edit-number');
                        this.currentCell = $(e.currentTarget);
                        this.currentCell.empty().addClass('td-edit-number').append(this.inpurNumber);
                        this.inpurNumber.focus();
                        this.tableMapControl.SetSetelecDataRow(e.currentTarget);
                        var field = this.currentCell.data("field");
                        if (field && this.tableMapControl.SelectedDataRow) {
                            this.inpurNumber.val(this.tableMapControl.SelectedDataRow[field]);
                            console.log(this.tableMapControl.SelectedDataRow[field]);
                        }
                    };
                    ProductMapBase.prototype.editCellBlur = function (e) {
                        //if (this.inpurNumber)
                        //    this.inpurNumber.remove();
                        if (this.currentCell)
                            this.currentCell.removeClass('td-edit-number');
                        this.destroyEditEvents();
                        this.tableMapControl.UpdateRow();
                        this.attachEditEvents();
                    };
                    ProductMapBase.prototype.destroyCellEdit = function () {
                        if (this.inpurNumber) {
                            utils.destroyBlurEvent(this.inpurNumber, this.EditCellBlur);
                            this.inpurNumber = undefined;
                        }
                    };
                    ProductMapBase.prototype.addHeaderButtonClick = function (e) {
                        this.addRowButtonClick(e);
                    };
                    ProductMapBase.prototype.addRowButtonClick = function (e) {
                        var self = this;
                        var refNil = { id: 0, code: "", name: "" };
                        var editRow = { id: 0, index: -1, product: refNil, unit: refNil, netto: 0, percentcold: 0, brutto: 0, percentheat: 0, exitproduct: 0, description: "" };
                        //vars._app.OpenController({
                        //    urlController: 'setting/editor/productmaprow', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        //        let ctrlRow: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                        //        ctrlRow.Model.set("Header", vars._statres("label$edit$row"));
                        //        ctrlRow.Model.set("editModel", editRow);
                        //        ctrlRow.EditorSettings.Save = $.proxy(self.onAddRow, self);
                        //    }
                        //});
                        vars._app.OpenController({
                            urlController: 'setting/card/product', isModal: true, onLoadController: function (controller) {
                                var ctrlProduct = controller;
                                ctrlProduct.CardSettings.IsAdd = false;
                                ctrlProduct.CardSettings.IsAddCopy = false;
                                ctrlProduct.CardSettings.IsDelete = false;
                                ctrlProduct.CardSettings.IsEdit = false;
                                ctrlProduct.CardSettings.IsSelect = true;
                                //ctrlRow.Model.set("Header", vars._statres("label$edit$row"));
                                //ctrlRow.Model.set("editModel", editRow);
                                ctrlProduct.OnSelect = $.proxy(self.selectProductValue, self);
                            }
                        });
                    };
                    ProductMapBase.prototype.selectProductValue = function (controller) {
                        var self = this;
                        var valueProduct = controller.getSelectedRecord();
                        if (valueProduct) {
                            var editRow = { id: 0, index: -1, product: valueProduct, unit: valueProduct.unit, netto: 0, percentcold: 0, brutto: 0, percentheat: 0, exitproduct: 0, description: "" };
                            self.onAddRow(editRow, undefined);
                        }
                    };
                    ProductMapBase.prototype.onAddRow = function (model, callback) {
                        var addRow = model;
                        if (addRow) {
                            var rows = this.Model.get("editModel").composition;
                            if (this.compositionRow) {
                                addRow.index = this.compositionRow.index + 1;
                                rows.splice(addRow.index - 1, 0, addRow);
                            }
                            else {
                                addRow.index = 1;
                                rows.push(addRow);
                            }
                            this.recalcPercents(addRow);
                            this.setRowsTable(rows);
                        }
                        if (callback) {
                            callback(undefined);
                        }
                    };
                    ProductMapBase.prototype.editRowButtonClick = function (e) {
                        var self = this;
                        if (self.compositionRow) {
                            vars._app.OpenController({
                                urlController: 'setting/editor/productmaprow', isModal: true, onLoadController: function (controller) {
                                    var ctrlRow = controller;
                                    ctrlRow.Model.set("editModel", self.compositionRow);
                                    ctrlRow.EditorSettings.Save = $.proxy(self.onEditRow, self);
                                }
                            });
                        }
                        //this.tableMapControl.EditRow(this.compositionRow, this.rowControl);
                    };
                    ProductMapBase.prototype.onEditRow = function (model, callback) {
                        var editRow = model;
                        if (editRow && editRow.index) {
                            var rows = this.Model.get("editModel").composition;
                            this.recalcPercents(editRow);
                            rows[editRow.index - 1] = editRow;
                            this.setRowsTable(rows);
                        }
                        if (callback) {
                            callback(undefined);
                        }
                    };
                    ProductMapBase.prototype.recalcPercents = function (editRow) {
                        //editRow.percentcold = (editRow.brutto && editRow.netto && editRow.brutto > 0 && editRow.netto > 0 ? (100 * (editRow.brutto - editRow.netto) / editRow.brutto) : 0);
                        //editRow.percentheat = (editRow.netto && editRow.exitproduct && editRow.netto > 0 && editRow.exitproduct > 0 ? (100 * (editRow.netto - editRow.exitproduct) / editRow.netto) : 0);
                    };
                    ProductMapBase.prototype.delRowButtonClick = function (e) {
                        var rows = this.Model.get("editModel").composition;
                        if (this.compositionRow) {
                            rows.splice(this.compositionRow.index - 1, 1);
                            this.setRowsTable(rows);
                        }
                    };
                    ProductMapBase.prototype.addPhotoButtonClick = function (e) {
                        $("#editor-view-productmap-image-input").trigger("click");
                    };
                    ProductMapBase.prototype.uploudImageClick = function (e) {
                        this.UploadImage(this.imgDialog[0].files);
                    };
                    ProductMapBase.prototype.UploadImage = function (files) {
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
                    ProductMapBase.prototype.editApproverButtonClick = function (e) {
                        this.openEditSigners();
                    };
                    ProductMapBase.prototype.editSignButtonClick = function (e) {
                        this.openEditSigners();
                    };
                    ProductMapBase.prototype.openEditSigners = function () {
                        var _this = this;
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/editor/productmapapprovesign', isModal: true, onLoadController: function (controller) {
                                var ctrlRow = controller;
                                var editModel = { id: _this.EditorModel.id, approver: _this.EditorModel.approver, signer: _this.EditorModel.signer };
                                ctrlRow.Model.set("editModel", editModel);
                                ctrlRow.EditorSettings.Save = $.proxy(self.onEditSigners, self);
                            }
                        });
                    };
                    ProductMapBase.prototype.onEditSigners = function (model, callback) {
                        var editModel = model;
                        this.Model.set("editModel.approver", utils.isNullOrEmpty(editModel.approver) == true ? vars._statres("label$headenterprise") : editModel.approver);
                        this.Model.set("editModel.signer", utils.isNullOrEmpty(editModel.signer) == true ? vars._statres("label$chefcook") : editModel.signer);
                        if (callback) {
                            callback(undefined);
                        }
                    };
                    ProductMapBase.prototype.Print = function () {
                        this.View.find("#editor-view-productmap-print").printThis({
                            pageTitle: "PRINT DOCUMENT",
                            importCSS: true,
                            printContainer: true
                        });
                    };
                    return ProductMapBase;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.ProductMapBase = ProductMapBase;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=productmapbase.js.map