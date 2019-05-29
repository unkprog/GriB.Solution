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
            var CheckComment = /** @class */ (function (_super) {
                __extends(CheckComment, _super);
                function CheckComment() {
                    return _super.call(this) || this;
                }
                CheckComment.prototype.createOptions = function () {
                    return { Url: "/Content/view/terminal/checkcomment.html", Id: "checkcomment-view" };
                };
                Object.defineProperty(CheckComment.prototype, "EditorModel", {
                    get: function () {
                        return this.Model.get("editModel").toJSON();
                    },
                    enumerable: true,
                    configurable: true
                });
                CheckComment.prototype.createModel = function () {
                    var result = new kendo.data.ObservableObject({
                        "Header": "",
                        "editModel": {
                            isrequirecomment: false,
                            comment: "",
                        },
                        "labelComment": vars._statres("label$comment"),
                        "labelCancel": vars._statres("button$label$cancel"),
                        "labelSave": vars._statres("button$label$save"),
                    });
                    return result;
                };
                Object.defineProperty(CheckComment.prototype, "IsRequireComment", {
                    get: function () { return this.Model.get("editModel.isrequirecomment"); },
                    set: function (value) { this.Model.set("editModel.isrequirecomment", value); },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(CheckComment.prototype, "Comment", {
                    get: function () { return this.Model.get("editModel.comment"); },
                    set: function (value) { this.Model.set("editModel.comment", value); },
                    enumerable: true,
                    configurable: true
                });
                CheckComment.prototype.ViewInit = function (view) {
                    this.btnSaveComment = view.find("#btn-num-apply");
                    this.btnCancelComment = view.find("#btn-num-cancel");
                    return _super.prototype.ViewInit.call(this, view);
                };
                CheckComment.prototype.ViewShow = function (e) {
                    $("#checkcomment-view-description").characterCounter();
                    M.textareaAutoResize($("#checkcomment-view-description"));
                    return _super.prototype.ViewShow.call(this, e);
                };
                CheckComment.prototype.createEvents = function () {
                    _super.prototype.createEvents.call(this);
                    this.SaveCommentButtonClick = this.createTouchClickEvent(this.btnSaveComment, this.saveCommentButtonClick);
                    this.CancelCommentButtonClick = this.createTouchClickEvent(this.btnCancelComment, this.cancelCommentButtonClick);
                };
                CheckComment.prototype.destroyEvents = function () {
                    //this.Model.unbind("change");
                    if (this.btnSaveComment)
                        this.destroyTouchClickEvent(this.btnSaveComment, this.SaveCommentButtonClick);
                    if (this.btnCancelComment)
                        this.destroyTouchClickEvent(this.btnCancelComment, this.CancelCommentButtonClick);
                    _super.prototype.destroyEvents.call(this);
                };
                CheckComment.prototype.saveCommentButtonClick = function (e) {
                    this.SaveButtonClick(e);
                };
                CheckComment.prototype.cancelCommentButtonClick = function (e) {
                    this.CancelButtonClick(e);
                };
                CheckComment.prototype.validate = function () {
                    var controller = this;
                    var result = _super.prototype.validate.call(this);
                    if (utils.isNullOrEmpty(controller.Comment) && controller.IsRequireComment === true) {
                        M.toast({ html: vars._statres("error$comment$specifycomment") });
                        result = false;
                    }
                    if (!utils.isNullOrEmpty(controller.Comment) && controller.Comment.length > 226) {
                        M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$comment"), 226) });
                        result = false;
                    }
                    if (result === true && this.OnApply)
                        this.OnApply(controller);
                    return result;
                };
                return CheckComment;
            }(base.Controller.BaseEditor));
            Terminal.CheckComment = CheckComment;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("terminal/checkcomment", function (module) { return new module.Controller.Terminal.CheckComment(); });
});
//# sourceMappingURL=checkcomment.js.map