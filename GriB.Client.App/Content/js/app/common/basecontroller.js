define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controllers;
    (function (Controllers) {
        var BaseController = /** @class */ (function () {
            function BaseController(options) {
                this._options = options;
                this._model = this.createModel();
            }
            Object.defineProperty(BaseController.prototype, "Options", {
                get: function () {
                    return this._options;
                },
                enumerable: true,
                configurable: true
            });
            BaseController.prototype.createModel = function () {
                return {
                    "Header": ""
                };
            };
            Object.defineProperty(BaseController.prototype, "Model", {
                get: function () {
                    return this._model;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseController.prototype, "View", {
                get: function () {
                    return this._view;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseController.prototype, "Header", {
                get: function () {
                    return this._model ? this._model.Header : "";
                },
                enumerable: true,
                configurable: true
            });
            BaseController.prototype.ViewInit = function (view) {
                kendo.bind(view, this._model);
                this._view = view;
                return true;
            };
            BaseController.prototype.ViewShow = function (e) {
            };
            BaseController.prototype.ViewHide = function (e) {
            };
            BaseController.prototype.ViewResize = function (e) {
            };
            BaseController.prototype.createClick = function (elemName, clickFunc, controller) {
                var result = $.proxy(clickFunc, controller);
                var elem = this._view.find("#" + elemName);
                if (elem.length > 0) {
                    elem[0].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
                }
                return result;
            };
            BaseController.prototype.createKeyPress = function (elemName, clickFunc, controller) {
                var result = $.proxy(clickFunc, controller);
                $.each(elemName, function (index, el) {
                    var $inp = $("#" + el);
                    if ($inp.length > 0) {
                        $inp[0].addEventListener("keypress", result, false);
                    }
                });
                return result;
            };
            BaseController.prototype.deleteClick = function (elemName, proxyFunc) {
                var $btn = this._view.find("#" + elemName);
                if ($btn.length > 0)
                    $btn[0].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
            };
            BaseController.prototype.deleteKeyPress = function (elemName, proxyFunc) {
                $.each(elemName, function (index, el) {
                    var $inp = $("#" + el);
                    if ($inp.length > 0)
                        $inp[0].removeEventListener("keypress", proxyFunc);
                });
            };
            return BaseController;
        }());
        Controllers.BaseController = BaseController;
    })(Controllers = exports.Controllers || (exports.Controllers = {}));
});
//# sourceMappingURL=basecontroller.js.map