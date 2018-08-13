/// <amd-dependency path="i18n!nls/strings" />


export declare var _statres: { (id: string): string; };



export module App {
    export class StaticRes {

        private i18nData: any;

        constructor() {
            let sr = this;
            sr.i18nData = require("i18n!nls/strings");
            _statres = (id: string) => { return sr.GetString(id); }
        }

        public GetString(id: string): string {
            return (this.i18nData && this.i18nData[id]) ? this.i18nData[id] : "";
        }
    }
    new StaticRes();
    
}



 