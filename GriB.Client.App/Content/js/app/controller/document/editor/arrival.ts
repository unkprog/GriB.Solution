import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/document/editor/editor');

export namespace Controller.Document.Editor {
    export class Arrival extends edit.Controller.Document.Editor.Editor {
        constructor() {
            super();
        }

        public get Header(): string {
            return vars._statres("label$arrival");
        }
      

        public get EditIdName(): string {
            return "id_arrival";
        }

        protected get DocType(): number {
            return 10;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            this.showContractor(true);
            return result;
        }

        protected validate(): boolean {
            let result: boolean = super.validate();
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;

            if ((model.options & 1) === 1) {
                if (!model.contractor || !model.contractor.id || model.contractor.id === 0) {
                    M.toast({ html: vars._statres("msg$error$nocontractorspecified") });
                    result = false;
                }
            }

            return result;
        }
    }
}

vars.registerController("document/editor/arrival", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.Arrival(); });