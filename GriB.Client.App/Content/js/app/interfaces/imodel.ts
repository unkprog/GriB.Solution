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
        auth: boolean;
        token: string;
    }

    export interface IOrganizationModel extends IModelBase {
        name: string;
    }

    export interface ISalepointModel extends IModelBase {
        name: string;
        city: string;
    }

}