/// <amd-dependency path="i18n!nls/strings" />
//import int = require('app/interfaces/iapplication');

export declare let _app: Interfaces.IApplication;
export declare let _statres: (id: string) => string;
export declare let _absUrl: (id: string) => string;   //Create absolute ref to resource


export declare let _appSettings: {
    IsDebug: boolean;
    Version: string;
    Language: string;
    RegisterUrl: string;
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
    //_absUrl = (refUrl: string) => {
    //    return _appData.BaseUrl + refUrl;
    //};
}

let staticResources = new App.StaticResources();
_statres = (id: string) => { return staticResources.GetString(id); }
 