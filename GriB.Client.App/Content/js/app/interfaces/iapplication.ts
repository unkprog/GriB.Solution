namespace Interfaces {
    export interface IApplication {
        ShowLoading(): void;
        HideLoading(): void;
        OpenView(controller: Interfaces.IController, backController?: Interfaces.IController): void;
    }
}