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
define(["require", "exports", "app/common/variables", "app/controller/setting/editor/editor"], function (require, exports, vars, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var Employee = /** @class */ (function (_super) {
                    __extends(Employee, _super);
                    function Employee() {
                        return _super.call(this) || this;
                    }
                    Employee.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/editor/employee.html", Id: "editor-view-employee" };
                    };
                    Employee.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": "",
                            "labelEmployee": vars._statres("label$employee"),
                            "labelAccessRight": vars._statres("label$accessright"),
                            "labelLoginToSystem": vars._statres("label$logintosystem"),
                            "labelPhone": vars._statres("label$phone"),
                            "labelPassword": vars._statres("label$password"),
                            "labelAccessSystem": vars._statres("label$accesstosystem"),
                            "labelPOSterminal": vars._statres("label$POSterminal"),
                            "labelSettings": vars._statres("label$settings"),
                            "labelReports": vars._statres("label$reports"),
                            "labelNo": vars._statres("label$no"),
                            "labelYes": vars._statres("label$yes"),
                            "labelOpenOnLogin": vars._statres("label$openonlogin"),
                            "labelEmployeeInformation": vars._statres("label$employeeinformation"),
                            "labelDateBirth": vars._statres("label$datebirth"),
                            "labelSurname": vars._statres("label$surname"),
                            "labelName": vars._statres("label$name"),
                            "labelPatronymic": vars._statres("label$patronymic"),
                            "labelSex": vars._statres("label$sex"),
                            "labelUnspecified": vars._statres("label$unspecified"),
                            "labelMale": vars._statres("label$male"),
                            "labelFemale": vars._statres("label$female"),
                        });
                    };
                    Object.defineProperty(Employee.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Employee.prototype.loadData = function () {
                        var controller = this;
                        var id = (vars._editorData["id_salepoint"] ? vars._editorData["id_salepoint"] : 0);
                        //this.Service.GetSalePoint(id, (responseData) => {
                        //   controller.Model.set("editModel", responseData.salepoint);
                        controller.afterLoad();
                        //});
                        return true;
                    };
                    Employee.prototype.ViewShow = function (e) {
                        this.setupControls();
                        _super.prototype.ViewShow.call(this, e);
                        return true;
                    };
                    Employee.prototype.setupControls = function () {
                        $('#editor-view-tabs').tabs();
                        $('#employee-open').formSelect();
                        $('#employee-sex-list').formSelect();
                        $('#employee-birth').datepicker();
                        $('#employee-access-div').height($('#login-phone').height());
                        // M.updateTabIndicator();
                    };
                    return Employee;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Employee = Employee;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=employee.js.map