define(["require", "exports", "app/common/variables", "app/common/utils"], function (require, exports, vars, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var NavigationBar = /** @class */ (function () {
                function NavigationBar(view, terminal) {
                    this.terminal = terminal;
                }
                NavigationBar.prototype.Bind = function () {
                    this.initNavbarHeader(this.terminal.View);
                    this.initControlSalePoints(this.terminal.View);
                    this.OpenMenuCashClick = utils.createTouchClickEvent(this.btnCash, this.openMenuCashClick, this, this.terminal.View);
                    this.InCashClick = utils.createTouchClickEvent(this.btnInCash, this.inCashClick, this, this.terminal.View);
                    this.HistorySalesClick = utils.createTouchClickEvent(this.btnHistorySales, this.historySalesClick, this, this.terminal.View);
                    this.ReportByChangeClick = utils.createTouchClickEvent(this.btnReportByChanges, this.reportByChangeClick, this, this.terminal.View);
                    this.CloseChangeClick = utils.createTouchClickEvent(this.btnCloseChange, this.closeChangeClick, this, this.terminal.View);
                };
                NavigationBar.prototype.Unbind = function () {
                    if (this.navHeader)
                        this.navHeader.unbind();
                };
                NavigationBar.prototype.destroyEvents = function () {
                    if (this.controlSalePoints)
                        utils.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
                    if (this.btnCash)
                        utils.destroyTouchClickEvent(this.btnCash, this.OpenMenuCashClick);
                    if (this.btnInCash)
                        utils.destroyTouchClickEvent(this.btnInCash, this.InCashClick);
                    if (this.btnHistorySales)
                        utils.destroyTouchClickEvent(this.btnHistorySales, this.HistorySalesClick);
                    if (this.btnReportByChanges)
                        utils.destroyTouchClickEvent(this.btnReportByChanges, this.ReportByChangeClick);
                    if (this.btnCloseChange)
                        utils.destroyTouchClickEvent(this.btnCloseChange, this.CloseChangeClick);
                };
                NavigationBar.prototype.initNavbarHeader = function (view) {
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
                    this.btnCash = $('<li><a id="pos-btn-cash" data-target="posterminal-view-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
                    this.btnSalePoint = $('<li><a id="pos-btn-salepoint" data-target="posterminal-view-salepoints" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');
                    var posmenubtn = this.navHeader.find("#pos-menu-buttons");
                    posmenubtn.append([this.btnCheks, this.btnCash, this.btnSalePoint]);
                    this.btnInCash = view.find("#posterminal-view-cash-menu-incash");
                    this.btnHistorySales = view.find("#posterminal-view-cash-menu-historysalses");
                    this.btnReportByChanges = view.find("#posterminal-view-cash-menu-reportbychange");
                    this.btnCloseChange = view.find("#posterminal-view-cash-menu-closechange");
                    //this.btnCash.dropdown();
                    view.prepend(this.navHeader);
                    kendo.bind(this.navHeader, this.terminal.Model);
                    //$("#pos-btn-cash").dropdown({ constrainWidth: false });
                };
                // Pltcm
                NavigationBar.prototype.initControlSalePoints = function (view) {
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
                            if (vars._identity.employee.defaultsalepoint === salePoints[i].salepoint.id || vars._identity.employee.defaultsalepoint === 0) {
                                var CurrentSalePoint = this.terminal.Model.get("POSData.CurrentSalePoint").toJSON();
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
                };
                NavigationBar.prototype.SalePointButtonClick = function (e) {
                    var self = this;
                    var id = e.currentTarget.id;
                    id = id.replace("set_salepoint_", "");
                    var salePoints = vars._identity.employee.accesssalepoints;
                    for (var i = 0, icount = salePoints.length; i < icount; i++) {
                        if (salePoints[i].isaccess === true) {
                            if (+id === salePoints[i].salepoint.id) {
                                self.terminal.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                                self.terminal.UpdateSumInCash();
                                self.terminal.Reset();
                                self.terminal.GetChange(function () { });
                            }
                        }
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                };
                NavigationBar.prototype.openMenuCashClick = function (e) {
                    if (!this.menuCashControl) {
                        this.menuCashControl = this.terminal.View.find("#posterminal-view-cash-trigger");
                        this.menuCashControl.dropdown({ constrainWidth: false });
                    }
                    var instance = this.menuCashControl[0];
                    instance.M_Dropdown.el = e.currentTarget;
                    instance.M_Dropdown.open();
                };
                NavigationBar.prototype.closeChangeClick = function (e) {
                    this.terminal.CloseChange();
                };
                NavigationBar.prototype.inCashClick = function (e) {
                    var self = this;
                    vars._app.OpenController({
                        urlController: 'terminal/cashdialog', isModal: true, onLoadController: function (controller) {
                            var ctrCashDialog = controller;
                            ctrCashDialog.Model.set("HeaderCash", vars._statres("label$incash") + self.terminal.Model.get("POSData.MoneyInCash"));
                            ctrCashDialog.OnResult = $.proxy(self.cashDialogResult, self);
                        }
                    });
                };
                NavigationBar.prototype.cashDialogResult = function (controller) {
                    var self = this;
                    var ctrlName = "";
                    var ctrlId = "";
                    if (controller.Result === 1) {
                        ctrlName = 'document/editor/encashment';
                        ctrlId = 'id_encashment';
                    }
                    else if (controller.Result === 2) {
                        ctrlName = 'document/editor/paymentdeposit';
                        ctrlId = 'id_paymentdeposit';
                    }
                    else if (controller.Result === 3) {
                        ctrlName = 'document/editor/paymentwithdrawal';
                        ctrlId = 'id_paymentwithdrawal';
                    }
                    if (ctrlName !== "") {
                        vars._editorData[ctrlId] = 0;
                        vars._app.OpenController({
                            urlController: ctrlName, isModal: true, onLoadController: function (controller) {
                                //let ctrlEditCash: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                                //ctrlEditCash.EditorSettings.ButtonSetings.IsSave = false;
                            }
                        });
                    }
                };
                NavigationBar.prototype.historySalesClick = function (e) {
                    M.toast({ html: vars._statres("label$indevelopment") });
                };
                NavigationBar.prototype.reportByChangeClick = function (e) {
                    M.toast({ html: vars._statres("label$indevelopment") });
                };
                return NavigationBar;
            }());
            Terminal.NavigationBar = NavigationBar;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationbar.js.map