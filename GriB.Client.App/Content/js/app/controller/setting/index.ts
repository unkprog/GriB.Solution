import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

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
                "labelDiscounts": vars._statres("label$discounts"),
                "labelReasons": vars._statres("label$reasons"),
                "labelClients": vars._statres("label$clients"),
                "labelContractors": vars._statres("label$contractors"),
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
            this.DiscountButtonClick = this.createTouchClickEvent("btn-discount", this.discountButtonClick);
            this.ReasonButtonClick = this.createTouchClickEvent("btn-reason", this.reasonButtonClick);
            this.ClientButtonClick = this.createTouchClickEvent("btn-client", this.clientButtonClick);
            this.ContractorButtonClick = this.createTouchClickEvent("btn-contractor", this.contractorButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-organization", this.OrganizationButtonClick);
            this.destroyTouchClickEvent("btn-salepoint", this.SalePointButtonClick);
            this.destroyTouchClickEvent("btn-employee", this.EmployeetButtonClick);
            this.destroyTouchClickEvent("btn-currency", this.CurrencyButtonClick);
            this.destroyTouchClickEvent("btn-unit", this.UnitButtonClick);
            this.destroyTouchClickEvent("btn-category", this.CategoryButtonClick);
            this.destroyTouchClickEvent("btn-product", this.ProductButtonClick);
            this.destroyTouchClickEvent("btn-discount", this.DiscountButtonClick);
            this.destroyTouchClickEvent("btn-reason", this.ReasonButtonClick);
            this.destroyTouchClickEvent("btn-client", this.ClientButtonClick);
            this.destroyTouchClickEvent("btn-contractor", this.ContractorButtonClick);
        }

        public OrganizationButtonClick: { (e: any): void; };
        private organizationButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/editor/organization", backController: this });
        }

        public SalePointButtonClick: { (e: any): void; };
        private salePointButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/salepoint", backController: this });
        }

        public EmployeetButtonClick: { (e: any): void; };
        private employeetButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/employee", backController: this });
        }

        public CurrencyButtonClick: { (e: any): void; };
        private currencyButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/currency", backController: this });
        }

        public UnitButtonClick: { (e: any): void; };
        private unitButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/unit", backController: this });
        }

        public CategoryButtonClick: { (e: any): void; };
        private categoryButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/category", backController: this });
        }

        public ProductButtonClick: { (e: any): void; };
        private productButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/product", backController: this });
        }

        public DiscountButtonClick: { (e: any): void; };
        private discountButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/discount", backController: this });
        }

        public ReasonButtonClick: { (e: any): void; };
        private reasonButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/reason", backController: this });
        }

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/client", backController: this });
        }

        public ContractorButtonClick: { (e: any): void; };
        private contractorButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/contractor", backController: this });
        }
    }
}

vars.registerController("setting/index", function (module: any): Interfaces.IController { return new module.Controller.Setting.Index(); });