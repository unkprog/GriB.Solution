var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller", "app/common/basecontrol", "app/services/reportsservice", "app/services/posterminalservice"], function (require, exports, vars, utils, base, ctrl, svcReport, svcTerminal) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var Report;
            (function (Report) {
                var ChangeSales = /** @class */ (function (_super) {
                    __extends(ChangeSales, _super);
                    function ChangeSales() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings) {
                            if (_this.EditorSettings.ButtonSetings) {
                                _this.EditorSettings.ButtonSetings.IsPrint = false;
                                _this.EditorSettings.ButtonSetings.IsSave = false;
                                _this.EditorSettings.ButtonSetings.IsCancel = true;
                            }
                        }
                        return _this;
                    }
                    Object.defineProperty(ChangeSales.prototype, "ReportService", {
                        get: function () {
                            if (!this.reportsService)
                                this.reportsService = new svcReport.Services.ReportsService();
                            return this.reportsService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(ChangeSales.prototype, "TerminalService", {
                        get: function () {
                            if (!this.terminalService)
                                this.terminalService = new svcTerminal.Services.POSTerminalService();
                            return this.terminalService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ChangeSales.prototype.createOptions = function () {
                        return { Url: "/Content/view/terminal/report/changesales.html", Id: "changesales-view" };
                    };
                    Object.defineProperty(ChangeSales.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    ChangeSales.prototype.createModel = function () {
                        var result = new kendo.data.ObservableObject({
                            "Header": "",
                            "HeaderChangeReportSales": vars._statres("label$report$bychange"),
                            "reportModel": {
                                "changeRows": [],
                            },
                            "currentSalePoint": 0,
                            "currentChange": 0,
                            "labelRevenue": vars._statres("label$revenue"),
                            "labelCash": vars._statres("label$cash"),
                            "labelNonCash": vars._statres("label$noncash"),
                            "labelReportCash": vars._statres("label$cashname"),
                            "labelEncashment": vars._statres("label$encashment"),
                            "labelDeposit": vars._statres("label$depositmoney"),
                            "labelWithDrawing": vars._statres("label$withdrawingmoney"),
                            "TextRevenueTotal": "0.00",
                            "TextCash": "0.00",
                            "TextNonCash": "0.00",
                            "TextCashTotal": "0.00",
                            "TextEncashment": "0.00",
                            "TextDeposit": "0.00",
                            "TextWithDrawing": "0.00",
                        });
                        return result;
                    };
                    Object.defineProperty(ChangeSales.prototype, "CurrentSalePoint", {
                        get: function () {
                            return this.Model.get("currentSalePoint");
                        },
                        set: function (value) {
                            this.Model.set("currentSalePoint", value);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(ChangeSales.prototype, "CurrentChange", {
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
                    ChangeSales.prototype.ViewInit = function (view) {
                        var controller = this;
                        controller.tableSalesControl = new ctrl.Control.BaseTable();
                        view.find("#changesales-view-table").append(controller.tableSalesControl.InitView());
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    ChangeSales.prototype.loadData = function () {
                        var _this = this;
                        var controller = this;
                        controller.TerminalService.ChangeSumInCash(controller.CurrentSalePoint, function (responseData) {
                            controller.Model.set("TextCashTotal", utils.numberToString(responseData.cashSum, 2));
                        });
                        controller.ReportService.GetChangeSales(controller.CurrentChange, function (responseData) {
                            controller.Model.set("reportModel.changeRows", responseData.rows);
                            _this.Model.set("TextRevenueTotal", utils.numberToString(responseData.sumCash + responseData.sumNonCash, 2));
                            _this.Model.set("TextCash", utils.numberToString(responseData.sumCash, 2));
                            _this.Model.set("TextNonCash", utils.numberToString(responseData.sumNonCash, 2));
                            _this.Model.set("TextEncashment", utils.numberToString(responseData.sumEncashment, 2));
                            _this.Model.set("TextDeposit", utils.numberToString(responseData.sumDeposit, 2));
                            _this.Model.set("TextWithDrawing", utils.numberToString(responseData.sumWithDrawal, 2));
                            _this.setupTable();
                            controller.afterLoad(responseData);
                            controller.endLoad();
                        });
                        return false;
                    };
                    ChangeSales.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    ChangeSales.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        //this.tableSalesControl.OnSelect = $.proxy(this.onSelect, this);
                        //this.EncashmentButtonClick = this.createTouchClickEvent(this.btnEncashment, this.encashmentButtonClick);
                        //this.DepositButtonClick = this.createTouchClickEvent(this.btnDeposit, this.depositButtonClick);
                        //this.WithdrawalButtonClick = this.createTouchClickEvent(this.btnWithDrawing, this.withdrawalButtonClick);
                        //this._CancelButtonClick = this.createTouchClickEvent(this.btnCancelButton, this._cancelButtonClick);
                    };
                    ChangeSales.prototype.destroyEvents = function () {
                        //this.tableSalesControl.OnDetalize = undefined;
                        //if (this.btnEncashment) this.destroyTouchClickEvent(this.btnEncashment, this.EncashmentButtonClick);
                        //if (this.btnDeposit) this.destroyTouchClickEvent(this.btnDeposit, this.DepositButtonClick);
                        //if (this.btnWithDrawing) this.destroyTouchClickEvent(this.btnWithDrawing, this.WithdrawalButtonClick);
                        //if (this.btnCancelButton) this.destroyTouchClickEvent(this.btnCancelButton, this._CancelButtonClick);
                        _super.prototype.destroyEvents.call(this);
                    };
                    ChangeSales.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this);
                        var wWidth = $(window).width();
                        var wHeight = $(window).height();
                        var tbody = (this.tableSalesControl ? this.tableSalesControl.TableBody : undefined);
                        //if (wWidth >= 600) {
                        //    if (this.checkViewContainer && this.checkViewContainer.length > 0) {
                        //        this.checkViewContainer.height(wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1 - 27);
                        //    }
                        if (tbody && tbody.length > 0) {
                            tbody.height(wHeight - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
                        }
                        //}
                        //else {
                        //    if (this.checkViewContainer && this.checkViewContainer.length > 0) {
                        //        this.checkViewContainer.height((wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1) / 2.5);
                        //    }
                        //    if (tbody && tbody.length > 0) {
                        //        tbody.height((wHeight - (this.checkViewContainer && this.checkViewContainer.length > 0 ? this.checkViewContainer.offset().top : 0) - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1));
                        //    }
                        //}
                    };
                    //private onSelect(row: Interfaces.Model.ITableRowModel): void {
                    //    let controller = this;
                    //    this.TerminalService.GetCheckHistory((row as any).checkid, (responseData) => {
                    //        controller.Model.set("reportModel.historyCheck", responseData);
                    //        controller.setupCheckView();
                    //    });
                    //}
                    ChangeSales.prototype.setupTable = function () {
                        this.tableSalesControl.Rows = this.Model.get("reportModel.changeRows");
                        this.tableSalesControl.Columns = [
                            { Header: vars._statres("label$name"), Field: "product.name" },
                            { Header: vars._statres("label$quantityshort"), HeaderStyle: "product-col-sum-auto-rigth", Field: "quantity", FieldStyle: "product-col-sum-auto-rigth", IsSum: true },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true },
                        ];
                        this.tableSalesControl.Setup();
                    };
                    return ChangeSales;
                }(base.Controller.BaseEditor));
                Report.ChangeSales = ChangeSales;
            })(Report = Terminal.Report || (Terminal.Report = {}));
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/report/changesales", function (module) { return new module.Controller.Terminal.Report.ChangeSales(); });
});
//# sourceMappingURL=changesales.js.map