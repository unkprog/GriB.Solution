//import ic = require('app/interfaces/icontroller');
import bc = require('app/common/basecontroller');
import rs = require('app/services/registerservice');
import vars = require('app/common/variables');

export namespace Controllers.Security {
    export class RegisterController extends bc.Controllers.BaseController {

        registerService: rs.Services.RegisterService;
        constructor(options: Interfaces.IControllerOptions) {
            super(options);
            this.registerService = new rs.Services.RegisterService(null);
        }

        protected createModel(): any {
            return {
                "Header": "",
                "labelTitle": vars._statres("button$label$register"),
                "labelPhone": vars._statres("label$phone"),
                "labelRegister": vars._statres("button$label$register"),

            };
        }



        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
            this.loadSettings();
            return false;
        }

        private loadSettings() {
            this.registerService.GetSR((e) => {

            });
        }


        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            //vars._app.OpenView(new rs.Controllers.Security.RegisterController({ Url: "/Content/view/security/register.html", Id: "app-register" }), this);
        }
    }
}