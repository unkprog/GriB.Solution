import int = require('../interfaces/icontroller');

export module controllers {
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

        public get Header(): string {
            return this._model ? this._model.Header : "";
        }

        public ViewInit(e: any): void {
        }

        public ViewShow(e: any): void {
        }
        public ViewHide(e: any): void {
        }
        public ViewResize(e?: any): void {
        }

    }
}