import vars = require('app/common/variables');
import utils = require('app/common/utils');
import ctrl = require('app/common/basecontrol');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class ProductMapApproveSign extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }
        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/productmapapprovesign.html", Id: "editor-view-productmapapprovesign" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let model: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": vars._statres("label$approvers"),
                "editModel": {},
                "labelApprover": vars._statres("label$document$approver"),
                "labelSigner": vars._statres("label$document$signer"),
            });
            return model;
        }

        public get EditorModel(): Interfaces.Model.IApprovers {
            return this.Model.get("editModel").toJSON();
        }

        public ViewInit(view: JQuery): boolean {
            let controller = this;


            return super.ViewInit(view);
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
        }
        
        protected createEvents(): void {
            super.createEvents();
        }

        protected destroyEvents(): void {
            super.destroyEvents();
        }

        protected validate(): boolean {
            let result: boolean = true;
            //let model: Interfaces.Model.IProductComposition = this.EditorModel;

            //if (utils.isNullOrEmpty(model.description) === false && model.description.length > 232) {
            //    M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 232) });
            //    result = false;
            //}

            //if (!model.brutto && model.brutto <= 0) {
            //    M.toast({ html: vars._statres("msg$error$nobruttospecified") });
            //    result = false;
            //}

            return result;
        }
    }
}

vars.registerController("setting/editor/productmapapprovesign", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.ProductMapApproveSign(); });