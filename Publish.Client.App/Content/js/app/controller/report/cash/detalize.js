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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/report/basereport"], function (require, exports, vars, utils, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Report;
        (function (Report) {
            var Cash;
            (function (Cash) {
                var Detalize = /** @class */ (function (_super) {
                    __extends(Detalize, _super);
                    function Detalize() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings && _this.EditorSettings.ButtonSetings)
                            _this.EditorSettings.ButtonSetings.IsSave = false;
                        _this.Model.set("Header", vars._statres("report$cash"));
                        return _this;
                    }
                    Detalize.prototype.createOptions = function () {
                        return { Url: "/Content/view/report/cash/detalize.html", Id: "report-cash-detalize-view" };
                    };
                    Detalize.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "filterModel": {},
                        });
                    };
                    Object.defineProperty(Detalize.prototype, "FilterName", {
                        get: function () {
                            return "reportFilterCashDetalize";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Detalize.prototype.getDefaultFilter = function () {
                        return {
                            datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, IsShowSalepoint: true, IsShowProduct: true
                        };
                    };
                    Detalize.prototype.getSaveFilter = function () {
                        var controller = this;
                        var _datefrom = controller.Model.get("filterModel.datefrom");
                        var _dateto = controller.Model.get("filterModel.dateto");
                        var filterToSave = {
                            datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto),
                            salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"),
                            IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct")
                        };
                        return JSON.stringify(filterToSave);
                    };
                    Detalize.prototype.ViewInit = function (view) {
                        var controller = this;
                        var result = _super.prototype.ViewInit.call(this, view);
                        controller.buildButtonClick(undefined);
                        return result;
                    };
                    Object.defineProperty(Detalize.prototype, "Filter", {
                        get: function () {
                            return this.Model.get("filterModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Detalize.prototype, "Columns", {
                        get: function () {
                            var columns = [];
                            var doctypeTemplate = "#if (doctype === 10) {#" + vars._statres("label$payment") + "# } else if (doctype === 20) {#" + vars._statres("label$encashment") + "#} else if (doctype === 30) {#" + vars._statres("label$depositmoney") + "#} else if (doctype === 40) {#" + vars._statres("label$withdrawingmoney") + "#}#";
                            columns.push({ Header: vars._statres("label$document"), Field: "doctype", FieldTemplate: doctypeTemplate, IsOrder: true });
                            columns.push({ Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" });
                            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
                            columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
                            columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true });
                            return columns;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Detalize.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                    };
                    Detalize.prototype.destroyEvents = function () {
                        _super.prototype.destroyEvents.call(this);
                    };
                    Detalize.prototype.buildButtonClick = function (e) {
                        var self = this;
                        _super.prototype.buildButtonClick.call(this, e);
                        this.Service.GetCashDetail(this.Filter, function (responseData) {
                            self.SetupTable(responseData);
                        });
                    };
                    Detalize.prototype.OnDetalize = function (row) {
                        var item = row;
                        var ctrlName = "";
                        var ctrlId = "";
                        if (item.doctype === 10) {
                            ctrlName = 'document/editor/payment';
                            ctrlId = 'id_payment';
                        }
                        else if (item.doctype === 20) {
                            ctrlName = 'document/editor/paymentdeposit';
                            ctrlId = 'id_paymentdeposit';
                        }
                        else if (item.doctype === 30) {
                            ctrlName = 'document/editor/paymentwithdrawal';
                            ctrlId = 'id_paymentwithdrawal';
                        }
                        else if (item.doctype === 40) {
                            ctrlName = 'document/editor/encashment';
                            ctrlId = 'id_encashment';
                        }
                        if (ctrlName !== "") {
                            vars._editorData[ctrlId] = item.id;
                            vars._app.OpenController({
                                urlController: ctrlName, isModal: true, onLoadController: function (controller) {
                                    var ctrlSale = controller;
                                    ctrlSale.EditorSettings.ButtonSetings.IsSave = false;
                                }
                            });
                        }
                    };
                    return Detalize;
                }(base.Controller.Report.ReportWithService));
                Cash.Detalize = Detalize;
            })(Cash = Report.Cash || (Report.Cash = {}));
        })(Report = Controller.Report || (Controller.Report = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("report/cash/detalize", function (module) { return new module.Controller.Report.Cash.Detalize(); });
});
//# sourceMappingURL=detalize.js.map