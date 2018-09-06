define(["require", "exports", "./variables"], function (require, exports, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var BaseService = /** @class */ (function () {
            function BaseService() {
            }
            Object.defineProperty(BaseService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '' };
                },
                enumerable: true,
                configurable: true
            });
            BaseService.prototype.handleError = function (e, onError) {
                variables_1._app.HandleError(e);
            };
            BaseService.prototype.GetApi = function (options) {
                var self = this;
                var action = (self.Options && self.Options.BaseUrl ? self.Options.BaseUrl : '') + options.Action;
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
            };
            BaseService.prototype.PostApi = function (options) {
                var self = this;
                var action = (self.Options && self.Options.BaseUrl ? self.Options.BaseUrl : '') + options.Action;
                $.ajax({
                    url: action,
                    type: "post",
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
            };
            return BaseService;
        }());
        Services.BaseService = BaseService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=baseservice.js.map