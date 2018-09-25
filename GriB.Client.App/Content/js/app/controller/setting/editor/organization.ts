import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Organization extends base.Controller.BaseEditor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/organization.html", Id: "editor-view-organization" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
            });
        }

        private dataOrg: Interfaces.Model.IOrganizationModel;

        protected loadData(afterLoad: () => void): boolean {
            if (afterLoad)
                afterLoad();
            return true;
        }

        public Save(data: Interfaces.Model.IOrganizationModel,  afterSave: () => void): void {
            super.Save(data, afterSave);
        }

        protected getDataToSave(): Interfaces.Model.IOrganizationModel {
            let result: Interfaces.Model.IOrganizationModel = null;

            return result;
        }

        protected validate(data: Interfaces.Model.IOrganizationModel): boolean {
            let result: boolean = true;


            return result;
        }
    }
}