define(["require", "exports", "app/common/utils", "app/services/posterminalservice"], function (require, exports, utils, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var NavigationProduct = /** @class */ (function () {
                function NavigationProduct(view, terminal) {
                    this.terminal = terminal;
                    this.controlItems = view.find('#posterminal-view-items');
                    this.controlProgress = view.find("#progress-container-items");
                    this.controlBreadcrumbs = view.find("#pos-items-breadcrumbs");
                    this.controlSaleProducts = view.find("#posterminal-view-items-container");
                    this.currentCategory = 0;
                    this.addCategory(this.currentCategory, "В начало");
                }
                Object.defineProperty(NavigationProduct.prototype, "Service", {
                    get: function () {
                        if (!this.service)
                            this.service = new svc.Services.POSTerminalService();
                        return this.service;
                    },
                    enumerable: true,
                    configurable: true
                });
                NavigationProduct.prototype.loadData = function () {
                    var controller = this;
                    controller.ShowLoading();
                    var paramsSelect = { category: this.currentCategory, salepoint: controller.terminal.CurrentSalePoint };
                    controller.Service.GetSaleProducts(paramsSelect, function (responseData) {
                        controller.drawSaleProducts(responseData.items);
                        controller.HideLoading();
                    });
                };
                NavigationProduct.prototype.Reset = function () {
                    this.currentCategory = 0;
                    this.clearBreadCrumb();
                    this.loadData();
                };
                NavigationProduct.prototype.ViewResize = function (e) {
                    if (this.controlItems) {
                        this.controlItems.width($(window).width() - ($(window).width() >= 600 ? this.terminal.ControlChecks.width() : 0) - 2);
                        this.controlItems.height(this.terminal.ControlChecks.height());
                    }
                    if (this.controlSaleProducts) {
                        this.controlSaleProducts.height($(window).height() - this.controlSaleProducts.offset().top);
                    }
                };
                NavigationProduct.prototype.destroyEvents = function () {
                    utils.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
                };
                NavigationProduct.prototype.ShowLoading = function () {
                    if (this.controlItems)
                        this.controlItems.hide();
                    if (this.controlProgress)
                        this.controlProgress.show();
                };
                NavigationProduct.prototype.HideLoading = function () {
                    if (this.controlProgress)
                        this.controlProgress.hide();
                    if (this.controlItems) {
                        this.controlItems.show();
                    }
                    this.ViewResize({});
                };
                NavigationProduct.prototype.drawSaleProducts = function (items) {
                    this.destroyEvents();
                    var html = '';
                    var height = $(window).height();
                    var width = $(window).width();
                    var item;
                    for (var i = 0, icount = (items ? items.length : 0); i < icount; i++) {
                        item = items[i];
                        html += '<a id="saleproduct_' + item.id + '" class="pos-item-sale ' + (item.iscategory === true ? 'category' : '') + '" data-name="' + item.name + '">';
                        html += '   <div class="col ' + ((width <= 667) || height <= 411 ? 's6 m6' : 's4 m4') + ' l4 xl3">'; //&& width < 992
                        html += '       <div class="card pos-item-card hoverable">';
                        html += '           <div class="pos-item-card-image" style="background-image:url(' + item.photo + ')">';
                        html += '             <div class="card-content pos-item-card-content">';
                        html += '                   <div class="pos-item-card-description center">';
                        html += '                       <p>' + item.name + '</p>';
                        html += '                   </div>';
                        if (item.iscategory === false && item.price && item.price != 0) {
                            html += '                   <span class="rigth center z-depth-2 pos-item-card-price">';
                            html += '                       <p>' + utils.numberToString(item.price, 2) + '</p>';
                            html += '                   </span>';
                        }
                        html += '            </div>';
                        html += '           </div>';
                        html += '       </div>';
                        html += '   </div>';
                        html += '</a>';
                    }
                    this.controlSaleProducts.html(html);
                    utils.createClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick, this);
                };
                NavigationProduct.prototype.ItemSaleButtonClick = function (e) {
                    var self = this;
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("saleproduct_", "");
                    if (e.currentTarget.classList.contains('category')) {
                        self.addCategory(id, $(e.currentTarget).data("name"));
                        self.currentCategory = id;
                        self.loadData();
                    }
                    else {
                        self.terminal.CheckChange(true, function () {
                            self.terminal.Cheks.AddPosition(id);
                        });
                    }
                };
                NavigationProduct.prototype.addCategory = function (cat, catname) {
                    if (!this.breadCrumbItems)
                        this.breadCrumbItems = [];
                    this.breadCrumbItems.push({ id: cat, name: catname });
                    var breadcrum = (cat === 0 ? $('<a id="category_' + cat + '" class="breadcrumb"><i class="material-icons editor-header">widgets</i></a>') : $('<a id="category_' + cat + '" class="breadcrumb">' + catname + '</a>'));
                    this.controlBreadcrumbs.append(breadcrum);
                    utils.createClickEvent(breadcrum, this.BreadCrumbButtonClick, this);
                };
                NavigationProduct.prototype.clearBreadCrumb = function () {
                    var item;
                    var itemJ;
                    for (var i = this.breadCrumbItems.length - 1; i > 0; i--) {
                        item = this.breadCrumbItems.pop();
                        itemJ = $('#category_' + item.id);
                        utils.destroyClickEvent(itemJ, this.BreadCrumbButtonClick);
                        itemJ.remove();
                    }
                };
                NavigationProduct.prototype.backToCategory = function (cat) {
                    var item;
                    var itemJ;
                    for (var i = this.breadCrumbItems.length - 1; i > 0; i--) {
                        if (this.breadCrumbItems[i].id !== cat) {
                            item = this.breadCrumbItems.pop();
                            itemJ = $('#category_' + item.id);
                            utils.destroyClickEvent(itemJ, this.BreadCrumbButtonClick);
                            itemJ.remove();
                        }
                        else
                            break;
                    }
                };
                NavigationProduct.prototype.BreadCrumbButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("category_", "");
                    if (id === -1)
                        return;
                    this.currentCategory = id;
                    this.backToCategory(id);
                    this.loadData();
                };
                return NavigationProduct;
            }());
            Terminal.NavigationProduct = NavigationProduct;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationproduct.js.map