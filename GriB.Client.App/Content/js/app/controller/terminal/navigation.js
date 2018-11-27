define(["require", "exports", "app/common/utils", "app/services/posterminalservice"], function (require, exports, utils, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var Navigation = /** @class */ (function () {
                function Navigation(view, terminal) {
                    this.terminal = terminal;
                    this.controlItems = view.find('#posterminal-view-items');
                    this.controlProgress = view.find("#progress-container-items");
                    this.controlBreadcrumbs = view.find("#pos-items-breadcrumbs");
                    this.controlSaleProducts = view.find("#posterminal-view-items-container");
                    this.currentCategory = 0;
                    this.addCategory(this.currentCategory, "В начало");
                }
                Object.defineProperty(Navigation.prototype, "Service", {
                    get: function () {
                        if (!this.service)
                            this.service = new svc.Services.POSTerminalService();
                        return this.service;
                    },
                    enumerable: true,
                    configurable: true
                });
                Navigation.prototype.loadSaleProducts = function () {
                    var controller = this;
                    controller.ShowLoading();
                    var paramsSelect = { category: this.currentCategory, salepoint: controller.terminal.CurrentSalePoint };
                    controller.Service.GetSaleProducts(paramsSelect, function (responseData) {
                        controller.drawSaleProducts(responseData.items);
                        controller.HideLoading();
                    });
                };
                Navigation.prototype.ResetSaleProducts = function () {
                    this.currentCategory = 0;
                    this.loadSaleProducts();
                };
                Navigation.prototype.ViewResize = function (e) {
                    if (this.controlItems) {
                        this.controlItems.width($(window).width() - ($(window).width() >= 600 ? this.terminal.ControlChecks.width() : 0));
                        this.controlItems.height(this.terminal.ControlChecks.height());
                    }
                    if (this.controlSaleProducts) {
                        this.controlSaleProducts.height($(window).height() - this.controlSaleProducts.offset().top);
                    }
                };
                Navigation.prototype.destroyEvents = function () {
                    utils.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
                };
                Navigation.prototype.ShowLoading = function () {
                    if (this.controlItems)
                        this.controlItems.hide();
                    if (this.controlProgress)
                        this.controlProgress.show();
                };
                Navigation.prototype.HideLoading = function () {
                    if (this.controlProgress)
                        this.controlProgress.hide();
                    if (this.controlItems) {
                        this.controlItems.show();
                    }
                    this.ViewResize({});
                };
                Navigation.prototype.drawSaleProducts = function (items) {
                    this.destroyEvents();
                    var html = '';
                    var item;
                    for (var i = 0, icount = (items ? items.length : 0); i < icount; i++) {
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
                    utils.createClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick, this);
                };
                Navigation.prototype.ItemSaleButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("saleproduct_", "");
                    if (e.currentTarget.classList.contains('category')) {
                        this.addCategory(id, $(e.currentTarget).data("name"));
                        this.currentCategory = id;
                        this.loadSaleProducts();
                    }
                };
                Navigation.prototype.addCategory = function (cat, catname) {
                    if (!this.breadCrumbItems)
                        this.breadCrumbItems = [];
                    this.breadCrumbItems.push({ id: cat, name: catname });
                    //<a id="category_0" class="breadcrumb">Начало</a>
                    var breadcrum = (cat === 0 ? $('<a id="category_' + cat + '" class="breadcrumb"><i class="material-icons editor-header">widgets</i></a>') : $('<a id="category_' + cat + '" class="breadcrumb">' + catname + '</a>'));
                    this.controlBreadcrumbs.append(breadcrum);
                    utils.createClickEvent(breadcrum, this.BreadCrumbButtonClick, this);
                };
                Navigation.prototype.backToCategory = function (cat) {
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
                Navigation.prototype.BreadCrumbButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("category_", "");
                    if (id === -1)
                        return;
                    this.currentCategory = id;
                    this.backToCategory(id);
                    this.loadSaleProducts();
                };
                return Navigation;
            }());
            Terminal.Navigation = Navigation;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigation.js.map