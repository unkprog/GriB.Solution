namespace Interfaces.Model {

    export interface IBaseModel {
        id: number;
    }

    export interface IReferenceModel extends IBaseModel {
        name: string;
    }

    export interface IReferenceHierarhyModel extends IReferenceModel {
        pid: number;
    }

    export interface IIdentityModel extends IBaseModel {
        phone: string;
        role: number;
    }

    export interface IRegisterModel {
        phone: string;
    }

    export interface ILoginModel {
        phone: string;
        pass: string;
    }

    export interface IIdentity extends IBaseModel {
        auth: boolean;
        token: string;
        employee: IEmployeeModel;
    }

    export interface IEditorModel extends IBaseModel {

    }

    export interface ICompany extends IReferenceModel, IEditorModel {
        site: string;
        email: string;
        phone: string;
    }


    export interface ISalepoint extends IReferenceModel, IEditorModel {
        company_id: number;
        city: string;
        address: string;
        schedule: string;
    }

    export interface ISalePointAccessModel {
        salepoint: ISalepoint;
        isaccess: boolean;
    }

    export interface IEditorSalePointAccess extends IReferenceModel, IEditorModel {
        accesssalepoints: ISalePointAccessModel[];
    }

    export interface IPersonModel extends IReferenceModel, IEditorModel {
        fname: string;
        mname: string;
        lname: string;
        sex: number;
        datebirth: Date;

    }

    export interface IEmployeeModel extends IPersonModel, IEditorSalePointAccess {
        phone: string;
        pass: string;
        isaccess: boolean;
        openonlogin: number;
        defaultsalepoint: number;
    }

    export interface IAccount extends IReferenceModel, IEditorModel {
        number: string;
    }

    export interface ICostIncome extends IReferenceModel, IEditorModel {
        type: number;
    }

    export interface IClientModel extends IPersonModel, IEditorSalePointAccess {
        phone: string;
    }

    export interface IBaseUnit extends IReferenceModel, IEditorModel {
        code: string;
        nameshort: string;
    }

    export interface ICurrency extends IBaseUnit {
    }

    export interface IUnit extends IBaseUnit {
    }

    export interface ICategory extends IReferenceHierarhyModel, IEditorModel, IEditorSalePointAccess {
        photo: string;
        description: string;
        parentname: string;
    }

    export interface IProductComposition {
        index: number;
        product: IProduct;
        quantity: number;
        sum: number;
    }

    export interface IProduct extends IReferenceHierarhyModel, IEditorModel, IEditorSalePointAccess {
        type: number;
        photo: string;
        description: string;
        categoryname: string;
        vendorcode: string;
        barcode: string;
        putonsale: boolean;

        quantity: number;
        unit: number;
        unit_name: string;
        currency: number;
        costprice: number;
        sellingprice: number;
        composition: IProductComposition[];
    }

    export interface IContractor extends IReferenceModel, IEditorModel {
    }


    export interface IReason extends IReferenceModel, IEditorModel {
    }

    export interface IPosParamsSelect {
        category: number;
        salepoint: number;
    }

    export interface IPOSSaleProduct extends IReferenceModel {
        iscategory: boolean;
        photo: string;
    }


    export interface IPOSCheck extends IBaseModel {
        cd: Date;
        client: IReferenceModel;
        //public int options { get; set; }
        //public int client  { get; set; }
        //public int change  { get; set; }
        number: number;
        discount: number;
        comment: string;
        positions: IPOSCheckPosition[];
        sum: number;
    }

    export interface IPOSCheckPosition {
        index: number;
        product: IProduct;
        quantity: number;
        price: number;
        sum: number;
    }

    export interface IPaymentModel extends IEditorModel {
        totalSum: number;
        receivedSum: number;
        surrenderSum: number;
    }

    export interface ICheckCloseParams {
        check: number;
        salepoint: number;
        client: number;
        paymentType: number;
        paymentOption: number;
        paymentSum: number;
        comment: string;
    }

    export interface IDiscountModel extends IReferenceModel, IEditorModel, IEditorSalePointAccess {
        value: number;
    }

    export interface ICheckCommetModel extends IEditorModel {
        comment: string;
    }

    export interface IDateParams {
        datefrom: string;
        dateto: string;
    }

    export interface ISaleParams extends IDateParams {
        id: number;
        salepoint: number;
    }

    export interface IPaymentParams extends ISaleParams {
        doctype: number;
        client: number;
        employee: number;
        options: number;
        type: number;
    }

    export interface IDocumentParams extends ISaleParams {
        doctype: number;
        salepointto: number;
        contractor: number;
        reason: number;
    }

    export interface IDocumentModel extends IEditorModel {
        doctype: number;
        options: number;
        date: Date;
        salepoint: ISalepoint;
        salepointto: ISalepoint;
        contractor: IContractor;
        reason: IReason;
        typecost: number;
        positions: IDocumentModelPosition[];
        discount: number;
        sum: number;
        comment: string;
    }

    export interface IDocumentModelPosition {
        index: number;
        product: IProduct;
        quantity: number;
        price: number;
        sum: number;
    }

    export interface IPayment extends IEditorModel {
        cd: Date;
        cu: IEmployeeModel;
        doctype: number;
        check: IPOSCheck;
        ptype: number;
        sum: number;
        options: number;
        client: IClientModel;
        costincome: ICostIncome
        salepoint: ISalepoint;
        comment: string;
    }

    export interface IReportFilter extends IDateParams {

    }

    export interface IReportBaseFilter extends IReportFilter
    {
        salepoint: ISalepoint;
        IsShowSalepoint?: boolean;
    }

    export interface ReportFilterWithProduct extends IReportBaseFilter
    {
        product: IProduct;
        IsShowProduct?: boolean;
    }


    export interface IReportSaleFilter extends ReportFilterWithProduct {

        employee: IEmployeeModel;
        client: IClientModel;

        IsShowEmployee?: boolean;
        IsShowClient?: boolean;
    }

    export interface IReportStockFilter extends ReportFilterWithProduct {
    }

    export interface ITableRowModel {

    }
}