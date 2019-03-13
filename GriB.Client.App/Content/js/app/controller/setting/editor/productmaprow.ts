import vars = require('app/common/variables');
import utils = require('app/common/utils');
import ctrl = require('app/common/basecontrol');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class ProductMapRow extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }
        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/productmaprow.html", Id: "editor-view-productmaprow" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let model: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": vars._statres("label$namerawmaterial"),
                "editModel": {},
                "labelNetto": vars._statres("label$netto"),
                "labelBrutto": vars._statres("label$brutto"),
                "labelPercentCold": vars._statres("label$treatment$percentcold"),
                "labelExitProduct": vars._statres("label$exitcompletedproduct"),
                "labelPercentHeat": vars._statres("label$treatment$percentheat"),
                "labelDescription": vars._statres("label$description$technologicalprocess"),
            });
            return model;
        }

        public get EditorModel(): Interfaces.Model.IProductComposition {
            return this.Model.get("editModel").toJSON();
        }

        private productControl: ctrl.Control.ReferenceFieldControl;
        private unitControl: ctrl.Control.ReferenceFieldControl;

        public ViewInit(view: JQuery): boolean {
            let controller = this;

            this.productControl = new ctrl.Control.ReferenceFieldControl();
            this.productControl.InitControl(view.find("#editor-view-productmaprow-product-row"), "editor-view-productmaprow-product", "editModel.product", "editModel.product.name", vars._statres("label$namerawmaterial"), 'setting/card/product', this.Model);

            this.unitControl = new ctrl.Control.ReferenceFieldControl();
            this.unitControl.InitControl(view.find("#editor-view-productmaprow-unit-row"), "editor-view-productmaprow-unit", "editModel.unit", "editModel.unit.code", vars._statres("label$unit"), 'setting/card/unit', this.Model);

            return super.ViewInit(view);
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
        }
        
        protected createEvents(): void {
            super.createEvents();
            if (this.productControl) {
                this.productControl.createEvents();
                this.productControl.SelectValue = $.proxy(this.selectProductValue, this);
            }
            if (this.unitControl) this.unitControl.createEvents();

             this.Model.bind("change", $.proxy(this.changeModel, this));
        }

        protected destroyEvents(): void {
            this.Model.unbind("change");
            if (this.productControl) this.productControl.destroyEvents();
            if (this.unitControl) this.unitControl.destroyEvents();
            super.destroyEvents();
        }

        private selectProductValue(value: Interfaces.Model.IBaseModel) {
            let valueProduct: Interfaces.Model.IProduct = value as Interfaces.Model.IProduct;
            if (valueProduct) {
                this.Model.set("editModel.product", valueProduct);
                this.Model.set("editModel.unit", { id: valueProduct.unit.id, code: valueProduct.unit.code });
            }
        }


        private changeModel(e: any): void {
            if (e.field === "editModel.brutto" || e.field === "editModel.netto") {
                let editRow: Interfaces.Model.IProductComposition = this.EditorModel;
                editRow.percentcold = (editRow.brutto && editRow.netto && editRow.brutto > 0 && editRow.netto > 0 ? (100 * (editRow.brutto - editRow.netto) / editRow.brutto) : 0);
                this.Model.set("editModel", editRow);
            } else if (e.field === "editModel.netto" || e.field === "editModel.exitproduct") {
                let editRow: Interfaces.Model.IProductComposition = this.EditorModel;
                editRow.percentheat = (editRow.netto && editRow.exitproduct && editRow.netto > 0 && editRow.exitproduct > 0 ? (100 * (editRow.netto - editRow.exitproduct) / editRow.netto) : 0);
                this.Model.set("editModel", editRow);
            }
            else if (e.field === "editModel.percentcold") {
                let editRow: Interfaces.Model.IProductComposition = this.EditorModel;
                editRow.netto = (editRow.brutto && editRow.percentcold && editRow.brutto > 0 && editRow.percentcold > 0 ? (editRow.brutto * (100 - editRow.percentcold) / 100) : 0);
                this.Model.set("editModel", editRow);
            }
            else if (e.field === "editModel.percentheat") {
                let editRow: Interfaces.Model.IProductComposition = this.EditorModel;
                editRow.exitproduct = (editRow.netto && editRow.percentheat && editRow.netto > 0 && editRow.percentheat > 0 ? (editRow.netto * (100 - editRow.percentheat) / 100) : 0);
                this.Model.set("editModel", editRow);
            }
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IProductComposition = this.EditorModel;

            if (utils.isNullOrEmpty(model.description) === false && model.description.length > 232) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 232) });
                result = false;
            }

            if (!model.brutto && model.brutto <= 0) {
                M.toast({ html: vars._statres("msg$error$nobruttospecified") });
                result = false;
            }

            return result;
        }
    }
}

vars.registerController("setting/editor/productmaprow", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.ProductMapRow(); });