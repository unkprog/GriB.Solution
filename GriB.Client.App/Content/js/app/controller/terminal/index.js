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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/services/posterminalservice", "app/common/variables", "app/controller/terminal/navigation"], function (require, exports, vars, base, svc, variables_1, nav) {
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
                Object.defineProperty(Index.prototype, "CurrentSalePoint", {
                    get: function () {
                        var salePoint = this.Model.get("POSData.CurrentSalePoint");
                        return salePoint.id;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Index.prototype, "ControlChecks", {
                    get: function () {
                        return this.controlChecks;
                    },
                    enumerable: true,
                    configurable: true
                });
                Index.prototype.ViewInit = function (view) {
                    _super.prototype.ViewInit.call(this, view);
                    this.navigation = new nav.Controller.Terminal.Navigation(view, this);
                    this.controlMain = view.find('#posterminal-view-main');
                    this.controlProgress = view.find("#progress-container-terminal");
                    this.controlChecks = view.find("#posterminal-view-checks-container");
                    return this.loadData();
                };
                Index.prototype.ShowLoading = function () {
                    if (this.controlProgress)
                        this.controlProgress.show();
                    if (this.controlMain)
                        this.controlMain.hide();
                };
                Index.prototype.HideLoading = function () {
                    if (this.controlProgress)
                        this.controlProgress.hide();
                    if (this.controlMain) {
                        this.controlMain.show();
                    }
                    this.ViewResize({});
                };
                Index.prototype.loadData = function () {
                    var controller = this;
                    controller.POSTerminalService.Enter(function (responseData) {
                        vars._identity.employee = responseData.employee;
                        controller.initNavbarHeader(controller.View);
                        controller.initControlSalePoints(controller.View);
                        controller.HideLoading();
                        controller.navigation.ResetSaleProducts();
                        variables_1._app.HideLoading();
                    });
                    return false;
                };
                Index.prototype.ViewHide = function (e) {
                    this.navHeader.unbind();
                    _super.prototype.ViewHide.call(this, e);
                };
                Index.prototype.ViewShow = function (e) {
                    var result = _super.prototype.ViewShow.call(this, e);
                    $('.chips').chips();
                    return result;
                };
                Index.prototype.ViewResize = function (e) {
                    _super.prototype.ViewResize.call(this, e);
                    if (this.controlChecks)
                        this.controlChecks.height($(window).height() - this.controlChecks.offset().top);
                    if (this.navigation)
                        this.navigation.ViewResize(e);
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
                    this.btnCheks = $('<li><a id="check-items" class="editor-header-button"><i class="material-icons editor-header">list</i></a></li>');
                    this.btnCash = $('<li><a id="pos-btn-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
                    this.btnSalePoint = $('<li><a id="pos-btn-salepoint" data-target="posterminal-view-salepoints" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');
                    this.navHeader.find("#pos-menu-buttons").append(this.btnCheks);
                    this.navHeader.find("#pos-menu-buttons").append(this.btnCash);
                    this.navHeader.find("#pos-menu-buttons").append(this.btnSalePoint);
                    view.prepend(this.navHeader);
                    kendo.bind(this.navHeader, this.Model);
                };
                // Pltcm
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
                    this.navigation.destroyEvents();
                    this.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
                };
                Index.prototype.SalePointButtonClick = function (e) {
                    var id = e.currentTarget.id;
                    id = id.replace("set_salepoint_", "");
                    var salePoints = vars._identity.employee.accesssalepoints;
                    for (var i = 0, icount = salePoints.length; i < icount; i++) {
                        if (salePoints[i].isaccess === true) {
                            if (+id === salePoints[i].salepoint.id) {
                                this.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                                this.navigation.ResetSaleProducts();
                            }
                        }
                    }
                };
                return Index;
            }(base.Controller.Base));
            Terminal.Index = Index;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=index.js.map