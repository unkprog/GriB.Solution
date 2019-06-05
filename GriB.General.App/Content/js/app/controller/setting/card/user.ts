import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class User extends card.Controller.Setting.Card.Card {
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
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "id_user", EditController: "setting/editor/user",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetUsers, this.Service), Delete: $.proxy(this.Service.DelUser, this.Service),
                Columns: [
                    { Header: "", Field: "d", FieldTemplate: '#if (d != 0) {#<i class="material-icons">close</i>#}#' },
                    { Header: vars._statres("label$id") + ' - ' + vars._statres("label$pid"), Field: "id", FieldTemplate:"#=id# - #=pid#" },
                    { Header: vars._statres("label$login"), Field: "phone" },
                    { Header: vars._statres("label$surname"), Field: "person.fname" },
                    { Header: vars._statres("label$fname"), Field: "person.mname" },
                    { Header: vars._statres("label$patronymic"), Field: "person.lname" },
                    { Header: vars._statres("label$email"), Field: "person.email" },
                    { Header: vars._statres("label$database"), Field: "db.catalog", FieldTemplate: "#=db.id# - #=db.catalog#" },
                    { Header: vars._statres("label$server"), Field: "db.sqlsrv.address", FieldTemplate: "#=db.sqlsrv.id# - #=db.sqlsrv.address#" },
                ]
            };
        }

        public get CardModel(): Interfaces.Model.IUser[] {
            return this.Model.get("cardModel").toJSON();
        }
    }
}
vars.registerController("setting/card/user", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.User(); });