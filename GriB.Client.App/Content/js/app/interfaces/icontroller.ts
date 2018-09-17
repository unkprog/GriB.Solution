namespace Interfaces {

    export interface IControllerOptions {
        Url: string;
        Id: string;
    }

    export interface IController {
        Options: IControllerOptions;
        Model: kendo.data.ObservableObject;
        View: JQuery;

        Header: string;
        ViewInit(view: JQuery): boolean;
        ViewShow(e: any): void;
        ViewHide(e: any): void;
        ViewResize(e?: any): void;
    }

    export interface IControllerContent extends IController {
        OpenController(urlController: string, backController?: Interfaces.IController): void;
    }

    export interface IDialog extends IController {
        Show(header: string, e: string): void;

        OnClose: () => void;
    }
}