﻿import vars = require('app/common/variables');
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
                "labelSalePointInfo": vars._statres("label$contacts"),
                "labelCity": vars._statres("label$city"),
                "labelAddress": vars._statres("label$address"),
                "labelSchedule": vars._statres("label$schedule"),
            });
        }


        public get EditorModel(): Interfaces.Model.ISalepoint {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "id_salepoint", Load: $.proxy(this.Service.GetSalePoint, this.Service), Save: $.proxy(this.Service.SetSalePoint, this.Service) };
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.setupListCompany(responseData);
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

        protected getSaveModel(): Interfaces.Model.IEditorModel {
            let model: Interfaces.Model.ISalepoint = this.EditorModel;
            let comp = $("#editor-view-company-list").formSelect("getSelectedValues");
            model.company_id = (comp && comp.length > 0 ? +comp[0] : 0);

            return model;
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.ISalepoint = this.EditorModel;

            if (utils.isNullOrEmpty(model.name)) {
                M.toast({ html: vars._statres("msg$error$invalidSalePointName") });
                result = false;
            }

            //if (utils.isNullOrEmpty(model.city)) {
            //    M.toast({ html: vars._statres("msg$error$invalidCity") });
            //    result = false;
            //}


            return result;
        }
    }
}