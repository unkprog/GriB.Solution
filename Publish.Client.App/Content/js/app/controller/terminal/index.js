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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller", "app/services/posterminalservice", "app/controller/terminal/navigationbar", "app/controller/terminal/navigationproduct", "app/controller/terminal/navigationcheck"], function (require, exports, vars, utils, base, svc, navigationBar, navigationProduct, navigationCheck) {
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
                            "CurrentSalePoint": { id: 0, "name": "" },
                            "CurrentChange": { id: 0 },
                            "MoneyInCash": "0.00",
                        },
                        "labelInCash": vars._statres("label$incash"),
                        "labelHistorySales": vars._statres("label$historysales"),
                        "labelReportByChange": vars._statres("label$report$bychange"),
                        "labelCloseChange": vars._statres("label$closechange"),
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
                Index.prototype.OpenSlideChecks = function () {
                    this.navCheck.OpenSlideChecks();
                };
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
                    this.Model.bind("change", $.proxy(this.changeModel, this));
                };
                Index.prototype.destroyEvents = function () {
                    this.Model.unbind("change");
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
                Index.prototype.GetChange = function (callback) {
                    var _this = this;
                    var self = this;
                    if (self.checkChangeCallBack) {
                        if (callback)
                            callback();
                        return;
                    }
                    self.checkChangeCallBack = callback;
                    self.Service.Change(self.CurrentSalePoint, function (responseData) {
                        var change = responseData.change;
                        if (change && change.id && change.id !== 0) {
                            _this.Model.set("POSData.CurrentChange", change);
                            self.callCheckChangeCallBack();
                        }
                        else {
                            vars._app.OpenController({
                                urlController: 'terminal/changedialog', isModal: true, onLoadController: function (controller) {
                                    var ctrChangeDialog = controller;
                                    ctrChangeDialog.Model.set("HeaderQuery", vars._statres("label$query$opennewchange"));
                                    ctrChangeDialog.OnResult = $.proxy(self.changeDialogResult, self);
                                }
                            });
                        }
                    });
                };
                Index.prototype.changeDialogResult = function (controller) {
                    var self = this;
                    if (controller.Result === 0) {
                        self.Service.ChangeNew(self.CurrentSalePoint, function (responseData) {
                            var change = responseData.change;
                            if (change && change.id && change.id !== 0) {
                                self.Model.set("POSData.CurrentChange", change);
                                self.callCheckChangeCallBack();
                            }
                            else
                                vars._app.ShowMessage(vars._statres("label$openingchange"), vars._statres("msg$error$openingchange"), function () { });
                        });
                    }
                    else {
                        self.Model.set("POSData.CurrentChange", { id: 0 });
                        self.checkChangeCallBack = undefined;
                    }
                };
                Index.prototype.CheckChange = function (callback) {
                    var self = this;
                    if (self.CurrentChange == 0) {
                        this.GetChange(callback);
                    }
                    else if (callback)
                        callback();
                };
                Index.prototype.callCheckChangeCallBack = function () {
                    if (this.checkChangeCallBack)
                        this.checkChangeCallBack();
                    this.checkChangeCallBack = undefined;
                };
                Index.prototype.IsChangeOpen = function () {
                    var result = (this.CurrentChange == 0 ? false : true);
                    if (result === false) {
                        M.toast({ html: vars._statres("label$change$close") });
                    }
                    return result;
                };
                Index.prototype.GetPrinters = function () {
                    var self = this;
                    if (self.CurrentSalePoint == 0)
                        vars._identity.printers = undefined;
                    else
                        self.Service.GetPrinters(self.CurrentSalePoint, function (responseData) {
                            vars._identity.printers = responseData;
                        });
                };
                Index.prototype.changeModel = function (e) {
                    var self = this;
                    if (e.field === "POSData.CurrentSalePoint") {
                        self.UpdateSumInCash();
                        self.GetChange(function () {
                            self.Reset();
                            self.GetPrinters();
                        });
                    }
                };
                Index.prototype.CloseChange = function () {
                    var self = this;
                    if (self.IsChangeOpen() === true) {
                        vars._app.OpenController({
                            urlController: 'terminal/changedialog', isModal: true, onLoadController: function (controller) {
                                var ctrChangeDialog = controller;
                                ctrChangeDialog.Model.set("HeaderQuery", vars._statres("label$query$closechange"));
                                ctrChangeDialog.OnResult = $.proxy(self.changeClodeDialogResult, self);
                            }
                        });
                    }
                };
                Index.prototype.changeClodeDialogResult = function (controller) {
                    var self = this;
                    if (controller.Result === 0) {
                        self.Service.ChangeClose(self.CurrentChange, function (responseData) {
                            self.Model.set("POSData.CurrentChange", { id: 0 });
                        });
                    }
                };
                Index.prototype.UpdateSumInCash = function () {
                    var self = this;
                    self.Service.ChangeSumInCash(self.CurrentSalePoint, function (responseData) {
                        self.Model.set("POSData.MoneyInCash", utils.numberToString(responseData.cashSum, 2));
                    });
                };
                return Index;
            }(base.Controller.Base));
            Terminal.Index = Index;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/index", function (module) { return new module.Controller.Terminal.Index(); });
});
//# sourceMappingURL=index.js.map