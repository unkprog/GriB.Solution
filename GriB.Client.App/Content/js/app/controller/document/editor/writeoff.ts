import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/document/editor/editor');

export namespace Controller.Document.Editor {
    export class WriteOff extends edit.Controller.Document.Editor.Editor {
        constructor() {
            super();
        }

        public get Header(): string {
            return vars._statres("label$writeoff");
        }

        public get EditIdName(): string {
            return "id_writeoff";
        }

        protected get DocType(): number {
            return 40;
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            this.showReason(true);
            return result;
        }

        protected validate(): boolean {
            let result: boolean = super.validate();
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;

            if ((model.option & 1) === 1) {
                if (!model.reason || !model.reason.id || model.reason.id === 0) {
                    M.toast({ html: vars._statres("msg$error$noreasonspecified") });
                    result = false;
                }

                if (utils.isNullOrEmpty(model.comment) === true) {
                    M.toast({ html: vars._statres("msg$error$commentnotfilled") });
                    result = false;
                }
            }

            return result;
        }
    }
}

vars.registerController("document/editor/writeoff", function (module: any): Interfaces.IController { return new module.Controller.Document.Editor.WriteOff(); });