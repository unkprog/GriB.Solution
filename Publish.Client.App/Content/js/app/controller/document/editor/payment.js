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
                var Payment = /** @class */ (function (_super) {
                    __extends(Payment, _super);
                    function Payment() {
                        var _this = _super.call(this) || this;
                        _this.isUpdateSum = false;
                        return _this;
                    }
                    Object.defineProperty(Payment.prototype, "Service", {
                        get: function () {
                            if (!this.documentService)
                                this.documentService = new svc.Services.DocumentService();
                            return this.documentService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Payment.prototype, "SettingService", {
                        get: function () {
                            if (!this.settingService)
                                this.settingService = new svcSetting.Services.SettingsService();
                            return this.settingService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Payment.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/editor/payment.html", Id: "payment-view" };
                    };
                    Payment.prototype.createModel = function () {
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
                            "paymentConduct": true,
                            "totalSumText": "0.00",
                        });
                        return oo;
                    };
                    Object.defineProperty(Payment.prototype, "EditorModel", {
                        get: function () {
                            var model = this.Model.get("editModel").toJSON();
                            return model;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Payment.prototype.createEditorSettings = function () {
                        return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetPayment, this.Service), Save: $.proxy(this.Service.SetPayment, this.Service) };
                    };
                    Object.defineProperty(Payment.prototype, "EditIdName", {
                        get: function () {
                            return "id_payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Payment.prototype.validateStock = function () {
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
                    Payment.prototype.validate = function () {
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
                        }
                        return result;
                    };
                    Object.defineProperty(Payment.prototype, "DocFormatDate", {
                        get: function () {
                            return "dd.mm.yyyy";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Payment.prototype.ViewInit = function (view) {
                        this.dateControl = view.find("#payment-view-date");
                        this.dateControl.datepicker({ format: this.DocFormatDate });
                        this.salePointControl = view.find("#payment-view-salepoint-row");
                        this.clientControl = view.find("#payment-view-client-row");
                        this.clientClearControl = view.find("#payment-view-client-clear");
                        this.methodPayment = view.find("#payment-view-payment-type");
                        this.commentControl = view.find("#payment-view-comment-row");
                        view.find("#payment-view-comment").characterCounter();
                        if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === false) {
                            this.dateControl.attr('disabled', 'disabled');
                            view.find("#payment-view-comment").attr('disabled', 'disabled');
                            view.find("#payment-view-conduct").attr('disabled', 'disabled');
                        }
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Payment.prototype.ViewShow = function (e) {
                        this.methodPayment.formSelect();
                        M.textareaAutoResize($("#payment-view-comment"));
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Payment.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
                            this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);
                            this.ClientButtonClick = this.createTouchClickEvent(this.clientControl, this.clientButtonClick);
                            this.ClearClientButtonClick = this.createTouchClickEvent(this.clientClearControl, this.clearClientButtonClick);
                        }
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    Payment.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
                        if (this.EditorSettings.ButtonSetings && this.EditorSettings.ButtonSetings.IsSave === true) {
                            this.destroyTouchClickEvent(this.clientControl, this.ClientButtonClick);
                            this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
                        }
                        _super.prototype.destroyEvents.call(this);
                    };
                    Payment.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                        this.methodPayment.formSelect();
                    };
                    Payment.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        var dateTime = new Date(responseData.record.cd);
                        this.dateControl.val(utils.date_ddmmyyyy(dateTime));
                        M.Datepicker.getInstance(this.dateControl[0]).setDate(dateTime, true);
                        this.Model.set("paymentConduct", ((responseData.record.options & 1) === 1));
                        this.isUpdateSum = true;
                        this.Model.set("totalSumText", utils.numberToString(responseData.record.sum, 2));
                        this.isUpdateSum = false;
                    };
                    Payment.prototype.clientButtonClick = function (e) {
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
                    Payment.prototype.selectClient = function (controller) {
                        var client = controller.getSelectedRecord();
                        if (client)
                            this.Model.set("editModel.client", client);
                        M.updateTextFields();
                    };
                    Payment.prototype.clearClientButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.Model.set("editModel.client", {});
                        M.updateTextFields();
                        return false;
                    };
                    Payment.prototype.salePointButtonClick = function (e) {
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
                    Payment.prototype.selectSalePoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("editModel.salepoint", salepoint);
                        M.updateTextFields();
                    };
                    Payment.prototype.changeModel = function (e) {
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
                    };
                    return Payment;
                }(base.Controller.BaseEditor));
                Editor.Payment = Payment;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/payment", function (module) { return new module.Controller.Document.Editor.Payment(); });
});
//# sourceMappingURL=payment.js.map