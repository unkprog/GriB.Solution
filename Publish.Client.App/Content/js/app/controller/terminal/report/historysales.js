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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller", "app/common/basecontrol", "app/common/poscontrol", "app/services/reportsservice", "app/services/posterminalservice"], function (require, exports, vars, utils, base, ctrl, posctrl, svcReport, svcTerminal) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var Report;
            (function (Report) {
                var HistorySales = /** @class */ (function (_super) {
                    __extends(HistorySales, _super);
                    function HistorySales() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings) {
                            if (_this.EditorSettings.ButtonSetings) {
                                _this.EditorSettings.ButtonSetings.IsPrint = true;
                                _this.EditorSettings.ButtonSetings.IsSave = false;
                                _this.EditorSettings.ButtonSetings.IsCancel = true;
                            }
                        }
                        return _this;
                    }
                    Object.defineProperty(HistorySales.prototype, "ReportService", {
                        get: function () {
                            if (!this.reportsService)
                                this.reportsService = new svcReport.Services.ReportsService();
                            return this.reportsService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(HistorySales.prototype, "TerminalService", {
                        get: function () {
                            if (!this.terminalService)
                                this.terminalService = new svcTerminal.Services.POSTerminalService();
                            return this.terminalService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    HistorySales.prototype.createOptions = function () {
                        return { Url: "/Content/view/terminal/report/historysales.html", Id: "historysales-view" };
                    };
                    Object.defineProperty(HistorySales.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    HistorySales.prototype.createModel = function () {
                        var result = new kendo.data.ObservableObject({
                            "Header": "",
                            "HeaderHisorySales": vars._statres("label$historysales"),
                            "reportModel": {
                                "historyRows": [],
                                "historyCheck": {},
                            },
                            "currentChange": 0,
                        });
                        return result;
                    };
                    Object.defineProperty(HistorySales.prototype, "CurrentChange", {
                        get: function () {
                            return this.Model.get("currentChange");
                        },
                        set: function (value) {
                            this.Model.set("currentChange", value);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ;
                    ;
                    HistorySales.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.tableSalesControl = new ctrl.Control.BaseTable();
                        view.find("#historysales-view-table").append(controller.tableSalesControl.InitView());
                        controller.checkViewContainer = view.find("#historysales-view-check");
                        controller.checkViewControl = new posctrl.POSControl.CheckViewControl();
                        controller.checkViewContainer.append(controller.checkViewControl.InitView());
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    HistorySales.prototype.loadData = function () {
                        var controller = this;
                        controller.ReportService.GetHistorySales(controller.CurrentChange, function (responseData) {
                            controller.Model.set("reportModel.historyRows", responseData);
                            controller.afterLoad(responseData);
                            controller.endLoad();
                        });
                        return false;
                    };
                    HistorySales.prototype.loadCheckData = function (id) {
                        var controller = this;
                        controller.TerminalService.GetCheckHistory(id, function (responseData) {
                            controller.Model.set("reportModel.historyCheck", responseData);
                            controller.setupCheckView();
                        });
                        return false;
                    };
                    HistorySales.prototype.afterLoad = function (responseData) {
                        this.setupTable();
                        var historyRows = this.Model.get("reportModel.historyRows");
                        this.loadCheckData((historyRows && historyRows.length > 0 && historyRows[0] && historyRows[0].checkid ? historyRows[0].checkid : 0));
                        _super.prototype.afterLoad.call(this, responseData);
                    };
                    HistorySales.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    HistorySales.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        this.tableSalesControl.OnSelect = $.proxy(this.onSelect, this);
                        //this.EncashmentButtonClick = this.createTouchClickEvent(this.btnEncashment, this.encashmentButtonClick);
                        //this.DepositButtonClick = this.createTouchClickEvent(this.btnDeposit, this.depositButtonClick);
                        //this.WithdrawalButtonClick = this.createTouchClickEvent(this.btnWithDrawing, this.withdrawalButtonClick);
                        //this._CancelButtonClick = this.createTouchClickEvent(this.btnCancelButton, this._cancelButtonClick);
                    };
                    HistorySales.prototype.destroyEvents = function () {
                        this.tableSalesControl.OnDetalize = undefined;
                        //if (this.btnEncashment) this.destroyTouchClickEvent(this.btnEncashment, this.EncashmentButtonClick);
                        //if (this.btnDeposit) this.destroyTouchClickEvent(this.btnDeposit, this.DepositButtonClick);
                        //if (this.btnWithDrawing) this.destroyTouchClickEvent(this.btnWithDrawing, this.WithdrawalButtonClick);
                        //if (this.btnCancelButton) this.destroyTouchClickEvent(this.btnCancelButton, this._CancelButtonClick);
                        _super.prototype.destroyEvents.call(this);
                    };
                    HistorySales.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this);
                        var wWidth = $(window).width();
                        var wHeight = $(window).height();
                        var tbody = (this.tableSalesControl ? this.tableSalesControl.TableBody : undefined);
                        if (wWidth >= 600) {
                            if (this.checkViewContainer && this.checkViewContainer.length > 0) {
                                this.checkViewContainer.height(wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1 - 27);
                            }
                            if (tbody && tbody.length > 0) {
                                tbody.height(wHeight - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
                            }
                        }
                        else {
                            if (this.checkViewContainer && this.checkViewContainer.length > 0) {
                                this.checkViewContainer.height((wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1) / 2.5);
                            }
                            if (tbody && tbody.length > 0) {
                                tbody.height((wHeight - (this.checkViewContainer && this.checkViewContainer.length > 0 ? this.checkViewContainer.offset().top : 0) - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1));
                            }
                        }
                    };
                    HistorySales.prototype.onSelect = function (row) {
                        var controller = this;
                        this.TerminalService.GetCheckHistory(row.checkid, function (responseData) {
                            controller.Model.set("reportModel.historyCheck", responseData);
                            controller.setupCheckView();
                        });
                    };
                    //public DepositButtonClick: { (e: any): void; };
                    //private depositButtonClick(e) {
                    //    this.Model.set("editModel.result", 2);
                    //    this.SaveButtonClick(e);
                    //}
                    //public WithdrawalButtonClick: { (e: any): void; };
                    //private withdrawalButtonClick(e) {
                    //    this.Model.set("editModel.result", 3);
                    //    this.SaveButtonClick(e)
                    //}
                    //public _CancelButtonClick: { (e: any): void; };
                    //private _cancelButtonClick(e) {
                    //    this.Model.set("editModel.result", 0);
                    //    this.SaveButtonClick(e)
                    //}
                    //public validate(): boolean {
                    //    let controller = this;
                    //    let result: boolean = super.validate();
                    //    if (result === true && this.OnResult)
                    //        this.OnResult(controller);
                    //    return result;
                    //}
                    HistorySales.prototype.setupTable = function () {
                        this.tableSalesControl.Rows = this.Model.get("reportModel.historyRows");
                        var payMethod = '#if (payment.ptype === 1) {#<i class="material-icons left">attach_money</i># } else if (payment.ptype === 2) {#<i class="material-icons left">credit_card</i># } else if (payment.ptype === 3) {#<i class="material-icons left">money_off</i>#}#';
                        this.tableSalesControl.Columns = [
                            { Header: vars._statres("label$date"), Field: "payment.cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(payment.cd))#" },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "payment.sum", FieldTemplate: '#=numberToString(payment.sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                            { Header: vars._statres("label$methodpayment"), Field: "payment.ptype", FieldTemplate: payMethod },
                        ];
                        this.tableSalesControl.Setup();
                    };
                    HistorySales.prototype.setupCheckView = function () {
                        //let check: Interfaces.Model.IPOSCheck = this.Model.get("reportModel.historyCheck");
                        this.checkViewControl.POSCheck = this.Model.get("reportModel.historyCheck"); //.Rows = check.positions;
                        //this.checkViewControl.Columns = [
                        //    { Header: "№", Field: "index" },
                        //    { Header: vars._statres("label$namecheck"), Field: "product.name" },
                        //    { Header: vars._statres("label$quantitycheck"), HeaderStyle: "product-col-sum-auto-rigth", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                        //    { Header: vars._statres("label$price"), HeaderStyle: "product-col-sum-auto-rigth", Field: "price", FieldTemplate: '#=numberToString(price,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                        //];
                        //this.checkViewControl.Setup();
                    };
                    HistorySales.prototype.Print = function () {
                        utils.printDocumentPage(this.checkViewControl.View);
                    };
                    return HistorySales;
                }(base.Controller.BaseEditor));
                Report.HistorySales = HistorySales;
            })(Report = Terminal.Report || (Terminal.Report = {}));
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/report/historysales", function (module) { return new module.Controller.Terminal.Report.HistorySales(); });
});
//# sourceMappingURL=historysales.js.map