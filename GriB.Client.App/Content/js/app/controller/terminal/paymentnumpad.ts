import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import svc = require('app/services/posterminalservice');
import { _app } from 'app/common/variables';
import navigationBar = require('app/controller/terminal/navigationbar');
import navigationProduct = require('app/controller/terminal/navigationproduct');
import navigationCheck = require('app/controller/terminal/navigationcheck');

export namespace Controller.Terminal {
    export class PaymentNumPad extends base.Controller.BaseEditor {
        constructor() {
           super();
        }

        private service: svc.Services.POSTerminalService;
        protected get Service(): svc.Services.POSTerminalService {
            if (!this.service)
                this.service = new svc.Services.POSTerminalService();
            return this.service;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymentnumpad.html", Id: "paymentnumpad-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": " ",
                "POSData": {
                    "CurrentSalePoint": { "name" : "" }
                },
                "labelPayment": vars._statres("label$payment"),
            });
        }

       
        public ViewInit(view:JQuery): boolean {
            return super.ViewInit(view);
        }

        public ViewHide(e) {
            super.ViewHide(e);
        }

        public ViewShow(e: any): boolean {
            let result: boolean = super.ViewShow(e);
            return result;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
        }

        protected createEvents(): void {
            super.createEvents();
        }

        protected destroyEvents(): void {
            super.destroyEvents();
        }

       
    }
}