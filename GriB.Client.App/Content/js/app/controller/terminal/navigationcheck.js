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
                    this.terminal = terminal;
                    this.controlContainerChecks = view.find("#posterminal-view-checks-container");
                    this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
                    this.buttonNewCheck = this.ControlContainerChecks.find("#btn-check-new");
                    this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
                    this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
                    this.controlTableBodyPositions = this.controlTablePositions.find("tbody");
                    this.controlTotal = this.controlContainerChecks.find("#posterminal-view-check-total");
                    this.model = new kendo.data.ObservableObject({
                        "visibleCheck": false,
                        "visibleCheck1": "none",
                        "labelTime": vars._statres("label$time"),
                        "checkTime": "",
                        "visibleClient": false,
                        "labelClient": vars._statres("label$client"),
                        "checkClient": "",
                        "Sum": 0,
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
                };
                NavigationCheck.prototype.ViewResize = function (e) {
                    if (this.controlContainerChecks) {
                        var height = $(window).height();
                        var totalHeight = this.controlTotal.height() + 10;
                        var btnheight = this.controlButtons.height() + 10;
                        this.controlContainerChecks.height(height - this.controlContainerChecks.offset().top);
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
                    var controller = this;
                    controller.Service.CheckOpened(controller.terminal.CurrentSalePoint, function (responseData) {
                        controller.openedChecks = responseData.checkopened;
                        controller.drawChecks(true);
                        if (controller.openedChecks && controller.openedChecks.length > 0)
                            controller.setCurrentCheck(controller.openedChecks[0]);
                        else
                            controller.setCurrentCheck(undefined);
                    });
                };
                NavigationCheck.prototype.createEvents = function () {
                    this.NewCheckButtonClick = utils.createTouchClickEvent(this.buttonNewCheck, this.newCheckButtonClick, this);
                };
                NavigationCheck.prototype.destroyEvents = function () {
                    this.controlContainerChecks.unbind();
                    utils.destroyTouchClickEvent(this.buttonNewCheck, this.NewCheckButtonClick);
                    this.destroyEventsChecks();
                };
                NavigationCheck.prototype.destroyEventsChecks = function () {
                    utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip"), this.CheckButtonClick);
                    utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip i"), this.CheckDelete);
                };
                NavigationCheck.prototype.changeModel = function (e) {
                    if (e.field === "checkTime") {
                        var checkTime = this.model.get("checkTime");
                        var isVisible = this.model.get("visibleCheck");
                        isVisible = (checkTime && checkTime !== "");
                        this.model.set("visibleCheck1", isVisible === true ? "display" : "none");
                        this.model.set("visibleCheck", isVisible);
                    }
                    else if (e.field === "checkClient") {
                        var checkClient = this.model.get("checkClient");
                        this.model.set("visibleClient", (checkClient && checkClient !== ""));
                    }
                };
                NavigationCheck.prototype.setCurrentCheck = function (currentCheck) {
                    var controller = this;
                    if (controller.currentCheck)
                        $('#check_id_' + controller.currentCheck.id).removeClass(['check-select', 'z-depth-1']);
                    controller.currentCheck = currentCheck;
                    if (controller.currentCheck) {
                        $('#check_id_' + controller.currentCheck.id).addClass(['check-select', 'z-depth-1']);
                        this.model.set("checkTime", utils.dateToLongString(controller.currentCheck.cd));
                        //this.model.set("checkClient", "");
                    }
                    else {
                        this.model.set("checkTime", "");
                        this.model.set("checkClient", "");
                    }
                    this.controlContainerChecks.unbind();
                    kendo.bind(this.controlContainerChecks, this.model);
                    this.model.bind("change", $.proxy(this.changeModel, this));
                    this.drawCheckPositions();
                };
                NavigationCheck.prototype.setCurrentCheckById = function (currentCheckId) {
                    var controller = this;
                    for (var i = 0, iCount = (controller.openedChecks ? controller.openedChecks.length : 0); i < iCount; i++) {
                        if (controller.openedChecks[i].id === currentCheckId) {
                            this.setCurrentCheck(controller.openedChecks[i]);
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
                NavigationCheck.prototype.drawCheckPositions = function () {
                    var controller = this;
                    var html = '';
                    var positionsArray = (controller.currentCheck && controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    for (var i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                        html += '<tr id="check_pos_' + i + '">';
                        html += '<td class="product-col-name">' + positionsArray[i].product.name + '</td>';
                        html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                        html += '<td class="product-col-quantity-auto">' + positionsArray[i].quantity + '</td>';
                        html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                        html += '<td class="product-col-sum-auto">' + positionsArray[i].price + '</td>';
                        html += '</tr>';
                    }
                    controller.controlTableBodyPositions.html(html);
                };
                NavigationCheck.prototype.newCheckButtonClick = function (e) {
                    var controller = this;
                    if (controller.openedChecks && controller.openedChecks.length > 0) {
                        for (var i = 0, iCount = controller.openedChecks.length; i < iCount; i++) {
                            var currentCheck = controller.openedChecks[i];
                            if (!currentCheck.positions || currentCheck.positions.length < 1) {
                                controller.setCurrentCheck(currentCheck);
                                return;
                            }
                        }
                    }
                    controller.Service.CheckNew(controller.terminal.CurrentSalePoint, function (responseData) {
                        if (!controller.openedChecks)
                            controller.openedChecks = [];
                        controller.openedChecks.push(responseData.checknew);
                        controller.drawChecks(false);
                        controller.setCurrentCheck(responseData.checknew);
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
                                    $("#check_id_" + currentCheck.id).remove();
                                    controller.openedChecks.splice(controller.openedChecks.indexOf(currentCheck), 1);
                                    if (controller.openedChecks.length > 0)
                                        controller.setCurrentCheck(controller.openedChecks[0]);
                                    else
                                        controller.setCurrentCheck(undefined);
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
                NavigationCheck.prototype.AddPosition = function (product) {
                    var _this = this;
                    var controller = this;
                    if (controller.currentCheck) {
                        this.Service.AddToCheck(controller.currentCheck.id, product, 1, function (responseData) {
                            var positionsArray = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                            var newItem = responseData.newposition;
                            var isNotFound = true;
                            for (var i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                                if (newItem.index === positionsArray[i].index) {
                                    positionsArray[i] = newItem;
                                    isNotFound = false;
                                    break;
                                }
                            }
                            if (isNotFound === true)
                                positionsArray.push(newItem);
                            _this.drawCheckPositions();
                        });
                    }
                };
                return NavigationCheck;
            }());
            Terminal.NavigationCheck = NavigationCheck;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationcheck.js.map