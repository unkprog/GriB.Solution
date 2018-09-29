import base = require("app/common/baseservice");

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

        public SetOrganization(model: Interfaces.Model.IOrganizationModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/post_organization", RequestData: JSON.stringify(model), Callback: Callback });
        }
    }
}