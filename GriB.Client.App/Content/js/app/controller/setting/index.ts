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
                "labelSettings": vars._statres("label$settings"),
                "labelOrganizationalStructure": vars._statres("label$organizationalstructure"),
                "labelOrganization": vars._statres("label$organization"),
                "labelSalesPoints": vars._statres("label$salesPoints"),
                "labelEmployees": vars._statres("label$employees"),
                "labelCurrenciesAndUnits": vars._statres("label$currenciesandunits"),
                "labelCurrencies": vars._statres("label$currencies"),
                "labelUnits": vars._statres("label$units"),
                "labelCategoriesProducts": vars._statres("label$categoriesproducts"),
                "labelCategories": vars._statres("label$categories"),
                "labelProducts": vars._statres("label$products"),
            });
        }

        protected createEvents(): void {
            this.OrganizationButtonClick = this.createClickEvent("btn-organization", this.organizationButtonClick);
            this.SalePointButtonClick = this.createClickEvent("btn-salepoint", this.salePointButtonClick);
            this.EmployeetButtonClick = this.createClickEvent("btn-employee", this.employeetButtonClick);
            this.CurrencyButtonClick = this.createClickEvent("btn-currency", this.currencyButtonClick);
            this.UnitButtonClick = this.createClickEvent("btn-unit", this.unitButtonClick);
            this.CategoryButtonClick = this.createClickEvent("btn-category", this.categoryButtonClick);
            this.ProductButtonClick = this.createClickEvent("btn-product", this.productButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-organization", this.OrganizationButtonClick);
            this.destroyClickEvent("btn-salepoint", this.SalePointButtonClick);
            this.destroyClickEvent("btn-employee", this.EmployeetButtonClick);
            this.destroyClickEvent("btn-currency", this.CurrencyButtonClick);
            this.destroyClickEvent("btn-unit", this.UnitButtonClick);
            this.destroyClickEvent("btn-category", this.CategoryButtonClick);
            this.destroyClickEvent("btn-product", this.ProductButtonClick);
        }

        public OrganizationButtonClick: { (e: any): void; };
        private organizationButtonClick(e) {
            _main.OpenController({ urlController: "setting/editor/organization", backController: this });
        }

        public SalePointButtonClick: { (e: any): void; };
        private salePointButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/salepoint", backController: this });
        }

        public EmployeetButtonClick: { (e: any): void; };
        private employeetButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/employee", backController: this });
        }

        public CurrencyButtonClick: { (e: any): void; };
        private currencyButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/currency", backController: this });
        }

        public UnitButtonClick: { (e: any): void; };
        private unitButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/unit", backController: this });
        }

        public CategoryButtonClick: { (e: any): void; };
        private categoryButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/category", backController: this });
        }

        public ProductButtonClick: { (e: any): void; };
        private productButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/product", backController: this });
        }
    }
}