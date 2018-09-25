namespace Interfaces.Model {
    export interface IModelBase {
        id: number;
    }

    export interface IIdentityModel extends IModelBase {
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

    export interface IIdentity extends IModelBase {
    }

    export interface IOrganizationModel extends IModelBase {
        name: string;
        website: string;
        email: string;
        phone: string;
    }
}