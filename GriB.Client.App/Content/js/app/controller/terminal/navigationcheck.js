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
                        currentCheck: 0,
                        checks: []
                    };
                    this.terminal = terminal;
                    this.controlContainerChecks = view.find("#posterminal-view-checks-container");
                    this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
                    this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
                    this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
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
                            controller.setCurrentCheck(controller.checkData.checks[0].id);
                    });
                };
                NavigationCheck.prototype.createEvents = function () {
                };
                NavigationCheck.prototype.destroyEvents = function () {
                };
                NavigationCheck.prototype.setCurrentCheck = function (currentCheck) {
                    var controller = this;
                    $('#check_id_' + controller.checkData.currentCheck).removeClass(['check-select', 'z-depth-1']);
                    controller.checkData.currentCheck = currentCheck;
                    $('#check_id_' + controller.checkData.currentCheck).addClass(['check-select', 'z-depth-1']);
                    //controller.Service.CheckOpened((responseData) => {
                    //    controller.checkData.checks = responseData.checkopened;
                    //    if (controller.checkData && controller.checkData.checks.length > 0)
                    //        controller.checkData.currentCheck = 0;
                    //    controller.drawChecks();
                    //});
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
                    utils.createTouchClickEvent(findId, this.CheckButtonClick, this);
                    utils.createTouchClickEvent(findId.find('i'), this.CheckDelete, this);
                    controller.controlChecks.append(findId);
                };
                NavigationCheck.prototype.CheckButtonClick = function (e) {
                    var targetid = e.currentTarget.id;
                    var id = +targetid.replace("check_id_", "");
                    if (id === -1)
                        return;
                    this.setCurrentCheck(id);
                    //this.currentCategory = id;
                    //this.backToCategory(id);
                    //this.loadSaleProducts();
                };
                NavigationCheck.prototype.CheckDelete = function (e) {
                    alert('document');
                    e.stopPropagation();
                };
                return NavigationCheck;
            }());
            Terminal.NavigationCheck = NavigationCheck;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationcheck.js.map