define(["require", "exports", "app/common/utils", "app/services/posterminalservice"], function (require, exports, utils, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var NavigationCheck = /** @class */ (function () {
                function NavigationCheck(view, terminal) {
                    this.checkData = {
                        currentCheck: {},
                        checks: []
                    };
                    this.terminal = terminal;
                    this.controlContainerChecks = view.find("#posterminal-view-checks-container");
                    this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
                    this.buttonNewCheck = this.ControlContainerChecks.find("#btn-check-new");
                    this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
                    this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
                    this.controlTableBodyPositions = this.controlTablePositions.find("tbody");
                    this.controlTotal = this.controlContainerChecks.find("#posterminal-view-check-total");
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
                Object.defineProperty(NavigationCheck.prototype, "ControlContainerChecks", {
                    get: function () {
                        return this.controlContainerChecks;
                    },
                    enumerable: true,
                    configurable: true
                });
                NavigationCheck.prototype.ViewShow = function (e) {
                    var controller = this;
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
                NavigationCheck.prototype.loadData = function () {
                    var controller = this;
                    controller.Service.CheckOpened(function (responseData) {
                        controller.checkData.checks = responseData.checkopened;
                        controller.drawChecks();
                        if (controller.checkData && controller.checkData.checks.length > 0)
                            controller.setCurrentCheck(controller.checkData.checks[0]);
                        else
                            controller.setCurrentCheck(undefined);
                    });
                };
                NavigationCheck.prototype.createEvents = function () {
                    this.NewCheckButtonClick = utils.createTouchClickEvent(this.buttonNewCheck, this.newCheckButtonClick, this);
                };
                NavigationCheck.prototype.destroyEvents = function () {
                    utils.destroyTouchClickEvent(this.buttonNewCheck, this.NewCheckButtonClick);
                    utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip"), this.CheckButtonClick);
                    utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip i"), this.CheckDelete);
                };
                NavigationCheck.prototype.setCurrentCheck = function (currentCheck) {
                    var controller = this;
                    if (controller.checkData.currentCheck)
                        $('#check_id_' + controller.checkData.currentCheck.id).removeClass(['check-select', 'z-depth-1']);
                    controller.checkData.currentCheck = currentCheck;
                    if (controller.checkData.currentCheck)
                        $('#check_id_' + controller.checkData.currentCheck.id).addClass(['check-select', 'z-depth-1']);
                    this.drawCheckPositions();
                    //controller.Service.CheckOpened((responseData) => {
                    //    controller.checkData.checks = responseData.checkopened;
                    //    if (controller.checkData && controller.checkData.checks.length > 0)
                    //        controller.checkData.currentCheck = 0;
                    //    controller.drawChecks();
                    //});
                };
                NavigationCheck.prototype.setCurrentCheckById = function (currentCheckId) {
                    var controller = this;
                    for (var i = 0, iCount = (controller.checkData.checks ? controller.checkData.checks.length : 0); i < iCount; i++) {
                        if (controller.checkData.checks[i].id === currentCheckId) {
                            this.setCurrentCheck(controller.checkData.checks[i]);
                            break;
                        }
                    }
                };
                NavigationCheck.prototype.drawChecks = function () {
                    var controller = this;
                    var checksArray = controller.checkData.checks;
                    var html = '';
                    var strId;
                    var findId;
                    for (var i = 0, iCount = (checksArray ? checksArray.length : 0); i < iCount; i++) {
                        strId = 'check_id_' + checksArray[i].id;
                        findId = controller.controlChecks.find('#' + strId);
                        if (findId && findId.length > 0) { }
                        else {
                            html += '<div id="check_id_' + checksArray[i].id + '" class="chip check-chip">Чек №' + checksArray[i].number + '<i class="close material-icons">close</i></div>';
                        }
                    }
                    findId = $(html);
                    this.CheckButtonClick = utils.createTouchClickEvent(findId, this.checkButtonClick, this);
                    this.CheckDelete = utils.createTouchClickEvent(findId.find('i'), this.checkDelete, this);
                    controller.controlChecks.append(findId);
                };
                NavigationCheck.prototype.drawCheckPositions = function () {
                    var controller = this;
                    var html = '';
                    var positionsArray = (controller.checkData.currentCheck ? controller.checkData.currentCheck.positions : []);
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
                    if (controller.checkData.checks && controller.checkData.checks.length > 0) {
                        for (var i = 0, iCount = controller.checkData.checks.length; i < iCount; i++) {
                            var currentCheck = controller.checkData.checks[i];
                            if (!currentCheck.positions || currentCheck.positions.length < 1) {
                                controller.setCurrentCheck(currentCheck);
                                return;
                            }
                        }
                    }
                    controller.Service.CheckNew(function (responseData) {
                        if (!controller.checkData.checks)
                            controller.checkData.checks = [];
                        controller.checkData.checks.push(responseData.checknew);
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
                    if (controller.checkData.checks && controller.checkData.checks.length > 0) {
                        var _loop_1 = function (i, iCount) {
                            var currentCheck = controller.checkData.checks[i];
                            if (currentCheck.id === id && (!currentCheck.positions || currentCheck.positions.length < 1)) {
                                controller.Service.CheckDelete(currentCheck.id, function (responseData) {
                                    if (!controller.checkData.checks)
                                        controller.checkData.checks = [];
                                    $("#check_id_" + currentCheck.id).remove();
                                    controller.checkData.checks.splice(controller.checkData.checks.indexOf(currentCheck), 1);
                                    if (controller.checkData && controller.checkData.checks.length > 0)
                                        controller.setCurrentCheck(controller.checkData.checks[0]);
                                    else
                                        controller.setCurrentCheck(undefined);
                                });
                                return { value: void 0 };
                            }
                        };
                        for (var i = 0, iCount = controller.checkData.checks.length; i < iCount; i++) {
                            var state_1 = _loop_1(i, iCount);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                };
                NavigationCheck.prototype.AddPosition = function (product) {
                    var _this = this;
                    var controller = this;
                    var check = controller.checkData.currentCheck;
                    if (check) {
                        this.Service.AddToCheck(check.id, product, 1, function (responseData) {
                            var positionsArray = (controller.checkData.currentCheck ? controller.checkData.currentCheck.positions : []);
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