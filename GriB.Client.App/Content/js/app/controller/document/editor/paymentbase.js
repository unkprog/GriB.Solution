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
define(["require", "exports", "app/common/basecontroller", "app/services/documentservice", "app/services/settingsservice", "app/common/variables", "app/common/utils"], function (require, exports, base, svc, svcSetting, vars, utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var PaymentBase = /** @class */ (function (_super) {
                    __extends(PaymentBase, _super);
                    function PaymentBase() {
                        var _this = _super.call(this) || this;
                        _this.isUpdateSum = false;
                        return _this;
                    }
                    Object.defineProperty(PaymentBase.prototype, "Service", {
                        get: function () {
                            if (!this.documentService)
                                this.documentService = new svc.Services.DocumentService();
                            return this.documentService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "SettingService", {
                        get: function () {
                            if (!this.settingService)
                                this.settingService = new svcSetting.Services.SettingsService();
                            return this.settingService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentBase.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/editor/payment.html", Id: "payment-view" };
                    };
                    PaymentBase.prototype.createModel = function () {
                        var oo = new kendo.data.ObservableObject({
                            "Header": this.Header,
                            "labelDocument": "",
                            "editModel": {},
                            "labelConduct": vars._statres("label$conduct"),
                            "labelDate": vars._statres("label$date"),
                            "labelSalepoint": vars._statres("label$salePoint"),
                            "labelClient": vars._statres("label$client"),
                            "labelName": vars._statres("label$name"),
                            "labelSum": vars._statres("label$sum"),
                            "labelComment": vars._statres("label$comment"),
                            "labelMethodPayment": vars._statres("label$methodpayment"),
                            "labelCash": vars._statres("label$cash"),
                            "labelNonCash": vars._statres("label$noncash"),
                            "labelWithOutPayment": vars._statres("label$withoutpayment"),
                            "labelNotSelected": vars._statres("label$notselected"),
                            "labelOnCredit": vars._statres("label$oncredit"),
                            "labelOnTheHouse": vars._statres("label$onthehouse"),
                            "labelClientLeft": vars._statres("label$clientleft"),
                            "labelIncome": vars._statres("label$articleincome"),
                            "labelCost": vars._statres("label$articlecost"),
                            "labelAccount": vars._statres("label$account"),
                            "paymentConduct": true,
                            "optionValue": 1,
                            "totalSumText": "0.00",
                        });
                        return oo;
                    };
                    Object.defineProperty(PaymentBase.prototype, "EditorModel", {
                        get: function () {
                            var model = this.Model.get("editModel").toJSON();
                            return model;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentBase.prototype.getSaveModel = function () {
                        var model = _super.prototype.getSaveModel.call(this);
                        if (model) {
                            model.doctype = 10;
                        }
                        return model;
                    };
                    PaymentBase.prototype.createEditorSettings = function () {
                        return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetPayment, this.Service), Save: $.proxy(this.Service.SetPayment, this.Service) };
                    };
                    Object.defineProperty(PaymentBase.prototype, "EditIdName", {
                        get: function () {
                            return "id_payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentBase.prototype.validateStock = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if ((model.options & 1) === 1) {
                            if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                                M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
                                result = false;
                            }
                        }
                        return result;
                    };
                    PaymentBase.prototype.validate = function () {
                        var result = this.validateStock();
                        var model = this.EditorModel;
                        if ((model.options & 1) === 1) {
                            if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                                M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
                                result = false;
                            }
                            if (model.comment.length > 510) {
                                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$comment"), 510) });
                                result = false;
                            }
                            var type = this.Model.get("editModel.ptype");
                            if (type == 3) {
                                if (!model.client || !model.client.id || model.client.id === 0) {
                                    M.toast({ html: vars._statres("error$without$clientnotspecified") });
                                    result = false;
                                }
                            }
                        }
                        return result;
                    };
                    Object.defineProperty(PaymentBase.prototype, "DocFormatDate", {
                        get: function () {
                            return "dd.mm.yyyy";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentBase.prototype.ViewInit = function (view) {
                        this.dateControl = view.find("#payment-view-date");
                        this.dateControl.datepicker({ format: this.DocFormatDate });
                        this.salePointControl = view.find("#payment-view-salepoint-row");
                        this.clientControl = view.find("#payment-view-client-row");
                        this.clientClearControl = view.find("#payment-view-client-clear");
                        this.incomeControl = view.find("#payment-view-income-row");
                        this.incomeClearControl = view.find("#payment-view-income-clear");
                        this.costControl = view.find("#payment-view-cost-row");
                        this.costClearControl = view.find("#payment-view-cost-clear");
                        this.accountControl = view.find("#payment-view-account-row");
                        this.accountClearControl = view.find("#payment-view-account-clear");
                        this.methodPaymentRow = view.find("#payment-view-payment-type-row");
                        this.methodPayment = view.find("#payment-view-payment-type");
                        this.methodPaymentWitOut = view.find("#payment-view-payment-type-without");
                        this.optionPaymentRow = view.find("#payment-view-payment-option-row");
                        this.optionPayment = view.find("#payment-view-payment-option");
                        this.commentControl = view.find("#payment-view-comment-row");
                        view.find("#payment-view-comment").characterCounter();
                        if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === false) {
                            this.dateControl.attr('disabled', 'disabled');
                            view.find("#payment-view-comment").attr('disabled', 'disabled');
                            view.find("#payment-view-conduct").attr('disabled', 'disabled');
                        }
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    PaymentBase.prototype.ViewShow = function (e) {
                        this.methodPayment.formSelect();
                        this.optionPayment.formSelect();
                        M.textareaAutoResize($("#payment-view-comment"));
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    PaymentBase.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
                            this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);
                            this.ClientButtonClick = this.createTouchClickEvent(this.clientControl, this.clientButtonClick);
                            this.ClearClientButtonClick = this.createTouchClickEvent(this.clientClearControl, this.clearClientButtonClick);
                            this.IncomeButtonClick = this.createTouchClickEvent(this.incomeControl, this.incomeButtonClick);
                            this.ClearIncomeButtonClick = this.createTouchClickEvent(this.incomeClearControl, this.clearIncomeButtonClick);
                            this.CostButtonClick = this.createTouchClickEvent(this.costControl, this.costButtonClick);
                            this.ClearCostButtonClick = this.createTouchClickEvent(this.costClearControl, this.clearCostButtonClick);
                            this.AccountButtonClick = this.createTouchClickEvent(this.accountControl, this.accountButtonClick);
                            this.ClearAccountButtonClick = this.createTouchClickEvent(this.accountClearControl, this.clearAccountButtonClick);
                        }
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    PaymentBase.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
                        if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
                            this.destroyTouchClickEvent(this.accountClearControl, this.ClearAccountButtonClick);
                            this.destroyTouchClickEvent(this.accountControl, this.AccountButtonClick);
                            this.destroyTouchClickEvent(this.costClearControl, this.ClearCostButtonClick);
                            this.destroyTouchClickEvent(this.costControl, this.CostButtonClick);
                            this.destroyTouchClickEvent(this.incomeClearControl, this.ClearIncomeButtonClick);
                            this.destroyTouchClickEvent(this.incomeControl, this.IncomeButtonClick);
                            this.destroyTouchClickEvent(this.clientClearControl, this.ClearClientButtonClick);
                            this.destroyTouchClickEvent(this.clientControl, this.ClientButtonClick);
                            this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
                        }
                        _super.prototype.destroyEvents.call(this);
                    };
                    PaymentBase.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        this.methodPayment.formSelect();
                        this.optionPayment.formSelect();
                    };
                    PaymentBase.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        var dateTime = new Date(responseData.record.cd);
                        this.dateControl.val(utils.date_ddmmyyyy(dateTime));
                        M.Datepicker.getInstance(this.dateControl[0]).setDate(dateTime, true);
                        this.Model.set("paymentConduct", ((responseData.record.options & 1) === 1));
                        this.Model.set("optionValue", ((responseData.record.options & 2) === 2 ? 1 : (responseData.record.options & 4) === 4 ? 2 : 3));
                        this.changeModel({ field: "editModel.ptype" });
                        this.isUpdateSum = true;
                        this.Model.set("totalSumText", utils.numberToString(responseData.record.sum, 2));
                        this.isUpdateSum = false;
                    };
                    PaymentBase.prototype.clientButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/client', isModal: true, onLoadController: function (controller) {
                                var ctrlTypePayment = controller;
                                ctrlTypePayment.CardSettings.IsAdd = false;
                                ctrlTypePayment.CardSettings.IsAddCopy = false;
                                ctrlTypePayment.CardSettings.IsDelete = false;
                                ctrlTypePayment.CardSettings.IsEdit = false;
                                ctrlTypePayment.CardSettings.IsSelect = true;
                                ctrlTypePayment.OnSelect = $.proxy(self.selectClient, self);
                            }
                        });
                    };
                    PaymentBase.prototype.selectClient = function (controller) {
                        var client = controller.getSelectedRecord();
                        if (client)
                            this.Model.set("editModel.client", client);
                        M.updateTextFields();
                    };
                    PaymentBase.prototype.clearClientButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("editModel.client", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentBase.prototype.salePointButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/salepoint', isModal: true, onLoadController: function (controller) {
                                var ctrlTypePayment = controller;
                                ctrlTypePayment.CardSettings.IsAdd = false;
                                ctrlTypePayment.CardSettings.IsAddCopy = false;
                                ctrlTypePayment.CardSettings.IsDelete = false;
                                ctrlTypePayment.CardSettings.IsEdit = false;
                                ctrlTypePayment.CardSettings.IsSelect = true;
                                ctrlTypePayment.OnSelect = $.proxy(self.selectSalePoint, self);
                            }
                        });
                    };
                    PaymentBase.prototype.selectSalePoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("editModel.salepoint", salepoint);
                        M.updateTextFields();
                    };
                    PaymentBase.prototype.incomeButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/income', isModal: true, onLoadController: function (controller) {
                                var ctrlIncome = controller;
                                ctrlIncome.CardSettings.IsAdd = false;
                                ctrlIncome.CardSettings.IsAddCopy = false;
                                ctrlIncome.CardSettings.IsDelete = false;
                                ctrlIncome.CardSettings.IsEdit = false;
                                ctrlIncome.CardSettings.IsSelect = true;
                                ctrlIncome.OnSelect = $.proxy(self.selectIncome, self);
                            }
                        });
                    };
                    PaymentBase.prototype.selectIncome = function (controller) {
                        var income = controller.getSelectedRecord();
                        if (income)
                            this.Model.set("editModel.costincome", income);
                        M.updateTextFields();
                    };
                    PaymentBase.prototype.clearIncomeButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("editModel.costincome", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentBase.prototype.costButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/cost', isModal: true, onLoadController: function (controller) {
                                var ctrlCost = controller;
                                ctrlCost.CardSettings.IsAdd = false;
                                ctrlCost.CardSettings.IsAddCopy = false;
                                ctrlCost.CardSettings.IsDelete = false;
                                ctrlCost.CardSettings.IsEdit = false;
                                ctrlCost.CardSettings.IsSelect = true;
                                ctrlCost.OnSelect = $.proxy(self.selectCost, self);
                            }
                        });
                    };
                    PaymentBase.prototype.selectCost = function (controller) {
                        var cost = controller.getSelectedRecord();
                        if (cost)
                            this.Model.set("editModel.costincome", cost);
                        M.updateTextFields();
                    };
                    PaymentBase.prototype.clearCostButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("editModel.costincome", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentBase.prototype.accountButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/account', isModal: true, onLoadController: function (controller) {
                                var ctrlAccount = controller;
                                ctrlAccount.CardSettings.IsAdd = false;
                                ctrlAccount.CardSettings.IsAddCopy = false;
                                ctrlAccount.CardSettings.IsDelete = false;
                                ctrlAccount.CardSettings.IsEdit = false;
                                ctrlAccount.CardSettings.IsSelect = true;
                                ctrlAccount.OnSelect = $.proxy(self.selectAccount, self);
                            }
                        });
                    };
                    PaymentBase.prototype.selectAccount = function (controller) {
                        var account = controller.getSelectedRecord();
                        if (account)
                            this.Model.set("editModel.account", account);
                        M.updateTextFields();
                    };
                    PaymentBase.prototype.clearAccountButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("editModel.account", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentBase.prototype.changeModel = function (e) {
                        if (e.field === "paymentConduct") {
                            var conduct = this.Model.get("paymentConduct");
                            var options = this.Model.get("editModel.options");
                            if (conduct) {
                                if ((options & 1) !== 1) {
                                    options = options + 1;
                                    this.Model.set("editModel.options", options);
                                }
                            }
                            else {
                                if ((options & 1) === 1) {
                                    options = options - 1;
                                    this.Model.set("editModel.options", options);
                                }
                            }
                        }
                        else if (e.field === "totalSumText") {
                            if (this.isUpdateSum == false) {
                                var sumResult = +this.Model.get("totalSumText");
                                if (sumResult && sumResult > 0) {
                                    this.Model.set("editModel.sum", sumResult);
                                    this.isUpdateSum = true;
                                    this.Model.set("totalSumText", utils.numberToString(sumResult, 2));
                                    this.isUpdateSum = false;
                                }
                                else {
                                    this.isUpdateSum = true;
                                    this.Model.set("totalSumText", utils.numberToString(this.Model.get("editModel.sum"), 2));
                                    this.isUpdateSum = false;
                                }
                            }
                        }
                        else if (e.field === "editModel.ptype") {
                            var type = this.Model.get("editModel.ptype");
                            if (type == 3) {
                                this.optionPaymentRow.removeClass("hide");
                            }
                            else {
                                this.optionPaymentRow.addClass("hide");
                            }
                        }
                    };
                    return PaymentBase;
                }(base.Controller.BaseEditor));
                Editor.PaymentBase = PaymentBase;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=paymentbase.js.map