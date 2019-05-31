import base = require("app/common/baseservice");

export namespace Services {
    export class SettingsService extends base.Services.BaseService {

        constructor() {
            super();
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '/api/settings' };
        }

        public GetServers(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/get_servers", Callback: Callback });
        }

        public GetServer(id: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/get_server", RequestData: { id: id }, Callback: Callback });
        }

        public SetServer(model: Interfaces.Model.IServer, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/post_server", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public DelServer(id: number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/del_server", RequestData: { id: id }, Callback: Callback });
        }
    }
}