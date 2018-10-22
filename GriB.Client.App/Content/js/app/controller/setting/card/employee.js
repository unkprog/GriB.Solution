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
                    Employee.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/card/employee.html", Id: "card-view-employee" };
                    };
                    Employee.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$employees"),
                            "cardModel": []
                        });
                    };
                    Employee.prototype.getCardSettings = function () {
                        return {
                            FieldId: "id",
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
                    Employee.prototype.loadData = function () {
                        var controller = this;
                        this.Service.GetEmployees(function (responseData) {
                            controller.Model.set("cardModel", responseData);
                            controller.afterLoad();
                        });
                        return false;
                    };
                    Employee.prototype.Add = function () {
                        vars._editorData["id_employee"] = 0;
                        vars._app.OpenController("setting/editor/employee", this);
                    };
                    Employee.prototype.Edit = function () {
                        var id = this.getSelectedRowId();
                        if (id) {
                            var _id = +id;
                            if (_id > 0) {
                                vars._editorData["id_employee"] = _id;
                                vars._app.OpenController("setting/editor/employee", this);
                            }
                        }
                    };
                    Employee.prototype.Delete = function () {
                        var id = this.getSelectedRowId();
                        if (id) {
                            var _id = +id;
                            var controller_1 = this;
                            this.Service.DelSalePoint(_id, function (responseData) {
                                controller_1.afterDelete();
                            });
                        }
                    };
                    return Employee;
                }(card.Controller.Setting.Card.Card));
                Card.Employee = Employee;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=employee.js.map