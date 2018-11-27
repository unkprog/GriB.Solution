define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Terminal;
        (function (Terminal) {
            var NavigationCheck = /** @class */ (function () {
                function NavigationCheck(view, terminal) {
                    this.controlChecks = view.find("#posterminal-view-checks-container");
                }
                Object.defineProperty(NavigationCheck.prototype, "ControlChecks", {
                    get: function () {
                        return this.controlChecks;
                    },
                    enumerable: true,
                    configurable: true
                });
                NavigationCheck.prototype.ViewShow = function (e) {
                    $('.chips').chips();
                };
                NavigationCheck.prototype.ViewResize = function (e) {
                    if (this.controlChecks)
                        this.controlChecks.height($(window).height() - this.controlChecks.offset().top);
                };
                return NavigationCheck;
            }());
            Terminal.NavigationCheck = NavigationCheck;
        })(Terminal = Controller.Terminal || (Controller.Terminal = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=navigationcheck.js.map