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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller", "app/services/documentservice"], function (require, exports, vars, utils, base, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Card;
            (function (Card) {
                var PaymentCardFilterSettings = /** @class */ (function () {
                    function PaymentCardFilterSettings(setupRows, fieldSearch) {
                        this.fieldSearch = fieldSearch;
                        this.setupRows = setupRows;
                        this._model = this.createModel();
                    }
                    Object.defineProperty(PaymentCardFilterSettings.prototype, "FieldSearch", {
                        get: function () {
                            return this.fieldSearch;
                        },
                        set: function (val) {
                            this.fieldSearch = val;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentCardFilterSettings.prototype, "Model", {
                        get: function () {
                            return this._model;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentCardFilterSettings.prototype.getDefDate = function () {
                        var dateTime = new Date();
                        dateTime.setHours(0, 0, 0, 0); // = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 0, 0, 0, 0);
                        return dateTime;
                    };
                    PaymentCardFilterSettings.prototype.createModel = function () {
                        var data = this.restoreFilter();
                        var result = new kendo.data.ObservableObject({
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelSalepoint": vars._statres("label$salePoint"),
                            "labelEmployee": vars._statres("label$employee"),
                            "labelClient": vars._statres("label$client"),
                            "labelFind": vars._statres("label$find"),
                            "labelCash": vars._statres("label$cash"),
                            "labelNonCash": vars._statres("label$noncash"),
                            "labelMethodPayment": vars._statres("label$methodpayment"),
                            "labelWithOutPayment": vars._statres("label$withoutpayment"),
                            "labelNotSelected": vars._statres("label$notselected"),
                            "labelOnCredit": vars._statres("label$oncredit"),
                            "labelOnTheHouse": vars._statres("label$onthehouse"),
                            "labelClientLeft": vars._statres("label$clientleft"),
                            "salepoint": {},
                            "employee": {},
                            "client": {},
                            "type": 0,
                            "optionValue": 0,
                            "datefrom": undefined,
                            "dateto": undefined
                        });
                        //let payMethod: string = "#if (ptype === 1) {#" + vars._statres("label$cash") + "# } else if (ptype === 2) {#" + vars._statres("label$noncash") + "# } else if (ptype === 3) {#" + vars._statres("label$withoutpayment") + "#}#";
                        if (data) {
                            result.set("salepoint", data.salepoint);
                            result.set("employee", data.employee);
                            result.set("client", data.client);
                            result.set("type", data.type);
                            result.set("optionValue", data.type);
                            result.set("datefrom", utils.date_from_ddmmyyyy(data.datefrom));
                            result.set("dateto", utils.date_from_ddmmyyyy(data.dateto));
                        }
                        return result;
                    };
                    PaymentCardFilterSettings.prototype.restoreFilter = function () {
                        var result;
                        var saved = window.localStorage.getItem(this.fieldSearch);
                        if (!saved || saved === "\"{}\"") {
                            var dateTime = utils.date_ddmmyyyy(this.getDefDate());
                            result = {
                                salepoint: {}, employee: {}, client: {}, type: 0, option: 0, datefrom: dateTime, dateto: dateTime
                            };
                        }
                        else
                            result = JSON.parse(saved);
                        return result;
                    };
                    PaymentCardFilterSettings.prototype.saveFilter = function () {
                        var _datefrom = this._model.get("datefrom");
                        var _dateto = this._model.get("dateto");
                        var dataToSave = { salepoint: this._model.get("salepoint"), employee: this._model.get("employee"), client: this._model.get("client"), type: this._model.get("type"), option: this._model.get("optionValue"), datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto) };
                        var toSave = JSON.stringify(dataToSave);
                        window.localStorage.setItem(this.fieldSearch, toSave);
                    };
                    PaymentCardFilterSettings.prototype.InitControls = function () {
                        var controller = this;
                        var filterHtml = '';
                        filterHtml += '<div class="row row-inputs">';
                        filterHtml += '    <div class="input-field col s12 m6 l6 xl4" style="margin-bottom: 0;">';
                        filterHtml += '        <div class="row" style="margin-bottom: 0;">';
                        filterHtml += '            <div class="input-field col s6 m6" style="margin-top: 0;margin-bottom: 0;">';
                        filterHtml += '                 <input id="card-filter-view-date-start" type="text" class="datepicker">';
                        filterHtml += '                 <label for="card-filter-view-date-start" data-bind="text:labelDateFrom"></label>';
                        filterHtml += '            </div>';
                        filterHtml += '            <div class="input-field col s6 m6" style="margin-top: 0;margin-bottom: 0;">';
                        filterHtml += '                <input id="card-filter-view-date-end" type="text" class="datepicker">';
                        filterHtml += '                <label for="card-filter-view-date-end" data-bind="text:labelDateTo"></label>';
                        filterHtml += '            </div>';
                        filterHtml += '        </div>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-salepoint-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
                        filterHtml += '       <input id="card-filter-view-salepoint" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: salepoint.name">';
                        filterHtml += '       <label for="card-filter-view-salepoint" data-bind="text:labelSalepoint"></label>';
                        filterHtml += '       <i id="card-view-salepoint-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-employee-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
                        filterHtml += '       <input id="card-filter-view-employee" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: employee.name">';
                        filterHtml += '       <label for="card-filter-view-employee" data-bind="text:labelEmployee"></label>';
                        filterHtml += '       <i id="card-view-employee-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-client-col" class="input-field col s12 m6 l6 xl4 col-input-numpad">';
                        filterHtml += '       <input id="card-filter-view-client" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: client.name">';
                        filterHtml += '       <label for="card-filter-view-client" data-bind="text:labelClient"></label>';
                        filterHtml += '       <i id="card-view-client-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-type-row" class="input-field col s6 m6 l6 xl4 col-input-numpad">';
                        filterHtml += '        <select id="card-filter-view-type" class="validate" data-bind="value:type">';
                        filterHtml += '            <option value="0" data-bind="text:labelNotSelected"></option>';
                        filterHtml += '            <option value="1" data-bind="text:labelCash"></option>';
                        filterHtml += '            <option value="2" data-bind="text:labelNonCash"></option>';
                        filterHtml += '            <option id="payment-view-payment-type-without" value="3" data-bind="text:labelWithOutPayment"></option>';
                        filterHtml += '        </select>';
                        filterHtml += '        <label for="card-filter-view-type" data-bind="text:labelMethodPayment"></label>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-option-row" class="input-field col s6 m6 l6 xl4 col-input-numpad hide">';
                        filterHtml += '        <select id="card-filter-view-option" class="validate" data-bind="value:optionValue">';
                        filterHtml += '            <option value="0" data-bind="text:labelNotSelected"></option>';
                        filterHtml += '            <option value="1" data-bind="text:labelOnCredit"></option>';
                        filterHtml += '            <option value="2" data-bind="text:labelOnTheHouse"></option>';
                        filterHtml += '            <option value="3" data-bind="text:labelClientLeft"></option>';
                        filterHtml += '        </select>';
                        filterHtml += '        <label for="card-filter-view-option" data-bind="text:labelWithOutPayment"></label>';
                        filterHtml += '    </div>';
                        filterHtml += '</div>';
                        filterHtml += '<div class="row row-inputs">';
                        filterHtml += '    <div class="input-field col s12 m12 l12 xl12 col-input-numpad" style="margin-top: 0;">';
                        filterHtml += '        <a id="card-filter-view-btn-find" class="btn btncol"  data-bind="text:labelFind"></a>'; // data-bind="text:labelDate"
                        filterHtml += '    </div>';
                        filterHtml += '</div>';
                        filterHtml += '';
                        controller.filterControl = $(filterHtml);
                        controller.dateFromControl = controller.filterControl.find("#card-filter-view-date-start");
                        controller.dateFromControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller._model.set("datefrom", newDate);
                            }
                        });
                        controller.dateToControl = controller.filterControl.find("#card-filter-view-date-end");
                        controller.dateToControl.datepicker({
                            format: "dd.mm.yyyy", onSelect: function (newDate) {
                                controller._model.set("dateto", newDate);
                            }
                        });
                        controller.dateFromControl.val(utils.date_ddmmyyyy(controller._model.get("datefrom")));
                        controller.dateToControl.val(utils.date_ddmmyyyy(controller._model.get("dateto")));
                        controller.salePointControl = controller.filterControl.find("#card-filter-view-salepoint-col");
                        controller.salePointClear = controller.filterControl.find("#card-view-salepoint-clear");
                        controller.employeeControl = controller.filterControl.find("#card-filter-view-employee-col");
                        controller.employeeClear = controller.filterControl.find("#card-view-employee-clear");
                        controller.saleClientControl = controller.filterControl.find("#card-filter-view-client-col");
                        controller.saleClientClear = this.filterControl.find("#card-view-client-clear");
                        controller.typeControlRow = controller.filterControl.find("#card-filter-view-type-row");
                        controller.typeControl = controller.filterControl.find("#card-filter-view-type");
                        controller.typeWithoutControl = controller.filterControl.find("#payment-view-payment-type-without");
                        controller.optionControlRow = controller.filterControl.find("#card-filter-view-option-row");
                        controller.optionControl = controller.filterControl.find("#card-filter-view-option");
                        controller.searchButton = controller.filterControl.find("#card-filter-view-btn-find");
                        return controller.filterControl;
                    };
                    PaymentCardFilterSettings.prototype.ViewControls = function () {
                        if (this.typeControl)
                            this.typeControl.formSelect();
                        if (this.optionControl)
                            this.optionControl.formSelect();
                    };
                    PaymentCardFilterSettings.prototype.showType = function (isShow) {
                        if (isShow) {
                            this.typeControlRow.removeClass("hide");
                        }
                        else {
                            if (!this.typeControlRow.hasClass("hide"))
                                this.typeControlRow.addClass("hide");
                        }
                    };
                    PaymentCardFilterSettings.prototype.showClient = function (isShow) {
                        if (isShow) {
                            this.saleClientControl.removeClass("hide");
                        }
                        else {
                            if (!this.saleClientControl.hasClass("hide"))
                                this.saleClientControl.addClass("hide");
                        }
                    };
                    PaymentCardFilterSettings.prototype.showWithout = function (isShow) {
                        if (isShow) {
                            //this.typeWithoutControl.removeClass("hide");
                        }
                        else {
                            if (!this.typeWithoutControl.hasClass("hide"))
                                this.typeWithoutControl.remove();
                        }
                    };
                    PaymentCardFilterSettings.prototype.ResizeControls = function () {
                        if (this.typeControl)
                            this.typeControl.formSelect();
                        if (this.optionControl)
                            this.optionControl.formSelect();
                    };
                    PaymentCardFilterSettings.prototype.createEvents = function () {
                        kendo.bind(this.filterControl, this._model);
                        if (this.searchButton)
                            this.SearchButtonClick = utils.createTouchClickEvent(this.searchButton, this.searchButtonClick, this);
                        if (this.saleClientControl)
                            this.ClientButtonClick = utils.createTouchClickEvent(this.saleClientControl, this.clientButtonClick, this);
                        if (this.saleClientClear)
                            this.ClearClientButtonClick = utils.createTouchClickEvent(this.saleClientClear, this.clearClientButtonClick, this);
                        if (this.employeeControl)
                            this.EmployeeButtonClick = utils.createTouchClickEvent(this.employeeControl, this.employeeButtonClick, this);
                        if (this.employeeClear)
                            this.ClearEmployeeButtonClick = utils.createTouchClickEvent(this.employeeClear, this.clearEmployeeButtonClick, this);
                        if (this.salePointControl)
                            this.SalePointButtonClick = utils.createTouchClickEvent(this.salePointControl, this.salePointButtonClick, this);
                        if (this.salePointClear)
                            this.ClearSalePointButtonClick = utils.createTouchClickEvent(this.salePointClear, this.clearSalePointButtonClick, this);
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    PaymentCardFilterSettings.prototype.destroyEvents = function () {
                        this.saveFilter();
                        this.filterControl.unbind();
                        this.Model.unbind("change");
                        if (this.saleClientClear)
                            utils.destroyTouchClickEvent(this.saleClientClear, this.ClearClientButtonClick);
                        if (this.saleClientControl)
                            utils.destroyTouchClickEvent(this.saleClientControl, this.ClearClientButtonClick);
                        if (this.employeeClear)
                            utils.destroyTouchClickEvent(this.employeeClear, this.ClearEmployeeButtonClick);
                        if (this.employeeControl)
                            utils.destroyTouchClickEvent(this.employeeControl, this.EmployeeButtonClick);
                        if (this.salePointClear)
                            utils.destroyTouchClickEvent(this.salePointClear, this.ClearSalePointButtonClick);
                        if (this.salePointControl)
                            utils.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
                        if (this.searchButton)
                            utils.destroyTouchClickEvent(this.searchButton, this.SearchButtonClick);
                    };
                    PaymentCardFilterSettings.prototype.changeModel = function (e) {
                        if (e.field === "type") {
                            var type = this.Model.get("type");
                            if (type == 3) {
                                this.optionControlRow.removeClass("hide");
                            }
                            else {
                                this.optionControlRow.addClass("hide");
                            }
                        }
                    };
                    PaymentCardFilterSettings.prototype.salePointButtonClick = function (e) {
                        var self = this;
                        self.saveFilter();
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
                    PaymentCardFilterSettings.prototype.selectSalePoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this._model.set("salepoint", salepoint);
                        M.updateTextFields();
                    };
                    PaymentCardFilterSettings.prototype.clearSalePointButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._model.set("salepoint", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentCardFilterSettings.prototype.employeeButtonClick = function (e) {
                        var self = this;
                        self.saveFilter();
                        vars._app.OpenController({
                            urlController: 'setting/card/employee', isModal: true, onLoadController: function (controller) {
                                var ctrlEmployee = controller;
                                ctrlEmployee.CardSettings.IsAdd = false;
                                ctrlEmployee.CardSettings.IsAddCopy = false;
                                ctrlEmployee.CardSettings.IsDelete = false;
                                ctrlEmployee.CardSettings.IsEdit = false;
                                ctrlEmployee.CardSettings.IsSelect = true;
                                ctrlEmployee.OnSelect = $.proxy(self.selectEmployee, self);
                            }
                        });
                    };
                    PaymentCardFilterSettings.prototype.selectEmployee = function (controller) {
                        var employee = controller.getSelectedRecord();
                        if (employee)
                            this._model.set("employee", employee);
                        M.updateTextFields();
                    };
                    PaymentCardFilterSettings.prototype.clearEmployeeButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._model.set("employee", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentCardFilterSettings.prototype.clientButtonClick = function (e) {
                        var self = this;
                        self.saveFilter();
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
                    PaymentCardFilterSettings.prototype.selectClient = function (controller) {
                        var client = controller.getSelectedRecord();
                        if (client)
                            this._model.set("client", client);
                        M.updateTextFields();
                    };
                    PaymentCardFilterSettings.prototype.clearClientButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._model.set("client", {});
                        M.updateTextFields();
                        return false;
                    };
                    PaymentCardFilterSettings.prototype.searchButtonClick = function (e) {
                        e.preventDefault();
                        if (this.setupRows)
                            this.setupRows();
                        return false;
                    };
                    PaymentCardFilterSettings.prototype.GetItemsForView = function (data) {
                        var result = data; //[];
                        return result;
                    };
                    return PaymentCardFilterSettings;
                }());
                Card.PaymentCardFilterSettings = PaymentCardFilterSettings;
                var PaymentBase = /** @class */ (function (_super) {
                    __extends(PaymentBase, _super);
                    function PaymentBase() {
                        return _super.call(this) || this;
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
                    PaymentBase.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/card/card.html", Id: "card-view" };
                    };
                    PaymentBase.prototype.createCardFilterSettings = function () {
                        return new PaymentCardFilterSettings($.proxy(this.loadData, this), this.FilterId);
                    };
                    PaymentBase.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: this.EditIdName, EditController: this.EditController,
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.getDocs, this), Delete: $.proxy(this.Service.DelDocument, this.Service),
                            Columns: this.Columns
                        };
                    };
                    Object.defineProperty(PaymentBase.prototype, "Columns", {
                        get: function () {
                            return this.columns();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentBase.prototype.columns = function () {
                        //let payMethod: string = "#if (ptype === 1) {#" + vars._statres("label$cash") + "# } else if (ptype === 2) {#" + vars._statres("label$noncash") + "# } else if (ptype === 3) {#" + vars._statres("label$withoutpayment") + "#}#";
                        var payMethod = '#if (ptype === 1) {#<i class="material-icons left">attach_money</i># } else if (ptype === 2) {#<i class="material-icons left">credit_card</i># } else if (ptype === 3) {#<i class="material-icons left">money_off</i>#}#';
                        payMethod = payMethod + "#if ((options & 2)===2 || (options & 4)===4 || (options & 8)===8) {# (#if ((options & 2)===2) {#" + vars._statres("label$oncredit") + "# } else if ((options & 4)===4) {#" + vars._statres("label$onthehouse") + "# } else if ((options & 8)===8) {#" + vars._statres("label$clientleft") + "#}#)#}#";
                        return [
                            { Header: "", HeaderStyle: "doc-col-conduct", Field: "options", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((options & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                            { Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" },
                            { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                            { Header: vars._statres("label$employee"), Field: "employee.name" },
                            { Header: vars._statres("label$methodpayment"), Field: "ptype", FieldTemplate: payMethod },
                            { Header: vars._statres("label$client"), Field: "client.name" },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                        ];
                    };
                    Object.defineProperty(PaymentBase.prototype, "EditIdName", {
                        get: function () {
                            return "id_payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "EditController", {
                        get: function () {
                            return "document/editor/payment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "FilterId", {
                        get: function () {
                            return "PaymentCardFilterSettings";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "SalePoint", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var salepoint = (settings ? settings.Model.get("salepoint") : undefined);
                            return (salepoint ? salepoint.id : 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "Employee", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var employee = (settings ? settings.Model.get("employee") : undefined);
                            return (employee ? employee.id : 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "Client", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var client = (settings ? settings.Model.get("client") : undefined);
                            return (client ? client.id : 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "Type", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var type = (settings ? settings.Model.get("type") : 0);
                            return type;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "Option", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var option = (this.Type == 3 && settings ? settings.Model.get("optionValue") : 0);
                            return option;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "DateFrom", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var date = (settings ? settings.Model.get("datefrom") : undefined);
                            return (date ? date : new Date(1899, 11, 30, 0, 0, 0, 0));
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "DateTo", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var date = (settings ? settings.Model.get("dateto") : undefined);
                            return (date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) : new Date(1899, 11, 30, 0, 0, 0, 0));
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(PaymentBase.prototype, "DocType", {
                        get: function () {
                            return 10;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    PaymentBase.prototype.getDocs = function (Callback) {
                        this.CardSettings.FilterSettings.saveFilter();
                        var params = { id: 0, doctype: this.DocType, salepoint: this.SalePoint, employee: this.Employee, client: this.Client, type: this.Type, options: this.Option, datefrom: this.DateFrom, dateto: this.DateTo };
                        this.Service.GetPayments(params, function (responseData) {
                            if (Callback)
                                Callback(responseData);
                        });
                    };
                    return PaymentBase;
                }(base.Controller.BaseCard));
                Card.PaymentBase = PaymentBase;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=paymentbase.js.map