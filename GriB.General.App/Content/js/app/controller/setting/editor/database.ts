import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import ctrl = require('app/common/basecontrol');

export namespace Controller.Setting.Editor {
    export class Database extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/database.html", Id: "editor-view-database" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$database"),
                "editModel": {},
                "labelCatalog": vars._statres("label$catalog"),
                "labelLogin": vars._statres("label$login"),
                "labelPassword": vars._statres("label$password"),
            });
        }


        public get EditorModel(): Interfaces.Model.IDatabase {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_database", Load: $.proxy(this.Service.GetDatabase, this.Service), Save: $.proxy(this.Service.SetDatabase, this.Service) };
        }

        private serverControl: ctrl.Control.ReferenceFieldControl;
        private controlCatalog: JQuery;
        private controlLogin: JQuery;
        private controlPassword: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controller = this;

            controller.serverControl = new ctrl.Control.ReferenceFieldControl();
            controller.serverControl.InitControl(view.find("#editor-view-database-server-row"), "editor-view-database-server", "editModel.sqlsrv", "editModel.sqlsrv.address", vars._statres("label$server"), 'setting/card/server', controller.Model);

            controller.controlCatalog  = view.find('#editor-view-database-catalog');  controller.controlCatalog.characterCounter();
            controller.controlLogin    = view.find("#editor-view-database-user");     controller.controlLogin.characterCounter();
            controller.controlPassword = view.find("#editor-view-database-password"); controller.controlPassword.characterCounter();

            return super.ViewInit(view);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
        }

        public ViewShow(e: any): boolean {
            
            return super.ViewShow(e);
        }

        public createEvents(): void {
            super.createEvents();
            if (this.serverControl) this.serverControl.createEvents();
        }

        public destroyEvents(): void {
            if (this.serverControl) this.serverControl.destroyEvents();
            super.destroyEvents();
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IDatabase = this.EditorModel;

            if (utils.isNullOrEmpty(model.catalog)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (!utils.isNullOrEmpty(model.catalog) && model.catalog.length > 50) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$catalog"), 50) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.user) && model.user.length > 50) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$login"), 50) });
                result = false;
            }
            if (!utils.isNullOrEmpty(model.pass) && model.pass.length > 50) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$password"), 50) });
                result = false;
            }
            return result;
        }
    }
}

vars.registerController("setting/editor/database", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Database(); });