define(["require", "exports", "app/common/variables", "app/common/utils", "app/services/posterminalservice"], function (require, exports, vars, utils, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var NavigationCheck = /** @class */ (function () {
                function NavigationCheck(view, terminal) {
                    this.openedChecks = [];
                    this.currentCheck = undefined;
                    this.editRowQuantity = -1;
                    this.paymentData = { check: 0, paymentType: 0, paymentOption: 0, paymentSum: 0, salepoint: 0, client: 0, comment: '' };
                    this.terminal = terminal;
                    this.thisView = view.find("#posterminal-view-main");
                    this.controlContainerChecks = view.find("#posterminal-view-checks-container");
                    this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
                    this.buttonNewCheck = this.ControlContainerChecks.find("#btn-check-new");
                    this.buttonNewCheck.tooltip({ html: vars._statres("label$addcheck") });
                    this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
                    this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
                    this.controlTableBodyPositions = this.controlTablePositions.find("tbody");
                    this.controlTotal = this.controlContainerChecks.find("#posterminal-view-check-total");
                    this.buttonCheckClient = this.controlContainerChecks.find("#btn-check-person");
                    this.buttonCheckClient.tooltip({ html: vars._statres("label$client") });
                    this.ControlContainerChecks.find('#btn-check-discount').tooltip({ html: vars._statres("label$discount") });
                    this.buttonCheckDiscount = this.controlContainerChecks.find("#btn-check-discount-item");
                    this.buttonCheckNoDiscount = this.controlContainerChecks.find("#btn-check-nodiscount-item");
                    this.buttonCheckComment = this.controlContainerChecks.find("#btn-check-comment");
                    this.buttonCheckComment.tooltip({ html: vars._statres("label$comment") });
                    this.buttonCheckMenu = this.controlContainerChecks.find("#btn-check-menu");
                    this.buttonCheckPayment = this.controlContainerChecks.find("#btn-check-payment");
                    this.buttonCheckCancel = this.controlContainerChecks.find("#btn-check-cancel-item");
                    this.buttonSplitCheck = this.controlContainerChecks.find("#btn-check-split-item");
                    this.buttonPrintPreCheck = this.controlContainerChecks.find("#btn-check-printpre-item");
                    this.controlMenuCheck = view.find('#posterminal-main-view-slide');
                    this.controlMenuCheck.sidenav({ draggable: false });
                    this.hidedMenuCheck = view.find('#posterminal-view-checks-slide');
                    this.model = new kendo.data.ObservableObject({
                        "visibleCheck": false,
                        "labelTime": vars._statres("label$time"),
                        "checkTime": "",
                        "labelClient": vars._statres("label$client"),
                        "checkClient": "",
                        "visibleClient": false,
                        "checkDiscount": "",
                        "visibleDiscount": false,
                        "labelPayment": vars._statres("label$payment"),
                        "checkSum": 0,
                        "checkSumNoDiscount": 0,
                        "checkSumText": "0.00",
                        "checkSumNoDiscountText": "0.00",
                        "labetToDiscount": "со скидкой",
                        "labelDiscount": vars._statres("label$discount"),
                        "labelNoDiscount": vars._statres("label$withoutdiscount"),
                        "labelCancelOrder": vars._statres("label$cancelorder"),
                        "labelSplitCheck": vars._statres("label$splitcheck"),
                        "labelPrintPreCheck": vars._statres("label$printprecheck")
                    });
                }
                Object.defineProperty(NavigationCheck.prototype, "Service", {
                    get: function () {
                        if (!this.service)
                            this.service = new svc.Services.POSTerminalService();
                        return this.service;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(NavigationCheck.prototype, "Model", {
                    get: function () {
                        return this.model;
                    },
                    enumerable: true,
                    configurable: true
                });
                NavigationCheck.prototype.OpenSlideChecks = function () {
                    this.ViewResize(undefined);
                    if (this.controlMenuCheck) {
                        this.controlMenuCheck.sidenav('open');
                    }
                };
                NavigationCheck.prototype.CloseSlideChecks = function () {
                    if (this.controlMenuCheck) {
                        this.controlMenuCheck.sidenav('close');
                    }
                };
                Object.defineProperty(NavigationCheck.prototype, "ControlContainerChecks", {
                    get: function () {
                        return this.controlContainerChecks;
                    },
                    enumerable: true,
                    configurable: true
                });
                NavigationCheck.prototype.ViewShow = function (e) {
                    //let controller = this;
                    $('.chips').chips(); //{ onChipDelete: $.proxy(controller.CheckDelete, controller) }
                    $('#btn-check-discount').dropdown();
                    $('#btn-check-menu').dropdown();
                    this.ViewResize({});
                };
                NavigationCheck.prototype.ViewResize = function (e) {
                    if (this.controlContainerChecks) {
                        var height = $(window).height();
                        var width = $(window).width();
                        var totalHeight = this.controlTotal.height() + 10;
                        var btnheight = this.controlButtons.height() + 10;
                        this.controlContainerChecks.height(height - this.controlContainerChecks.offset().top);
                        if (this.controlContainerChecks && this.controlContainerChecks.length) {
                            var parent_1 = this.controlContainerChecks.parent();
                            if (width >= 600) {
                                if (this.thisView[0].id !== parent_1[0].id) {
                                    this.controlContainerChecks.remove();
                                    this.thisView.prepend(this.controlContainerChecks);
                                }
                            }
                            else {
                                if (this.hidedMenuCheck[0].id !== parent_1[0].id) {
                                    this.controlContainerChecks.remove();
                                    this.hidedMenuCheck.prepend(this.controlContainerChecks);
                                }
                            }
                        }
                        if (this.controlTablePositions) {
                            this.controlTablePositions.height(height - this.controlTablePositions.offset().top - totalHeight - btnheight);
                            this.controlTablePositions.find('tbody').height(height - this.controlTablePositions.offset().top - totalHeight - btnheight);
                        }
                        //if (this.controlButtons)
                        //    this.controlButtons.css({ "position": "absolute", "top": "" + (height - btnheight) + "px", "width": "" + this.controlContainerChecks.width() + "px" });
                    }
                };
                NavigationCheck.prototype.Reset = function () {
                    this.openedChecks = [];
                    this.currentCheck = undefined;
                    this.loadData();
                };
                NavigationCheck.prototype.loadData = function () {
                    var self = this;
                    self.terminal.CheckChange(function () {
                        self.Service.CheckOpened(self.terminal.CurrentSalePoint, self.terminal.CurrentChange, function (responseData) {
                            self.openedChecks = responseData.checkopened;
                            self.drawChecks(true);
                            if (self.openedChecks && self.openedChecks.length > 0)
                                self.setCurrentCheck(self.openedChecks[0], undefined);
                            else
                                self.setCurrentCheck(undefined, undefined);
                        });
                    });
                };
                NavigationCheck.prototype.createEvents = function () {
                    this.NewCheckButtonClick = utils.createTouchClickEvent(this.buttonNewCheck, this.newCheckButtonClick, this);
                    this.ClientButtonClick = utils.createTouchClickEvent(this.buttonCheckClient, this.clientButtonClick, this);
                    this.DiscountButtonClick = utils.createTouchClickEvent(this.buttonCheckDiscount, this.discountButtonClick, this);
                    this.NoDiscountButtonClick = utils.createTouchClickEvent(this.buttonCheckNoDiscount, this.noDiscountButtonClick, this);
                    this.CancelCheckButtonClick = utils.createTouchClickEvent(this.buttonCheckCancel, this.cancelCheckButtonClick, this);
                    this.CommentButtonClick = utils.createTouchClickEvent(this.buttonCheckComment, this.commentButtonClick, this);
                    this.PaymentButtonClick = utils.createTouchClickEvent(this.buttonCheckPayment, this.paymentButtonClick, this);
                    this.SplitCheckClick = utils.createTouchClickEvent(this.buttonSplitCheck, this.splitCheckClick, this);
                    this.PrintPreCheckClick = utils.createTouchClickEvent(this.buttonPrintPreCheck, this.printPreCheckClick, this);
                };
                NavigationCheck.prototype.destroyEvents = function () {
                    this.controlContainerChecks.unbind();
                    utils.destroyTouchClickEvent(this.controlTableBodyPositions.find('.check_pos_q_add'), this.checkPosAddQuantitytButtonClick);
                    utils.destroyTouchClickEvent(this.controlTableBodyPositions.find('.check_pos_q_edit'), this.checkPosEditQuantitytButtonClick);
                    utils.destroyTouchClickEvent(this.controlTableBodyPositions.find('.check_pos_q_del'), this.checkPosDelQuantitytButtonClick);
                    utils.destroyTouchClickEvent(this.buttonNewCheck, this.NewCheckButtonClick);
                    utils.destroyTouchClickEvent(this.buttonCheckClient, this.ClientButtonClick);
                    utils.destroyTouchClickEvent(this.buttonCheckDiscount, this.DiscountButtonClick);
                    utils.destroyTouchClickEvent(this.buttonCheckNoDiscount, this.NoDiscountButtonClick);
                    utils.destroyTouchClickEvent(this.buttonCheckCancel, this.CancelCheckButtonClick);
                    utils.destroyTouchClickEvent(this.buttonCheckComment, this.CommentButtonClick);
                    utils.destroyTouchClickEvent(this.buttonCheckPayment, this.PaymentButtonClick);
                    utils.destroyTouchClickEvent(this.buttonSplitCheck, this.SplitCheckClick);
                    utils.destroyTouchClickEvent(this.buttonPrintPreCheck, this.PrintPreCheckClick);
                    this.destroyEventsChecks();
                };
                NavigationCheck.prototype.destroyEventsChecks = function () {
                    utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip"), this.CheckButtonClick);
                    utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip i"), this.CheckDelete);
                };
                NavigationCheck.prototype.changeModel = function (e) {
                    if (e.field === "checkTime") {
                        var checkTime = this.model.get("checkTime");
                        var isVisible = (checkTime && checkTime !== "");
                        this.model.set("visibleCheck", isVisible);
                    }
                    else if (e.field === "checkClient") {
                        var checkClient = this.model.get("checkClient");
                        this.model.set("visibleClient", (checkClient && checkClient !== "" ? "display" : "none"));
                    }
                    else if (e.field === "checkSum") {
                        this.model.set("checkSumText", utils.numberToString(this.model.get("checkSum"), 2));
                    }
                    else if (e.field === "checkSumNoDiscount") {
                        this.model.set("checkSumNoDiscountText", utils.numberToString(this.model.get("checkSumNoDiscount"), 2));
                    }
                    else if (e.field === "checkDiscount") {
                        var discount = this.model.get("checkDiscount");
                        this.model.set("visibleDiscount", discount !== 0);
                    }
                    else if (e.field === "visibleClient" || e.field === "visibleDiscount" || e.field === "visibleCheck") {
                        //this.ViewResize({});
                    }
                };
                NavigationCheck.prototype.setCurrentCheck = function (currentCheck, onSetCurrent) {
                    var controller = this;
                    if (controller.currentCheck)
                        $('#check_id_' + controller.currentCheck.id).removeClass(['check-select', 'z-depth-1']);
                    controller.currentCheck = currentCheck;
                    if (controller.currentCheck) {
                        $('#check_id_' + controller.currentCheck.id).addClass(['check-select', 'z-depth-1']);
                        //this.model.set("checkSum", this.calcCheckSum());
                        this.model.set("checkTime", utils.date_ddmmyyyy_withtime(controller.currentCheck.cd));
                        this.model.set("visibleClient", (controller.currentCheck.client && controller.currentCheck.client.name && controller.currentCheck.client.name != ""));
                        if (controller.currentCheck.client)
                            this.model.set("checkClient", controller.currentCheck.client.name);
                    }
                    else {
                        this.model.set("checkTime", "");
                        this.model.set("checkClient", "");
                        this.model.set("visibleCheck", false);
                    }
                    this.controlContainerChecks.unbind();
                    this.drawCheckPositions(false);
                    kendo.bind(this.controlContainerChecks, this.model);
                    this.model.bind("change", $.proxy(this.changeModel, this));
                    controller.calcCheckSum();
                    if (onSetCurrent)
                        onSetCurrent();
                    if (controller.currentCheck)
                        this.model.set("visibleCheck", true);
                    this.ViewResize(undefined);
                };
                NavigationCheck.prototype.setCurrentCheckById = function (currentCheckId) {
                    var controller = this;
                    for (var i = 0, iCount = (controller.openedChecks ? controller.openedChecks.length : 0); i < iCount; i++) {
                        if (controller.openedChecks[i].id === currentCheckId) {
                            this.setCurrentCheck(controller.openedChecks[i], undefined);
                            break;
                        }
                    }
                };
                NavigationCheck.prototype.drawChecks = function (isReset) {
                    var controller = this;
                    var html = '';
                    var strId;
                    var findId;
                    if (isReset) {
                        this.destroyEventsChecks();
                        this.controlChecks.find(".check-chip").remove();
                    }
                    for (var i = 0, iCount = (controller.openedChecks ? controller.openedChecks.length : 0); i < iCount; i++) {
                        strId = 'check_id_' + controller.openedChecks[i].id;
                        findId = controller.controlChecks.find('#' + strId);
                        if (!(findId && findId.length > 0))
                            html += '<div id="check_id_' + controller.openedChecks[i].id + '" class="chip check-chip">Чек №' + controller.openedChecks[i].number + '<i class="close material-icons">close</i></div>';
                    }
                    findId = $(html);
                    this.CheckButtonClick = utils.createTouchClickEvent(findId, this.checkButtonClick, this);
                    this.CheckDelete = utils.createTouchClickEvent(findId.find('i'), this.checkDelete, this);
                    controller.controlChecks.append(findId);
                };
                NavigationCheck.prototype.drawCheckPositions = function (isBinded) {
                    if (isBinded === void 0) { isBinded = true; }
                    var controller = this;
                    var html = '';
                    var sum = 0;
                    var positionsArray = (controller.currentCheck && controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    utils.destroyTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick);
                    utils.destroyTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick);
                    utils.destroyTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick);
                    for (var i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                        html += '<tr id="check_pos_' + i + '">';
                        html += '<td class="product-col-name">' + positionsArray[i].product.name + '</td>';
                        html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_add"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                        html += '<td class="product-col-quantity-auto"><div class="doc-edit-ref check_pos_q_edit">' + positionsArray[i].quantity + '</div></td>';
                        html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_del"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                        html += '<td class="product-col-sum-auto">' + utils.numberToString(positionsArray[i].price, 2) + '</td>';
                        html += '</tr>';
                    }
                    controller.controlTableBodyPositions.html(html);
                    utils.createTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick, controller);
                    utils.createTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick, controller);
                    utils.createTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick, controller);
                    if (isBinded === true)
                        controller.calcCheckSum();
                };
                NavigationCheck.prototype.calcCheckSum = function () {
                    var controller = this;
                    var result = 0;
                    var resultDiscount = 0;
                    if (controller.currentCheck) {
                        var positionsArray = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                        for (var i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                            positionsArray[i].sum = (positionsArray[i].quantity ? positionsArray[i].quantity : 0) * (positionsArray[i].price ? positionsArray[i].price : 0);
                            result += positionsArray[i].sum;
                        }
                        resultDiscount = result - ((controller.currentCheck.discount / 100) * result);
                        this.model.set("checkDiscount", controller.currentCheck.discount + '%' + (controller.currentCheck.discountref && utils.isNullOrEmpty(controller.currentCheck.discountref.name) === false ? ' (' + controller.currentCheck.discountref.name + ')' : ''));
                    }
                    else
                        this.model.set("checkDiscount", '');
                    this.model.set("checkSum", resultDiscount);
                    this.model.set("checkSumNoDiscount", result);
                    return result;
                };
                NavigationCheck.prototype.newCheckButtonClick = function (e) {
                    var self = this;
                    self.terminal.CheckChange(function () {
                        self.setCurrentOrNew(undefined);
                    });
                };
                NavigationCheck.prototype.setCurrentOrNew = function (onSetCurrent) {
                    var controller = this;
                    if (controller.openedChecks && controller.openedChecks.length > 0) {
                        for (var i = 0, iCount = controller.openedChecks.length; i < iCount; i++) {
                            var currentCheck = controller.openedChecks[i];
                            if (!currentCheck.positions || currentCheck.positions.length < 1) {
                                controller.setCurrentCheck(currentCheck, onSetCurrent);
                                return;
                            }
                        }
                    }
                    controller.Service.CheckNew(controller.terminal.CurrentSalePoint, controller.terminal.CurrentChange, function (responseData) {
                        if (!controller.openedChecks)
                            controller.openedChecks = [];
                        controller.openedChecks.push(responseData.checknew);
                        controller.drawChecks(false);
                        controller.setCurrentCheck(responseData.checknew, onSetCurrent);
                    });
                };
                NavigationCheck.prototype.checkButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("check_id_", "");
                    if (!id || id === -1)
                        return;
                    this.setCurrentCheckById(id);
                };
                NavigationCheck.prototype.checkDelete = function (e) {
                    e.stopPropagation();
                    var targetid = e.currentTarget.parentElement.id;
                    var id = +targetid.replace("check_id_", "");
                    if (!id || id === -1)
                        return;
                    var controller = this;
                    if (controller.openedChecks && controller.openedChecks.length > 0) {
                        var _loop_1 = function (i, iCount) {
                            var currentCheck = controller.openedChecks[i];
                            if (currentCheck.id === id && (!currentCheck.positions || currentCheck.positions.length < 1)) {
                                controller.Service.CheckDelete(currentCheck.id, function (responseData) {
                                    controller.removeCurrentCheck(currentCheck);
                                });
                                return { value: void 0 };
                            }
                        };
                        for (var i = 0, iCount = controller.openedChecks.length; i < iCount; i++) {
                            var state_1 = _loop_1(i, iCount);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                };
                NavigationCheck.prototype.removeCurrentCheck = function (currentCheck) {
                    if (!currentCheck)
                        return;
                    var controller = this;
                    $("#check_id_" + currentCheck.id).remove();
                    controller.openedChecks.splice(controller.openedChecks.indexOf(currentCheck), 1);
                    if (controller.openedChecks.length > 0)
                        controller.setCurrentCheck(controller.openedChecks[0], undefined);
                    else
                        controller.setCurrentCheck(undefined, undefined);
                };
                NavigationCheck.prototype.AddPosition = function (product) {
                    var controller = this;
                    if (!controller.currentCheck)
                        controller.setCurrentOrNew(function () {
                            controller._AddPosition(product);
                        });
                    else
                        controller._AddPosition(product);
                };
                NavigationCheck.prototype.updateResponsePositions = function (responseData) {
                    var controller = this;
                    var positionsArray = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    var newItem = responseData.newposition;
                    var isNotFound = true;
                    for (var i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                        if (newItem.index === positionsArray[i].index) {
                            if (newItem.quantity <= 0)
                                positionsArray.splice(i, 1);
                            else
                                positionsArray[i] = newItem;
                            isNotFound = false;
                            break;
                        }
                    }
                    if (isNotFound === true)
                        positionsArray.push(newItem);
                    this.drawCheckPositions();
                };
                NavigationCheck.prototype._EditPosition = function (product, qunatity) {
                    var controller = this;
                    if (controller.currentCheck) {
                        this.Service.EditPosCheck(controller.currentCheck.id, product, qunatity, function (responseData) {
                            controller.updateResponsePositions(responseData);
                        });
                    }
                };
                NavigationCheck.prototype._AddPosition = function (product, qunatity) {
                    if (qunatity === void 0) { qunatity = 1; }
                    var controller = this;
                    if (controller.currentCheck) {
                        this.Service.AddToCheck(controller.currentCheck.id, product, qunatity, function (responseData) {
                            controller.updateResponsePositions(responseData);
                        });
                    }
                };
                NavigationCheck.prototype.checkPosAddQuantitytButtonClick = function (e) {
                    var controller = this;
                    var positionsArray = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    var curRow = $(e.currentTarget).parent().parent();
                    if (curRow && curRow.length > 0) {
                        var id = +curRow[0].id.replace("check_pos_", "");
                        controller._AddPosition(positionsArray[id].product.id);
                    }
                };
                NavigationCheck.prototype.checkPosEditQuantitytButtonClick = function (e) {
                    var self = this;
                    var positionsArray = (self.currentCheck.positions ? self.currentCheck.positions : []);
                    var curRow = $(e.currentTarget).parent().parent();
                    if (curRow && curRow.length > 0) {
                        self.editRowQuantity = +curRow[0].id.replace("check_pos_", "");
                        vars._app.OpenController({
                            urlController: 'terminal/quantirynumpad', isModal: true, onLoadController: function (controller) {
                                var ctrlPaymentPinPad = controller;
                                ctrlPaymentPinPad.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                                ctrlPaymentPinPad.TotalSum = positionsArray[self.editRowQuantity].quantity;
                                ctrlPaymentPinPad.ReceivedSum = undefined;
                                ctrlPaymentPinPad.SurrenderSum = undefined;
                                ctrlPaymentPinPad.OnPaymentApply = $.proxy(self.applyQuantity, self);
                            }
                        });
                    }
                };
                NavigationCheck.prototype.applyQuantity = function (controller) {
                    var self = this;
                    if (this.currentCheck) {
                        var positionsArray = (self.currentCheck.positions ? self.currentCheck.positions : []);
                        if (self.editRowQuantity > -1)
                            self._EditPosition(positionsArray[self.editRowQuantity].product.id, controller.ReceivedSum);
                    }
                };
                NavigationCheck.prototype.checkPosDelQuantitytButtonClick = function (e) {
                    var controller = this;
                    var positionsArray = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    var curRow = $(e.currentTarget).parent().parent();
                    if (curRow && curRow.length > 0) {
                        var id = +curRow[0].id.replace("check_pos_", "");
                        controller._AddPosition(positionsArray[id].product.id, -1);
                    }
                };
                NavigationCheck.prototype.clientButtonClick = function (e) {
                    var self = this;
                    self.CloseSlideChecks();
                    vars._app.OpenController({
                        urlController: 'setting/card/client', isModal: true, onLoadController: function (controller) {
                            var ctrClient = controller;
                            ctrClient.IsShowPhone(vars._identity.employee.isfullaccess === true);
                            ctrClient.CardSettings.IsAdd = false;
                            ctrClient.CardSettings.IsEdit = false;
                            ctrClient.CardSettings.IsDelete = false;
                            ctrClient.CardSettings.IsSelect = true;
                            ctrClient.OnSelect = $.proxy(self.selectClient, self);
                        }
                    });
                };
                NavigationCheck.prototype.selectClient = function (controller) {
                    var record = controller.getSelectedRecord();
                    if (record) {
                        var controller_1 = this;
                        controller_1.currentCheck.client = { id: record.id, name: record.name /*+ (utils.isNullOrEmpty(record.phone) ? "" : " (" + record.phone + ")")*/ };
                        controller_1.Service.CheckSetClient(controller_1.currentCheck.id, controller_1.currentCheck.client.id, function (responseData) {
                            controller_1.model.set("checkClient", (controller_1.currentCheck.client ? controller_1.currentCheck.client.name : ""));
                        });
                    }
                };
                NavigationCheck.prototype.discountButtonClick = function (e) {
                    var self = this;
                    self.CloseSlideChecks();
                    vars._app.OpenController({
                        urlController: 'setting/card/discount', isModal: true, onLoadController: function (controller) {
                            var ctrlProduct = controller;
                            ctrlProduct.CardSettings.IsAdd = false;
                            ctrlProduct.CardSettings.IsEdit = false;
                            ctrlProduct.CardSettings.IsDelete = false;
                            ctrlProduct.CardSettings.IsSelect = true;
                            ctrlProduct.OnSelect = $.proxy(self.selectDiscount, self);
                        }
                    });
                };
                NavigationCheck.prototype.selectDiscount = function (controller) {
                    var record = controller.getSelectedRecord();
                    if (record) {
                        var controller_2 = this;
                        controller_2.Service.CheckSetDiscount(controller_2.currentCheck.id, record, function (responseData) {
                            controller_2.currentCheck.discount = record.value;
                            controller_2.currentCheck.discountref = record;
                            controller_2.drawCheckPositions();
                        });
                    }
                };
                NavigationCheck.prototype.noDiscountButtonClick = function (e) {
                    var controller = this;
                    if (controller.currentCheck) {
                        controller.Service.CheckSetDiscount(controller.currentCheck.id, undefined, function (responseData) {
                            controller.currentCheck.discount = 0;
                            controller.currentCheck.discountref = undefined;
                            controller.drawCheckPositions();
                        });
                    }
                };
                NavigationCheck.prototype.cancelCheckButtonClick = function (e) {
                    var controller = this;
                    var self = this;
                    if (self.currentCheck) {
                        vars._app.OpenController({
                            urlController: 'terminal/checkcomment', isModal: true, onLoadController: function (controller) {
                                var ctrlComment = controller;
                                ctrlComment.Header = vars._statres("label$specifyreasoncancel");
                                ctrlComment.IsRequireComment = true;
                                ctrlComment.Comment = self.currentCheck.comment;
                                ctrlComment.OnApply = $.proxy(self.cancelCheckComment, self);
                            }
                        });
                    }
                };
                NavigationCheck.prototype.cancelCheckComment = function (controller) {
                    var self = this;
                    if (self.currentCheck) {
                        self.Service.CheckCancel(self.currentCheck.id, controller.Comment, function (responseData) {
                            self.removeCurrentCheck(self.currentCheck);
                        });
                    }
                };
                NavigationCheck.prototype.commentButtonClick = function (e) {
                    var self = this;
                    self.CloseSlideChecks();
                    if (self.currentCheck) {
                        vars._app.OpenController({
                            urlController: 'terminal/checkcomment', isModal: true, onLoadController: function (controller) {
                                var ctrlComment = controller;
                                ctrlComment.Header = vars._statres("label$commenttoorder");
                                ctrlComment.Comment = self.currentCheck.comment;
                                ctrlComment.OnApply = $.proxy(self.applyCheckComment, self);
                            }
                        });
                    }
                };
                NavigationCheck.prototype.applyCheckComment = function (controller) {
                    var self = this;
                    if (self.currentCheck) {
                        self.Service.CheckSetComment(self.currentCheck.id, controller.Comment, function (responseData) {
                            self.currentCheck.comment = controller.Comment;
                        });
                    }
                };
                NavigationCheck.prototype.paymentButtonClick = function (e) {
                    var self = this;
                    self.CloseSlideChecks();
                    vars._app.OpenController({
                        urlController: 'terminal/paymenttype', isModal: true, onLoadController: function (controller) {
                            var ctrlTypePayment = controller;
                            ctrlTypePayment.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                            ctrlTypePayment.OnSelectPaymentType = $.proxy(self.selectTypePayment, self);
                        }
                    });
                };
                NavigationCheck.prototype.selectTypePayment = function (controller) {
                    var _this = this;
                    var self = this;
                    if (self.currentCheck) {
                        var sum = this.model.get("checkSum");
                        if (sum === undefined || sum <= 0) {
                            M.toast({ html: vars._statres("error$terminal$ammountnotset") });
                            return;
                        }
                        self.paymentData = { check: self.currentCheck.id, salepoint: self.terminal.CurrentSalePoint, client: self.currentCheck.client.id, paymentType: controller.SelectedPaymentType, paymentOption: 0, paymentSum: 0, comment: '' };
                        if (this.paymentData.paymentType === 1) {
                            vars._app.OpenController({
                                urlController: 'terminal/paymentnumpad', isModal: true, onLoadController: function (controller) {
                                    var ctrlPaymentPinPad = controller;
                                    ctrlPaymentPinPad.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                                    ctrlPaymentPinPad.TotalSum = _this.model.get("checkSum");
                                    ctrlPaymentPinPad.ReceivedSum = undefined;
                                    ctrlPaymentPinPad.SurrenderSum = undefined;
                                    ctrlPaymentPinPad.OnPaymentApply = $.proxy(self.applyPayment, self);
                                }
                            });
                        }
                        else if (this.paymentData.paymentType === 2) {
                            vars._app.OpenController({
                                urlController: 'terminal/paymentnoncash', isModal: true, onLoadController: function (controller) {
                                    var ctrlPaymentNonCash = controller;
                                    ctrlPaymentNonCash.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                                    ctrlPaymentNonCash.TotalSum = _this.model.get("checkSum");
                                    ctrlPaymentNonCash.ReceivedSum = undefined;
                                    ctrlPaymentNonCash.SurrenderSum = undefined;
                                    ctrlPaymentNonCash.OnPaymentApply = $.proxy(self.applyPayment, self);
                                }
                            });
                        }
                        else if (this.paymentData.paymentType === 3) {
                            vars._app.OpenController({
                                urlController: 'terminal/paymentwithout', isModal: true, onLoadController: function (controller) {
                                    var ctrlPaymentWithOut = controller;
                                    ctrlPaymentWithOut.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                                    ctrlPaymentWithOut.TotalSum = _this.model.get("checkSum");
                                    ctrlPaymentWithOut.ReceivedSum = _this.model.get("checkSum");
                                    ctrlPaymentWithOut.SurrenderSum = 0;
                                    if (self.currentCheck.client)
                                        ctrlPaymentWithOut.Client = self.currentCheck.client;
                                    ctrlPaymentWithOut.OnPaymentApply = $.proxy(self.applyWithOut, self);
                                }
                            });
                        }
                    }
                };
                NavigationCheck.prototype.applyPayment = function (controller) {
                    if (this.currentCheck) {
                        this.paymentData.paymentOption = controller.TypeWithOut;
                        this.paymentData.paymentSum = controller.TotalSum; //(this.paymentData.paymentType === 3 ? 0 : controller.TotalSum);
                        this.paymentData.comment = controller.Comment;
                        this.closeCheck(this.paymentData);
                    }
                };
                NavigationCheck.prototype.applyWithOut = function (controller) {
                    if (this.currentCheck) {
                        this.currentCheck.client = controller.Client;
                        this.paymentData.client = this.currentCheck.client.id;
                        this.model.set("checkClient", (this.currentCheck.client ? this.currentCheck.client.name : ""));
                    }
                    this.applyPayment(controller);
                };
                NavigationCheck.prototype.closeCheck = function (paymentData) {
                    var controller = this;
                    if (controller.currentCheck) {
                        this.Service.CheckClose(paymentData, function (responseData) {
                            controller.removeCurrentCheck(controller.currentCheck);
                            controller.terminal.UpdateSumInCash();
                        });
                    }
                };
                NavigationCheck.prototype.splitCheckClick = function (e) {
                    this.CloseSlideChecks();
                    M.toast({ html: vars._statres("label$indevelopment") });
                };
                NavigationCheck.prototype.printPreCheckClick = function (e) {
                    this.CloseSlideChecks();
                    M.toast({ html: vars._statres("label$indevelopment") });
                };
                return NavigationCheck;
            }());
            Terminal.NavigationCheck = NavigationCheck;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationcheck.js.map