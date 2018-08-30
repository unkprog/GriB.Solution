namespace Interfaces {

    export interface IControllerOptions {
        Url: string;
        Id: string;
    }

    export interface IControllerModel {
        Header: string
    }

    export interface IController {
        Options: IControllerOptions;
        Model: IControllerModel;
        View: JQuery;

        Header: string;
        ViewInit(view: JQuery): boolean;
        ViewShow(e: any): void;
        ViewHide(e: any): void;
        ViewResize(e?: any): void;
    }
}