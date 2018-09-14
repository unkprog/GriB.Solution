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
define(["require", "exports", "app/common/basecontroller"], function (require, exports, ctrl) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Security;
        (function (Security) {
            var Main = /** @class */ (function (_super) {
                __extends(Main, _super);
                function Main() {
                    return _super.call(this) || this;
                }
                Main.prototype.createOptions = function () {
                    return { Url: "/Content/view/main.html", Id: "main-view" };
                };
                Main.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": "",
                    });
                };
                return Main;
            }(ctrl.Controller.Base));
            Security.Main = Main;
        })(Security = Controller.Security || (Controller.Security = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=main.js.map