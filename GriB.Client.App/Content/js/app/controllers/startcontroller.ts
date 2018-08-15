import int = require('app/interfaces/icontroller');
import bc = require('app/controllers/basecontroller');
import { _statres } from '../common/variables';

export module controllers {
    export class StartController extends bc.controllers.BaseController {
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


        public ViewInit(e: any): void {
            $('#app-modal-login').modal();
            M.updateTextFields();
        }

        public ViewShow(e: any): void {
            $('#app-modal-login').modal('open');
        }
       
    }
}