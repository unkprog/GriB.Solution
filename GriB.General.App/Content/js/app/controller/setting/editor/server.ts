import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import ctrl = require('app/common/basecontrol');

export namespace Controller.Setting.Editor {
    export class Server extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/server.html", Id: "editor-view-server" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$server"),
                "editModel": {},
                "labelAddress": vars._statres("label$address"),
                "LabelLogin": vars._statres("label$login"),
                "labelPassword": vars._statres("label$password"),
            });
        }


        public get EditorModel(): Interfaces.Model.IServer {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_server", Load: $.proxy(this.Service.GetServer, this.Service), Save: $.proxy(this.Service.SetServer, this.Service) };
        }

        private controlAddress: JQuery;
        private controlLogin: JQuery;
        private controlPassword: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controller = this;
           
            controller.controlAddress  = view.find('#editor-view-server-address');  controller.controlAddress.characterCounter();
            controller.controlLogin    = view.find("#editor-view-server-user");     controller.controlLogin.characterCounter();
            controller.controlPassword = view.find("#editor-view-server-password"); controller.controlPassword.characterCounter();

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
        }

        public destroyEvents(): void {
            super.destroyEvents();
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IServer = this.EditorModel;

            if (utils.isNullOrEmpty(model.address)) {
                M.toast({ html: vars._statres("msg$error$invalidname") });
                result = false;
            } else if (!utils.isNullOrEmpty(model.address) && model.address.length > 50) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$address"), 50) });
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

vars.registerController("setting/editor/server", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Server(); });