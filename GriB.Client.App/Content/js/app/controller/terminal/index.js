var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/services/posterminalservice", "app/common/variables"], function (require, exports, vars, base, svc, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Object.defineProperty(Index.prototype, "POSTerminalService", {
                    get: function () {
                        if (!this.posTerminalService)
                            this.posTerminalService = new svc.Services.POSTerminalService();
                        return this.posTerminalService;
                    },
                    enumerable: true,
                    configurable: true
                });
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/index.html", Id: "posterminal-view" };
                };
                Index.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": " ",
                        "POSData": {
                            "CurrentSalePoint": { "name": "" }
                        },
                        "currentCategory": 0
                    });
                };
                Index.prototype.ViewInit = function (view) {
                    _super.prototype.ViewInit.call(this, view);
                    this.controlBreadcrumbs = view.find("#pos-items-breadcrumbs");
                    this.controlProgress = view.find("#progress-container-items");
                    this.controlSaleProducts = view.find("#posterminal-view-items-container");
                    return this.loadData();
                };
                Index.prototype.ShowLoading = function () {
                    if (this.controlProgress)
                        this.controlProgress.show();
                    if (this.controlSaleProducts)
                        this.controlSaleProducts.hide();
                };
                Index.prototype.HideLoading = function () {
                    if (this.controlProgress)
                        this.controlProgress.hide();
                    if (this.controlSaleProducts) {
                        this.controlSaleProducts.show();
                    }
                    this.ViewResize({});
                };
                Index.prototype.loadData = function () {
                    var controller = this;
                    controller.POSTerminalService.Enter(function (responseData) {
                        vars._identity.employee = responseData.employee;
                        controller.initNavbarHeader(controller.View);
                        controller.initControlSalePoints(controller.View);
                        controller.loadSaleProducts();
                        variables_1._app.HideLoading();
                    });
                    return false;
                };
                Index.prototype.ViewHide = function (e) {
                    this.navHeader.unbind();
                    _super.prototype.ViewHide.call(this, e);
                };
                Index.prototype.ViewShow = function (e) {
                    return _super.prototype.ViewShow.call(this, e);
                };
                Index.prototype.ViewResize = function (e) {
                    _super.prototype.ViewResize.call(this, e);
                    this.controlSaleProducts.height($(window).height() - this.controlSaleProducts.offset().top);
                };
                Index.prototype.initNavbarHeader = function (view) {
                    var navbarHeader = '<div class="navbar-fixed editor-header z-depth-1">';
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
                };
                Index.prototype.initControlSalePoints = function (view) {
                    this.controlSalePoints = view.find('#posterminal-view-salepoints');
                    var salePoints = vars._identity.employee.accesssalepoints;
                    var html = '';
                    for (var i = 0, icount = salePoints.length; i < icount; i++) {
                        if (salePoints[i].isaccess === true) {
                            html += '<li><a id="set_salepoint_';
                            html += salePoints[i].salepoint.id;
                            html += '" href="#!">';
                            html += salePoints[i].salepoint.name;
                            html += '</a></li>';
                            if (vars._identity.employee.defaultsalepoint === salePoints[i].salepoint.id) {
                                var CurrentSalePoint = this.Model.get("POSData.CurrentSalePoint").toJSON();
                                CurrentSalePoint = salePoints[i].salepoint;
                                this.Model.set("POSData.CurrentSalePoint", CurrentSalePoint);
                            }
                        }
                    }
                    this.controlSalePoints.html(html);
                    $("#pos-btn-salepoint").dropdown({ constrainWidth: false });
                    this.createTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
                };
                Index.prototype.createEvents = function () {
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
                    this.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
                };
                Index.prototype.SalePointButtonClick = function (e) {
                    var id = e.currentTarget.id;
                    id = id.replace("set_salepoint_", "");
                    var salePoints = vars._identity.employee.accesssalepoints;
                    for (var i = 0, icount = salePoints.length; i < icount; i++) {
                        if (salePoints[i].isaccess === true) {
                            if (+id === salePoints[i].salepoint.id) {
                                this.Model.set("currentCategory", 0);
                                this.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                                this.loadSaleProducts();
                            }
                        }
                    }
                };
                Index.prototype.loadSaleProducts = function () {
                    var controller = this;
                    controller.ShowLoading();
                    var salePoint = controller.Model.get("POSData.CurrentSalePoint");
                    var category = controller.Model.get("currentCategory");
                    var paramsSelect = { category: category, salepoint: salePoint.id };
                    controller.POSTerminalService.GetSaleProducts(paramsSelect, function (responseData) {
                        controller.drawSaleProducts(responseData.items);
                        controller.HideLoading();
                    });
                };
                Index.prototype.drawSaleProducts = function (items) {
                    this.destroyClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
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
                    this.createClickEvent(this.controlSaleProducts.find('a'), this.ItemSaleButtonClick);
                };
                Index.prototype.ItemSaleButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("saleproduct_", "");
                    if (e.currentTarget.classList.contains('category')) {
                        var breadcrum = $('<a id="category_' + targetid + '" class="breadcrumb">' + $(e.currentTarget).data("name") + '</a>');
                        this.controlBreadcrumbs.append(breadcrum);
                        this.Model.set("currentCategory", id);
                        this.loadSaleProducts();
                    }
                };
                return Index;
            }(base.Controller.Base));
            Terminal.Index = Index;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=index.js.map