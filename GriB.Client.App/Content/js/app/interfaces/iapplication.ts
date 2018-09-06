namespace Interfaces {

    export interface IOpenControllerOptions {
        Url: string;
        CreateController: (module: any) => Interfaces.IController;
    }

    export interface IApplication {
        ShowLoading(): void;
        HideLoading(): void;
        OpenController(url: string, backController?: Interfaces.IController): void;
        OpenView(controller: Interfaces.IController, backController?: Interfaces.IController): void;
        HandleError(e: any): void;
        ShowError(e: string): void;
    }
}