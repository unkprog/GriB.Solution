import vars = require('app/common/variables');
import base = require('app/common/basecontroller');
import svc = require('app/services/posterminalservice');
import navigationBar = require('app/controller/terminal/navigationbar');
import navigationProduct = require('app/controller/terminal/navigationproduct');
import navigationCheck = require('app/controller/terminal/navigationcheck');

export namespace Controller.Terminal {
    export class Index extends base.Controller.Base implements Interfaces.ITerminal {
        constructor() {
           super();
        }

        private service: svc.Services.POSTerminalService;
        protected get Service(): svc.Services.POSTerminalService {
            if (!this.service)
                this.service = new svc.Services.POSTerminalService();
            return this.service;
        }

        private navBar: navigationBar.Controller.Terminal.NavigationBar;
        private navProduct: navigationProduct.Controller.Terminal.NavigationProduct;
        private navCheck: navigationCheck.Controller.Terminal.NavigationCheck;
        public get Cheks(): Interfaces.ITerminalCheks {
            return this.navCheck;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/index.html", Id: "posterminal-view" };
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

        public get CurrentSalePoint(): number {
            let salePoint: Interfaces.Model.ISalepoint = this.Model.get("POSData.CurrentSalePoint");
            return salePoint.id;
        }


        private controlProgress: JQuery;
        private controlMain: JQuery;
       
        public get ControlChecks() {
            return this.navCheck.ControlContainerChecks;
        }

        public ViewInit(view:JQuery): boolean {
            this.navBar = new navigationBar.Controller.Terminal.NavigationBar(view, this);
            this.navProduct = new navigationProduct.Controller.Terminal.NavigationProduct(view, this);
            this.navCheck = new navigationCheck.Controller.Terminal.NavigationCheck(view, this);

            super.ViewInit(view);

            this.controlMain = view.find('#posterminal-view-main');
            this.controlProgress = view.find("#progress-container-terminal");


            return this.loadData();
        }

        public ShowLoading() {
            if (this.controlProgress)
                this.controlProgress.show();
            if (this.controlMain)
                this.controlMain.hide();
        }

        public HideLoading() {
            if (this.controlProgress)
                this.controlProgress.hide();
            if (this.controlMain) {
                this.controlMain.show();
            }
            this.ViewResize({});
        }

        protected loadData(): boolean {
            let controller = this;
            controller.Service.Enter((responseData) => {
                vars._identity.employee = responseData.employee;
                if (vars._identity.employee && vars._identity.employee.accesssalepoints && vars._identity.employee.accesssalepoints.length > 0) {
                    controller.navBar.Bind();
                    controller.Reset();
                } else {
                    vars._app.ShowMessage(vars._statres("label$settings"), vars._statres("msg$error$settings$notfill"), () => {
                        vars._app.OpenController({ urlController: "setting/index" });
                    });
                    
                }
                controller.HideLoading();
                vars._app.HideLoading();
            });
            return false;
        }

        public ViewHide(e) {
            this.navBar.Unbind();
            super.ViewHide(e);
        }

        public ViewShow(e: any): boolean {
            let result: boolean = super.ViewShow(e);
            if (this.navCheck) this.navCheck.ViewShow(e); 
            return result;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            if (this.navCheck) this.navCheck.ViewResize(e);
            if (this.navProduct) this.navProduct.ViewResize(e);
        }

        protected createEvents(): void {
            if (this.navCheck) this.navCheck.createEvents();
        }

        protected destroyEvents(): void {
            if (this.navCheck) this.navCheck.destroyEvents();
            if (this.navProduct) this.navProduct.destroyEvents();
            if (this.navBar) this.navBar.destroyEvents();
        }

        public Reset(): void {
            if (this.navProduct) this.navProduct.Reset();
            if (this.navCheck) this.navCheck.Reset();
        }
        
    }
}

vars.registerController("terminal/index", function (module: any): Interfaces.IController { return new module.Controller.Terminal.Index(); });