﻿import base = require("app/common/baseservice");

export namespace Services {
    export class AccountService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/account' };
        }

        public Register(model: Interfaces.Model.IRegisterModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/register", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public Recovery(model: Interfaces.Model.IRegisterModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/recovery", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public Login(model: Interfaces.Model.ILoginModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/login", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public AccountData(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/accountdata", Callback: Callback });
        }
    }
}