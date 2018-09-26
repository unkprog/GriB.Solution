import base = require("app/common/baseservice");
//import int = require('app/interfaces/iservice');

export module Services {
    export class SettingsService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/settings' };
        }

        public GetSettings(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/settings", Callback: Callback });
        }

        public GetOrganization(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/get_organization", Callback: Callback });
        }
    }
}