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
        ViewShow(e: any): boolean;
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
        OpenView(controller: Interfaces.IController, backController?: Interfaces.IController, isRestore?: boolean): void;
    }

    export interface IControllerEditor extends IController {
        EditorModel: Interfaces.Model.IBaseModel;
        Save(): void;
        Cancel(): void;
    }

    export interface IControllerCard extends IController {
        Add(): void;
        Delete(): void;
        Edit(): void;
        Close(): void;
    }

    export interface IDialog extends IController {
        Show(header: string, e: string): void;
        OnClose: () => void;
    }
}