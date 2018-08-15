/// <amd-dependency path="i18n!nls/strings" />


export declare var _statres: { (id: string): string; };    //Access to static resources
export declare var _absUrl: { (url: string): string; };    //Create absolute ref to resource


declare var _appData: {
    IsDebug: boolean;
    Version: string;
    Language: string;
    BaseUrl: string;
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
    _absUrl = (refUrl: string) => {
        return _appData.BaseUrl + refUrl;
    };
}

 