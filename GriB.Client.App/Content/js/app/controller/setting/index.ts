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
            this.SalePointButtonClick = this.createClickEvent("btn-salepoint", this.salePointButtonClick);
            this.EmployeetButtonClick = this.createClickEvent("btn-employee", this.employeetButtonClick);
            this.CurrencyButtonClick = this.createClickEvent("btn-currency", this.currencyButtonClick);
            this.UnitButtonClick = this.createClickEvent("btn-unit", this.unitButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-organization", this.OrganizationButtonClick);
            this.destroyClickEvent("btn-salepoint", this.SalePointButtonClick);
            this.destroyClickEvent("btn-employee", this.EmployeetButtonClick);
            this.destroyClickEvent("btn-currency", this.CurrencyButtonClick);
            this.destroyClickEvent("btn-unit", this.UnitButtonClick);
        }

        public OrganizationButtonClick: { (e: any): void; };
        private organizationButtonClick(e) {
            _main.OpenController("setting/editor/organization", this);
        }

        public SalePointButtonClick: { (e: any): void; };
        private salePointButtonClick(e) {
            _main.OpenController("setting/card/salepoint", this);
        }

        public EmployeetButtonClick: { (e: any): void; };
        private employeetButtonClick(e) {
            _main.OpenController("setting/card/employee", this);
        }

        public CurrencyButtonClick: { (e: any): void; };
        private currencyButtonClick(e) {
            _main.OpenController("setting/card/currency", this);
        }

        public UnitButtonClick: { (e: any): void; };
        private unitButtonClick(e) {
            _main.OpenController("setting/card/unit", this);
        }
    }
}