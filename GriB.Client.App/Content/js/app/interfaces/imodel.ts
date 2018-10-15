namespace Interfaces.Model {
    export interface IBaseModel {
        id: number;
    }

    export interface IReferenceModel extends IBaseModel {
        name: string;
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

    export interface IEditorModel {
        
    }

    export interface ICompanyModel extends IReferenceModel, IEditorModel {
        site: string;
        email: string;
        phone: string;
    }
 

    export interface ISalepointModel extends IReferenceModel, IEditorModel {
        company_id: number;
        city: string;
        address: string;
        schedule: string;
    }

    export interface IEmployeeModel extends IReferenceModel, IEditorModel {
        state: boolean;
    }
}