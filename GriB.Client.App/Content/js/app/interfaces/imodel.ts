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

    export interface IEmployeeModel extends IReferenceModel, IEditorModel, IEditorSalePointAccess {
        phone: string;
        pass: string;
        isaccess: boolean;
        openonlogin: number;
        defaultsalepoint: number;
        fname: string;
        mname: string;
        lname: string;
        sex: number;
        datebirth: Date;
    }

    export interface IClientModel extends IReferenceModel, IEditorModel, IEditorSalePointAccess {
        name: string;
        fname: string;
        mname: string;
        lname: string;
        sex: number;
        datebirth: Date;
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
        paymentType: number;
        paymentOption: number;
        paymentSum: number;
        comment: string;
    }
}