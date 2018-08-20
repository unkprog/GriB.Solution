import ic = require('app/interfaces/icontroller');
import bc = require('app/common/basecontroller');
import rs = require('app/services/registerservice');
import { _statres } from 'app/common/variables';

export module Controllers.Security {
    export class RegisterController extends bc.Controllers.BaseController {

        registerService: rs.Services.RegisterService;
        constructor(options: ic.Interfaces.IControllerOptions) {
            super(options);
            this.registerService = new rs.Services.RegisterService(null);
        }

        protected createModel(): any {
            return {
                "Header": "",
                "labelTitle": _statres("button$label$register"),
                "labelPhone": _statres("label$phone"),
                "labelRegister": _statres("button$label$register"),

            };
        }



        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            //this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
            this.loadSettings();
            return false;
        }

        private loadSettings() {
            this.registerService.GetSR((e) => {

            });
        }

    }
}