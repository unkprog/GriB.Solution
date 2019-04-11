import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class PrintServer extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/printserver.html", Id: "editor-view-printserver" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$reason"),
                "editModel": {},
                "labelName": vars._statres("label$name"),
                "labelKey": vars._statres("label$printserverkey"),
                "labelDescription": vars._statres("label$description"),
            });
        }


        public get EditorModel(): Interfaces.Model.IPrintServer {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_printserver", Load: $.proxy(this.Service.GetPrintServer, this.Service), Save: $.proxy(this.Service.SetPrintServer, this.Service) };
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#editor-view-printserver-name").characterCounter();
            view.find("#editor-view-printserver-description").characterCounter();
            return super.ViewInit(view);
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IPrintServer = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.description) && model.description.length > 250) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$description"), 250) });
                result = false;
            }
            return result;
        }
    }
}

vars.registerController("setting/editor/printserver", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.PrintServer(); });