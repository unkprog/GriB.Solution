import int = require('app/interfaces/iservice');

export module Services {
    export class BaseService implements int.Interfaces.IService {

        private _options: int.Interfaces.IServiceOptions;
        //private _errorHandler: (e: any) => void;
        //protected _baseUrl: string;

        protected handleError(e: any, onError?: (e: any) => void) {
        //    //_app.HandleError(e);
        }



        constructor(options: int.Interfaces.IServiceOptions) {
            //this._errorHandler = options.Error;//errorHandler;
            this._options = options;
        }

        public GetApi(options: int.Interfaces.IServiceCallOptions): void {
            let self = this;
            let action = self._options.BaseUrl + options.Action;
            $.ajax({
                url: action,
                type: "get",
                dataType: "json",
                data: options.RequestData,
                success: function (responseData) {
                    if (options.Callback)
                        options.Callback(responseData);
                },
                error: function (e) {
                    self.handleError(e, options.Error);
                }
            });
        }

        public PostApi(options: int.Interfaces.IServiceCallOptions): void {
            let self = this;
            $.ajax({
                url: self._options.BaseUrl + options.Action,
                type: "post",
                dataType: "json",
                data: options.RequestData,
                success: function (responseData) {
                    if (options.Callback)
                        options.Callback(responseData);
                },
                error: function (e) {
                    self.handleError(e, options.Error);
                }
            });
        }
    }
}