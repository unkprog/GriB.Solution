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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Currency = /** @class */ (function (_super) {
                    __extends(Currency, _super);
                    function Currency() {
                        return _super.call(this) || this;
                    }
                    Currency.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/currency.html", Id: "editor-view-currency" };
                    };
                    Currency.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$currency"),
                            "editModel": {},
                            "labelCode": vars._statres("label$code"),
                            "labelNameShort": vars._statres("label$nameshort"),
                            "labelName": vars._statres("label$name"),
                        });
                    };
                    Object.defineProperty(Currency.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Currency.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_currency", Load: $.proxy(this.Service.GetCurrency, this.Service), Save: $.proxy(this.Service.SetCurrency, this.Service) };
                    };
                    Currency.prototype.ViewInit = function (view) {
                        view.find("#editor-view-currency-code").characterCounter();
                        view.find("#editor-view-currency-nameshort").characterCounter();
                        view.find("#editor-view-currency-name").characterCounter();
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Currency.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (utils.isNullOrEmpty(model.code)) {
                            M.toast({ html: vars._statres("msg$error$invalidcode") });
                            result = false;
                        }
                        else if (model.code.length > 28) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$code"), 28) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.nameshort) && model.nameshort.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$nameshort"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 150) });
                            result = false;
                        }
                        return result;
                    };
                    return Currency;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Currency = Currency;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/currency", function (module) { return new module.Controller.Setting.Editor.Currency(); });
});
//# sourceMappingURL=currency.js.map