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
define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var CashDialog = /** @class */ (function (_super) {
                __extends(CashDialog, _super);
                function CashDialog() {
                    var _this = _super.call(this) || this;
                    if (_this.EditorSettings) {
                        if (_this.EditorSettings.ButtonSetings) {
                            _this.EditorSettings.ButtonSetings.IsSave = false;
                            _this.EditorSettings.ButtonSetings.IsCancel = false;
                        }
                    }
                    _this.Model.set("editModel.result", -1);
                    return _this;
                }
                CashDialog.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/cashdialog.html", Id: "cashdialog-view" };
                };
                Object.defineProperty(CashDialog.prototype, "EditorModel", {
                    get: function () {
                        return this.Model.get("editModel").toJSON();
                    },
                    enumerable: true,
                    configurable: true
                });
                CashDialog.prototype.createModel = function () {
                    var result = new kendo.data.ObservableObject({
                        "Header": "",
                        "HeaderCash": "",
                        "editModel": {
                            result: -1
                        },
                        "labelEncashment": vars._statres("label$encashment"),
                        "labelDeposit": vars._statres("label$depositmoney"),
                        "labelWithDrawing": vars._statres("label$withdrawingmoney"),
                        "labelCancel": vars._statres("button$label$cancel"),
                    });
                    return result;
                };
                Object.defineProperty(CashDialog.prototype, "Result", {
                    get: function () {
                        return this.Model.get("editModel.result");
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                CashDialog.prototype.ViewInit = function (view) {
                    this.btnEncashment = view.find("#tn-cash-encashment");
                    this.btnDeposit = view.find("#btn-cash-deposit");
                    this.btnWithDrawing = view.find("#btn-cash-withdrawing");
                    this.btnCancelButton = view.find("#btn-cash-cancel");
                    return _super.prototype.ViewInit.call(this, view);
                };
                CashDialog.prototype.ViewShow = function (e) {
                    return _super.prototype.ViewShow.call(this, e);
                };
                CashDialog.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.EncashmentButtonClick = this.createTouchClickEvent(this.btnEncashment, this.encashmentButtonClick);
                    this.DepositButtonClick = this.createTouchClickEvent(this.btnDeposit, this.depositButtonClick);
                    this.WithdrawalButtonClick = this.createTouchClickEvent(this.btnWithDrawing, this.withdrawalButtonClick);
                    this._CancelButtonClick = this.createTouchClickEvent(this.btnCancelButton, this._cancelButtonClick);
                };
                CashDialog.prototype.destroyEvents = function () {
                    if (this.btnEncashment)
                        this.destroyTouchClickEvent(this.btnEncashment, this.EncashmentButtonClick);
                    if (this.btnDeposit)
                        this.destroyTouchClickEvent(this.btnDeposit, this.DepositButtonClick);
                    if (this.btnWithDrawing)
                        this.destroyTouchClickEvent(this.btnWithDrawing, this.WithdrawalButtonClick);
                    if (this.btnCancelButton)
                        this.destroyTouchClickEvent(this.btnCancelButton, this._CancelButtonClick);
                    _super.prototype.destroyEvents.call(this);
                };
                CashDialog.prototype.encashmentButtonClick = function (e) {
                    this.Model.set("editModel.result", 1);
                    this.SaveButtonClick(e);
                };
                CashDialog.prototype.depositButtonClick = function (e) {
                    this.Model.set("editModel.result", 2);
                    this.SaveButtonClick(e);
                };
                CashDialog.prototype.withdrawalButtonClick = function (e) {
                    this.Model.set("editModel.result", 3);
                    this.SaveButtonClick(e);
                };
                CashDialog.prototype._cancelButtonClick = function (e) {
                    this.Model.set("editModel.result", 0);
                    this.SaveButtonClick(e);
                };
                CashDialog.prototype.validate = function () {
                    var controller = this;
                    var result = _super.prototype.validate.call(this);
                    if (result === true && this.OnResult)
                        this.OnResult(controller);
                    return result;
                };
                return CashDialog;
            }(base.Controller.BaseEditor));
            Terminal.CashDialog = CashDialog;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/cashdialog", function (module) { return new module.Controller.Terminal.CashDialog(); });
});
//# sourceMappingURL=cashdialog.js.map