/// <amd-dependency path="i18n!nls/strings" />

export declare let _app: Interfaces.IApplication;
export declare let _identity: Interfaces.Model.IIdentity;
export declare let _main: Interfaces.IControllerNavigation;
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

_controllers["security/login"]    = function (module: any): Interfaces.IController { _app.SetControlNavigation(_app); return new module.Controller.Security.Login(); };
_controllers["security/register"] = function (module: any): Interfaces.IController { _app.SetControlNavigation(_app); return new module.Controller.Security.Register(); };
_controllers["security/recovery"] = function (module: any): Interfaces.IController { _app.SetControlNavigation(_app); return new module.Controller.Security.Recovery(); };
_controllers["main"] = function (module: any): Interfaces.IController { return new module.Controller.Main(); };

//export declare let _maincontrollers: any;
//_maincontrollers = {};

_controllers["terminal/index"] = function (module: any): Interfaces.IController { return new module.Controller.Terminal.Index(); };
_controllers["terminal/paymenttype"] = function (module: any): Interfaces.IController { return new module.Controller.Terminal.PaymentType(); };
_controllers["terminal/paymentnumpad"] = function (module: any): Interfaces.IController { return new module.Controller.Terminal.PaymentNumPad(); };

_controllers["setting/index"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Index(); };
_controllers["report/index"] = function (module: any): Interfaces.IController { return new module.Controller.Report.Index(); };
_controllers["about/index"] = function (module: any): Interfaces.IController { return new module.Controller.About.Index(); };

_controllers["setting/editor/organization"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Organization(); };
_controllers["setting/editor/salepoint"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.SalePoint(); };
_controllers["setting/editor/employee"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Employee(); };
_controllers["setting/editor/currency"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Currency(); };
_controllers["setting/editor/unit"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Unit(); };
_controllers["setting/editor/category"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Category(); };
_controllers["setting/editor/product"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Product(); };

_controllers["setting/card/salepoint"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.SalePoint(); };
_controllers["setting/card/employee"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Employee(); };
_controllers["setting/card/currency"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Currency(); };
_controllers["setting/card/unit"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Unit(); };
_controllers["setting/card/category"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Category(); };
_controllers["setting/card/product"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Product(); };
_controllers["setting/card/productselect"] = function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.ProductSelect(); };


export declare let _editorData: any;
_editorData = {};
