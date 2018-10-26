import base = require('app/common/basecontroller');
import svc = require('app/services/settingsservice');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Card {
    export class Card extends base.Controller.BaseCard {
        constructor() {
            super();
        }

        private settingService: svc.Services.SettingsService;
        protected get Service(): svc.Services.SettingsService {
            if (!this.settingService)
                this.settingService = new svc.Services.SettingsService();
            return this.settingService;
        }
    }
}