/// <amd-dependency path="i18n!nls/strings" />

export declare let _app: Interfaces.IApplication;
export declare let _statres: (id: string) => string;
export declare let _absUrl: (id: string) => string;   //Create absolute ref to resource
export declare let _showError: (error: string) => void;

export declare let _appSettings: {
    IsDebug: boolean;
    Version: string;
    Language: string;
    ServerRegister: string;
};


namespace App {
    export class StaticResources {

        private i18nData: any;
        constructor() {
            this.i18nData = require("i18n!nls/strings");
        }

        public GetString(id: string): string {
            return (this.i18nData && this.i18nData[id]) ? this.i18nData[id] : "";
        }
    }
}

let staticResources = new App.StaticResources();
_statres = (id: string) => { return staticResources.GetString(id); }
_showError = (error: string) => { _app.ShowError(error); }


export declare let _controllers: any;
_controllers = {};

_controllers["security/login"]    = function (module: any): Interfaces.IController { return new module.Controller.Security.Login(); };
_controllers["security/register"] = function (module: any): Interfaces.IController { return new module.Controller.Security.Register(); };
_controllers["security/forgot"]   = function (module: any): Interfaces.IController { return new module.Controller.Security.Forgot(); };


