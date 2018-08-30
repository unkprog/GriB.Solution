namespace Interfaces {
    export interface IApplication {
        ShowLoading(): void;
        HideLoading(): void;
        OpenController(options: any, backController?: Interfaces.IController): void;
        OpenView(controller: Interfaces.IController, backController?: Interfaces.IController): void;
    }
}