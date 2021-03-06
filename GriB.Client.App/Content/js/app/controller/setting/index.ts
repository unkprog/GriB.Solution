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
                "labelAccounts": vars._statres("label$accounts"),
                "labelCostImcomes": vars._statres("label$articlescostincome"),
                "labelCurrenciesAndUnits": vars._statres("label$currenciesandunits"),
                "labelCurrencies": vars._statres("label$currencies"),
                "labelUnits": vars._statres("label$units"),
                "labelCategoriesProducts": vars._statres("label$categoriesproducts"),
                "labelCategories": vars._statres("label$categories"),
                "labelProducts": vars._statres("label$productsgoods"),
                "labelProductMaps": vars._statres("label$productmaps"),
                "labelDiscounts": vars._statres("label$discounts"),
                "labelReasons": vars._statres("label$reasons"),
                "labelClients": vars._statres("label$clients"),
                "labelContractors": vars._statres("label$contractors"),
                "labelPrint": vars._statres("label$print"),
                "labelPrintServers": vars._statres("label$printservers"),
                "labelPrinters": vars._statres("label$printers"),
            });
        }

        protected createEvents(): void {
            this.OrganizationButtonClick = this.createClickEvent("btn-organization", this.organizationButtonClick);
            this.SalePointButtonClick = this.createClickEvent("btn-salepoint", this.salePointButtonClick);
            this.EmployeetButtonClick = this.createClickEvent("btn-employee", this.employeetButtonClick);
            this.AccountButtonClick = this.createClickEvent("btn-account", this.accountButtonClick);
            this.CostIncomeButtonClick = this.createClickEvent("btn-costincome", this.costIncomeButtonClick);
            this.CurrencyButtonClick = this.createClickEvent("btn-currency", this.currencyButtonClick);
            this.UnitButtonClick = this.createClickEvent("btn-unit", this.unitButtonClick);
            this.CategoryButtonClick = this.createClickEvent("btn-category", this.categoryButtonClick);
            this.ProductButtonClick = this.createClickEvent("btn-product", this.productButtonClick);
            this.ProductMapButtonClick = this.createClickEvent("btn-productmap", this.productMapButtonClick);
            this.DiscountButtonClick = this.createClickEvent("btn-discount", this.discountButtonClick);
            this.ReasonButtonClick = this.createClickEvent("btn-reason", this.reasonButtonClick);
            this.ClientButtonClick = this.createClickEvent("btn-client", this.clientButtonClick);
            this.ContractorButtonClick = this.createClickEvent("btn-contractor", this.contractorButtonClick);
            this.PrintServerButtonClick = this.createClickEvent("btn-printserver", this.printServerButtonClick);
            this.PrinterButtonClick = this.createClickEvent("btn-printer", this.printerButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent("btn-organization", this.OrganizationButtonClick);
            this.destroyClickEvent("btn-salepoint", this.SalePointButtonClick);
            this.destroyClickEvent("btn-employee", this.EmployeetButtonClick);
            this.destroyClickEvent("btn-account", this.AccountButtonClick);
            this.destroyClickEvent("btn-costincome", this.CostIncomeButtonClick);
            this.destroyClickEvent("btn-currency", this.CurrencyButtonClick);
            this.destroyClickEvent("btn-unit", this.UnitButtonClick);
            this.destroyClickEvent("btn-category", this.CategoryButtonClick);
            this.destroyClickEvent("btn-product", this.ProductButtonClick);
            this.destroyClickEvent("btn-productmap", this.ProductMapButtonClick);
            this.destroyClickEvent("btn-discount", this.DiscountButtonClick);
            this.destroyClickEvent("btn-reason", this.ReasonButtonClick);
            this.destroyClickEvent("btn-client", this.ClientButtonClick);
            this.destroyClickEvent("btn-contractor", this.ContractorButtonClick);
            this.destroyClickEvent("btn-printserver", this.PrintServerButtonClick);
            this.destroyClickEvent("btn-printer", this.PrinterButtonClick);
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

        public AccountButtonClick: { (e: any): void; };
        private accountButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/account", backController: this });
        }

        public CostIncomeButtonClick: { (e: any): void; };
        private costIncomeButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/costincome", backController: this });
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

        public ProductMapButtonClick: { (e: any): void; };
        private productMapButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/productmap", backController: this });
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

        public PrintServerButtonClick: { (e: any): void; };
        private printServerButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/printserver", backController: this });
        }

        public PrinterButtonClick: { (e: any): void; };
        private printerButtonClick(e) {
            vars._main.OpenController({ urlController: "setting/card/printer", backController: this });
        }
    }
}

vars.registerController("setting/index", function (module: any): Interfaces.IController { return new module.Controller.Setting.Index(); });