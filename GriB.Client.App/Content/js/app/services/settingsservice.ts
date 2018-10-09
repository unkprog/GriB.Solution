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

        public SetOrganization(model: Interfaces.Model.ICompanyModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/post_organization", RequestData: JSON.stringify(model), Callback: Callback });
        }

        public GetSalePoints(Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/get_salepoints", Callback: Callback });
        }

        public GetSalePoint(id:number, Callback: (responseData: any) => void) {
            this.GetApi({ Action: "/get_salepoint", RequestData: { id: id }, Callback: Callback });
        }

        public SetSalePoint(model: Interfaces.Model.ISalepointModel, Callback: (responseData: any) => void) {
            this.PostApi({ Action: "/post_salepoint", RequestData: JSON.stringify(model), Callback: Callback });
        }
    }
}