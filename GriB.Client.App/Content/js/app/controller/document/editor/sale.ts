import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/document/editor/editor');

export namespace Controller.Document.Editor {
    export class Sale extends edit.Controller.Document.Editor.Editor {
        constructor() {
            super();
            if (this.EditorSettings.ButtonSetings)
                this.EditorSettings.ButtonSetings.IsSave = false;
        }

        public get Header(): string {
            return vars._statres("label$sale");
        }

        public get EditIdName(): string {
            return "id_sale";
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetSale, this.Service), Save: $.proxy(this.Service.SetDocument, this.Service) };
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            view.find("#document-view-discount-row").removeClass("hide");
            return result;
        }

        //protected validate(): boolean {
        //    let result: boolean = super.validate();
        //    let model: Interfaces.Model.IDocumentModel = this.EditorModel;

        //    if ((model.option & 1) === 1) {
        //        if (!model.reason || !model.reason.id || model.reason.id === 0) {
        //            M.toast({ html: vars._statres("msg$error$noreasonspecified") });
        //            result = false;
        //        }

        //        if (utils.isNullOrEmpty(model.comment) === true) {
        //            M.toast({ html: vars._statres("msg$error$commentnotfilled") });
        //            result = false;
        //        }
        //    }

        //    return result;
        //}
    }
}

vars.registerController("document/editor/sale", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.Sale(); });