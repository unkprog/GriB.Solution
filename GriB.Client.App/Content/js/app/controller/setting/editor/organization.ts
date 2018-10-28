import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Organization extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/organization.html", Id: "editor-view-organization" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$organization"),
                "editModel": {},
                "labelCompanyName": vars._statres("label$companyName"),
                "labelWebSite": vars._statres("label$website"),
                "labelEmail": vars._statres("label$email"),
                "labelPhone": vars._statres("label$phone"),
            });
        }

       
        public get EditorModel(): Interfaces.Model.ICompanyModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "id_currency", Load: undefined, Save: $.proxy(this.Service.SetOrganization, this.Service) };
        }

        protected loadData(): boolean {
            let controller = this;
            this.Service.GetOrganization((responseData) => {
                controller.Model.set("editModel", responseData.record);
                controller.afterLoad(responseData);
                controller.endLoad();
            });
            return false;
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICompanyModel = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidCompanyName") });
                result = false;
            }

            return result;
        }
    }
}