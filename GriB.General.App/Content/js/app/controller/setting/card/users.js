var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
                var User = /** @class */ (function (_super) {
                    __extends(User, _super);
                    function User() {
                        return _super.call(this) || this;
                    }
                    User.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$employees"),
                            "cardModel": []
                        });
                    };
                    User.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "id_user", EditController: "setting/editor/user",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetUsers, this.Service), Delete: $.proxy(this.Service.DelUser, this.Service),
                            Columns: [
                                { Header: "id", Field: "id" },
                                { Header: "pid", Field: "pid" },
                                { Header: vars._statres("label$phone"), Field: "phone" },
                                { Header: vars._statres("label$name"), Field: "person.fname" },
                                { Header: vars._statres("label$name"), Field: "person.mname" },
                                { Header: vars._statres("label$name"), Field: "person.lname" },
                                { Header: vars._statres("label$email"), Field: "person.email" },
                                { Header: vars._statres("label$database"), Field: "db.id" },
                                { Header: vars._statres("label$database"), Field: "db.catalog" },
                                { Header: vars._statres("label$server"), Field: "db.sqlsrv.id" },
                                { Header: vars._statres("label$server"), Field: "db.sqlsrv.address" },
                            ]
                        };
                    };
                    Object.defineProperty(User.prototype, "CardModel", {
                        get: function () {
                            return this.Model.get("cardModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return User;
                }(card.Controller.Setting.Card.Card));
                Card.User = User;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/user", function (module) { return new module.Controller.Setting.Card.User(); });
});
//# sourceMappingURL=users.js.map