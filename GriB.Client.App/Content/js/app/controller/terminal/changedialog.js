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
            var ChangeDialog = /** @class */ (function (_super) {
                __extends(ChangeDialog, _super);
                function ChangeDialog() {
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
                ChangeDialog.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/changedialog.html", Id: "changedialog-view" };
                };
                Object.defineProperty(ChangeDialog.prototype, "EditorModel", {
                    get: function () {
                        return this.Model.get("editModel").toJSON();
                    },
                    enumerable: true,
                    configurable: true
                });
                ChangeDialog.prototype.createModel = function () {
                    var result = new kendo.data.ObservableObject({
                        "Header": "",
                        "HeaderQuery": "",
                        "editModel": {
                            result: -1
                        },
                        "labelYes": vars._statres("label$yes"),
                        "labelNo": vars._statres("label$no"),
                    });
                    return result;
                };
                Object.defineProperty(ChangeDialog.prototype, "Result", {
                    get: function () {
                        return this.Model.get("editModel.result");
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                ChangeDialog.prototype.ViewInit = function (view) {
                    this.btnOk = view.find("#btn-change-ok");
                    this.btnNo = view.find("#btn-change-no");
                    return _super.prototype.ViewInit.call(this, view);
                };
                ChangeDialog.prototype.ViewShow = function (e) {
                    return _super.prototype.ViewShow.call(this, e);
                };
                ChangeDialog.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.OkButtonClick = this.createTouchClickEvent(this.btnOk, this.okButtonClick);
                    this.NoButtonClick = this.createTouchClickEvent(this.btnNo, this.noButtonClick);
                };
                ChangeDialog.prototype.destroyEvents = function () {
                    //this.Model.unbind("change");
                    if (this.btnOk)
                        this.destroyTouchClickEvent(this.btnOk, this.OkButtonClick);
                    if (this.btnNo)
                        this.destroyTouchClickEvent(this.btnNo, this.NoButtonClick);
                    _super.prototype.destroyEvents.call(this);
                };
                ChangeDialog.prototype.okButtonClick = function (e) {
                    this.Model.set("editModel.result", 0);
                    this.SaveButtonClick(e);
                };
                ChangeDialog.prototype.noButtonClick = function (e) {
                    this.Model.set("editModel.result", 1);
                    this.CancelButtonClick(e);
                };
                ChangeDialog.prototype.validate = function () {
                    var controller = this;
                    var result = _super.prototype.validate.call(this);
                    if (result === true && this.OnResult)
                        this.OnResult(controller);
                    return result;
                };
                return ChangeDialog;
            }(base.Controller.BaseEditor));
            Terminal.ChangeDialog = ChangeDialog;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/changedialog", function (module) { return new module.Controller.Terminal.ChangeDialog(); });
});
//# sourceMappingURL=changedialog.js.map