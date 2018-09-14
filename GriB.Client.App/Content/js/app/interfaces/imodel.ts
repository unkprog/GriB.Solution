namespace Interfaces.Model {

    export interface IIdentityModel {
        id: number;
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
}