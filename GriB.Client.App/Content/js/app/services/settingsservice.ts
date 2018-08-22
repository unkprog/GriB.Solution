import base = require("app/common/baseservice");
import int = require('app/interfaces/iservice');

export module Services {
    export class SettingsService extends base.Services.BaseService {

        constructor(options: int.Interfaces.IServiceOptions) {
            super({ BaseUrl: "/api/settings" });
        }

        public GetSettings(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/settings", Callback: Callback });
        }
    }
}