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
                "labelClients": vars._statres("label$clients"),
            });
        }

        protected createEvents(): void {
            this.OrganizationButtonClick = this.createTouchClickEvent("btn-organization", this.organizationButtonClick);
            this.SalePointButtonClick = this.createTouchClickEvent("btn-salepoint", this.salePointButtonClick);
            this.EmployeetButtonClick = this.createTouchClickEvent("btn-employee", this.employeetButtonClick);
            this.CurrencyButtonClick = this.createTouchClickEvent("btn-currency", this.currencyButtonClick);
            this.UnitButtonClick = this.createTouchClickEvent("btn-unit", this.unitButtonClick);
            this.CategoryButtonClick = this.createTouchClickEvent("btn-category", this.categoryButtonClick);
            this.ProductButtonClick = this.createTouchClickEvent("btn-product", this.productButtonClick);
            this.ClientButtonClick = this.createTouchClickEvent("btn-client", this.clientButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-organization", this.OrganizationButtonClick);
            this.destroyTouchClickEvent("btn-salepoint", this.SalePointButtonClick);
            this.destroyTouchClickEvent("btn-employee", this.EmployeetButtonClick);
            this.destroyTouchClickEvent("btn-currency", this.CurrencyButtonClick);
            this.destroyTouchClickEvent("btn-unit", this.UnitButtonClick);
            this.destroyTouchClickEvent("btn-category", this.CategoryButtonClick);
            this.destroyTouchClickEvent("btn-product", this.ProductButtonClick);
            this.destroyTouchClickEvent("btn-client", this.ClientButtonClick);
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

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e) {
            _main.OpenController({ urlController: "setting/card/client", backController: this });
        }
    }
}