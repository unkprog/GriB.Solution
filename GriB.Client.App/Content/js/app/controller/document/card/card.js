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
            (function (Card_1) {
                var DocumentCardFilterSettings = /** @class */ (function () {
                    function DocumentCardFilterSettings(setupRows) {
                        this.fieldSearch = "DocumentCardFilterSettings";
                        this.setupRows = setupRows;
                        this._model = this.createModel();
                    }
                    Object.defineProperty(DocumentCardFilterSettings.prototype, "FieldSearch", {
                        get: function () {
                            return this.fieldSearch;
                        },
                        set: function (val) {
                            this.fieldSearch = val;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(DocumentCardFilterSettings.prototype, "Model", {
                        get: function () {
                            return this._model;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    DocumentCardFilterSettings.prototype.getDefDate = function () {
                        var dateTime = new Date();
                        dateTime = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), 0, 0, 0, 0);
                        return dateTime;
                    };
                    DocumentCardFilterSettings.prototype.createModel = function () {
                        var data = this.restoreFilter();
                        var result = new kendo.data.ObservableObject({
                            "labelDateFrom": vars._statres("label$date$from"),
                            "labelDateTo": vars._statres("label$date$to"),
                            "labelSalepoint": vars._statres("label$stock"),
                            "labelContractor": vars._statres("label$contractor"),
                            "labelReason": vars._statres("label$reason"),
                            "labelFind": vars._statres("label$find"),
                            "salepoint": {},
                            "contractor": {},
                            "reason": {},
                            "datefrom": data ? data.datefrom : undefined,
                            "dateto": data ? data.dateto : undefined
                        });
                        if (data) {
                            result.set("salepoint", data.salepoint);
                            result.set("contractor", data.contractor);
                            result.set("reason", data.reason);
                            result.set("datefrom", new Date(data.datefrom));
                            result.set("dateto", new Date(data.dateto));
                        }
                        return result;
                    };
                    DocumentCardFilterSettings.prototype.restoreFilter = function () {
                        var result;
                        var saved = window.localStorage.getItem(this.fieldSearch);
                        if (!saved || saved === "\"{}\"") {
                            var dateTime = this.getDefDate();
                            result = { salepoint: {}, contractor: {}, reason: {}, datefrom: dateTime, dateto: dateTime };
                        }
                        else
                            result = JSON.parse(saved);
                        return result;
                    };
                    DocumentCardFilterSettings.prototype.saveFilter = function () {
                        var dataToSave = { salepoint: this._model.get("salepoint"), contractor: this._model.get("contractor"), reason: this._model.get("reason"), datefrom: this._model.get("datefrom"), dateto: this._model.get("dateto") };
                        var toSave = JSON.stringify(dataToSave);
                        window.localStorage.setItem(this.fieldSearch, toSave);
                    };
                    DocumentCardFilterSettings.prototype.InitControls = function () {
                        var controller = this;
                        var filterHtml = '';
                        filterHtml += '<div class="row row-inputs">';
                        filterHtml += '    <div class="input-field col s12 m4 l3 xl2">';
                        filterHtml += '       <input id="card-filter-view-date-start" type="text" class="datepicker">';
                        filterHtml += '       <label for="card-filter-view-date-start" data-bind="text:labelDateFrom"></label>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div class="input-field col s12 m4 l3 xl2">';
                        filterHtml += '       <input id="card-filter-view-date-end" type="text" class="datepicker">';
                        filterHtml += '       <label for="card-filter-view-date-end" data-bind="text:labelDateTo"></label>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-salepoint-col" class="input-field col s12 m8 l6 xl4 offset-l6 col-input-numpad">';
                        filterHtml += '       <input id="card-filter-view-salepoint" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: salepoint.name">';
                        filterHtml += '       <label for="card-filter-view-salepoint" data-bind="text:labelSalepoint"></label>';
                        filterHtml += '       <i id="card-view-salepoint-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-contractor-col" class="input-field col s12 m8 l6 xl4 col-input-numpad hide">';
                        filterHtml += '       <input id="card-filter-view-contractor" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: contractor.name">';
                        filterHtml += '       <label for="card-filter-view-contractor" data-bind="text:labelContractor"></label>';
                        filterHtml += '       <i id="card-view-contractor-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
                        filterHtml += '    </div>';
                        filterHtml += '    <div id="card-filter-view-reason-col" class="input-field col s12 m8 l6 xl4 col-input-numpad  hide">';
                        filterHtml += '       <input id="card-filter-view-reason" type="text" disabled class="truncate black-text doc-edit-ref" data-bind="value: reason.name">';
                        filterHtml += '       <label for="card-filter-view-reason" data-bind="text:labelReason"></label>';
                        filterHtml += '       <i id="card-view-reason-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';
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
                        M.Datepicker.getInstance(this.dateFromControl[0]).setDate(controller._model.get("datefrom"), true);
                        M.Datepicker.getInstance(this.dateToControl[0]).setDate(controller._model.get("dateto"), true);
                        controller.salePointControl = this.filterControl.find("#card-filter-view-salepoint-col");
                        controller.salePointClear = this.filterControl.find("#card-view-salepoint-clear");
                        controller.contractorControl = this.filterControl.find("#card-filter-view-contractor-col");
                        controller.contractorClear = this.filterControl.find("#card-view-contractor-clear");
                        controller.reasonControl = this.filterControl.find("#card-filter-view-reason-col");
                        controller.reasonClear = this.filterControl.find("#card-view-reason-clear");
                        controller.searchButton = controller.filterControl.find("#card-filter-view-btn-find");
                        return controller.filterControl;
                    };
                    DocumentCardFilterSettings.prototype.showContractor = function (isShow) {
                        this.contractorControl.show();
                        this.contractorClear.show();
                        if (isShow) {
                            this.contractorControl.removeClass("hide");
                            this.contractorClear.removeClass("hide");
                        }
                        else {
                            if (!this.contractorControl.hasClass("hide"))
                                this.contractorControl.addClass("hide");
                            if (!this.contractorClear.hasClass("hide"))
                                this.contractorClear.addClass("hide");
                        }
                    };
                    DocumentCardFilterSettings.prototype.showReason = function (isShow) {
                        if (isShow) {
                            this.reasonControl.removeClass("hide");
                            this.reasonClear.removeClass("hide");
                        }
                        else {
                            if (!this.reasonControl.hasClass("hide"))
                                this.reasonControl.addClass("hide");
                            if (!this.reasonClear.hasClass("hide"))
                                this.reasonClear.addClass("hide");
                        }
                    };
                    DocumentCardFilterSettings.prototype.createEvents = function () {
                        kendo.bind(this.filterControl, this._model);
                        if (this.searchButton)
                            this.SearchButtonClick = utils.createTouchClickEvent(this.searchButton, this.searchButtonClick, this);
                        if (this.salePointControl)
                            this.SalePointButtonClick = utils.createTouchClickEvent(this.salePointControl, this.salePointButtonClick, this);
                        if (this.salePointClear)
                            this.ClearSalePointButtonClick = utils.createTouchClickEvent(this.salePointClear, this.clearSalePointButtonClick, this);
                        if (this.contractorControl)
                            this.ContractorButtonClick = utils.createTouchClickEvent(this.contractorControl, this.contractorButtonClick, this);
                        if (this.contractorClear)
                            this.ClearContractorButtonClick = utils.createTouchClickEvent(this.contractorClear, this.clearContractorButtonClick, this);
                        if (this.reasonControl)
                            this.ReasonButtonClick = utils.createTouchClickEvent(this.reasonControl, this.reasonButtonClick, this);
                        if (this.reasonClear)
                            this.ClearReasonButtonClick = utils.createTouchClickEvent(this.reasonClear, this.clearReasonButtonClick, this);
                    };
                    DocumentCardFilterSettings.prototype.destroyEvents = function () {
                        this.saveFilter();
                        this.filterControl.unbind();
                        if (this.reasonClear)
                            utils.destroyTouchClickEvent(this.reasonClear, this.ClearReasonButtonClick);
                        if (this.reasonControl)
                            utils.destroyTouchClickEvent(this.reasonControl, this.ReasonButtonClick);
                        if (this.contractorClear)
                            utils.destroyTouchClickEvent(this.contractorClear, this.ClearContractorButtonClick);
                        if (this.contractorControl)
                            utils.destroyTouchClickEvent(this.contractorControl, this.ContractorButtonClick);
                        if (this.salePointClear)
                            utils.destroyTouchClickEvent(this.salePointClear, this.ClearSalePointButtonClick);
                        if (this.salePointControl)
                            utils.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
                        if (this.searchButton)
                            utils.destroyTouchClickEvent(this.searchButton, this.SearchButtonClick);
                    };
                    DocumentCardFilterSettings.prototype.salePointButtonClick = function (e) {
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
                    DocumentCardFilterSettings.prototype.selectSalePoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this._model.set("salepoint", salepoint);
                        M.updateTextFields();
                    };
                    DocumentCardFilterSettings.prototype.clearSalePointButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._model.set("salepoint", {});
                        M.updateTextFields();
                        return false;
                    };
                    DocumentCardFilterSettings.prototype.contractorButtonClick = function (e) {
                        var self = this;
                        self.saveFilter();
                        vars._app.OpenController({
                            urlController: 'setting/card/contractor', isModal: true, onLoadController: function (controller) {
                                var ctrlTypePayment = controller;
                                ctrlTypePayment.CardSettings.IsAdd = false;
                                ctrlTypePayment.CardSettings.IsAddCopy = false;
                                ctrlTypePayment.CardSettings.IsDelete = false;
                                ctrlTypePayment.CardSettings.IsEdit = false;
                                ctrlTypePayment.CardSettings.IsSelect = true;
                                ctrlTypePayment.OnSelect = $.proxy(self.selectContractor, self);
                            }
                        });
                    };
                    DocumentCardFilterSettings.prototype.selectContractor = function (controller) {
                        var contractor = controller.getSelectedRecord();
                        if (contractor)
                            this._model.set("contractor", contractor);
                        M.updateTextFields();
                    };
                    DocumentCardFilterSettings.prototype.clearContractorButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._model.set("contractor", {});
                        M.updateTextFields();
                        return false;
                    };
                    DocumentCardFilterSettings.prototype.reasonButtonClick = function (e) {
                        var self = this;
                        self.saveFilter();
                        vars._app.OpenController({
                            urlController: 'setting/card/reason', isModal: true, onLoadController: function (controller) {
                                var ctrlReason = controller;
                                ctrlReason.CardSettings.IsAdd = false;
                                ctrlReason.CardSettings.IsAddCopy = false;
                                ctrlReason.CardSettings.IsDelete = false;
                                ctrlReason.CardSettings.IsEdit = false;
                                ctrlReason.CardSettings.IsSelect = true;
                                ctrlReason.OnSelect = $.proxy(self.selectReason, self);
                            }
                        });
                    };
                    DocumentCardFilterSettings.prototype.selectReason = function (controller) {
                        var reason = controller.getSelectedRecord();
                        if (reason)
                            this._model.set("reason", reason);
                        M.updateTextFields();
                    };
                    DocumentCardFilterSettings.prototype.clearReasonButtonClick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._model.set("reason", {});
                        M.updateTextFields();
                        return false;
                    };
                    DocumentCardFilterSettings.prototype.searchButtonClick = function (e) {
                        e.preventDefault();
                        if (this.setupRows)
                            this.setupRows();
                        return false;
                    };
                    DocumentCardFilterSettings.prototype.GetItemsForView = function (data) {
                        var result = data; //[];
                        return result;
                    };
                    return DocumentCardFilterSettings;
                }());
                Card_1.DocumentCardFilterSettings = DocumentCardFilterSettings;
                var Card = /** @class */ (function (_super) {
                    __extends(Card, _super);
                    function Card() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Card.prototype, "Service", {
                        get: function () {
                            if (!this.documentService)
                                this.documentService = new svc.Services.DocumentService();
                            return this.documentService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Card.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/card/card.html", Id: "card-view" };
                    };
                    Card.prototype.createCardFilterSettings = function () {
                        var result = new DocumentCardFilterSettings($.proxy(this.loadData, this));
                        result.FieldSearch = this.FilterId;
                        return result;
                    };
                    Card.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: this.EditIdName, EditController: this.EditController,
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.getDocs, this), Delete: $.proxy(this.Service.DelDocument, this.Service),
                            Columns: this.Columns
                        };
                    };
                    Object.defineProperty(Card.prototype, "Columns", {
                        get: function () {
                            return this.columns();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Card.prototype.columns = function () {
                        return [
                            { Header: "", HeaderStyle: "doc-col-conduct", Field: "option", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((option & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                            { Header: vars._statres("label$date"), Field: "date", FieldTemplate: "#=date_ddmmyyyy(new Date(date))#" },
                            { Header: vars._statres("label$stock"), Field: "salepoint.name" },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto" },
                        ];
                    };
                    Object.defineProperty(Card.prototype, "EditIdName", {
                        get: function () {
                            return "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "EditController", {
                        get: function () {
                            return "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "FilterId", {
                        get: function () {
                            return "DocumentCardFilterSettings";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "DocType", {
                        get: function () {
                            return 0;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "SalePoint", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var salepoint = (settings ? settings.Model.get("salepoint") : undefined);
                            return (salepoint ? salepoint.id : 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "Contractor", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var contractor = (settings ? settings.Model.get("contractor") : undefined);
                            return (contractor ? contractor.id : 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "Reason", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var reason = (settings ? settings.Model.get("reason") : undefined);
                            return (reason ? reason.id : 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "DateFrom", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var date = (settings ? settings.Model.get("datefrom") : undefined);
                            return (date ? date : new Date(1899, 11, 30, 0, 0, 0, 0));
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "DateTo", {
                        get: function () {
                            var settings = this.CardSettings.FilterSettings;
                            var date = (settings ? settings.Model.get("dateto") : undefined);
                            if (date) {
                                date.setDate(date.getDate() + 1);
                            }
                            return (date ? date : new Date(1899, 11, 30, 0, 0, 0, 0));
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Card.prototype.getDocs = function (Callback) {
                        this.CardSettings.FilterSettings.saveFilter();
                        var params = { id: 0, doctype: this.DocType, salepoint: this.SalePoint, contractor: this.Contractor, reason: this.Reason, datefrom: this.DateFrom, dateto: this.DateTo };
                        this.Service.GetDocuments(params, function (responseData) {
                            if (Callback)
                                Callback(responseData);
                        });
                    };
                    return Card;
                }(base.Controller.BaseCard));
                Card_1.Card = Card;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=card.js.map