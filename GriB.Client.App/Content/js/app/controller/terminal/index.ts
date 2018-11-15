import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import svc = require('app/services/posterminalservice');
import { _app } from 'app/common/variables';

export namespace Controller.Terminal {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        private posTerminalService: svc.Services.POSTerminalService;
        protected get POSTerminalService(): svc.Services.POSTerminalService {
            if (!this.posTerminalService)
                this.posTerminalService = new svc.Services.POSTerminalService();
            return this.posTerminalService;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/index.html", Id: "posterminal-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": " ",
                "POSData": {
                    "CurrentSalePoint": { "name" : "ttt" }
                }
            });
        }

        private navHeader: JQuery;
        private btnCash: JQuery;
        private btnSalePoint: JQuery;
        private controlSalePoints: JQuery;
        public ViewInit(view:JQuery): boolean {

            super.ViewInit(view);

            return this.loadData();
        }

        protected loadData(): boolean {
            let controller = this;
            this.POSTerminalService.Enter((responseData) => {
                vars._identity.employee = responseData.employee;
                controller.initNavbarHeader(controller.View);
                controller.initControlSalePoints(controller.View);
                _app.HideLoading();
            });
            return false;
        }

        public ViewHide(e) {
            this.navHeader.unbind();
            super.ViewHide(e);
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

            this.btnCash = $('<li><a id="pos-btn-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
            this.btnSalePoint = $('<li><a id="pos-btn-salepoint" data-target="posterminal-view-salepoints" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');

            this.navHeader.find("#pos-menu-buttons").append(this.btnCash);
            this.navHeader.find("#pos-menu-buttons").append(this.btnSalePoint);

            view.prepend(this.navHeader);
            kendo.bind(this.navHeader, this.Model);
            
        }

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

                    if (vars._identity.employee.defaultsalepoint === salePoints[i].salepoint.id) {
                        let CurrentSalePoint = this.Model.get("POSData.CurrentSalePoint").toJSON(); 
                        CurrentSalePoint = salePoints[i].salepoint;
                        this.Model.set("POSData.CurrentSalePoint", CurrentSalePoint);
                    }
                }
            }

            this.controlSalePoints.html(html);
            this.createClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            $("#pos-btn-salepoint").dropdown({ constrainWidth: false, hover: true });
        }

        protected createEvents(): void {
        }

        protected destroyEvents(): void {
            this.destroyClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
        }

        private SalePointButtonClick(e) {
            let id: string = e.currentTarget.id;
            id = id.replace("set_salepoint_", "");

            let salePoints: Interfaces.Model.ISalePointAccessModel[] = vars._identity.employee.accesssalepoints;
            for (let i = 0, icount = salePoints.length; i < icount; i++) {
                if (salePoints[i].isaccess === true) {
                    if (+id === salePoints[i].salepoint.id) {
                        let CurrentSalePoint = this.Model.get("POSData.CurrentSalePoint").toJSON();
                        CurrentSalePoint = salePoints[i].salepoint;
                        this.Model.set("POSData.CurrentSalePoint", CurrentSalePoint);
                    }
                }
            }
        }
    }
}