import vars = require('app/common/variables');
import utils = require('app/common/utils');

export namespace Controller.Terminal {
    export class NavigationBar {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {
            this.terminal = terminal;
        }

        private terminal :Interfaces.ITerminal;
        private navHeader: JQuery;
        private btnCheks: JQuery;
        private btnCash: JQuery;
        private btnSalePoint: JQuery;

        private controlSalePoints: JQuery;

        public Bind() {
            this.initNavbarHeader(this.terminal.View);
            this.initControlSalePoints(this.terminal.View);
        }

        public Unbind() {
            if (this.navHeader)
                this.navHeader.unbind();
        }

        public destroyEvents(): void {
            utils.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
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

            this.btnCash = $('<li><a id="pos-btn-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
            this.btnSalePoint = $('<li><a id="pos-btn-salepoint" data-target="posterminal-view-salepoints" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');

            this.navHeader.find("#pos-menu-buttons").append(this.btnCheks);
            this.navHeader.find("#pos-menu-buttons").append(this.btnCash);
            this.navHeader.find("#pos-menu-buttons").append(this.btnSalePoint);

            view.prepend(this.navHeader);
            kendo.bind(this.navHeader, this.terminal.Model);

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
                    }
                }
            }

            this.controlSalePoints.html(html);
            $("#pos-btn-salepoint").dropdown({ constrainWidth: false });

            utils.createTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick, this, this.controlSalePoints);
        }


        private SalePointButtonClick(e): any {
            let id: string = e.currentTarget.id;
            id = id.replace("set_salepoint_", "");

            let salePoints: Interfaces.Model.ISalePointAccessModel[] = vars._identity.employee.accesssalepoints;
            for (let i = 0, icount = salePoints.length; i < icount; i++) {
                if (salePoints[i].isaccess === true) {
                    if (+id === salePoints[i].salepoint.id) {
                        this.terminal.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                        this.terminal.Reset();
                    }
                }
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
}