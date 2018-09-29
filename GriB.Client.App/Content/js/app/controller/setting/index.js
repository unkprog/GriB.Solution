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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/common/variables"], function (require, exports, vars, base, variables_1) {
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
                        "labelOrganization": vars._statres("label$organization"),
                        "labelSalesPoints": vars._statres("label$salesPoints"),
                        "labelEmployees": vars._statres("label$employees"),
                        "labelCurrencies": vars._statres("label$currencies"),
                        "labelUnits": vars._statres("label$units"),
                    });
                };
                Index.prototype.createEvents = function () {
                    this.OrganizationButtonClick = this.createClickEvent("btn-organization", this.organizationButtonClick);
                    this.SalePointButtonClick = this.createClickEvent("btn-salepoint", this.salePointButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyClickEvent("btn-organization", this.OrganizationButtonClick);
                    this.destroyClickEvent("btn-salepoint", this.SalePointButtonClick);
                };
                Index.prototype.organizationButtonClick = function (e) {
                    variables_1._main.OpenController("setting/editor/organization", this);
                };
                Index.prototype.salePointButtonClick = function (e) {
                    variables_1._main.OpenController("setting/card/salepoint", this);
                };
                return Index;
            }(base.Controller.Base));
            Setting.Index = Index;
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=index.js.map