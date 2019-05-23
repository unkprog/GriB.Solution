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
            var SplitCheck = /** @class */ (function (_super) {
                __extends(SplitCheck, _super);
                function SplitCheck() {
                    var _this = _super.call(this) || this;
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
                    enumerable: true,
                    configurable: true
                });
                SplitCheck.prototype.createModel = function () {
                    var result = new kendo.data.ObservableObject({
                        "Header": vars._statres("label$splitcheck"),
                        "editModel": {} //Interfaces.Model.IPOSCheck
                    });
                    return result;
                };
                SplitCheck.prototype.ViewInit = function (view) {
                    return _super.prototype.ViewInit.call(this, view);
                };
                SplitCheck.prototype.ViewShow = function (e) {
                    return _super.prototype.ViewShow.call(this, e);
                };
                SplitCheck.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                };
                SplitCheck.prototype.destroyEvents = function () {
                    //this.Model.unbind("change");
                    _super.prototype.destroyEvents.call(this);
                };
                SplitCheck.prototype.validate = function () {
                    var controller = this;
                    var result = _super.prototype.validate.call(this);
                    //if (result === true && this.OnResult)
                    //    this.OnResult(controller);
                    return result;
                };
                return SplitCheck;
            }(base.Controller.BaseEditor));
            Terminal.SplitCheck = SplitCheck;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/splitcheck", function (module) { return new module.Controller.Terminal.SplitCheck(); });
});
//# sourceMappingURL=splitcheck.js.map