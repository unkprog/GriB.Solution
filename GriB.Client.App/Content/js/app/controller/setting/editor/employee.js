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
define(["require", "exports", "app/common/variables", "app/common/utils", "app/controller/setting/editor/editor"], function (require, exports, vars, utils, edit) {
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
                            "editModel": {},
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
                            "labelName": vars._statres("label$fname"),
                            "labelPatronymic": vars._statres("label$patronymic"),
                            "labelSex": vars._statres("label$sex"),
                            "labelUnspecified": vars._statres("label$unspecified"),
                            "labelMale": vars._statres("label$male"),
                            "labelFemale": vars._statres("label$female"),
                            "labelSalePoint": vars._statres("label$salePoint"),
                            "labelAccess": vars._statres("label$access"),
                            "labelDefault": vars._statres("label$default"),
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
                        var _this = this;
                        var controller = this;
                        var id = (vars._editorData["id_employee"] ? vars._editorData["id_employee"] : 0);
                        this.Service.GetEmployee(id, function (responseData) {
                            controller.Model.set("editModel", responseData.employee);
                            _this.setupControls();
                            controller.afterLoad();
                        });
                        return false;
                    };
                    Employee.prototype.setupControls = function () {
                        $('#employee-open').formSelect();
                        $('#employee-sex-list').formSelect();
                        $('#employee-birth').datepicker();
                        $('#employee-access-div').height($('#login-phone').height());
                        this.setupTableAccess();
                    };
                    Employee.prototype.setupTableAccess = function () {
                        var model = this.EditorModel;
                        var data = model.accesssalepoints;
                        var html = '';
                        // let rows: JQuery[] = [];
                        if (data && data.length > 0) {
                            var item = void 0;
                            for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                                item = data[i];
                                html += '<tr id="row_' + i + '">';
                                html += '<td>' + item.salepoint.name + '</td>';
                                html += '<td>';
                                html += '<div class="switch valign-wrapper">';
                                html += '    <label>';
                                html += '        <input id="isaccess_' + i + '" type="checkbox"' + (item.isaccess ? ' checked="checked"' : '') + '>';
                                html += '        <span class="lever"></span>';
                                html += '     </label>';
                                html += '</div>';
                                html += '</td>';
                                html += '<td>';
                                html += '<div class="valign-wrapper">';
                                html += '    <label>';
                                html += '        <input id="isdefault_' + i + '" name="group_isdefault" type="radio"' + (item.isdefault ? ' checked="checked"' : '') + '>';
                                html += '        <span></span>';
                                html += '     </label>';
                                html += '</div>';
                                html += '</td>';
                                html += '</tr>';
                            }
                        }
                        $("#employee-rigths-rows").html(html);
                    };
                    Employee.prototype.ViewResize = function (e) {
                        $('#editor-view-tabs').tabs();
                    };
                    Employee.prototype.Save = function () {
                        var model = this.EditorModel;
                        this.afterSave();
                    };
                    Employee.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        if (!utils.validatePhone(model.phone)) {
                            M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
                            result = false;
                        }
                        if (utils.isNullOrEmpty(model.pass)) {
                            M.toast({ html: vars._statres('msg$error$invalidPassword') });
                            result = false;
                        }
                        return result;
                    };
                    return Employee;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Employee = Employee;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=employee.js.map