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
        public get Service(): svc.Services.POSTerminalService {
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
                    "CurrentSalePoint": { id: 0, "name": "" },
                    "CurrentChange": { id: 0 },
                    "MoneyInCash": 0,
                },
                "labelInCash": vars._statres("label$incash"),
                "labelHistorySales": vars._statres("label$historysales"),
                "labelReportByChange": vars._statres("label$report$bychange"),
                "labelCloseChange": vars._statres("label$closechange"),
                "labelPayment": vars._statres("label$payment"),
            });
        }

        public get CurrentSalePoint(): number {
            let salePoint: Interfaces.Model.ISalepoint = this.Model.get("POSData.CurrentSalePoint");
            return (salePoint && salePoint.id ? salePoint.id : 0);
        }

        public get CurrentChange(): number {
            let change: Interfaces.Model.IChange = this.Model.get("POSData.CurrentChange");
            return (change && change.id? change.id : 0);
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

        private checkSettings(): boolean {
            //let controller = this;
            let result: boolean = false;
            if (vars._identity.employee && vars._identity.employee.accesssalepoints && vars._identity.employee.accesssalepoints.length > 0) {
                if (this.existsAccessSalepoint() === false) {
                    if (vars._identity.employee.isfullaccess === true) {
                    vars._app.ShowMessage(vars._statres("label$settings"), vars._statres("msg$error$settings$notaccesssalepoint"), () => {
                        vars._app.OpenController({ urlController: "setting/index" });
                        });
                    }
                    else {
                        vars._app.ShowMessage(vars._statres("button$label$enter"), vars._statres("msg$error$notaccess"), () => {
                            vars._app.OpenController({ urlController: "security/login" });
                        });
                    }
                }
                else {
                    result = true;
                }
            } else {
                if (vars._identity.employee.isfullaccess === true) {
                    vars._app.ShowMessage(vars._statres("label$settings"), vars._statres("msg$error$settings$notfill"), () => {
                        vars._app.OpenController({ urlController: "setting/index" });
                    });
                }
                else {
                    vars._app.ShowMessage(vars._statres("button$label$enter"), vars._statres("msg$error$notaccess"), () => {
                        vars._app.OpenController({ urlController: "security/login"  });
                    });
                }
            }
            return result;
        }

        protected loadData(): boolean {
            let controller = this;
            controller.Service.Enter((responseData) => {
                vars._identity.employee = responseData.employee;
                if (controller.checkSettings() === true) {
                    controller.navBar.Bind();
                    controller.Reset();
                }
                controller.HideLoading();
                vars._app.HideLoading();
            });
            return false;
        }

        private existsAccessSalepoint(): boolean {
            let result: boolean = false;
            let salePoints: Interfaces.Model.ISalePointAccessModel[] = vars._identity.employee.accesssalepoints;
            for (let i = 0, icount = salePoints.length; i < icount; i++) {
                if (salePoints[i].isaccess === true) { result = true; }
            }
            return result;
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

        private checkChangeCallBack: { (): void; }
        public GetChange(callback: () => void): void {
            let self = this;
            if (self.checkChangeCallBack) {
                if (callback) callback();
                return;
            }
            self.checkChangeCallBack = callback;
            self.Service.Change(self.CurrentSalePoint, (responseData) => {
                let change: Interfaces.Model.IChange = (responseData.change as Interfaces.Model.IChange);
                if (change && change.id && change.id !== 0) {
                    this.Model.set("POSData.CurrentChange", change);
                    self.callCheckChangeCallBack();
                }
                else {
                    vars._app.OpenController({
                        urlController: 'terminal/changedialog', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                            let ctrChangeDialog: Interfaces.IControllerChangeDialog = controller as Interfaces.IControllerChangeDialog;
                            ctrChangeDialog.Model.set("HeaderQuery", vars._statres("label$query$opennewchange"));
                            ctrChangeDialog.OnResult = $.proxy(self.changeDialogResult, self);
                        }
                    });
                }
            });
        }

        private changeDialogResult(controller: Interfaces.IControllerChangeDialog) {
            let self = this;
            if (controller.Result === 0) {
                self.Service.ChangeNew(self.CurrentSalePoint, (responseData) => {
                    let change: Interfaces.Model.IChange = (responseData.change as Interfaces.Model.IChange);
                    if (change && change.id && change.id !== 0) {
                        self.Model.set("POSData.CurrentChange", change);
                        self.callCheckChangeCallBack();
                    }
                    else
                        vars._app.ShowMessage(vars._statres("label$openingchange"), vars._statres("msg$error$openingchange"), () => { });
                });
            }
            else {
                self.Model.set("POSData.CurrentChange", { id: 0 });
                self.checkChangeCallBack = undefined;
            }
        }

        public CheckChange(callback: () => void): void {
            let self = this;
            if (self.CurrentChange == 0) {
                this.GetChange(callback);
            }
            else if (callback) callback();
        }

        private callCheckChangeCallBack() {
            if (this.checkChangeCallBack)
                this.checkChangeCallBack();
            this.checkChangeCallBack = undefined;
        }

        public CloseChange(): void {
            let self = this;
            if (self.CurrentChange == 0) {
                M.toast({ html: vars._statres("label$change$close") });
            }
            else {
                vars._app.OpenController({
                    urlController: 'terminal/changedialog', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrChangeDialog: Interfaces.IControllerChangeDialog = controller as Interfaces.IControllerChangeDialog;
                        ctrChangeDialog.Model.set("HeaderQuery", vars._statres("label$query$closechange"));
                        ctrChangeDialog.OnResult = $.proxy(self.changeClodeDialogResult, self);
                    }
                });
            }
        }

        private changeClodeDialogResult(controller: Interfaces.IControllerChangeDialog) {
            let self = this;
            if (controller.Result === 0) {
                self.Service.ChangeClose(self.CurrentChange, (responseData) => {
                    self.Model.set("POSData.CurrentChange", { id: 0 });
                });
            }
        }

        public UpdateSumInCash(): void {
            let self = this;
            self.Service.ChangeSumInCash(self.CurrentSalePoint, (responseData) => {
                self.Model.set("POSData.MoneyInCash", responseData.cashSum);
            });
        }

    }
}

vars.registerController("terminal/index", function (module: any): Interfaces.IController { return new module.Controller.Terminal.Index(); });