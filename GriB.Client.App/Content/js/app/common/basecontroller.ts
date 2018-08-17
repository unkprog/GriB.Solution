import int = require('../interfaces/icontroller');

export module Controllers {
    export class BaseController implements int.Interfaces.IController {
        constructor(options: int.Interfaces.IControllerOptions) {
            this._options = options;
            this._model = this.createModel();
        }

        private _options: int.Interfaces.IControllerOptions;
        public get Options(): int.Interfaces.IControllerOptions {
            return this._options;
        }

        protected createModel(): any {
            return {
                "Header": ""
            };
        }

        private _model: any;
        public get Model(): any {
            return this._model;
        }

        private _view: JQuery;
        public get View(): JQuery {
            return this._view;
        }
       

        public get Header(): string {
            return this._model ? this._model.Header : "";
        }

        public ViewInit(view: JQuery): boolean {
            kendo.bind(view, this._model);
            this._view = view;
            return true;
        }

        public ViewShow(e: any): void {
        }
        public ViewHide(e: any): void {
        }
        public ViewResize(e?: any): void {
        }

        protected createClick(elemName: string, clickFunc: (e: any) => any, controller: int.Interfaces.IController): any {
            var result = $.proxy(clickFunc, controller);
            var elem = this._view.find("#" + elemName);
            if (elem.length > 0) {
                elem[0].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
            }
            return result;
        }

        protected createKeyPress(elemName: string[], clickFunc: (e: any) => any, controller: int.Interfaces.IController): any {
            var result = $.proxy(clickFunc, controller);
            $.each(elemName, function (index, el) {
                var $inp = $("#" + el);
                if ($inp.length > 0) {
                    $inp[0].addEventListener("keypress", result, false);
                }
            });
            return result;
        }


        protected deleteClick(elemName: string, proxyFunc: (e: any) => any): any {
            var $btn = this._view.find("#" + elemName);
            if ($btn.length > 0)
                $btn[0].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
        }

        protected deleteKeyPress(elemName: string[], proxyFunc: (e: any) => any): any {
            $.each(elemName, function (index, el) {
                var $inp = $("#" + el);
                if ($inp.length > 0)
                    $inp[0].removeEventListener("keypress", proxyFunc);
            });
        }
    }
}