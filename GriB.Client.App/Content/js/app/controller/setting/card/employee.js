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
                var Employee = /** @class */ (function (_super) {
                    __extends(Employee, _super);
                    function Employee() {
                        return _super.call(this) || this;
                    }
                    Employee.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$employees"),
                            "cardModel": []
                        });
                    };
                    Employee.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FieldSearch: "name", ValueIdNew: 0, EditIdName: "id_employee", EditController: "setting/editor/employee",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetEmployees, this.Service), Delete: $.proxy(this.Service.DelEmployee, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name" },
                                { Header: vars._statres("label$phone"), Field: "phone" },
                                { Header: vars._statres("label$access"), Field: "access" }
                            ]
                        };
                    };
                    Object.defineProperty(Employee.prototype, "CardModel", {
                        get: function () {
                            return this.Model.get("cardModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Employee;
                }(card.Controller.Setting.Card.Card));
                Card.Employee = Employee;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=employee.js.map