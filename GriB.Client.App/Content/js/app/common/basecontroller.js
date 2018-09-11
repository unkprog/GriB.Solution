define(["require", "exports", "app/common/utils"], function (require, exports, utils) {
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
                this.createEvents();
                return true;
            };
            Base.prototype.createEvents = function () {
            };
            Base.prototype.ViewShow = function (e) {
                M.updateTextFields();
            };
            Base.prototype.ViewHide = function (e) {
                this.destroyEvents();
            };
            Base.prototype.destroyEvents = function () {
            };
            Base.prototype.ViewResize = function (e) {
            };
            Base.prototype.createClickEvent = function (elemName, clickFunc /*, controller: Interfaces.IController*/) {
                return utils.createClickEvent(elemName, clickFunc, this, this.View);
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
            Base.prototype.destroyClickEvent = function (elemName, proxyFunc) {
                utils.destroyClickEvent(elemName, proxyFunc, this.View);
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