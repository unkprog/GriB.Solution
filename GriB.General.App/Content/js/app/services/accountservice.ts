import base = require("app/common/baseservice");

export namespace Services {
    export class AccountService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/account' };
        }

        public Login(model: Interfaces.Model.ILoginModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/loginadm", RequestData: JSON.stringify(model), Callback: Callback });
        }
    }
}