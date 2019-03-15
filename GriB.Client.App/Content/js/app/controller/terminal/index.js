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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/services/posterminalservice", "app/controller/terminal/navigationbar", "app/controller/terminal/navigationproduct", "app/controller/terminal/navigationcheck"], function (require, exports, vars, base, svc, navigationBar, navigationProduct, navigationCheck) {
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
                Object.defineProperty(Index.prototype, "Service", {
                    get: function () {
                        if (!this.service)
                            this.service = new svc.Services.POSTerminalService();
                        return this.service;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Index.prototype, "Cheks", {
                    get: function () {
                        return this.navCheck;
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
                        "labelPayment": vars._statres("label$payment"),
                    });
                };
                Object.defineProperty(Index.prototype, "CurrentSalePoint", {
                    get: function () {
                        var salePoint = this.Model.get("POSData.CurrentSalePoint");
                        return (salePoint && salePoint.id ? salePoint.id : 0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Index.prototype, "CurrentChange", {
                    get: function () {
                        var change = this.Model.get("POSData.CurrentChange");
                        return (change && change.id ? change.id : 0);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Index.prototype, "ControlChecks", {
                    get: function () {
                        return this.navCheck.ControlContainerChecks;
                    },
                    enumerable: true,
                    configurable: true
                });
                Index.prototype.ViewInit = function (view) {
                    this.navBar = new navigationBar.Controller.Terminal.NavigationBar(view, this);
                    this.navProduct = new navigationProduct.Controller.Terminal.NavigationProduct(view, this);
                    this.navCheck = new navigationCheck.Controller.Terminal.NavigationCheck(view, this);
                    _super.prototype.ViewInit.call(this, view);
                    this.controlMain = view.find('#posterminal-view-main');
                    this.controlProgress = view.find("#progress-container-terminal");
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
                Index.prototype.checkSettings = function () {
                    //let controller = this;
                    var result = false;
                    if (vars._identity.employee && vars._identity.employee.accesssalepoints && vars._identity.employee.accesssalepoints.length > 0) {
                        if (this.existsAccessSalepoint() === false) {
                            if (vars._identity.employee.isfullaccess === true) {
                                vars._app.ShowMessage(vars._statres("label$settings"), vars._statres("msg$error$settings$notaccesssalepoint"), function () {
                                    vars._app.OpenController({ urlController: "setting/index" });
                                });
                            }
                            else {
                                vars._app.ShowMessage(vars._statres("button$label$enter"), vars._statres("msg$error$notaccess"), function () {
                                    vars._app.OpenController({ urlController: "security/login" });
                                });
                            }
                        }
                        else {
                            result = true;
                        }
                    }
                    else {
                        if (vars._identity.employee.isfullaccess === true) {
                            vars._app.ShowMessage(vars._statres("label$settings"), vars._statres("msg$error$settings$notfill"), function () {
                                vars._app.OpenController({ urlController: "setting/index" });
                            });
                        }
                        else {
                            vars._app.ShowMessage(vars._statres("button$label$enter"), vars._statres("msg$error$notaccess"), function () {
                                vars._app.OpenController({ urlController: "security/login" });
                            });
                        }
                    }
                    return result;
                };
                Index.prototype.loadData = function () {
                    var controller = this;
                    controller.Service.Enter(function (responseData) {
                        vars._identity.employee = responseData.employee;
                        if (controller.checkSettings() === true) {
                            controller.navBar.Bind();
                            controller.Reset();
                        }
                        controller.HideLoading();
                        vars._app.HideLoading();
                    });
                    return false;
                };
                Index.prototype.existsAccessSalepoint = function () {
                    var result = false;
                    var salePoints = vars._identity.employee.accesssalepoints;
                    for (var i = 0, icount = salePoints.length; i < icount; i++) {
                        if (salePoints[i].isaccess === true) {
                            result = true;
                        }
                    }
                    return result;
                };
                Index.prototype.ViewHide = function (e) {
                    this.navBar.Unbind();
                    _super.prototype.ViewHide.call(this, e);
                };
                Index.prototype.ViewShow = function (e) {
                    var result = _super.prototype.ViewShow.call(this, e);
                    if (this.navCheck)
                        this.navCheck.ViewShow(e);
                    return result;
                };
                Index.prototype.ViewResize = function (e) {
                    _super.prototype.ViewResize.call(this, e);
                    if (this.navCheck)
                        this.navCheck.ViewResize(e);
                    if (this.navProduct)
                        this.navProduct.ViewResize(e);
                };
                Index.prototype.createEvents = function () {
                    if (this.navCheck)
                        this.navCheck.createEvents();
                };
                Index.prototype.destroyEvents = function () {
                    if (this.navCheck)
                        this.navCheck.destroyEvents();
                    if (this.navProduct)
                        this.navProduct.destroyEvents();
                    if (this.navBar)
                        this.navBar.destroyEvents();
                };
                Index.prototype.Reset = function () {
                    if (this.navProduct)
                        this.navProduct.Reset();
                    if (this.navCheck)
                        this.navCheck.Reset();
                };
                return Index;
            }(base.Controller.Base));
            Terminal.Index = Index;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/index", function (module) { return new module.Controller.Terminal.Index(); });
});
//# sourceMappingURL=index.js.map