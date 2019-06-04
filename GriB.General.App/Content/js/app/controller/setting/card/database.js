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
                var Database = /** @class */ (function (_super) {
                    __extends(Database, _super);
                    function Database() {
                        return _super.call(this) || this;
                    }
                    Database.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$databases"),
                            "cardModel": []
                        });
                    };
                    Database.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_database", EditController: "setting/editor/database",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetDatabases, this.Service), Delete: $.proxy(this.Service.DelDatabase, this.Service),
                            Columns: [
                                { Header: vars._statres("label$id"), Field: "id" },
                                { Header: vars._statres("label$server"), Field: "sqlsrv.address" },
                                { Header: vars._statres("label$catalog"), Field: "catalog" },
                                { Header: vars._statres("label$login"), Field: "user" },
                                { Header: vars._statres("label$password"), Field: "pass" }
                            ]
                        };
                    };
                    return Database;
                }(card.Controller.Setting.Card.Card));
                Card.Database = Database;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/database", function (module) { return new module.Controller.Setting.Card.Database(); });
});
//# sourceMappingURL=database.js.map