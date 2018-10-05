import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');

export namespace Controller.Setting.Card {
    export class SalePoint extends base.Controller.BaseCard {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/salepoint.html", Id: "card-view-salepoint" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$salesPoints"),
            });
        }

        public Add() {
            vars._editorData["id_salepoint"] = 0;
            vars._app.OpenController("setting/editor/salepoint", this);
        }
    }
}