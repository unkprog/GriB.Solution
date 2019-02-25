﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Employee extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/employee.html", Id: "editor-view-employee" };
        }

        protected createModel(): kendo.data.ObservableObject {
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
                "labelDocuments": vars._statres("label$documents"),
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
        }

        public get EditorModel(): Interfaces.Model.IEmployeeModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_employee", Load: $.proxy(this.Service.GetEmployee, this.Service), Save: $.proxy(this.Service.SetEmployee, this.Service) };
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.setupControls();
        }


        private setupControls(): void {
            $('#employee-open').formSelect();
            $('#employee-sex-list').formSelect();
            $('#employee-birth').datepicker();
            $('#employee-access-div').height($('#login-phone').height());

            let model: Interfaces.Model.IEmployeeModel = this.EditorModel;
            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            this.setupTableAccess($("#employee-rigths-rows"), data);
        }

        protected setupTableAccess(control: JQuery, data: Interfaces.Model.ISalePointAccessModel[]):void {
            let model: Interfaces.Model.IEmployeeModel = this.EditorModel;
            //let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            let html: string = '';

            if (data && data.length > 0) {
                let item: Interfaces.Model.ISalePointAccessModel;
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    item = data[i];
                    item

                    html += '<tr>';
                    html += '<td data-bind="text:editModel.accesssalepoints[' + i + '].salepoint.name"></td>';

                    html += '<td>';
                    html += '<div class="switch valign-wrapper">';
                    html += '    <label>';
                    html += '        <input type="checkbox" data-bind="checked:editModel.accesssalepoints[' + i + '].isaccess">';
                    html += '        <span class="lever"></span>';
                    html += '     </label>';
                    html += '</div>';
                    html += '</td>';

                    html += '<td>';
                    html += '<div class="valign-wrapper">';
                    html += '    <label>';
                    html += '        <input name="group_isdefault" type="radio" value="' + data[i].salepoint.id + '" data-bind="checked:editModel.defaultsalepoint">';
                    html += '        <span></span>';
                    html += '     </label>';
                    html += '</div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }
            
            $("#employee-rigths-rows").html(html);
            kendo.bind($("#employee-rigths-rows"), this.Model);
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#login-pass").characterCounter();
            view.find("#employee-surname").characterCounter();
            view.find("#employee-name").characterCounter();
            view.find("#employee-patronymic").characterCounter();
            let result = super.ViewInit(view);

            let tabs: JQuery = view.find("#editor-view-tabs");
            let header: JQuery = view.find(".editor-header-nav");

            tabs.remove();
            header.append(tabs);
            header.parent().css('cssText', "height: 88px !important");
            return result;
        }

        public ViewShow(e: any): boolean {
            $('#editor-view-tabs').tabs();
            M.Tabs.getInstance($('#editor-view-tabs')).updateTabIndicator();
            return super.ViewShow(e);
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            M.Tabs.getInstance($('#editor-view-tabs')).updateTabIndicator();
         
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IEmployeeModel = this.EditorModel;

            if (!utils.validatePhone(model.phone)) {
                M.toast({ html: vars._statres('msg$error$phoneNumberIncorrect') });
                result = false;
            }

            if (utils.isNullOrEmpty(model.pass)) {
                M.toast({ html: vars._statres('msg$error$invalidPassword') });
                result = false;
            } else if (model.pass.length > 50) {
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

            if (model.defaultsalepoint === 0) {
                M.toast({ html: vars._statres('msg$error$pointsalenotnotavailabledefault') });
                result = false;
            }

            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                if (data[i].salepoint.id === model.defaultsalepoint && data[i].isaccess !== true) {
                    M.toast({ html: vars._statres('msg$error$pointsalenotnotavailabledefault') });
                    result = false;
                }
            }

            return result;
        }
    }
}

vars.registerController("setting/editor/employee", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Employee(); });