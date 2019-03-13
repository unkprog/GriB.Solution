import vars = require('app/common/variables');
import utils = require('app/common/utils');
import ctrl = require('app/common/basecontrol');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class ProductMapBase extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }
        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/productmap.html", Id: "editor-view-productmap" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let model: kendo.data.ObservableObject = new kendo.data.ObservableObject({
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
        }

        public get EditorModel(): Interfaces.Model.IProduct {
            return this.Model.get("editModel").toJSON();
        }

        private imgDialog: any;
        private controlPhoto: JQuery;
        private tableMapControl: ctrl.Control.BaseEditTable;
        private menuHRowsControl: JQuery;
        private menuRowsControl: JQuery;
        private addRowControl: JQuery;
        private addRowHControl: JQuery;
        private editRowControl: JQuery;
        private delRowControl: JQuery;
        private editApproveControl: JQuery;
        private editSignControl: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controller = this;

            controller.imgDialog = view.find("#editor-view-productmap-image-input");
            controller.controlPhoto = view.find("#editor-view-productmap-photo");

            controller.OnContextMenu = $.proxy(controller.onContextMenu, controller);
            controller.OnHeaderContextMenu = $.proxy(controller.onHeaderContextMenu, controller);

            controller.tableMapControl = new ctrl.Control.BaseEditTable();
            controller.tableMapControl.IsScroll = false;
            controller.tableMapControl.OnContextMenu = controller.OnContextMenu;
            controller.tableMapControl.OnHeaderContextMenu = controller.OnHeaderContextMenu;
            view.find("#editor-view-productmap-table-container").append(controller.tableMapControl.InitView());

            controller.addRowControl = view.find("#editor-view-productmap-menu-add");        
            controller.addRowHControl = view.find("#editor-view-productmap-menuh-add");     
            controller.editRowControl = view.find("#editor-view-productmap-menu-edit");        
            controller.delRowControl = view.find("#editor-view-productmap-menu-del");        

            controller.editApproveControl = view.find("#editor-view-productmap-approve");
            controller.editSignControl = view.find("#editor-view-productmap-sign");

            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        public ViewHide(e) {
            super.ViewHide(e);
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            if (this.EditorModel.photo)
                this.controlPhoto.css("backgroundImage", "url(" + this.EditorModel.photo + ")");

            if (utils.isNullOrEmpty(this.EditorModel.approver) == true)
                this.Model.set("editModel.approver", vars._statres("label$headenterprise"));
            if (utils.isNullOrEmpty(this.EditorModel.signer) == true)
                this.Model.set("editModel.signer", vars._statres("label$chefcook") );

            this.setupTableComposition();
        }

        private setupTableComposition() {
            let rows: Array<any> = this.Model.get("editModel").composition;
            for (let i = 0, icount = (rows ? rows.length : 0); i < icount; i++) {
                rows[i].numorder = i + 1;
            }
            this.tableMapControl.Rows = rows;
            this.tableMapControl.Columns = [
                { Header: vars._statres("label$numorder"), HeaderStyle: "product-map-col-order", Field: "index", FieldTemplate: '#=(index)#', FieldStyle: "product-map-col-order" },
                { Header: vars._statres("label$namerawmaterial"), HeaderStyle: "product-map-col-rawmaterial border-left center-align", Field: "product.name", FieldStyle: "product-map-col-rawmaterial border-left" },
                { Header: vars._statres("label$unitshort"), HeaderStyle: "product-map-col-unit border-left", Field: "unit.code", FieldStyle: "product-map-col-unit border-left" },
                { Header: vars._statres("label$brutto"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", Field: "brutto", FieldTemplate: '#=brutto#', FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:brutto" />' },
                { Header: vars._statres("label$treatment$percentcold"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", FieldTemplate: '#=numberToString(percentcold, 2)#', Field: "percentcold", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:percentcold" />'},
                { Header: vars._statres("label$netto"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", Field: "netto", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:netto" />'},
                { Header: vars._statres("label$treatment$percentheat"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", FieldTemplate: '#=numberToString(percentheat, 2)#', Field: "percentheat", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:percentheat" />'},
                { Header: vars._statres("label$exitcompletedproduct"), HeaderStyle: "product-col-sum-auto border-left product-map-col-value", Field: "exitproduct", FieldStyle: "product-col-sum-auto-rigth border-left product-map-col-value", FieldEditTemplate: '<input data-bind="value:exitproduct" />' },
                { Header: vars._statres("label$description$technologicalprocess"), HeaderStyle: "product-map-col-description border-left center-align", Field: "description", FieldStyle: "product-map-col-description border-left", FieldEditTemplate: '<input data-bind="value:description" />'},
            ];
            this.tableMapControl.Setup();
        }

        protected createEvents(): void {
            super.createEvents();

            let onUpolad = $.proxy(this.uploudImageClick, this);
            this.imgDialog.bind("change", onUpolad);

            this.AddRowButtonClick = this.createTouchClickEvent(this.addRowControl, this.addRowButtonClick);
            this.AddRowButtonClick = this.createTouchClickEvent(this.addRowHControl, this.addRowButtonClick);
            this.EditRowButtonClick = this.createTouchClickEvent(this.editRowControl, this.editRowButtonClick);
            this.DelRowButtonClick = this.createTouchClickEvent(this.delRowControl, this.delRowButtonClick);

            this.AddPhotoButtonClick = this.createTouchClickEvent("editor-view-productmap-addphoto", this.addPhotoButtonClick);

            this.EditApproverButtonClick = this.createTouchClickEvent(this.editApproveControl, this.editApproverButtonClick);
            this.EditSignButtonClick = this.createTouchClickEvent(this.editSignControl, this.editSignButtonClick);

            //this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        protected destroyEvents(): void {
            //this.compositionRows.unbind();
            //this.rightRows.unbind();
            //this.Model.unbind("change");
            this.destroyTouchClickEvent(this.addRowControl, this.AddRowButtonClick);
            this.destroyTouchClickEvent(this.editRowControl, this.EditRowButtonClick);
            this.destroyTouchClickEvent(this.delRowControl, this.DelRowButtonClick);

            this.destroyTouchClickEvent("editor-view-productmap-addphoto", this.AddPhotoButtonClick);

            this.destroyTouchClickEvent(this.editApproveControl, this.EditApproverButtonClick);
            this.destroyTouchClickEvent(this.editSignControl, this.EditSignButtonClick);

            this.imgDialog.unbind();
            super.destroyEvents();

        }

        private compositionRow: Interfaces.Model.IProductComposition;
        private rowControl: JQuery;

        public OnHeaderContextMenu: { (e: any) };
        public onHeaderContextMenu(e: any) {
            this.compositionRow = (undefined as Interfaces.Model.IProductComposition);
            if (!this.menuHRowsControl) {
                this.menuHRowsControl = this.View.find("#editor-view-productmap-menuh-trigger");
                this.menuHRowsControl.dropdown();
            }
            let instance: any = this.menuHRowsControl[0];
            instance.M_Dropdown.el = e.currentTarget;
            instance.M_Dropdown.open();
        }

        public OnContextMenu: { (e: any, row: Interfaces.Model.ITableRowModel) };
        public onContextMenu(e: any, row: Interfaces.Model.ITableRowModel) {
            this.compositionRow = (row as Interfaces.Model.IProductComposition);
            this.rowControl = $(e.currentTarget);
            if (!this.menuRowsControl) {
                this.menuRowsControl = this.View.find("#editor-view-productmap-menu-trigger");
                this.menuRowsControl.dropdown();
            }
            let instance: any = this.menuRowsControl[0];
            instance.M_Dropdown.el = e.currentTarget;
            instance.M_Dropdown.open();
        }

        private setRowsTable(rows: Interfaces.Model.IProductComposition[]) {
            this.Model.set("editModel.composition", rows);
            this.tableMapControl.Rows = rows;
            this.tableMapControl.Setup();
        }

        public AddRowButtonClick: { (e: any): void; };
        private addRowButtonClick(e) {
            let self = this;
            let refNil: any = { id: 0, code: "", name: "" };
            let editRow: Interfaces.Model.IProductComposition = { id: 0, index: -1, product: refNil, unit: refNil, netto: 0, percentcold: 0, brutto: 0, percentheat: 0, exitproduct: 0, description: "" };
            vars._app.OpenController({
                urlController: 'setting/editor/productmaprow', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlRow: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                    ctrlRow.Model.set("Header", vars._statres("label$edit$row"));
                    ctrlRow.Model.set("editModel", editRow);
                    ctrlRow.EditorSettings.Save = $.proxy(self.onAddRow, self);
                }
            });

        }
        private onAddRow(model: Interfaces.Model.IEditorModel, callback: (responseData: any) => void) {
            let addRow: Interfaces.Model.IProductComposition = (model as Interfaces.Model.IProductComposition);
            if (addRow) {
                let rows: Interfaces.Model.IProductComposition[] = this.Model.get("editModel").composition;
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
        }

        public EditRowButtonClick: { (e: any): void; };
        private editRowButtonClick(e) {
            let self = this;
            if (self.compositionRow) {
                vars._app.OpenController({
                    urlController: 'setting/editor/productmaprow', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlRow: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                        ctrlRow.Model.set("editModel", self.compositionRow);
                        ctrlRow.EditorSettings.Save = $.proxy(self.onEditRow, self);
                    }
                });
            }
            //this.tableMapControl.EditRow(this.compositionRow, this.rowControl);
        }

        private onEditRow(model: Interfaces.Model.IEditorModel, callback: (responseData: any) => void) {
            let editRow: Interfaces.Model.IProductComposition = (model as Interfaces.Model.IProductComposition);
            if (editRow && editRow.index) {
                let rows: Interfaces.Model.IProductComposition[] = this.Model.get("editModel").composition;
                this.recalcPercents(editRow);
                rows[editRow.index-1] = editRow;
                this.setRowsTable(rows);
            }
            if (callback) {
                callback(undefined);
            }
        }

        private recalcPercents(editRow: Interfaces.Model.IProductComposition) {
            //editRow.percentcold = (editRow.brutto && editRow.netto && editRow.brutto > 0 && editRow.netto > 0 ? (100 * (editRow.brutto - editRow.netto) / editRow.brutto) : 0);
            //editRow.percentheat = (editRow.netto && editRow.exitproduct && editRow.netto > 0 && editRow.exitproduct > 0 ? (100 * (editRow.netto - editRow.exitproduct) / editRow.netto) : 0);
        }
        public DelRowButtonClick: { (e: any): void; };
        private delRowButtonClick(e) {
            let rows: Interfaces.Model.IProductComposition[] = this.Model.get("editModel").composition;
            if (this.compositionRow) {
                rows.splice(this.compositionRow.index-1, 1);
                this.setRowsTable(rows);
            }
        }

        public AddPhotoButtonClick: { (e: any): void; };
        private addPhotoButtonClick(e) {
            $("#editor-view-productmap-image-input").trigger("click");
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

        public EditApproverButtonClick: { (e: any): void; };
        private editApproverButtonClick(e) {
            this.openEditSigners();
        }


        public EditSignButtonClick: { (e: any): void; };
        private editSignButtonClick(e) {
            this.openEditSigners();
        }

        private openEditSigners() {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/editor/productmapapprovesign', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlRow: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                    let editModel: Interfaces.Model.IApprovers = { id: this.EditorModel.id, approver: this.EditorModel.approver, signer: this.EditorModel.signer };
                    ctrlRow.Model.set("editModel", editModel);
                    ctrlRow.EditorSettings.Save = $.proxy(self.onEditSigners, self);
                }
            });
        }

        private onEditSigners(model: Interfaces.Model.IEditorModel, callback: (responseData: any) => void) {
            let editModel: Interfaces.Model.IApprovers = (model as Interfaces.Model.IApprovers);

            this.Model.set("editModel.approver", utils.isNullOrEmpty(editModel.approver) == true ? vars._statres("label$headenterprise") : editModel.approver);
            this.Model.set("editModel.signer", utils.isNullOrEmpty(editModel.signer) == true ? vars._statres("label$chefcook") : editModel.signer);

            if (callback) {
                callback(undefined);
            }
        }
    }
}

