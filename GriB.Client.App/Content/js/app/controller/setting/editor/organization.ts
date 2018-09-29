/// <reference path="../../../services/settingsservice.ts" />
import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import svc = require('app/services/settingsservice');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Organization extends base.Controller.BaseEditor {
        constructor() {
            super();
            this.settingService = new svc.Services.SettingsService();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/organization.html", Id: "editor-view-organization" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$organization"),
                "editModel": {}
            });
        }

        private settingService: svc.Services.SettingsService;
        public get EditorModel(): Interfaces.Model.IOrganizationModel {
            return this.Model.get("editModel");
        }

        protected loadData(): boolean {
            let controller = this;
            this.settingService.GetOrganization((responseData) => {
                controller.Model.set("editModel", responseData);
                controller.afterLoad();
            });
            return false;
        }

        public Save(): void {
            let controller = this;
            this.settingService.SetOrganization(controller.EditorModel, (responseData) => {
                controller.afterSave();
            });
        }

        protected validate(): boolean {
            let result: boolean = true;
            let errMessage: string = '';
            let model: Interfaces.Model.IOrganizationModel = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidCompanyName") });
                //errMessage += vars._statres("msg$error$invalidCompanyName") + '<br/>';
                result = false;
            }

            //result = utils.isNullOrEmpty(errMessage);

            //if (!result)
            //    _app.ShowError(errMessage);

            return result;
        }
    }
}