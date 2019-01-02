import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export namespace Controller.Document {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/document/index.html", Id: "document-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "POS Cloud",
                "labelDocuments": vars._statres("label$documents"),
                "labelArrival": vars._statres("label$arrival"),
                "labelConsumption": vars._statres("label$consumptions"),
                "labelReturn": vars._statres("label$return"),
                "labelWriteOff": vars._statres("label$writeoff"),
                "labelMovement": vars._statres("label$movement"),
                "labelProduction": vars._statres("label$roduction"),
            });
        }

        protected createEvents(): void {
            //this.OrganizationButtonClick = this.createTouchClickEvent("btn-organization", this.organizationButtonClick);
            //this.SalePointButtonClick = this.createTouchClickEvent("btn-salepoint", this.salePointButtonClick);
            //this.EmployeetButtonClick = this.createTouchClickEvent("btn-employee", this.employeetButtonClick);
            //this.CurrencyButtonClick = this.createTouchClickEvent("btn-currency", this.currencyButtonClick);
            //this.UnitButtonClick = this.createTouchClickEvent("btn-unit", this.unitButtonClick);
            //this.CategoryButtonClick = this.createTouchClickEvent("btn-category", this.categoryButtonClick);
            //this.ProductButtonClick = this.createTouchClickEvent("btn-product", this.productButtonClick);
            //this.DiscountButtonClick = this.createTouchClickEvent("btn-discount", this.discountButtonClick);
            //this.ClientButtonClick = this.createTouchClickEvent("btn-client", this.clientButtonClick);
        }

        protected destroyEvents(): void {
            //this.destroyTouchClickEvent("btn-organization", this.OrganizationButtonClick);
            //this.destroyTouchClickEvent("btn-salepoint", this.SalePointButtonClick);
            //this.destroyTouchClickEvent("btn-employee", this.EmployeetButtonClick);
            //this.destroyTouchClickEvent("btn-currency", this.CurrencyButtonClick);
            //this.destroyTouchClickEvent("btn-unit", this.UnitButtonClick);
            //this.destroyTouchClickEvent("btn-category", this.CategoryButtonClick);
            //this.destroyTouchClickEvent("btn-product", this.ProductButtonClick);
            //this.destroyTouchClickEvent("btn-discount", this.DiscountButtonClick);
            //this.destroyTouchClickEvent("btn-client", this.ClientButtonClick);
        }

        //public OrganizationButtonClick: { (e: any): void; };
        //private organizationButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/editor/organization", backController: this });
        //}

        //public SalePointButtonClick: { (e: any): void; };
        //private salePointButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/salepoint", backController: this });
        //}

        //public EmployeetButtonClick: { (e: any): void; };
        //private employeetButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/employee", backController: this });
        //}

        //public CurrencyButtonClick: { (e: any): void; };
        //private currencyButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/currency", backController: this });
        //}

        //public UnitButtonClick: { (e: any): void; };
        //private unitButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/unit", backController: this });
        //}

        //public CategoryButtonClick: { (e: any): void; };
        //private categoryButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/category", backController: this });
        //}

        //public ProductButtonClick: { (e: any): void; };
        //private productButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/product", backController: this });
        //}

        //public DiscountButtonClick: { (e: any): void; };
        //private discountButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/discount", backController: this });
        //}

        //public ClientButtonClick: { (e: any): void; };
        //private clientButtonClick(e) {
        //    vars._main.OpenController({ urlController: "setting/card/client", backController: this });
        //}
    }
}

vars.registerController("document/index", function (module: any): Interfaces.IController { return new module.Controller.Document.Index(); });