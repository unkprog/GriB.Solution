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

    export interface IControllerStack {
        Current: Interfaces.IController;
        Pop: () => void; 
        Push: (controller: Interfaces.IController) => void; 
    }

    export interface IControllerNavigation {
        ControllerBack(e: any): void;
        RestoreController(): void;
        OpenController(urlController: string, backController?: Interfaces.IController): void;
        OpenView(controller: Interfaces.IController, backController?: Interfaces.IController): void;
    }

    export interface IControllerEditor extends IController {
        Save(e: any): void;
        Cancel(e: any): void;
    }

    export interface IDialog extends IController {
        Show(header: string, e: string): void;
        OnClose: () => void;
    }
}