export module Interfaces {

    export interface IControllerOptions {
        Url: string;
        Id: string;
    }

    export interface IController {
        Options: IControllerOptions;
        Model: any;

        Header: string;

        ViewInit(e: any): void;
        ViewShow(e: any): void;
        ViewHide(e: any): void;
        ViewResize(e?: any): void;
    }
}