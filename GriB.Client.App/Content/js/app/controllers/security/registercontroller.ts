import ic = require('app/interfaces/icontroller');
import bc = require('app/common/basecontroller');

export module Controllers.Security {
    export class RegisterController extends bc.Controllers.BaseController {

        constructor(options: ic.Interfaces.IControllerOptions) {
            super(options);
        }

        protected createModel(): any {
            return {
                "Header": ""
            };
        }



        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            //this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
            return result;
        }
    }
}