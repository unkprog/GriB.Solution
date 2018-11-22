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
                    "CurrentSalePoint": { "name" : "" }
                },
                "currentCategory":0
            });
        }

        private navHeader: JQuery;
        private btnCash: JQuery;
        private btnSalePoint: JQuery;
        private controlBreadcrumbs: JQuery;
        private controlSalePoints: JQuery;
        private controlProgress: JQuery;
        private controlSaleProducts: JQuery;
        public ViewInit(view:JQuery): boolean {
            super.ViewInit(view);
            this.controlBreadcrumbs = view.find("#pos-items-breadcrumbs");

            this.controlProgress = view.find("#progress-container-items");
            this.controlSaleProducts = view.find("#posterminal-view-items-container");

            return this.loadData();
        }

        public ShowLoading() {
            if (this.controlProgress)
                this.controlProgress.show();
            if (this.controlSaleProducts)
                this.controlSaleProducts.hide();
        }

        public HideLoading() {
            if (this.controlProgress)
                this.controlProgress.hide();
            if (this.controlSaleProducts) {
                this.controlSaleProducts.show();
            }
            this.ViewResize({});
        }

        protected loadData(): boolean {
            let controller = this;
            controller.POSTerminalService.Enter((responseData) => {
                vars._identity.employee = responseData.employee;
                controller.initNavbarHeader(controller.View);
                controller.initControlSalePoints(controller.View);
                controller.loadSaleProducts();
                _app.HideLoading();
            });
            return false;
        }

        public ViewHide(e) {
            this.navHeader.unbind();
            super.ViewHide(e);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            this.controlSaleProducts.height($(window).height() - this.controlSaleProducts.offset().top);
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
            $("#pos-btn-salepoint").dropdown({ constrainWidth: false });

            this.createTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
        }

        protected createEvents(): void {
        }

        protected destroyEvents(): void {
            this.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
            this.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
        }

        private SalePointButtonClick(e): void {
            let id: string = e.currentTarget.id;
            id = id.replace("set_salepoint_", "");

            let salePoints: Interfaces.Model.ISalePointAccessModel[] = vars._identity.employee.accesssalepoints;
            for (let i = 0, icount = salePoints.length; i < icount; i++) {
                if (salePoints[i].isaccess === true) {
                    if (+id === salePoints[i].salepoint.id) {
                        this.Model.set("currentCategory", 0);
                        this.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                        this.loadSaleProducts();
                    }
                }
            }
        }

        private loadSaleProducts() {
            let controller = this;
            controller.ShowLoading();
            let salePoint: Interfaces.Model.ISalepoint = controller.Model.get("POSData.CurrentSalePoint");
            let category: number = controller.Model.get("currentCategory");
            let paramsSelect: Interfaces.Model.IPosParamsSelect = { category: category, salepoint: salePoint.id };
            controller.POSTerminalService.GetSaleProducts(paramsSelect, (responseData) => {
                controller.drawSaleProducts(responseData.items);
                controller.HideLoading();
            });
            
        }

        private drawSaleProducts(items: Interfaces.Model.IPOSSaleProduct[]) {
            this.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);

            let html: string = '';
            let item: Interfaces.Model.IPOSSaleProduct;
            for (let i = 0, icount = (items ? items.length : 0); i < icount; i++) {
                item = items[i];
                html += '<a id="saleproduct_' + item.id + '" class="pos-item-sale ' + (item.iscategory === true ? 'category' : '') + '" data-name="' + item.name + '">';
                html += '   <div class="col s6 m4 l3 xl2">';
                html += '       <div class="card pos-item-card">';
                html += '           <div class="pos-item-card-image" style="background-image:url(' + item.photo + ')">';
                html += '             <div class="card-content pos-item-card-content center">';
                html += '                   <div class="pos-item-card-description">';
                html += '                       <p>' + item.name + '</p>';
                html += '                   </div>';
                html += '            </div>';
                html += '           </div>';
                html += '       </div>';
                html += '   </div>';
                html += '</a>';
            }
            this.controlSaleProducts.html(html);
            this.createClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
        }

        private ItemSaleButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let id: number = + targetid.replace("saleproduct_", "");
            if (e.currentTarget.classList.contains('category')) {
                let breadcrum: JQuery = $('<a id="category_' + targetid + '" class="breadcrumb">' + $(e.currentTarget).data("name") + '</a>');
                this.controlBreadcrumbs.append(breadcrum);

                this.Model.set("currentCategory", id);
                this.loadSaleProducts();
            }
        }
    }
}