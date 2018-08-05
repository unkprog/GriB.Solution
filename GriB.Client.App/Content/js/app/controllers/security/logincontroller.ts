import ic = require('../../interfaces/icontroller');
import bc = require('../basecontroller');

export module controllers.security {
    export class LoginController extends bc.controllers.BaseController {

        constructor(options: ic.Interfaces.IControllerOptions) {
            super(options);
        }

        protected createModel(): any {
            return {
                "Header": ""
            };
        }
    }
}