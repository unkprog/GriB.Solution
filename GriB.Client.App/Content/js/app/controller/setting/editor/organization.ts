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
        private editModel: Interfaces.Model.IOrganizationModel;

        protected loadData(afterLoad: () => void): boolean {
            let controller = this;
            this.settingService.GetOrganization((responseData) => {
                controller.editModel = responseData;
                controller.Model.set("editModel", controller.editModel);
                if (afterLoad)
                    afterLoad();
            });
            return false;
        }

        public Save(data: Interfaces.Model.IOrganizationModel, afterSave: () => void): void {
            let controller = this;
            this.settingService.GetOrganization((responseData) => {
                controller.editModel = responseData;
                if (afterSave)
                    afterSave();
            });
        }

        protected getDataToSave(): Interfaces.Model.IOrganizationModel {
            let result: Interfaces.Model.IOrganizationModel = this.editModel;

            return result;
        }

        protected validate(data: Interfaces.Model.IOrganizationModel): boolean {
            let result: boolean = true;


            return result;
        }
    }
}