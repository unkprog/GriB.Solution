import vars = require('app/common/variables');
import utils = require('app/common/utils');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Employee extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/employee.html", Id: "card-view-employee" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$employees"),
            });
        }

        protected getCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id",
                Columns: [
                    { Header: "Наименование", Field: "name" },
                    { Header: "Телефон", Field: "phone" },
                   // { Header: "Статус", Field: "state" }
                ]
            };
        }

        protected loadData(): boolean {
            let controller = this;
            this.Service.GetEmployees((responseData) => {
                controller.Model.set("editModel", responseData);
                controller.afterLoad();
            });
            return false;
        }


        public Add() {
            vars._editorData["id_employee"] = 0;
            vars._app.OpenController("setting/editor/employee", this);
        }

        public Edit(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                if (_id > 0) {
                    vars._editorData["id_employee"] = _id;
                    vars._app.OpenController("setting/editor/employee", this);
                }
            }
        }

        public Delete(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let controller = this;
                this.Service.DelSalePoint(_id, (responseData) => {
                    controller.afterDelete();
                });
            }
        }
       
        //public ViewResize(e: any): void {
        //    let tbody: JQuery = $('#card-view-salepoint-table').find('tbody');
        //    if (tbody && tbody.length > 0) {
        //        tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
        //    }
        //}
    }
}