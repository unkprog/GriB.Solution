import base = require('app/common/basecontroller');
import svc = require('app/services/settingsservice');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Editor extends base.Controller.BaseEditor {
        constructor() {
            super();
        }

        private settingService: svc.Services.SettingsService;
        protected get Service(): svc.Services.SettingsService {
            if (!this.settingService)
                this.settingService = new svc.Services.SettingsService();
            return this.settingService;
        }

        protected setupTableAccess(control: JQuery, data: Interfaces.Model.ISalePointAccessModel[]): void {
            let html: string = '';

            if (data && data.length > 0) {
                let item: Interfaces.Model.ISalePointAccessModel;
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    item = data[i];
                    item

                    html += '<tr>';
                    html += '<td data-bind="text:editModel.accesssalepoints[' + i + '].salepoint.name"></td>';

                    html += '<td>';
                    html += '<div class="switch valign-wrapper">';
                    html += '    <label>';
                    html += '        <input type="checkbox" data-bind="checked:editModel.accesssalepoints[' + i + '].isaccess">';
                    html += '        <span class="lever"></span>';
                    html += '     </label>';
                    html += '</div>';
                    html += '</td>';
                    html += '</tr>';
                }
            }

            control.html(html);
            kendo.bind(control, this.Model);
        }
    }
}