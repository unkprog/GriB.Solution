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
define(["require", "exports", "app/common/baseservice"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var SettingsService = /** @class */ (function (_super) {
            __extends(SettingsService, _super);
            function SettingsService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(SettingsService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/settings' };
                },
                enumerable: true,
                configurable: true
            });
            SettingsService.prototype.GetSettings = function (Callback) {
                this.GetApi({ Action: "/settings", Callback: Callback });
            };
            SettingsService.prototype.GetOrganization = function (Callback) {
                this.GetApi({ Action: "/get_organization", Callback: Callback });
            };
            SettingsService.prototype.SetOrganization = function (model, Callback) {
                this.PostApi({ Action: "/post_organization", RequestData: JSON.stringify(model), Callback: Callback });
            };
            // Точки продаж
            SettingsService.prototype.GetSalePoints = function (Callback) {
                this.GetApi({ Action: "/get_salepoints", Callback: Callback });
            };
            SettingsService.prototype.GetSalePoint = function (id, Callback) {
                this.GetApi({ Action: "/get_salepoint", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetSalePoint = function (model, Callback) {
                this.PostApi({ Action: "/post_salepoint", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelSalePoint = function (id, Callback) {
                this.GetApi({ Action: "/del_salepoint", RequestData: { id: id }, Callback: Callback });
            };
            // Сотрудники
            SettingsService.prototype.GetEmployees = function (Callback) {
                this.GetApi({ Action: "/get_employees", Callback: Callback });
            };
            SettingsService.prototype.GetEmployee = function (id, Callback) {
                this.GetApi({ Action: "/get_employee", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetEmployee = function (model, Callback) {
                this.PostApi({ Action: "/post_employee", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelEmployee = function (id, Callback) {
                this.GetApi({ Action: "/del_employee", RequestData: { id: id }, Callback: Callback });
            };
            // Счета
            SettingsService.prototype.GetAccounts = function (Callback) {
                this.GetApi({ Action: "/get_accounts", Callback: Callback });
            };
            SettingsService.prototype.GetAccount = function (id, Callback) {
                this.GetApi({ Action: "/get_account", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetAccount = function (model, Callback) {
                this.PostApi({ Action: "/post_account", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelAccount = function (id, Callback) {
                this.GetApi({ Action: "/del_account", RequestData: { id: id }, Callback: Callback });
            };
            // Статьи расходов и доходов
            SettingsService.prototype.GetCostIncomes = function (Callback) {
                this.GetApi({ Action: "/get_costincomes", Callback: Callback });
            };
            SettingsService.prototype.GetCosts = function (Callback) {
                this.GetApi({ Action: "/get_costs", Callback: Callback });
            };
            SettingsService.prototype.GetIncomes = function (Callback) {
                this.GetApi({ Action: "/get_incomes", Callback: Callback });
            };
            SettingsService.prototype.GetCostIncome = function (id, Callback) {
                this.GetApi({ Action: "/get_costincome", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetCostIncome = function (model, Callback) {
                this.PostApi({ Action: "/post_costincome", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelCostIncome = function (id, Callback) {
                this.GetApi({ Action: "/del_costincome", RequestData: { id: id }, Callback: Callback });
            };
            // Валюты
            SettingsService.prototype.GetCurrencies = function (Callback) {
                this.GetApi({ Action: "/get_currencies", Callback: Callback });
            };
            SettingsService.prototype.GetCurrency = function (id, Callback) {
                this.GetApi({ Action: "/get_currency", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetCurrency = function (model, Callback) {
                this.PostApi({ Action: "/post_currency", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelCurrency = function (id, Callback) {
                this.GetApi({ Action: "/del_currency", RequestData: { id: id }, Callback: Callback });
            };
            // Единицы измерения
            SettingsService.prototype.GetUnits = function (Callback) {
                this.GetApi({ Action: "/get_units", Callback: Callback });
            };
            SettingsService.prototype.GetUnit = function (id, Callback) {
                this.GetApi({ Action: "/get_unit", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetUnit = function (model, Callback) {
                this.PostApi({ Action: "/post_unit", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelUnit = function (id, Callback) {
                this.GetApi({ Action: "/del_unit", RequestData: { id: id }, Callback: Callback });
            };
            // Категории
            SettingsService.prototype.GetCategries = function (Callback) {
                this.GetApi({ Action: "/get_categories", Callback: Callback });
            };
            SettingsService.prototype.GetCategory = function (id, Callback) {
                this.GetApi({ Action: "/get_category", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetCategory = function (model, Callback) {
                this.PostApi({ Action: "/post_category", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelCategory = function (id, Callback) {
                this.GetApi({ Action: "/del_category", RequestData: { id: id }, Callback: Callback });
            };
            // Товары
            SettingsService.prototype.GetProducts = function (Callback) {
                this.GetApi({ Action: "/get_products", Callback: Callback });
            };
            SettingsService.prototype.GetProductMaps = function (Callback) {
                this.GetApi({ Action: "/get_productmaps", Callback: Callback });
            };
            SettingsService.prototype.GetProduct = function (id, Callback) {
                this.GetApi({ Action: "/get_product", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.GetProductNewComposition = function (id, Callback) {
                this.GetApi({ Action: "/get_product_newcomposition", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetProduct = function (model, Callback) {
                this.PostApi({ Action: "/post_product", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelProduct = function (id, Callback) {
                this.GetApi({ Action: "/del_product", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.UploadImage = function (data, Callback) {
                var self = this;
                var action = (self.Options && self.Options.BaseUrl ? self.Options.BaseUrl : '') + "/uploadimage";
                $.ajax({
                    url: action,
                    type: "post",
                    data: data,
                    contentType: false, processData: false,
                    success: function (responseData) {
                        if (Callback)
                            Callback(responseData);
                    },
                    error: function (e) {
                        self.handleError(e);
                    }
                });
            };
            // Клиенты
            SettingsService.prototype.GetClients = function (Callback) {
                this.GetApi({ Action: "/get_clients", Callback: Callback });
            };
            SettingsService.prototype.GetClient = function (id, Callback) {
                this.GetApi({ Action: "/get_client", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetClient = function (model, Callback) {
                this.PostApi({ Action: "/post_client", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelClient = function (id, Callback) {
                this.GetApi({ Action: "/del_client", RequestData: { id: id }, Callback: Callback });
            };
            // Скидки
            SettingsService.prototype.GetDiscounts = function (Callback) {
                this.GetApi({ Action: "/get_discounts", Callback: Callback });
            };
            SettingsService.prototype.GetDiscount = function (id, Callback) {
                this.GetApi({ Action: "/get_discount", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetDiscount = function (model, Callback) {
                this.PostApi({ Action: "/post_discount", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelDiscount = function (id, Callback) {
                this.GetApi({ Action: "/del_discount", RequestData: { id: id }, Callback: Callback });
            };
            // Контрагенты
            SettingsService.prototype.GetContractors = function (Callback) {
                this.GetApi({ Action: "/get_contractors", Callback: Callback });
            };
            SettingsService.prototype.GetContractor = function (id, Callback) {
                this.GetApi({ Action: "/get_contractor", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetContractor = function (model, Callback) {
                this.PostApi({ Action: "/post_contractor", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelContractor = function (id, Callback) {
                this.GetApi({ Action: "/del_contractor", RequestData: { id: id }, Callback: Callback });
            };
            // Причина
            SettingsService.prototype.GetReasons = function (Callback) {
                this.GetApi({ Action: "/get_reasons", Callback: Callback });
            };
            SettingsService.prototype.GetReason = function (id, Callback) {
                this.GetApi({ Action: "/get_reason", RequestData: { id: id }, Callback: Callback });
            };
            SettingsService.prototype.SetReason = function (model, Callback) {
                this.PostApi({ Action: "/post_reason", RequestData: JSON.stringify(model), Callback: Callback });
            };
            SettingsService.prototype.DelReason = function (id, Callback) {
                this.GetApi({ Action: "/del_reason", RequestData: { id: id }, Callback: Callback });
            };
            return SettingsService;
        }(base.Services.BaseService));
        Services.SettingsService = SettingsService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=settingsservice.js.map