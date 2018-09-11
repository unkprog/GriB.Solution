import { _app } from "./variables";

export namespace Services {
    export class BaseService implements Interfaces.IService {

        constructor() {
        }

        public get Options(): Interfaces.IServiceOptions {
            return { BaseUrl: '' };
        }

        protected handleError(e: any, onError?: (e: any) => void) {
            _app.HandleError(e);
        }

        public GetApi(options: Interfaces.IServiceCallOptions): void {
            let self = this;
            let action = (self.Options && self.Options.BaseUrl ? self.Options.BaseUrl : '') + options.Action;
            $.ajax({
                url: action,
                type: "get",
                dataType: "json",
                crossDomain: options.CrossDomain,
                data: options.RequestData,
                success: function (responseData, textStatus, jqXHR) {
                    if (options.Callback)
                        options.Callback(responseData);
                },
                error: function (e, textStatus, errorThrown) {
                    self.handleError(e, options.Error);
                }
            });
        }

        public PostApi(options: Interfaces.IServiceCallOptions): void {
            let self = this;
            let action = (self.Options && self.Options.BaseUrl ? self.Options.BaseUrl : '') + options.Action;
            $.ajax({
                url: action,
                type: "post",
                dataType: "json",
                contentType: "application/json",
                //crossDomain: options.CrossDomain,
                data: options.RequestData,
                success: function (responseData, textStatus, jqXHR) {
                    if (options.Callback)
                        options.Callback(responseData);
                },
                error: function (e, textStatus, errorThrown) {
                    self.handleError(e, options.Error);
                }
            });
        }
    }
}