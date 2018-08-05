define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var controllers;
    (function (controllers) {
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
            Object.defineProperty(BaseController.prototype, "Header", {
                get: function () {
                    return this._model ? this._model.Header : "";
                },
                enumerable: true,
                configurable: true
            });
            BaseController.prototype.ViewInit = function (e) {
            };
            BaseController.prototype.ViewShow = function (e) {
            };
            BaseController.prototype.ViewHide = function (e) {
            };
            BaseController.prototype.ViewResize = function (e) {
            };
            return BaseController;
        }());
        controllers.BaseController = BaseController;
    })(controllers = exports.controllers || (exports.controllers = {}));
});
//# sourceMappingURL=basecontroller.js.map