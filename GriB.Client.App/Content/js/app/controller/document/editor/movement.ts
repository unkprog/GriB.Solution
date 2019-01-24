import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/document/editor/editor');

export namespace Controller.Document.Editor {
    export class Movement extends edit.Controller.Document.Editor.Editor {
        constructor() {
            super();
            this.Model.set("labelStock", vars._statres("label$stock$from"));
        }

        public get Header(): string {
            return vars._statres("label$movement");
        }

        public get EditIdName(): string {
            return "id_movement";
        }

        protected get DocType(): number {
            return 50;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            this.showSalePointTo(true);
            return result;
        }

        protected validateStock(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;
            if ((model.options & 1) === 1) {
                if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                    M.toast({ html: vars._statres("msg$error$nowarehouse$fromspecified") });
                    result = false;
                }
                if (!model.salepointto || !model.salepointto.id || model.salepointto.id === 0) {
                    M.toast({ html: vars._statres("msg$error$nowarehouse$tospecified") });
                    result = false;
                }

                if (result === true && model.salepoint.id === model.salepointto.id) {
                    M.toast({ html: vars._statres("msg$error$warehousedifferentspecified") });
                    result = false;
                }
            }
            return result;
        }
        
    }
}

vars.registerController("document/editor/movement", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.Movement(); });