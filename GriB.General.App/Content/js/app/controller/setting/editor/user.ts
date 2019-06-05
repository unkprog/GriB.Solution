import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import ctrl = require('app/common/basecontrol');

export namespace Controller.Setting.Editor {
    export class User extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/user.html", Id: "editor-view-user" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$database"),
                "editModel": {},
                "labelLogin": vars._statres("label$login"),
                "labelSurname": vars._statres("label$surname"),
                "labelName": vars._statres("label$fname"),
                "labelPatronymic": vars._statres("label$patronymic"),
                "labelSex": vars._statres("label$sex"),
                "labelUnspecified": vars._statres("label$unspecified"),
                "labelMale": vars._statres("label$male"),
                "labelFemale": vars._statres("label$female"),
            });
        }


        public get EditorModel(): Interfaces.Model.IUser {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_user", Load: $.proxy(this.Service.GetUser, this.Service), Save: $.proxy(this.Service.SetUser, this.Service) };
        }

        private databaseControl: ctrl.Control.ReferenceFieldControl;
        private controlSurmame: JQuery;
        private controlName: JQuery;
        private controlPatronymic: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controller = this;

            controller.databaseControl = new ctrl.Control.ReferenceFieldControl();
            controller.databaseControl.InitControl(view.find("#editor-view-user-database-row"), "editor-view-user-database", "editModel.db", "editModel.db.catalog", vars._statres("label$database"), 'setting/card/database', controller.Model);

            controller.controlSurmame    = view.find('#editor-view-user-surname');     controller.controlSurmame.characterCounter();
            controller.controlName       = view.find("#editor-view-user-name");        controller.controlName.characterCounter();
            controller.controlPatronymic = view.find("#editor-view-user-patronymic");  controller.controlPatronymic.characterCounter();

            return super.ViewInit(view);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
        }

        public ViewShow(e: any): boolean {
            $('#ditor-view-user-sex-list').formSelect();
            return super.ViewShow(e);
        }

        public createEvents(): void {
            super.createEvents();
            if (this.databaseControl) this.databaseControl.createEvents();
        }

        public destroyEvents(): void {
            if (this.databaseControl) this.databaseControl.destroyEvents();
            super.destroyEvents();
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IUser = this.EditorModel;

            if (!utils.isNullOrEmpty(model.person.fname) && model.person.fname.length > 62) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$surname"), 62) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.person.mname) && model.person.mname.length > 62) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$fname"), 62) });
                result = false;
            }
            if (!utils.isNullOrEmpty(model.person.lname) && model.person.lname.length > 62) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$patronymic"), 62) });
                result = false;
            }
            return result;
        }
    }
}

vars.registerController("setting/editor/user", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.User(); });