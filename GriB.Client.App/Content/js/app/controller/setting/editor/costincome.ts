import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class CostIncome extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/costincome.html", Id: "editor-view-costincome" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$articlecostincome"),
                "editModel": {},
                "labelName": vars._statres("label$name"),
                "labelArticleType": vars._statres("label$articletype"),
                "labelIncome": vars._statres("label$income"),
                "labelCost": vars._statres("label$cost"),
            });
        }


        public get EditorModel(): Interfaces.Model.ICostIncome {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_costincome", Load: $.proxy(this.Service.GetCostIncome, this.Service), Save: $.proxy(this.Service.SetCostIncome, this.Service) };
        }

        private typeControl: JQuery;
        public ViewInit(view: JQuery): boolean {
            view.find("#editor-view-costincome-name").characterCounter();
            this.typeControl = view.find("#editor-view-costincome-type");
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            this.typeControl.formSelect();
            return super.ViewShow(e);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            this.typeControl.formSelect();
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICostIncome = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                result = false;
            }

            if (model.type < 1) {
                M.toast({ html: vars._statres("msg$error$invalidarticlecostincome") });
                result = false;
            }


            return result;
        }
    }
}

vars.registerController("setting/editor/costincome", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.CostIncome(); });