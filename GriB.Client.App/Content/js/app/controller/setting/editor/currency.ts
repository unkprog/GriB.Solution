﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');

export namespace Controller.Setting.Editor {
    export class Currency extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/currency.html", Id: "editor-view-currency" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$currency"),
                "editModel": {},
                "labelCode": vars._statres("label$code"),
                "labelNameShort": vars._statres("label$nameshort"),
                "labelName": vars._statres("label$name"),
            });
        }

        public get EditorModel(): Interfaces.Model.ICurrency {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "id_currency", Load: $.proxy(this.Service.GetCurrency, this.Service), Save: $.proxy(this.Service.SetCurrency, this.Service) };
        }

        public ViewInit(view: JQuery): boolean {
            view.find("#editor-view-currency-code").characterCounter();
            view.find("#editor-view-currency-nameshort").characterCounter();
            view.find("#editor-view-currency-name").characterCounter();
            return super.ViewInit(view);
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICurrency = this.EditorModel;

            if (utils.isNullOrEmpty(model.code)) {
                M.toast({ html: vars._statres("msg$error$invalidcode") });
                result = false;
            } else if (model.code.length > 28) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$code"), 28) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.nameshort) && model.nameshort.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$nameshort"), 60) });
                result = false;
            }

            if (!utils.isNullOrEmpty(model.name) && model.name.length > 60) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$name"), 150) });
                result = false;
            }

            return result;
        }
    }
}

vars.registerController("setting/editor/currency", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.Currency(); });