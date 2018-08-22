import base = require("app/common/baseservice");
import int = require('app/interfaces/iservice');

export module Services {
    export class RegisterService extends base.Services.BaseService {

        constructor(options: int.Interfaces.IServiceOptions) {
            super(options);
        }

        public GetSR(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/sr", Callback: Callback });
        }
    }
}