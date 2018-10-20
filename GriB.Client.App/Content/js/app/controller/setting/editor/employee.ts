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
        }

        public get EditorModel(): Interfaces.Model.IEmployeeModel {
            return this.Model.get("editModel").toJSON();
        }

        protected loadData(): boolean {
            let controller = this;
            let id: number = (vars._editorData["id_salepoint"] ? vars._editorData["id_salepoint"] : 0);
            //this.Service.GetSalePoint(id, (responseData) => {
             //   controller.Model.set("editModel", responseData.salepoint);
          
                controller.afterLoad();
            //});
            return true;
        }

        public ViewShow(e): boolean  {
          
            this.setupControls();
            super.ViewShow(e);
            return true;
        }

        private setupControls(): void {
            $('#editor-view-tabs').tabs();
            $('#employee-open').formSelect();
            $('#employee-sex-list').formSelect();
            $('#employee-birth').datepicker();
            $('#employee-access-div').height($('#login-phone').height());
           // M.updateTabIndicator();
        }
    }
}