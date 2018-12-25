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
                    Employee.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_employee", Load: $.proxy(this.Service.GetEmployee, this.Service), Save: $.proxy(this.Service.SetEmployee, this.Service) };
                    };
                    Employee.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        this.setupControls();
                    };
                    Employee.prototype.setupControls = function () {
                        $('#employee-open').formSelect();
                        $('#employee-sex-list').formSelect();
                        $('#employee-birth').datepicker();
                        $('#employee-access-div').height($('#login-phone').height());
                        var model = this.EditorModel;
                        var data = model.accesssalepoints;
                        this.setupTableAccess($("#employee-rigths-rows"), data);
                    };
                    //private setupTableAccess():void {
                    //    let model: Interfaces.Model.IEmployeeModel = this.EditorModel;
                    //    let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
                    //    let html: string = '';
                    //    if (data && data.length > 0) {
                    //        let item: Interfaces.Model.ISalePointAccessModel;
                    //        for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    //            item = data[i];
                    //            item
                    //            html += '<tr>';
                    //            html += '<td data-bind="text:editModel.accesssalepoints[' + i + '].salepoint.name"></td>';
                    //            html += '<td>';
                    //            html += '<div class="switch valign-wrapper">';
                    //            html += '    <label>';
                    //            html += '        <input type="checkbox" data-bind="checked:editModel.accesssalepoints[' + i + '].isaccess">';
                    //            html += '        <span class="lever"></span>';
                    //            html += '     </label>';
                    //            html += '</div>';
                    //            html += '</td>';
                    //            html += '<td>';
                    //            html += '<div class="valign-wrapper">';
                    //            html += '    <label>';
                    //            html += '        <input name="group_isdefault" type="radio" value="' + data[i].salepoint.id + '" data-bind="checked:editModel.defaultsalepoint">';
                    //            html += '        <span></span>';
                    //            html += '     </label>';
                    //            html += '</div>';
                    //            html += '</td>';
                    //            html += '</tr>';
                    //        }
                    //    }
                    //    $("#employee-rigths-rows").html(html);
                    //    kendo.bind($("#employee-rigths-rows"), this.Model);
                    //}
                    Employee.prototype.ViewInit = function (view) {
                        view.find("#login-pass").characterCounter();
                        view.find("#employee-surname").characterCounter();
                        view.find("#employee-name").characterCounter();
                        view.find("#employee-patronymic").characterCounter();
                        var result = _super.prototype.ViewInit.call(this, view);
                        var tabs = view.find("#editor-view-tabs");
                        var header = view.find(".editor-header-nav");
                        tabs.remove();
                        header.append(tabs);
                        header.parent().css('cssText', "height: 88px !important");
                        return result;
                    };
                    Employee.prototype.ViewShow = function (e) {
                        $('#editor-view-tabs').tabs();
                        return _super.prototype.ViewShow.call(this, e);
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
                        else if (model.pass.length > 50) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$password"), 50) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.fname) && model.fname.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$surname"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.mname) && model.mname.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$fname"), 60) });
                            result = false;
                        }
                        if (!utils.isNullOrEmpty(model.lname) && model.lname.length > 60) {
                            M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$patronymic"), 60) });
                            result = false;
                        }
                        var data = model.accesssalepoints;
                        for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                            if (data[i].salepoint.id === model.defaultsalepoint && data[i].isaccess !== true) {
                                M.toast({ html: vars._statres('msg$error$pointsalenotnotavailabledefault') });
                                result = false;
                            }
                        }
                        return result;
                    };
                    return Employee;
                }(edit.Controller.Setting.Editor.Editor));
                Editor.Employee = Employee;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/employee", function (module) { return new module.Controller.Setting.Editor.Employee(); });
});
//# sourceMappingURL=employee.js.map