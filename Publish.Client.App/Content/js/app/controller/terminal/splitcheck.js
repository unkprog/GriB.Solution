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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/common/basecontroller"], function (require, exports, vars, utils, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var SplitCheck = /** @class */ (function (_super) {
                __extends(SplitCheck, _super);
                function SplitCheck() {
                    var _this = _super.call(this) || this;
                    _this.editRowQuantity = -1;
                    if (_this.EditorSettings) {
                        if (_this.EditorSettings.ButtonSetings) {
                            _this.EditorSettings.ButtonSetings.IsSave = true;
                            _this.EditorSettings.ButtonSetings.IsCancel = true;
                        }
                    }
                    return _this;
                    //this.Model.set("editModel.result", -1);
                }
                SplitCheck.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/splitcheck.html", Id: "splitcheck-view" };
                };
                Object.defineProperty(SplitCheck.prototype, "EditorModel", {
                    get: function () {
                        return this.Model.get("editModel").toJSON();
                    },
                    set: function (value) {
                        var model = value;
                        var rows = model.currentCheck.positions;
                        model.positions = [];
                        for (var i = 0, icount = (rows ? rows.length : 0); i < icount; i++) {
                            model.positions.push(JSON.parse(JSON.stringify(rows[i])));
                            model.positions[i].index = i + 1;
                            model.positions[i].quantityOld = model.positions[i].quantity;
                            model.positions[i].quantity = 0;
                        }
                        this.Model.set("editModel", value);
                        this.tableSplitControlSetup();
                    },
                    enumerable: true,
                    configurable: true
                });
                SplitCheck.prototype.createModel = function () {
                    var result = new kendo.data.ObservableObject({
                        "Header": vars._statres("label$splitcheck"),
                        "editModel": {
                            currentCheck: {},
                            positions: []
                        }
                    });
                    return result;
                };
                SplitCheck.prototype.ViewInit = function (view) {
                    var controller = this;
                    controller.tableSplitControl = view.find("#splitcheck-view-table");
                    controller.tableSplitBodyControl = this.tableSplitControl.find("tbody");
                    return _super.prototype.ViewInit.call(this, view);
                };
                SplitCheck.prototype.loadData = function () {
                    var controller = this;
                    controller.afterLoad();
                    controller.endLoad();
                    controller.tableSplitControlSetup();
                    return true;
                };
                SplitCheck.prototype.ViewShow = function (e) {
                    return _super.prototype.ViewShow.call(this, e);
                };
                SplitCheck.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                };
                SplitCheck.prototype.destroyEvents = function () {
                    var controller = this;
                    utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick);
                    utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick);
                    utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick);
                    _super.prototype.destroyEvents.call(this);
                };
                SplitCheck.prototype.validate = function () {
                    var controller = this;
                    var result = _super.prototype.validate.call(this);
                    if (result === true && this.OnResult)
                        this.OnResult(controller);
                    return result;
                };
                SplitCheck.prototype.tableSplitControlSetup = function () {
                    if (!this.tableSplitControl)
                        return;
                    var controller = this;
                    utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick);
                    utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick);
                    utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick);
                    var model = this.EditorModel;
                    var html = '';
                    var rows = model.currentCheck.positions;
                    for (var i = 0, icount = (rows ? rows.length : 0); i < icount; i++) {
                        html += '<tr id="check_pos_' + i + '">';
                        html += '<td class="product-col-name">' + model.positions[i].product.name + '</td>';
                        html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_add"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                        html += '<td class="product-col-quantity-auto"><div class="doc-edit-ref check_pos_q_edit">' + model.positions[i].quantity + '</div></td>';
                        html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_del"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                        //html += '<td class="product-col-quantity-auto"><div class="doc-edit-ref check_pos_q_edit">' + model.positions[i].quantityOld + '</div></td>';
                        html += '</tr>';
                    }
                    controller.tableSplitBodyControl.html(html);
                    utils.createTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick, controller);
                    utils.createTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick, controller);
                    utils.createTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick, controller);
                };
                SplitCheck.prototype.checkPosAddQuantitytButtonClick = function (e) {
                    var controller = this;
                    var model = controller.EditorModel;
                    var positionsArray = (model.positions ? model.positions : []);
                    var curRow = $(e.currentTarget).parent().parent();
                    if (curRow && curRow.length > 0) {
                        var id = +curRow[0].id.replace("check_pos_", "");
                        if (model.currentCheck.positions[id].quantity > positionsArray[id].quantity) {
                            positionsArray[id].quantity = positionsArray[id].quantity + 1;
                            controller.Model.set("editModel", model);
                            controller.tableSplitControlSetup();
                        }
                    }
                };
                SplitCheck.prototype.checkPosDelQuantitytButtonClick = function (e) {
                    var controller = this;
                    var model = controller.EditorModel;
                    var positionsArray = (model.positions ? model.positions : []);
                    var curRow = $(e.currentTarget).parent().parent();
                    if (curRow && curRow.length > 0) {
                        var id = +curRow[0].id.replace("check_pos_", "");
                        if (positionsArray[id].quantity > 0) {
                            positionsArray[id].quantity = positionsArray[id].quantity - 1;
                            if (positionsArray[id].quantity < 0)
                                positionsArray[id].quantity = 0;
                            this.Model.set("editModel", model);
                            controller.tableSplitControlSetup();
                        }
                    }
                };
                SplitCheck.prototype.checkPosEditQuantitytButtonClick = function (e) {
                    var self = this;
                    var model = self.EditorModel;
                    var positionsArray = (model.positions ? model.positions : []);
                    var curRow = $(e.currentTarget).parent().parent();
                    if (curRow && curRow.length > 0) {
                        self.editRowQuantity = +curRow[0].id.replace("check_pos_", "");
                        vars._app.OpenController({
                            urlController: 'terminal/quantirynumpad', isModal: true, onLoadController: function (controller) {
                                var ctrlPaymentPinPad = controller;
                                ctrlPaymentPinPad.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                                ctrlPaymentPinPad.TotalSum = positionsArray[self.editRowQuantity].quantityOld;
                                ctrlPaymentPinPad.ReceivedSum = undefined;
                                ctrlPaymentPinPad.SurrenderSum = undefined;
                                ctrlPaymentPinPad.OnPaymentApply = $.proxy(self.applyQuantity, self);
                            }
                        });
                    }
                };
                SplitCheck.prototype.applyQuantity = function (controller) {
                    var self = this;
                    if (self.editRowQuantity > -1) {
                        var model = self.EditorModel;
                        var positionsArray = (model.positions ? model.positions : []);
                        positionsArray[self.editRowQuantity].quantity = controller.ReceivedSum;
                        if (positionsArray[self.editRowQuantity].quantity < 0)
                            positionsArray[self.editRowQuantity].quantity = 0;
                        else if (positionsArray[self.editRowQuantity].quantity > model.currentCheck.positions[self.editRowQuantity].quantity)
                            positionsArray[self.editRowQuantity].quantity = model.currentCheck.positions[self.editRowQuantity].quantity;
                        self.Model.set("editModel", model);
                        self.tableSplitControlSetup();
                    }
                };
                return SplitCheck;
            }(base.Controller.BaseEditor));
            Terminal.SplitCheck = SplitCheck;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/splitcheck", function (module) { return new module.Controller.Terminal.SplitCheck(); });
});
//# sourceMappingURL=splitcheck.js.map