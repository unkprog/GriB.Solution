import int = require('app/interfaces/icontroller');

export module Interfaces {
    export interface IApplication {
        ShowLoading(): void;
        HideLoading(): void;
        OpenView(controller: int.Interfaces.IController, backController?: int.Interfaces.IController): void;

    }
}