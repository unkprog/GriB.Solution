import vars = require('app/common/variables');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class Client extends card.Controller.Setting.Card.Card implements Interfaces.ICardClient {
        constructor() {
            super();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$clients"),
                "cardModel": []
            });
        }

        private isShowPhone: boolean = true;
        public IsShowPhone(isShow: boolean) {
            this.isShowPhone = isShow;
        }
        protected createCardSettings(): Interfaces.Control.ICardSettings {
            let columns: Interfaces.Control.ICardColumn[] = [{ Header: vars._statres("label$name"), Field: "name" }];
            if (this.isShowPhone)
                columns.push({ Header: vars._statres("label$phone"), Field: "phone" });
            return {
                FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "id_client", EditController: "setting/editor/client",
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.Service.GetClients, this.Service), Delete: $.proxy(this.Service.DelClient, this.Service),
                Columns: columns
            };
        }

        public get CardModel(): Interfaces.Model.IClientModel[] {
            return this.Model.get("cardModel").toJSON();
        }
    }
}

vars.registerController("setting/card/client", function (module: any): Interfaces.IController { return new module.Controller.Setting.Card.Client(); });