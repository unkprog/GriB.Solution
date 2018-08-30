define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Base = /** @class */ (function () {
            function Base() {
                this._options = this.createOptions();
                this._model = this.createModel();
            }
            Base.prototype.createOptions = function () {
                return {
                    Url: "",
                    Id: ""
                };
            };
            Object.defineProperty(Base.prototype, "Options", {
                get: function () {
                    return this._options;
                },
                enumerable: true,
                configurable: true
            });
            Base.prototype.createModel = function () {
                return {
                    "Header": ""
                };
            };
            Object.defineProperty(Base.prototype, "Model", {
                get: function () {
                    return this._model;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Base.prototype, "View", {
                get: function () {
                    return this._view;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Base.prototype, "Header", {
                get: function () {
                    return this._model ? this._model.Header : "";
                },
                enumerable: true,
                configurable: true
            });
            Base.prototype.ViewInit = function (view) {
                this._view = view;
                kendo.bind(view, this._model);
                return true;
            };
            Base.prototype.ViewShow = function (e) {
            };
            Base.prototype.ViewHide = function (e) {
            };
            Base.prototype.ViewResize = function (e) {
            };
            Base.prototype.createClick = function (elemName, clickFunc, controller) {
                var result = $.proxy(clickFunc, controller);
                var elem = elemName instanceof $ ? elemName : controller.View.find("#" + elemName);
                for (var i = 0, iCount = elem.length; i < iCount; i++)
                    elem[i].addEventListener(("ontouchstart" in window) ? "touchend" : "click", result, false);
                return result;
            };
            Base.prototype.createKeyPress = function (elemName, clickFunc, controller) {
                var result = $.proxy(clickFunc, controller);
                $.each(elemName, function (index, el) {
                    var $inp = $("#" + el);
                    if ($inp.length > 0) {
                        $inp[0].addEventListener("keypress", result, false);
                    }
                });
                return result;
            };
            Base.prototype.deleteClick = function (elemName, proxyFunc) {
                var controller = this;
                var elem = elemName instanceof $ ? elemName : controller.View.find("#" + elemName);
                for (var i = 0, iCount = elem.length; i < iCount; i++)
                    elem[i].removeEventListener(("ontouchstart" in window) ? "touchend" : "click", proxyFunc);
            };
            Base.prototype.deleteKeyPress = function (elemName, proxyFunc) {
                $.each(elemName, function (index, el) {
                    var $inp = $("#" + el);
                    if ($inp.length > 0)
                        $inp[0].removeEventListener("keypress", proxyFunc);
                });
            };
            return Base;
        }());
        Controller.Base = Base;
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=basecontroller.js.map