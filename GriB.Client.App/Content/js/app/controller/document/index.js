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
        var Document;
        (function (Document) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/document/index.html", Id: "document-view" };
                };
                Index.prototype.createModel = function () {
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
                };
                Index.prototype.createEvents = function () {
                    //this.OrganizationButtonClick = this.createTouchClickEvent("btn-organization", this.organizationButtonClick);
                    //this.SalePointButtonClick = this.createTouchClickEvent("btn-salepoint", this.salePointButtonClick);
                    //this.EmployeetButtonClick = this.createTouchClickEvent("btn-employee", this.employeetButtonClick);
                    //this.CurrencyButtonClick = this.createTouchClickEvent("btn-currency", this.currencyButtonClick);
                    //this.UnitButtonClick = this.createTouchClickEvent("btn-unit", this.unitButtonClick);
                    //this.CategoryButtonClick = this.createTouchClickEvent("btn-category", this.categoryButtonClick);
                    //this.ProductButtonClick = this.createTouchClickEvent("btn-product", this.productButtonClick);
                    //this.DiscountButtonClick = this.createTouchClickEvent("btn-discount", this.discountButtonClick);
                    //this.ClientButtonClick = this.createTouchClickEvent("btn-client", this.clientButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    //this.destroyTouchClickEvent("btn-organization", this.OrganizationButtonClick);
                    //this.destroyTouchClickEvent("btn-salepoint", this.SalePointButtonClick);
                    //this.destroyTouchClickEvent("btn-employee", this.EmployeetButtonClick);
                    //this.destroyTouchClickEvent("btn-currency", this.CurrencyButtonClick);
                    //this.destroyTouchClickEvent("btn-unit", this.UnitButtonClick);
                    //this.destroyTouchClickEvent("btn-category", this.CategoryButtonClick);
                    //this.destroyTouchClickEvent("btn-product", this.ProductButtonClick);
                    //this.destroyTouchClickEvent("btn-discount", this.DiscountButtonClick);
                    //this.destroyTouchClickEvent("btn-client", this.ClientButtonClick);
                };
                return Index;
            }(base.Controller.Base));
            Document.Index = Index;
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/index", function (module) { return new module.Controller.Document.Index(); });
});
//# sourceMappingURL=index.js.map