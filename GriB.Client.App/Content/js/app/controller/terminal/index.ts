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
        private btnCheks: JQuery;
        private btnCash: JQuery;
        private btnSalePoint: JQuery;
        private controlBreadcrumbs: JQuery;
        private controlItems: JQuery;
        private controlSalePoints: JQuery;
        private controlProgress: JQuery;
        private controlMain: JQuery;
        private controlChecks: JQuery;
        private controlSaleProducts: JQuery;
        public ViewInit(view:JQuery): boolean {
            super.ViewInit(view);
            this.controlBreadcrumbs = view.find("#pos-items-breadcrumbs");
            
            this.addCategory(0, "В начало");
            this.controlProgress = view.find("#progress-container-items");
            this.controlMain = view.find('#posterminal-view-main');
            this.controlItems = view.find('#posterminal-view-items');
            this.controlChecks = view.find("#posterminal-view-checks-container");
            this.controlSaleProducts = view.find("#posterminal-view-items-container");

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
            let result: boolean = super.ViewShow(e);
            $('.chips').chips();
            return result;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            if (this.controlChecks)
                this.controlChecks.height($(window).height() - this.controlChecks.offset().top);
            if (this.controlItems) {
                this.controlItems.width($(window).width() - ($(window).width() >= 600 ? this.controlChecks.width() : 0));
                this.controlItems.height(this.controlChecks.height()); //$(window).height() - this.controlSaleProducts.offset().top);
            }

            if (this.controlSaleProducts) {
                this.controlSaleProducts.height($(window).height() - this.controlSaleProducts.offset().top);
            }
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
                this.addCategory(id, $(e.currentTarget).data("name"));
                this.Model.set("currentCategory", id);
                this.loadSaleProducts();
            }
        }

        private breadCrumbItems: any[];
        private addCategory(cat: number, catname: string): void {
            if (!this.breadCrumbItems) this.breadCrumbItems = [];
            this.breadCrumbItems.push({ id: cat, name: catname });
            //<a id="category_0" class="breadcrumb">Начало</a>
            let breadcrum: JQuery = (cat === -1 ? $('<a id="category_' + cat + '" class="breadcrumb"><i class="material-icons editor-header">list_alt</i></a>') : cat === 0 ? $('<a id="category_' + cat + '" class="breadcrumb"><i class="material-icons editor-header">home</i></a>') : $('<a id="category_' + cat + '" class="breadcrumb">' + catname + '</a>'));
            this.controlBreadcrumbs.append(breadcrum);
            this.createClickEvent(breadcrum, this.BreadCrumbButtonClick);
        }

        private backToCategory(cat: number) {
            let item: any;
            let itemJ: JQuery;
            for (let i = this.breadCrumbItems.length - 1; i > 0; i--) {
                if (this.breadCrumbItems[i].id !== cat) {
                    item = this.breadCrumbItems.pop();
                    itemJ = $('#category_' + item.id);
                    this.destroyClickEvent(itemJ, this.BreadCrumbButtonClick);
                    itemJ.remove();
                }
                else
                    break;
            }

        }

        private BreadCrumbButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let id: number = + targetid.replace("category_", "");

            if (id === -1)
                return;

            this.Model.set("currentCategory", id);
            this.backToCategory(id);
            this.loadSaleProducts();
        }
    }
}