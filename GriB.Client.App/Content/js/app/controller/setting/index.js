var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/setting/index.html", Id: "setting-view" };
                };
                Index.prototype.createModel = function () {
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
                };
                Index.prototype.createEvents = function () {
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
                };
                Index.prototype.destroyEvents = function () {
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
                };
                Index.prototype.organizationButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/editor/organization", backController: this });
                };
                Index.prototype.salePointButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/salepoint", backController: this });
                };
                Index.prototype.employeetButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/employee", backController: this });
                };
                Index.prototype.accountButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/account", backController: this });
                };
                Index.prototype.costIncomeButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/costincome", backController: this });
                };
                Index.prototype.currencyButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/currency", backController: this });
                };
                Index.prototype.unitButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/unit", backController: this });
                };
                Index.prototype.categoryButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/category", backController: this });
                };
                Index.prototype.productButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/product", backController: this });
                };
                Index.prototype.productMapButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/productmap", backController: this });
                };
                Index.prototype.discountButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/discount", backController: this });
                };
                Index.prototype.reasonButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/reason", backController: this });
                };
                Index.prototype.clientButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/client", backController: this });
                };
                Index.prototype.contractorButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/contractor", backController: this });
                };
                Index.prototype.printServerButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/printserver", backController: this });
                };
                Index.prototype.printerButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/printer", backController: this });
                };
                return Index;
            }(base.Controller.Base));
            Setting.Index = Index;
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/index", function (module) { return new module.Controller.Setting.Index(); });
});
//# sourceMappingURL=index.js.map