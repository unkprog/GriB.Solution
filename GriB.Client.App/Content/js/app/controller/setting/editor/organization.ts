import vars = require('app/common/variables');
import utils = require('app/common/utils');
import ctrl = require('app/common/basecontrol');
import edit = require('app/controller/setting/editor/editor');

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
                "labelSettings": vars._statres("label$settings"),
                "labelDefaultUnit": vars._statres("label$defaultcurrency"),
            });
        }
       
        public get EditorModel(): Interfaces.Model.ICompany {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_currency", Load: undefined, Save: $.proxy(this.Service.SetOrganization, this.Service) };
        }

        private defCurrencyControl: ctrl.Control.ReferenceFieldControl;

        public ViewInit(view: JQuery): boolean {
            let controller = this;

            controller.defCurrencyControl = new ctrl.Control.ReferenceFieldControl();
            controller.defCurrencyControl.InitControl(view.find("#editor-view-organization-currency-row"), "editor-view-organization-currency", "editModel.defcurrency", "editModel.defcurrency.name", vars._statres("label$defaultcurrency"), 'setting/card/currency', controller.Model);

            view.find("#editor-view-organization-name").characterCounter();
            view.find("#editor-view-organization-website").characterCounter();
            view.find("#editor-view-organization-email").characterCounter();
            view.find("#editor-view-organization-phone").characterCounter();
            return super.ViewInit(view);
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

        public createEvents(): void {
            super.createEvents();
            if (this.defCurrencyControl) this.defCurrencyControl.createEvents();
        }

        public destroyEvents(): void {
            if (this.defCurrencyControl) this.defCurrencyControl.destroyEvents();
            super.destroyEvents();
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICompany = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidCompanyName") });
                result = false;
            } else if (model.name.length > 238) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$companyName"), 238) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.site) && model.site.length > 54) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$website"), 54) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.email) && model.email.length > 54) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$email"), 54) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.phone) && model.phone.length > 18) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$phone"), 18) });
                result = false;
            }
            return result;
        }
    }
}

vars.registerController("setting/editor/organization", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Organization(); });