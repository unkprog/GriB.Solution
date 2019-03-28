import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Terminal {
    export class NavigationBar {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {
            this.terminal = terminal;
        }

        private terminal: Interfaces.ITerminal;
        private navHeader: JQuery;
        private btnCheks: JQuery;
        private btnCash: JQuery;
        private btnInCash: JQuery;
        private btnHistorySales: JQuery;
        private btnReportByChanges: JQuery;
        private btnCloseChange: JQuery;
        private btnSalePoint: JQuery;

        private controlSalePoints: JQuery;

        public Bind() {
            this.initNavbarHeader(this.terminal.View);
            this.initControlSalePoints(this.terminal.View);

            this.OpenMenuChecksClick = utils.createTouchClickEvent(this.btnCheks, this.openMenuChecksClick, this, this.terminal.View);
            this.OpenMenuCashClick = utils.createTouchClickEvent(this.btnCash, this.openMenuCashClick, this, this.terminal.View);
            this.InCashClick = utils.createTouchClickEvent(this.btnInCash, this.inCashClick, this, this.terminal.View);
            this.HistorySalesClick = utils.createTouchClickEvent(this.btnHistorySales, this.historySalesClick, this, this.terminal.View);
            this.ReportByChangeClick = utils.createTouchClickEvent(this.btnReportByChanges, this.reportByChangeClick, this, this.terminal.View);
            this.CloseChangeClick = utils.createTouchClickEvent(this.btnCloseChange, this.closeChangeClick, this, this.terminal.View);
        }

        public Unbind() {
            if (this.navHeader)
                this.navHeader.unbind();
        }

        public destroyEvents(): void {
            if (this.controlSalePoints) utils.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
            if (this.btnCash) utils.destroyTouchClickEvent(this.btnCheks, this.OpenMenuChecksClick);
            if (this.btnCash) utils.destroyTouchClickEvent(this.btnCash, this.OpenMenuCashClick);
            if (this.btnInCash) utils.destroyTouchClickEvent(this.btnInCash, this.InCashClick);
            if (this.btnHistorySales) utils.destroyTouchClickEvent(this.btnHistorySales, this.HistorySalesClick);
            if (this.btnReportByChanges) utils.destroyTouchClickEvent(this.btnReportByChanges, this.ReportByChangeClick);
            if (this.btnCloseChange) utils.destroyTouchClickEvent(this.btnCloseChange, this.CloseChangeClick);
        }


        private initNavbarHeader(view: JQuery): void {
            let navbarHeader: string = '<div class="navbar-fixed editor-header z-depth-1">';
            navbarHeader += '        <nav class="editor-header-nav">';
            navbarHeader += '            <div class="nav-wrapper editor-header">';
            navbarHeader += '                <a class="editor-header-title" data-bind="text:POSData.CurrentSalePoint.name"></a>';
            navbarHeader += '                <ul id="pos-menu-buttons" class="left"></ul>';
            navbarHeader += '            </div>';
            navbarHeader += '        </nav>';
            navbarHeader += '    </div>';

            this.navHeader = $(navbarHeader);

            this.btnCheks = $('<li><a id="check-items" class="editor-header-button"><i class="material-icons editor-header">list</i></a></li>');

            this.btnCash = $('<li><a id="pos-btn-cash" data-target="posterminal-view-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
            this.btnSalePoint = $('<li><a id="pos-btn-salepoint" data-target="posterminal-view-salepoints" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');
            let posmenubtn: JQuery = this.navHeader.find("#pos-menu-buttons");
            posmenubtn.append([this.btnCheks, this.btnCash, this.btnSalePoint]);

            this.btnInCash = view.find("#posterminal-view-cash-menu-incash");
            this.btnHistorySales = view.find("#posterminal-view-cash-menu-historysalses");
            this.btnReportByChanges = view.find("#posterminal-view-cash-menu-reportbychange");
            this.btnCloseChange = view.find("#posterminal-view-cash-menu-closechange");
            //this.btnCash.dropdown();
            view.prepend(this.navHeader);
            kendo.bind(this.navHeader, this.terminal.Model);
            //$("#pos-btn-cash").dropdown({ constrainWidth: false });
        }
        // Pltcm
        private initControlSalePoints(view: JQuery): void {
            this.controlSalePoints = view.find('#posterminal-view-salepoints');
            let salePoints: Interfaces.Model.ISalePointAccessModel[] = vars._identity.employee.accesssalepoints;
            let html: string = '';
            for (let i = 0, icount = salePoints.length; i < icount; i++) {
                if (salePoints[i].isaccess === true) {
                    html += '<li><a id="set_salepoint_';
                    html += salePoints[i].salepoint.id;
                    html += '" href="#!">';
                    html += salePoints[i].salepoint.name;
                    html += '</a></li>';

                    if (vars._identity.employee.defaultsalepoint === salePoints[i].salepoint.id || vars._identity.employee.defaultsalepoint === 0) {
                        let CurrentSalePoint = this.terminal.Model.get("POSData.CurrentSalePoint").toJSON();
                        CurrentSalePoint = salePoints[i].salepoint;
                        vars._identity.employee.defaultsalepoint = CurrentSalePoint;
                        this.terminal.Model.set("POSData.CurrentSalePoint", CurrentSalePoint);
                        this.terminal.UpdateSumInCash();
                    }
                }
            }

            this.controlSalePoints.html(html);
            $("#pos-btn-salepoint").dropdown({ constrainWidth: false });

            utils.createTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick, this, this.controlSalePoints);
        }

        public OpenMenuChecksClick: { (e: any): any }
        private openMenuChecksClick(e: any): any {
            this.terminal.OpenSlideChecks();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        private SalePointButtonClick(e): any {
            let self = this;
            let id: string = e.currentTarget.id;
            id = id.replace("set_salepoint_", "");

            let salePoints: Interfaces.Model.ISalePointAccessModel[] = vars._identity.employee.accesssalepoints;
            for (let i = 0, icount = salePoints.length; i < icount; i++) {
                if (salePoints[i].isaccess === true) {
                    if (+id === salePoints[i].salepoint.id) {
                        self.terminal.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                        self.terminal.UpdateSumInCash();
                        self.terminal.Reset();
                        self.terminal.GetChange(() => {});
                    }
                }
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        private menuCashControl: JQuery;
        public OpenMenuCashClick: { (e: any): any }
        private openMenuCashClick(e: any): any {
            if (!this.menuCashControl) {
                this.menuCashControl = this.terminal.View.find("#posterminal-view-cash-trigger");
                this.menuCashControl.dropdown({ constrainWidth: false });
            }

            let instance: any = this.menuCashControl[0];
            instance.M_Dropdown.el = e.currentTarget;
            instance.M_Dropdown.open();
        }

        public CloseChangeClick: { (e: any): any }
        private closeChangeClick(e: any): any {
            this.terminal.CloseChange()
        }



        public InCashClick: { (e: any): any }
        private inCashClick(e: any): any {
            let self = this;
            if (self.terminal.IsChangeOpen() === true) {
                vars._app.OpenController({
                    urlController: 'terminal/cashdialog', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrCashDialog: Interfaces.IControllerCashDialog = controller as Interfaces.IControllerCashDialog;
                        ctrCashDialog.Model.set("HeaderCash", vars._statres("label$incash") + self.terminal.Model.get("POSData.MoneyInCash"));
                        ctrCashDialog.OnResult = $.proxy(self.cashDialogResult, self);
                    }
                });
            }
        }

        private cashDialogResult(dialog: Interfaces.IControllerCashDialog) {
            let self = this;
            let ctrlName: string = "";
            let ctrlId: string = "";

            if (dialog.Result === 1) {
                ctrlName = 'document/editor/encashment';
                ctrlId = 'id_encashment';
            }
            else if (dialog.Result === 2) {
                ctrlName = 'document/editor/paymentdeposit';
                ctrlId = 'id_paymentdeposit';
            }
            else if (dialog.Result === 3) {
                ctrlName = 'document/editor/paymentwithdrawal';
                ctrlId = 'id_paymentwithdrawal';
            }

            if (ctrlName !== "") {
                vars._editorData[ctrlId] = -1;
                vars._app.OpenController({
                    urlController: ctrlName, isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlEditCash: Interfaces.IControllerEditorPayment = controller as Interfaces.IControllerEditorPayment;
                        ctrlEditCash.IsDisableSalepoint = true;
                        ctrlEditCash.TypeCostIncome = (dialog.Result === 2 ? 1 : (dialog.Result === 3 ? 2 : 0));
                        ctrlEditCash.SetupAfterLoad = $.proxy(self.setupAfterLoadDocument, self);
                        ctrlEditCash.SetupAfterSave = $.proxy(self.setupAfterSaveDocument, self);
                    }
                });
            }
        }

        private setupAfterLoadDocument(controller: Interfaces.IControllerEditorPayment): void {
            controller.Model.set("paymentConduct", true);
            controller.Model.set("editModel.salepoint", this.terminal.Model.get("POSData.CurrentSalePoint").toJSON());
        }

        private setupAfterSaveDocument(controller: Interfaces.IControllerEditorPayment): void {
            this.terminal.UpdateSumInCash();
        }

        public HistorySalesClick: { (e: any): any }
        private historySalesClick(e: any): any {
            if (this.terminal.IsChangeOpen() === true) {
                vars._app.OpenController({
                    urlController: 'terminal/report/historysales', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlHistorySales: Interfaces.IControllerHistorySales = controller as Interfaces.IControllerHistorySales;
                        ctrlHistorySales.CurrentChange = this.terminal.CurrentChange;
                    }
                });
            }
        }

        public ReportByChangeClick: { (e: any): any }
        private reportByChangeClick(e: any): any {
            if (this.terminal.IsChangeOpen() === true) {
                vars._app.OpenController({
                    urlController: 'terminal/report/changesales', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlChangeSales: Interfaces.IControllerChangeSales = controller as Interfaces.IControllerChangeSales;
                        ctrlChangeSales.CurrentSalePoint = this.terminal.CurrentSalePoint;
                        ctrlChangeSales.CurrentChange = this.terminal.CurrentChange;
                    }
                });
            }
        }
    }
}