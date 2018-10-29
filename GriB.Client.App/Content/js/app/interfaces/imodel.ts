﻿namespace Interfaces.Model {
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
    }
}