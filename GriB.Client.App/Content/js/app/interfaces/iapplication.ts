﻿namespace Interfaces {

    export interface IOpenControllerOptions {
        Url: string;
        CreateController: (module: any) => Interfaces.IController;
    }

    export interface IApplication extends IControllerNavigation {
        ShowLoading(): void;
        HideLoading(): void;
        SetControlNavigation(controlNavigation: IControllerNavigation): void;
        HandleError(e: any): void;
        ShowError(e: string): void;
        ShowMessage(header: string, message: string, onClose?: () => void): void;

        Identity: Interfaces.Model.IIdentity;

        OpenViewTemplate(controller: Interfaces.IController, template: string, backController?: Interfaces.IController, isRestore?: boolean);
    }
}