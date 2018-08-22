/// <amd-dependency path="i18n!nls/strings" />
import int = require('app/interfaces/iapplication');

export let _app: int.Interfaces.IApplication;
export declare let _statres: { (id: string): string; };    //Access to static resources
export declare let _absUrl: { (url: string): string; };    //Create absolute ref to resource


 export declare let _appSettings: {
    IsDebug: boolean;
    Version: string;
    Language: string;
    RegisterUrl: string;
};

export module App {
    class StaticResources {

        private i18nData: any;

        constructor() {
            
            this.i18nData = require("i18n!nls/strings");
            
        }

        public GetString(id: string): string {
            return (this.i18nData && this.i18nData[id]) ? this.i18nData[id] : "";
        }
    }

    let staticResources = new StaticResources();
    _statres = (id: string) => { return staticResources.GetString(id); }
    //_absUrl = (refUrl: string) => {
    //    return _appData.BaseUrl + refUrl;
    //};
}

 