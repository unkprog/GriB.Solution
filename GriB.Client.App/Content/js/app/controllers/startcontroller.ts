﻿import int = require('app/interfaces/icontroller');
import bc = require('app/controllers/basecontroller');

export module controllers {
    export class StartController extends bc.controllers.BaseController {
        constructor(options: int.Interfaces.IControllerOptions) {
           super(options);
        }

        protected createModel(): any {
            return {
                "Header": "POS Cloud"
            };
        }

       
    }
}