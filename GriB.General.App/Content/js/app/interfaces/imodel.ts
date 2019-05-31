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

    export interface ITableRowModel {

    }


    export interface IDateParams {
        datefrom: string;
        dateto: string;
    }

    export interface IReportFilter extends IDateParams {

    }

    export interface IServer extends IReferenceModel, IEditorModel {
        address: string;
        user: string;
        pass: string;
    }

}