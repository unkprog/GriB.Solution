import base = require("app/common/baseservice");

export namespace Services {
    export class POSTerminalService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/posterminal' };
        }

        public Enter(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/enter", Callback: Callback });
        }
    }
}