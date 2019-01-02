var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
                        "labelCurrenciesAndUnits": vars._statres("label$currenciesandunits"),
                        "labelCurrencies": vars._statres("label$currencies"),
                        "labelUnits": vars._statres("label$units"),
                        "labelCategoriesProducts": vars._statres("label$categoriesproducts"),
                        "labelCategories": vars._statres("label$categories"),
                        "labelProducts": vars._statres("label$products"),
                        "labelDiscounts": vars._statres("label$discounts"),
                        "labelClients": vars._statres("label$clients"),
                    });
                };
                Index.prototype.createEvents = function () {
                    this.OrganizationButtonClick = this.createTouchClickEvent("btn-organization", this.organizationButtonClick);
                    this.SalePointButtonClick = this.createTouchClickEvent("btn-salepoint", this.salePointButtonClick);
                    this.EmployeetButtonClick = this.createTouchClickEvent("btn-employee", this.employeetButtonClick);
                    this.CurrencyButtonClick = this.createTouchClickEvent("btn-currency", this.currencyButtonClick);
                    this.UnitButtonClick = this.createTouchClickEvent("btn-unit", this.unitButtonClick);
                    this.CategoryButtonClick = this.createTouchClickEvent("btn-category", this.categoryButtonClick);
                    this.ProductButtonClick = this.createTouchClickEvent("btn-product", this.productButtonClick);
                    this.DiscountButtonClick = this.createTouchClickEvent("btn-discount", this.discountButtonClick);
                    this.ClientButtonClick = this.createTouchClickEvent("btn-client", this.clientButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-organization", this.OrganizationButtonClick);
                    this.destroyTouchClickEvent("btn-salepoint", this.SalePointButtonClick);
                    this.destroyTouchClickEvent("btn-employee", this.EmployeetButtonClick);
                    this.destroyTouchClickEvent("btn-currency", this.CurrencyButtonClick);
                    this.destroyTouchClickEvent("btn-unit", this.UnitButtonClick);
                    this.destroyTouchClickEvent("btn-category", this.CategoryButtonClick);
                    this.destroyTouchClickEvent("btn-product", this.ProductButtonClick);
                    this.destroyTouchClickEvent("btn-discount", this.DiscountButtonClick);
                    this.destroyTouchClickEvent("btn-client", this.ClientButtonClick);
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
                Index.prototype.discountButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/discount", backController: this });
                };
                Index.prototype.clientButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "setting/card/client", backController: this });
                };
                return Index;
            }(base.Controller.Base));
            Setting.Index = Index;
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/index", function (module) { return new module.Controller.Setting.Index(); });
});
//# sourceMappingURL=index.js.map