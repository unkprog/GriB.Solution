import base = require("app/common/baseservice");

export namespace Services {
    export class RegisterService extends base.Services.BaseService {

        constructor(options: Interfaces.IServiceOptions) {
            super(options);
        }

        public GetSR(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/sr", Callback: Callback });
        }
    }
}