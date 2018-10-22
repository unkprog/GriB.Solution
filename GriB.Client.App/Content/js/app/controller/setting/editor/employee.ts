import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import { _app } from 'app/common/variables';

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

        protected loadData(): boolean {
            let controller = this;
            let id: number = (vars._editorData["id_employee"] ? vars._editorData["id_employee"] : 0);
            this.Service.GetEmployee(id, (responseData) => {
                controller.Model.set("editModel", responseData.employee);
                this.setupControls();
                controller.afterLoad();
            });
            return false;
        }


        private setupControls(): void {
            $('#employee-open').formSelect();
            $('#employee-sex-list').formSelect();
            $('#employee-birth').datepicker();
            $('#employee-access-div').height($('#login-phone').height());
            this.setupTableAccess();
        }

        private setupTableAccess():void {
            let model: Interfaces.Model.IEmployeeModel = this.EditorModel;
            let data: Interfaces.Model.ISalePointAccessModel[] = model.accesssalepoints;
            let html: string = '';
           // let rows: JQuery[] = [];

            if (data && data.length > 0) {
                let item: Interfaces.Model.ISalePointAccessModel;
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
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
        }

        public ViewResize(e) {
            $('#editor-view-tabs').tabs();
        }


    }
}