import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import { _main } from 'app/common/variables';

export namespace Controller.Setting {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/index.html", Id: "setting-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "POS Cloud",
                "labelOrganization": vars._statres("label$organization"),
                "labelSalesPoints": vars._statres("label$salesPoints"),
                "labelEmployees": vars._statres("label$employees"),
                "labelCurrencies": vars._statres("label$currencies"),
                "labelUnits": vars._statres("label$units"),
            });
        }

        protected createEvents(): void {
            this.OrganizationButtonClick = this.createClickEvent("btn-organization", this.organizationButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-organization", this.OrganizationButtonClick);
        }

        public OrganizationButtonClick: { (e: any): void; };
        private organizationButtonClick(e) {
            _main.OpenController("setting/editor/organization", this);
        }
    }
}