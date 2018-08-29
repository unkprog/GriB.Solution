export namespace Controllers {
    export class BaseController implements Interfaces.IController {
        constructor(options: Interfaces.IControllerOptions) {
            this._options = options;
            this._model = this.createModel();
        }

        private _options: Interfaces.IControllerOptions;
        public get Options(): Interfaces.IControllerOptions {
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
            this._view = view;
            kendo.bind(view, this._model);
            return true;
        }

        public ViewShow(e: any): void {
        }
        public ViewHide(e: any): void {
        }
        public ViewResize(e?: any): void {
        }

        protected createClick(elemName: string | JQuery, clickFunc: any, controller: Interfaces.IController): any {
            var result = $.proxy(clickFunc, controller);
            var elem: JQuery = elemName instanceof $ ? <JQuery>elemName : controller.View.find("#" + elemName);
            for (let i = 0, iCount = elem.length; i < iCount; i++)
                elem[i].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
            return result;
        }

        protected createKeyPress(elemName: string[], clickFunc: (e: any) => any, controller: Interfaces.IController): any {
            var result = $.proxy(clickFunc, controller);
            $.each(elemName, function (index, el) {
                var $inp = $("#" + el);
                if ($inp.length > 0) {
                    $inp[0].addEventListener("keypress", result, false);
                }
            });
            return result;
        }


        protected deleteClick(elemName: string | JQuery, proxyFunc: any): any {
            let controller: Interfaces.IController = this;
            let elem: JQuery = elemName instanceof $ ? <JQuery>elemName : controller.View.find("#" + elemName);
            for (let i = 0, iCount = elem.length; i < iCount; i++)
                elem[i].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
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