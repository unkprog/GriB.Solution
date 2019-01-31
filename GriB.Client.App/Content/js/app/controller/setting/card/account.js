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
define(["require", "exports", "app/common/variables", "app/controller/setting/card/card"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card) {
                var Account = /** @class */ (function (_super) {
                    __extends(Account, _super);
                    function Account() {
                        return _super.call(this) || this;
                    }
                    Account.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$accounts"),
                            "cardModel": []
                        });
                    };
                    Account.prototype.createCardFilterSettings = function () {
                        var result = _super.prototype.createCardFilterSettings.call(this);
                        result.FieldSearch = "name";
                        return result;
                    };
                    Account.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_account", EditController: "setting/editor/account",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetAccounts, this.Service), Delete: $.proxy(this.Service.DelAccount, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                                { Header: vars._statres("label$number"), Field: "number" },
                            ]
                        };
                    };
                    return Account;
                }(card.Controller.Setting.Card.Card));
                Card.Account = Account;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/account", function (module) { return new module.Controller.Setting.Card.Account(); });
});
//# sourceMappingURL=account.js.map