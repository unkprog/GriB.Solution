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
define(["require", "exports", "app/common/basecontroller", "app/services/settingsservice"], function (require, exports, base, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card_1) {
                var Card = /** @class */ (function (_super) {
                    __extends(Card, _super);
                    function Card() {
                        var _this = _super.call(this) || this;
                        _this.settingService = new svc.Services.SettingsService();
                        return _this;
                    }
                    Object.defineProperty(Card.prototype, "Service", {
                        get: function () {
                            return this.settingService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Card;
                }(base.Controller.BaseCard));
                Card_1.Card = Card;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=card.js.map