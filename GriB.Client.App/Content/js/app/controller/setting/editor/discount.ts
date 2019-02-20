import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Discount extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/discount.html", Id: "editor-view-discount" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "editModel": {},
                "labelDiscountInformation": vars._statres("label$discountinformation"),
                "labelName": vars._statres("label$name"),
                "labelValuePercent": vars._statres("label$valuepercent")
            });
        }

        public get EditorModel(): Interfaces.Model.IDiscountModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_discount", Load: $.proxy(this.Service.GetDiscount, this.Service), Save: $.proxy(this.Service.SetDiscount, this.Service) };
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#discount-name").characterCounter();
            let result = super.ViewInit(view);
            return result;
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IDiscountModel = this.EditorModel;

            if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                result = false;
            }
            if (model.value <0 || model.value > 100) {
                M.toast({ html: vars._statres("msg$error$discountrange") });
                result = false;
            }
            return result;
        }
    }
}

vars.registerController("setting/editor/discount", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Discount(); });