import int = require('app/interfaces/icontroller');
import bc = require('app/common/basecontroller');
import rc = require('app/controllers/security/registercontroller');
import { _statres, _app } from 'app/common/variables';

export module Controllers.Security {
    export class LoginController extends bc.Controllers.BaseController {
        constructor(options: int.Interfaces.IControllerOptions) {
           super(options);
        }

        protected createModel(): any {
            return {
                "Header": "POS Cloud",
                "labelTitle": _statres("label$autorization"),
                "labelPhone": _statres("label$phone"),
                "labelPassword": _statres("label$password"),

                "labelForgot": _statres("button$label$forgot"),
                "labelRegister": _statres("button$label$register"),
                "labelEnter": _statres("button$label$enter"),
            };
        }

        public ViewInit(view: JQuery): boolean {
            let result :boolean = super.ViewInit(view);
            this.RegisterButtonClick = this.createClick("btn-register", this.registerButtonClick, this);
            return result;
        }

        public ViewShow(e: any): void {
            M.updateTextFields();
          
            //$('#app-modal-login').modal();
            //$('#app-modal-login').modal('open');
        }

        public RegisterButtonClick: { (e: any): void; };
        private registerButtonClick(e) {
            _app.OpenView(new rc.Controllers.Security.RegisterController({ Url: "/Content/view/security/register.html", Id: "app-register" }), this);
        }
    }
}