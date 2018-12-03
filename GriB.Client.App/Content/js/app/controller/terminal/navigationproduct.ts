﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import svc = require('app/services/posterminalservice');

export namespace Controller.Terminal {
    export class NavigationProduct {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {

            this.terminal = terminal;
            this.controlItems = view.find('#posterminal-view-items');
            this.controlProgress = view.find("#progress-container-items");
            this.controlBreadcrumbs = view.find("#pos-items-breadcrumbs");
            this.controlSaleProducts = view.find("#posterminal-view-items-container");

            this.currentCategory = 0;
            this.addCategory(this.currentCategory, "В начало");
        }

        private service: svc.Services.POSTerminalService;
        protected get Service(): svc.Services.POSTerminalService {
            if (!this.service)
                this.service = new svc.Services.POSTerminalService();
            return this.service;
        }

        private terminal: Interfaces.ITerminal;
        private controlItems: JQuery;
        private controlProgress: JQuery;
        private controlBreadcrumbs: JQuery;
        private controlSaleProducts: JQuery;

        private currentCategory: number;

        public loadSaleProducts() {
            let controller = this;
            controller.ShowLoading();
            let paramsSelect: Interfaces.Model.IPosParamsSelect = { category: this.currentCategory, salepoint: controller.terminal.CurrentSalePoint };
            controller.Service.GetSaleProducts(paramsSelect, (responseData) => {
                controller.drawSaleProducts(responseData.items);
                controller.HideLoading();
            });

        }

        public ResetSaleProducts() {
            this.currentCategory = 0;
            this.loadSaleProducts();
        }

        public ViewResize(e: any): void {
            if (this.controlItems) {
                this.controlItems.width($(window).width() - ($(window).width() >= 600 ? this.terminal.ControlChecks.width() : 0));
                this.controlItems.height(this.terminal.ControlChecks.height());
            }

            if (this.controlSaleProducts) {
                this.controlSaleProducts.height($(window).height() - this.controlSaleProducts.offset().top);
            }
        }

        public destroyEvents(): void {
            utils.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
        }

        public ShowLoading() {
            if (this.controlItems)
                this.controlItems.hide();
            if (this.controlProgress)
                this.controlProgress.show();
        }

        public HideLoading() {
            if (this.controlProgress)
                this.controlProgress.hide();
            if (this.controlItems) {
                this.controlItems.show();
            }
            this.ViewResize({});
        }

        private drawSaleProducts(items: Interfaces.Model.IPOSSaleProduct[]) {
            this.destroyEvents();

            let html: string = '';
            let item: Interfaces.Model.IPOSSaleProduct;
            for (let i = 0, icount = (items ? items.length : 0); i < icount; i++) {
                item = items[i];
                html += '<a id="saleproduct_' + item.id + '" class="pos-item-sale ' + (item.iscategory === true ? 'category' : '') + '" data-name="' + item.name + '">';
                html += '   <div class="col s6 m6 l4 xl3">';
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
            utils.createClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick, this);
        }

        private ItemSaleButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let id: number = +targetid.replace("saleproduct_", "");
            if (e.currentTarget.classList.contains('category')) {
                this.addCategory(id, $(e.currentTarget).data("name"));
                this.currentCategory = id;
                this.loadSaleProducts();
            }
            else {
                this.terminal.Cheks.AddPosition(id);
            }
        }

        private breadCrumbItems: any[];
        private addCategory(cat: number, catname: string): void {
            if (!this.breadCrumbItems) this.breadCrumbItems = [];
            this.breadCrumbItems.push({ id: cat, name: catname });
            let breadcrum: JQuery = (cat === 0 ? $('<a id="category_' + cat + '" class="breadcrumb"><i class="material-icons editor-header">widgets</i></a>') : $('<a id="category_' + cat + '" class="breadcrumb">' + catname + '</a>'));
            this.controlBreadcrumbs.append(breadcrum);
            utils.createClickEvent(breadcrum, this.BreadCrumbButtonClick, this);
        }

        private backToCategory(cat: number) {
            let item: any;
            let itemJ: JQuery;
            for (let i = this.breadCrumbItems.length - 1; i > 0; i--) {
                if (this.breadCrumbItems[i].id !== cat) {
                    item = this.breadCrumbItems.pop();
                    itemJ = $('#category_' + item.id);
                    utils.destroyClickEvent(itemJ, this.BreadCrumbButtonClick);
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

            this.currentCategory = id;
            this.backToCategory(id);
            this.loadSaleProducts();
        }
    }
}