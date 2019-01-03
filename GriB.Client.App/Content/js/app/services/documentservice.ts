import base = require("app/common/baseservice");

export module Services {
    export class DocumentService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/document' };
        }

        //public GetSettings(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/settings", Callback: Callback });
        //}

        //public GetOrganization(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_organization", Callback: Callback });
        //}

        //public SetOrganization(model: Interfaces.Model.ICompany, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_organization", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //// Точки продаж
        //public GetSalePoints(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_salepoints", Callback: Callback });
        //}

        //public GetSalePoint(id:number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_salepoint", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetSalePoint(model: Interfaces.Model.ISalepoint, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_salepoint", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelSalePoint(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_salepoint", RequestData: { id: id }, Callback: Callback });
        //}

        //// Сотрудники
        //public GetEmployees(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_employees", Callback: Callback });
        //}

        //public GetEmployee(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_employee", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetEmployee(model: Interfaces.Model.IEmployeeModel, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_employee", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelEmployee(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_employee", RequestData: { id: id }, Callback: Callback });
        //}

        //// Валюты
        //public GetCurrencies(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_currencies", Callback: Callback });
        //}

        //public GetCurrency(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_currency", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetCurrency(model: Interfaces.Model.ICurrency, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_currency", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelCurrency(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_currency", RequestData: { id: id }, Callback: Callback });
        //}

        //// Единицы измерения
        //public GetUnits(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_units", Callback: Callback });
        //}

        //public GetUnit(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_unit", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetUnit(model: Interfaces.Model.IUnit, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_unit", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelUnit(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_unit", RequestData: { id: id }, Callback: Callback });
        //}

        //// Категории
        //public GetCategries(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_categories", Callback: Callback });
        //}

        //public GetCategory(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_category", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetCategory(model: Interfaces.Model.ICategory, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_category", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelCategory(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_category", RequestData: { id: id }, Callback: Callback });
        //}

        //// Товары
        //public GetProducts(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_products", Callback: Callback });
        //}

        //public GetProduct(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_product", RequestData: { id: id }, Callback: Callback });
        //}

        //public GetProductNewComposition(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_product_newcomposition", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetProduct(model: Interfaces.Model.ICategory, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_product", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelProduct(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_product", RequestData: { id: id }, Callback: Callback });
        //}

        //public UploadImage(data: any, Callback: (responseData: any) => void) {
        //    var self = this;
        //    let action = (self.Options && self.Options.BaseUrl ? self.Options.BaseUrl : '') + "/uploadimage";
        //    $.ajax({
        //        url: action, 
        //        type: "post",
        //        data: data,
        //        contentType: false, processData: false,
        //        success: function (responseData) {
        //            if (Callback)
        //                Callback(responseData);
        //        },
        //        error: function (e) {
        //            self.handleError(e);
        //        }
        //    });
        //}

        //// Клиенты
        //public GetClients(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_clients", Callback: Callback });
        //}

        //public GetClient(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_client", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetClient(model: Interfaces.Model.IClientModel, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_client", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelClient(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_client", RequestData: { id: id }, Callback: Callback });
        //}

        //// Скидки
        //public GetDiscounts(Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_discounts", Callback: Callback });
        //}

        //public GetDiscount(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/get_discount", RequestData: { id: id }, Callback: Callback });
        //}

        //public SetDiscount(model: Interfaces.Model.IClientModel, Callback: (responseData: any) => void) {
        //    this.PostApi({ Action: "/post_discount", RequestData: JSON.stringify(model), Callback: Callback });
        //}

        //public DelDiscount(id: number, Callback: (responseData: any) => void) {
        //    this.GetApi({ Action: "/del_discount", RequestData: { id: id }, Callback: Callback });
        //}
    }
}