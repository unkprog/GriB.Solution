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


        protected loadData(): boolean {
            let controller = this;
            let id: number = (vars._editorData["id_unit"] ? vars._editorData["id_unit"] : 0);
            this.Service.GetUnit(id, (responseData) => {
                controller.Model.set("editModel", responseData);
                controller.afterLoad();
            });
            return false;
        }

        public Save(): void {
            let controller = this;
            let model : Interfaces.Model.ICurrency = this.EditorModel;
            this.Service.SetUnit(model, (responseData) => {
                controller.afterSave();
            });
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