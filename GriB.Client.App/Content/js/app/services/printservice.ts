import base = require("app/common/baseservice");

export module Services {
    export class PrintService extends base.Services.BaseService implements Interfaces.IPrintService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/print' };
        }

        public PrintCheck(pskey: string, document: string, Callback: (responseData: any) => void, Error: (responseData: any) => void) {
            this.PostApi({ Action: "/printcheck", RequestData: JSON.stringify({ pskey: pskey, document: document }), Callback: Callback, Error: Error });
        }
    }
}