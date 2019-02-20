import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Employee extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$employees"),
                "cardModel": []
            });
        }

        protected createCardSettings(): Interfaces.Control.ICardSettings {
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "id_employee", EditController: "setting/editor/employee",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetEmployees, this.Service), Delete: $.proxy(this.Service.DelEmployee, this.Service),
                Columns: [
                    { Header: vars._statres("label$name"), Field: "name" },
                    { Header: vars._statres("label$phone"), Field: "phone" },
                    { Header: vars._statres("label$access"), Field: "access" }
                ]
            };
        }

        public get CardModel(): Interfaces.Model.IEmployeeModel[] {
            return this.Model.get("cardModel").toJSON();
        }
    }
}
vars.registerController("setting/card/employee", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Employee(); });