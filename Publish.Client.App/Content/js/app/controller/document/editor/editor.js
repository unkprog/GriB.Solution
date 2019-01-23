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
            (function (Editor_1) {
                var Editor = /** @class */ (function (_super) {
                    __extends(Editor, _super);
                    function Editor() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Editor.prototype, "Service", {
                        get: function () {
                            if (!this.documentService)
                                this.documentService = new svc.Services.DocumentService();
                            return this.documentService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Editor.prototype, "SettingService", {
                        get: function () {
                            if (!this.settingService)
                                this.settingService = new svcSetting.Services.SettingsService();
                            return this.settingService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Editor.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/editor/document.html", Id: "document-view" };
                    };
                    Editor.prototype.createModel = function () {
                        var oo = new kendo.data.ObservableObject({
                            "Header": this.Header,
                            "labelDocument": "",
                            "editModel": {},
                            "labelConduct": vars._statres("label$conduct"),
                            "labelDate": vars._statres("label$date"),
                            "labelProvider": vars._statres("label$provider"),
                            "labelStock": vars._statres("label$stock"),
                            "labelStockTo": vars._statres("label$stock$to"),
                            "labelReason": vars._statres("label$reason"),
                            "labelName": vars._statres("label$name"),
                            "labelQuantityShort": vars._statres("label$quantityshort"),
                            "labelUnitShort": vars._statres("label$unitshort"),
                            "labelPrice": vars._statres("label$price"),
                            "labelSum": vars._statres("label$sum"),
                            "labelAdd": vars._statres("button$label$add"),
                            "labelComment": vars._statres("label$comment"),
                            "documentConduct": true,
                            "totalSum": 0,
                            "totalSumText": "0.00",
                        });
                        return oo;
                    };
                    Object.defineProperty(Editor.prototype, "DocType", {
                        get: function () {
                            return 0;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Editor.prototype, "EditorModel", {
                        get: function () {
                            var model = this.Model.get("editModel").toJSON();
                            model.doctype = this.DocType;
                            return model;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Editor.prototype.createEditorSettings = function () {
                        return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetDocument, this.Service), Save: $.proxy(this.Service.SetDocument, this.Service) };
                    };
                    Object.defineProperty(Editor.prototype, "EditIdName", {
                        get: function () {
                            return "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Editor.prototype.validateStock = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if ((model.option & 1) === 1) {
                            if (!model.salepoint || !model.salepoint.id || model.salepoint.id === 0) {
                                M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
                                result = false;
                            }
                        }
                        return result;
                    };
                    Editor.prototype.validate = function () {
                        var result = this.validateStock();
                        var model = this.EditorModel;
                        if ((model.option & 1) === 1) {
                            if (!model.positions || !model.positions.length || model.positions.length < 1) {
                                M.toast({ html: vars._statres("msg$error$documentpositionsnotfilled") });
                                result = false;
                            }
                            if (model.comment.length > 254) {
                                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$comment"), 254) });
                                result = false;
                            }
                        }
                        return result;
                    };
                    Editor.prototype.ViewInit = function (view) {
                        this.dateControl = view.find("#document-view-date");
                        this.dateControl.datepicker({ format: "dd.mm.yyyy" });
                        this.salePointControl = view.find("#document-view-salepoint-row");
                        this.salePointToControl = view.find("#document-view-salepointto-row");
                        this.contractorControl = view.find("#document-view-contractor-row");
                        this.reasonControl = view.find("#document-view-reason-row");
                        this.positionRows = view.find("#product-position-rows");
                        this.commentControl = view.find("#document-view-comment-row");
                        view.find("#document-view-comment").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Editor.prototype.ViewShow = function (e) {
                        M.textareaAutoResize($("#document-view-comment"));
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Editor.prototype.showSalePointTo = function (isShow) {
                        if (isShow) {
                            this.salePointToControl.removeClass("hide");
                        }
                        else {
                            if (!this.salePointToControl.hasClass("hide"))
                                this.salePointToControl.addClass("hide");
                        }
                    };
                    Editor.prototype.showContractor = function (isShow) {
                        if (isShow) {
                            this.contractorControl.removeClass("hide");
                        }
                        else {
                            if (!this.contractorControl.hasClass("hide"))
                                this.contractorControl.addClass("hide");
                        }
                    };
                    Editor.prototype.showReason = function (isShow) {
                        if (isShow) {
                            this.reasonControl.removeClass("hide");
                        }
                        else {
                            if (!this.reasonControl.hasClass("hide"))
                                this.reasonControl.addClass("hide");
                        }
                    };
                    Editor.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                        this.SalePointButtonClick = this.createTouchClickEvent(this.salePointControl, this.salePointButtonClick);
                        this.SalePointToButtonClick = this.createTouchClickEvent(this.salePointToControl, this.salePointToButtonClick);
                        this.ContractorButtonClick = this.createTouchClickEvent(this.contractorControl, this.contractorButtonClick);
                        this.ReasonButtonClick = this.createTouchClickEvent(this.reasonControl, this.reasonButtonClick);
                        this.Model.bind("change", $.proxy(this.changeModel, this));
                    };
                    Editor.prototype.destroyEvents = function () {
                        this.Model.unbind("change");
                        if (this.btnAddPosition)
                            this.destroyTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);
                        if (this.btnRemovePosition)
                            this.destroyTouchClickEvent(this.btnRemovePosition, this.removePositionButtonClick);
                        this.destroyTouchClickEvent(this.contractorControl, this.ContractorButtonClick);
                        this.destroyTouchClickEvent(this.salePointToControl, this.SalePointToButtonClick);
                        this.destroyTouchClickEvent(this.salePointControl, this.SalePointButtonClick);
                        _super.prototype.destroyEvents.call(this);
                    };
                    Editor.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                    };
                    Editor.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        var dateTime = new Date(responseData.record.date);
                        this.dateControl.val(utils.date_ddmmyyyy(dateTime));
                        M.Datepicker.getInstance(this.dateControl[0]).setDate(dateTime, true);
                        this.Model.set("documentConduct", ((responseData.record.option & 1) === 1));
                        this.setupPositions();
                    };
                    Editor.prototype.setupPositions = function () {
                        var self = this;
                        var model = this.EditorModel;
                        var data = model.positions;
                        var html = '';
                        if (this.btnAddPosition)
                            this.destroyTouchClickEvent(this.btnAddPosition, this.AddPositionButtonClick);
                        this.positionRows.unbind();
                        if (data && data.length > 0) {
                            for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                                data[i].sum = Math.round((data[i].quantity * data[i].price) * 100) / 100;
                                html += '<tr data-index="' + i + '">';
                                html += '<td class="product-col-name" data-bind="text:editModel.positions[' + i + '].product.name"></td>';
                                html += '<td class="product-col-quantity"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].quantity"/></td>';
                                html += '<td class="product-col-unit" data-bind="text:editModel.positions[' + i + '].product.unit_name"></td>';
                                html += '<td class="product-col-price"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].price"/></td>';
                                html += '<td class="product-col-sum"><input class="table-cell-input" type="number" data-bind="value:editModel.positions[' + i + '].sum"/></td>';
                                html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">close</i></a></td>';
                                html += '</tr>';
                            }
                        }
                        html += '<tr>';
                        html += '<td><a id="btn-add-position" class="btn btncol"><span data-bind="text:labelAdd"></span></a></td>';
                        html += '</tr>';
                        this.positionRows.html(html);
                        self.Model.set("editModel", model);
                        self.Model.set("totalSum", self.calsTotalSum());
                        this.btnAddPosition = this.positionRows.find("#btn-add-position");
                        this.btnRemovePosition = this.positionRows.find(".product-col-button-delete");
                        this.AddPositionButtonClick = this.createTouchClickEvent(this.btnAddPosition, this.addPositionButtonClick);
                        this.RemovePositionButtonClick = this.createTouchClickEvent(this.btnRemovePosition, this.removePositionButtonClick);
                        kendo.bind(this.positionRows, this.Model);
                    };
                    Editor.prototype.calsTotalSum = function () {
                        var result = 0;
                        var model = this.EditorModel;
                        var data = model.positions;
                        if (data && data.length > 0) {
                            for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                                result += data[i].sum;
                            }
                        }
                        return result;
                    };
                    Editor.prototype.contractorButtonClick = function (e) {
                        var self = this;
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
                    Editor.prototype.selectContractor = function (controller) {
                        var contractor = controller.getSelectedRecord();
                        if (contractor)
                            this.Model.set("editModel.contractor", contractor);
                        M.updateTextFields();
                    };
                    Editor.prototype.salePointToButtonClick = function (e) {
                        var self = this;
                        vars._app.OpenController({
                            urlController: 'setting/card/salepoint', isModal: true, onLoadController: function (controller) {
                                var ctrlTypePayment = controller;
                                ctrlTypePayment.CardSettings.IsAdd = false;
                                ctrlTypePayment.CardSettings.IsAddCopy = false;
                                ctrlTypePayment.CardSettings.IsDelete = false;
                                ctrlTypePayment.CardSettings.IsEdit = false;
                                ctrlTypePayment.CardSettings.IsSelect = true;
                                ctrlTypePayment.OnSelect = $.proxy(self.selectSalePointTo, self);
                            }
                        });
                    };
                    Editor.prototype.selectSalePointTo = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("editModel.salepointto", salepoint);
                        M.updateTextFields();
                    };
                    Editor.prototype.salePointButtonClick = function (e) {
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
                    Editor.prototype.selectSalePoint = function (controller) {
                        var salepoint = controller.getSelectedRecord();
                        if (salepoint)
                            this.Model.set("editModel.salepoint", salepoint);
                        M.updateTextFields();
                    };
                    Editor.prototype.reasonButtonClick = function (e) {
                        var self = this;
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
                    Editor.prototype.selectReason = function (controller) {
                        var reason = controller.getSelectedRecord();
                        if (reason)
                            this.Model.set("editModel.reason", reason);
                        M.updateTextFields();
                    };
                    Editor.prototype.addPositionButtonClick = function (e) {
                        var self = this;
                        var salepoint = this.Model.get("editModel.salepoint");
                        if (salepoint) {
                            vars._app.OpenController({
                                urlController: 'setting/card/product', isModal: true, onLoadController: function (controller) {
                                    var ctrlProduct = controller;
                                    ctrlProduct.CardSettings.IsAdd = false;
                                    ctrlProduct.CardSettings.IsAddCopy = false;
                                    ctrlProduct.CardSettings.IsEdit = false;
                                    ctrlProduct.CardSettings.IsDelete = false;
                                    ctrlProduct.CardSettings.IsSelect = true;
                                    ctrlProduct.OnSelect = $.proxy(self.selectPosition, self);
                                }
                            });
                        }
                        else {
                            M.toast({ html: vars._statres("msg$error$nowarehousespecified") });
                        }
                    };
                    Editor.prototype.removePositionButtonClick = function (e) {
                        var self = this;
                        var model = this.EditorModel;
                        var index = +$(e.currentTarget).parent().parent().data("index");
                        model.positions.splice(index, 1);
                        self.Model.set("editModel", model);
                        self.setupPositions();
                    };
                    Editor.prototype.selectPosition = function (controller) {
                        var id = controller.getSelectedRowId();
                        var self = this;
                        var model = this.EditorModel;
                        // TODO: Прикрутить фильтр по доступу по торговой точке
                        var salepoint = 0;
                        self.Service.GetDocumentNewPosition(+id, salepoint, function (responseData) {
                            model.positions.push(responseData.newposition);
                            self.Model.set("editModel", model);
                            self.setupPositions();
                        });
                    };
                    Editor.prototype.getPosIndex = function (field, fieldReplace) {
                        var sindex = field.replace("editModel.positions[", "").replace(("]." + fieldReplace), "");
                        var result = +sindex;
                        return result;
                    };
                    Editor.prototype.changeModel = function (e) {
                        if (e.field.indexOf("editModel.positions[") > -1) {
                            var doc = this.EditorModel;
                            if (e.field.lastIndexOf("].quantity") > -1) {
                                var index = this.getPosIndex(e.field, "quantity");
                                doc.positions[index].sum = Math.round((doc.positions[index].quantity * doc.positions[index].price) * 100) / 100;
                                this.Model.set("editModel", doc);
                            }
                            else if (e.field.lastIndexOf("].price") > -1) {
                                var index = this.getPosIndex(e.field, "price");
                                doc.positions[index].sum = Math.round((doc.positions[index].quantity * doc.positions[index].price) * 100) / 100;
                                this.Model.set("editModel", doc);
                            }
                            else if (e.field.lastIndexOf("].sum") > -1) {
                                var index = this.getPosIndex(e.field, "sum");
                                if (doc.positions[index].quantity > 0 && doc.positions[index].sum > 0) {
                                    doc.positions[index].price = Math.round((doc.positions[index].sum / doc.positions[index].quantity) * 100) / 100;
                                    this.Model.set("editModel", doc);
                                }
                            }
                            this.Model.set("totalSum", this.calsTotalSum());
                        }
                        else if (e.field === "documentConduct") {
                            var conduct = this.Model.get("documentConduct");
                            var options = this.Model.get("editModel.option");
                            if (conduct) {
                                if ((options & 1) !== 1) {
                                    options = options + 1;
                                    this.Model.set("editModel.option", options);
                                }
                            }
                            else {
                                if ((options & 1) === 1) {
                                    options = options - 1;
                                    this.Model.set("editModel.option", options);
                                }
                            }
                        }
                        else if (e.field === "totalSum") {
                            this.Model.set("totalSumText", utils.numberToString(this.Model.get("totalSum"), 2));
                        }
                    };
                    return Editor;
                }(base.Controller.BaseEditor));
                Editor_1.Editor = Editor;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=editor.js.map