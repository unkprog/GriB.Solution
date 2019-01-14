import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Contractor extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/contractor.html", Id: "editor-view-contractor" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$contractor"),
                "editModel": {},
                "labelName": vars._statres("label$name"),
            });
        }


        public get EditorModel(): Interfaces.Model.IContractor {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "id_contractor", Load: $.proxy(this.Service.GetContractor, this.Service), Save: $.proxy(this.Service.SetContractor, this.Service) };
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#editor-view-contractor-name").characterCounter();
            return super.ViewInit(view);
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IContractor = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (!utils.isNullOrEmpty(model.name) && model.name.length > 112) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 112) });
                result = false;
            }

            return result;
        }
    }
}

vars.registerController("setting/editor/contractor", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Contractor(); });