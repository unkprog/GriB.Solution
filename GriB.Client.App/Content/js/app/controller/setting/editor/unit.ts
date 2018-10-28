import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Unit extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/unit.html", Id: "editor-view-unit" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$unit"),
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
            return { EditIdName: "id_unit", Load: $.proxy(this.Service.GetUnit, this.Service), Save: $.proxy(this.Service.SetUnit, this.Service) };
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ICurrency = this.EditorModel;

            if (utils.isNullOrEmpty(model.code)) {
                M.toast({ html: vars._statres("msg$error$invalidcode") });
                result = false;
            }

            return result;
        }
    }
}