import vars = require('app/common/variables');
import utils = require('app/common/utils');
import edit = require('app/controller/setting/editor/editor');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class SalePoint extends edit.Controller.Setting.Editor.Editor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/salepoint.html", Id: "editor-view-salepoint" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$salePoint"),
                "editModel": {},
                "labelCompany": vars._statres("label$organization"),
                "labelSalepointName": vars._statres("label$salePointName"),
                "labelCity": vars._statres("label$city"),
                "labelAddress": vars._statres("label$address"),
                "labelSchedule": vars._statres("label$schedule"),
            });
        }


        public get EditorModel(): Interfaces.Model.ISalepointModel {
            return this.Model.get("editModel");
        }

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            return result;
        }

        public ViewShow(e): boolean {
            super.ViewShow(e);
            return false;
        }

        protected loadData(): boolean {
            let controller = this;
            let id: number = (vars._editorData["id_salepoint"] ? vars._editorData["id_salepoint"] : 0);
            this.Service.GetSalePoint(id, (responseData) => {
                controller.Model.set("editModel", responseData);
                this.setupListCompany(responseData);
                controller.afterLoad();
            });
            return false;
        }

        private setupListCompany(responseData: any) {
            let html: string = '';
            let companies = responseData.companies;
            let list: JQuery = $("#editor-view-company-list");
            if (companies && companies.length > 0) {
                for (let i = 0, icount = companies.length; i < icount; i++)
                    html += ' <option value="' + companies[i].id + '"' + (i === 0 ? ' selected' : '') + '>' + companies[i].name + '</option>';
                list.html(html);
            }
            else
                list.html('');
            list.formSelect();
        }

        public Save(): void {
            let controller = this;
            this.Service.SetSalePoint(controller.EditorModel, (responseData) => {
                controller.afterSave();
            });
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ISalepointModel = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidSalePointName") });
                result = false;
            }

            if (utils.isNullOrEmpty(model.city)) {
                M.toast({ html: vars._statres("msg$error$invalidCity") });
                result = false;
            }


            return result;
        }
    }
}