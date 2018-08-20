define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var BaseService = /** @class */ (function () {
            function BaseService(options) {
                //this._errorHandler = options.Error;//errorHandler;
                this._options = options;
            }
            //private _errorHandler: (e: any) => void;
            //protected _baseUrl: string;
            BaseService.prototype.handleError = function (e, onError) {
                //    //_app.HandleError(e);
            };
            BaseService.prototype.GetApi = function (options) {
                var self = this;
                var action = self._options.BaseUrl + options.Action;
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
            };
            BaseService.prototype.PostApi = function (options) {
                var self = this;
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
            };
            return BaseService;
        }());
        Services.BaseService = BaseService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=baseservice.js.map