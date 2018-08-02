export module Interfaces {

    export interface IControllerOptions {
        Url: string;
        Id: string;
        Header: string;
    }

    export interface IController {
        Options: IControllerOptions;
        Model: any;

        ViewInit(e: any): void;
        ViewShow(e: any): void;
        ViewHide(e: any): void;
        ViewResize(e?: any): void;
    }
}