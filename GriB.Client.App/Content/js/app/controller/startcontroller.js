var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/controllers/basecontroller", "../common/variables"], function (require, exports, bc, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var controllers;
    (function (controllers) {
        var StartController = /** @class */ (function (_super) {
            __extends(StartController, _super);
            function StartController(options) {
                return _super.call(this, options) || this;
            }
            StartController.prototype.createModel = function () {
                return {
                    "Header": "POS Cloud",
                    "labelTitle": variables_1._statres("label$autorization"),
                    "labelPhone": variables_1._statres("label$phone"),
                    "labelPassword": variables_1._statres("label$password"),
                    "labelForgot": variables_1._statres("button$label$forgot"),
                    "labelRegister": variables_1._statres("button$label$register"),
                    "labelEnter": variables_1._statres("button$label$enter"),
                };
            };
            StartController.prototype.ViewInit = function (e) {
                $('#app-modal-login').modal();
                M.updateTextFields();
            };
            StartController.prototype.ViewShow = function (e) {
                $('#app-modal-login').modal('open');
            };
            return StartController;
        }(bc.controllers.BaseController));
        controllers.StartController = StartController;
    })(controllers = exports.controllers || (exports.controllers = {}));
});
//# sourceMappingURL=startcontroller.js.map