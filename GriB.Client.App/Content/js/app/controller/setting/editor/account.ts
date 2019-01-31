import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Account extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/account.html", Id: "editor-view-account" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$account"),
                "editModel": {},
                "labelName": vars._statres("label$name"),
                "labelNumber": vars._statres("label$number"),
            });
        }


        public get EditorModel(): Interfaces.Model.IAccount {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "id_account", Load: $.proxy(this.Service.GetAccount, this.Service), Save: $.proxy(this.Service.SetAccount, this.Service) };
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#editor-view-account-name").characterCounter();
            view.find("#editor-view-account-number").characterCounter();
            return super.ViewInit(view);
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IAccount = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 60) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.number) && model.number.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("msg$error$invalidnumber"), 20) });
                result = false;
            }


            return result;
        }
    }
}

vars.registerController("setting/editor/account", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Account(); });