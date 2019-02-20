import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Client extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/client.html", Id: "editor-view-client" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "editModel": {},
                "labelClient": vars._statres("label$client"),
                "labelClientInformation": vars._statres("label$clientinformation"),
                "labelNo": vars._statres("label$no"),
                "labelYes": vars._statres("label$yes"),
                "labelSurname": vars._statres("label$surname"),
                "labelName": vars._statres("label$fname"),
                "labelPatronymic": vars._statres("label$patronymic"),
                "labelSex": vars._statres("label$sex"),
                "labelDateBirth": vars._statres("label$datebirth"),
                "labelPhone": vars._statres("label$phone"),
                "labelUnspecified": vars._statres("label$unspecified"),
                "labelMale": vars._statres("label$male"),
                "labelFemale": vars._statres("label$female"),

            });
        }

        public get EditorModel(): Interfaces.Model.IClientModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_client", Load: $.proxy(this.Service.GetClient, this.Service), Save: $.proxy(this.Service.SetClient, this.Service) };
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.setupControls();
        }


        private setupControls(): void {
            $('#client-open').formSelect();
            $('#client-sex-list').formSelect();
            $('#client-birth').datepicker();
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#client-surname").characterCounter();
            view.find("#client-name").characterCounter();
            view.find("#client-patronymic").characterCounter();
            let result = super.ViewInit(view);
            return result;
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IClientModel = this.EditorModel;

            if (!utils.isNullOrEmpty(model.fname) && model.fname.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$surname"), 60) });
                result = false;
            }
            if (!utils.isNullOrEmpty(model.mname) && model.mname.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$fname"), 60) });
                result = false;
            }
            if (!utils.isNullOrEmpty(model.lname) && model.lname.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$patronymic"), 60) });
                result = false;
            }

            //if (!utils.validatePhone(model.phone)) {
            //    M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
            //    result = false;
            //}

            return result;
        }
    }
}

vars.registerController("setting/editor/client", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Client(); });