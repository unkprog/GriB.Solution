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
                };
                NavigationBar.prototype.Unbind = function () {
                    if (this.navHeader)
                        this.navHeader.unbind();
                };
                NavigationBar.prototype.destroyEvents = function () {
                    utils.destroyTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick);
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
                    this.btnCash = $('<li><a id="pos-btn-cash" class="editor-header-button"><i class="material-icons editor-header">account_balance_wallet</i></a></li>');
                    this.btnSalePoint = $('<li><a id="pos-btn-salepoint" data-target="posterminal-view-salepoints" class="editor-header-button"><i class="material-icons editor-header">account_balance</i></a></li>');
                    this.navHeader.find("#pos-menu-buttons").append(this.btnCheks);
                    this.navHeader.find("#pos-menu-buttons").append(this.btnCash);
                    this.navHeader.find("#pos-menu-buttons").append(this.btnSalePoint);
                    view.prepend(this.navHeader);
                    kendo.bind(this.navHeader, this.terminal.Model);
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
                            if (vars._identity.employee.defaultsalepoint === salePoints[i].salepoint.id) {
                                var CurrentSalePoint = this.terminal.Model.get("POSData.CurrentSalePoint").toJSON();
                                CurrentSalePoint = salePoints[i].salepoint;
                                this.terminal.Model.set("POSData.CurrentSalePoint", CurrentSalePoint);
                            }
                        }
                    }
                    this.controlSalePoints.html(html);
                    $("#pos-btn-salepoint").dropdown({ constrainWidth: false });
                    utils.createTouchClickEvent(this.controlSalePoints.find('a'), this.SalePointButtonClick, this, this.controlSalePoints);
                };
                NavigationBar.prototype.SalePointButtonClick = function (e) {
                    var id = e.currentTarget.id;
                    id = id.replace("set_salepoint_", "");
                    var salePoints = vars._identity.employee.accesssalepoints;
                    for (var i = 0, icount = salePoints.length; i < icount; i++) {
                        if (salePoints[i].isaccess === true) {
                            if (+id === salePoints[i].salepoint.id) {
                                this.terminal.Model.set("POSData.CurrentSalePoint", salePoints[i].salepoint);
                                this.terminal.Reset();
                            }
                        }
                    }
                };
                return NavigationBar;
            }());
            Terminal.NavigationBar = NavigationBar;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationbar.js.map