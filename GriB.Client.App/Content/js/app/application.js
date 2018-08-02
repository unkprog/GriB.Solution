define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        var ControllersStack = /** @class */ (function () {
            function ControllersStack() {
                this._controllers = [];
            }
            Object.defineProperty(ControllersStack.prototype, "Current", {
                get: function () {
                    return this._current;
                },
                enumerable: true,
                configurable: true
            });
            ControllersStack.prototype.Pop = function () {
                if (this._controllers.length > 0)
                    this._current = this._controllers.pop();
                else
                    this._current = undefined;
            };
            ControllersStack.prototype.Push = function (controller) {
                var self = this;
                if (controller) {
                    self._controllers.push(controller);
                    history.pushState({}, '');
                }
                else
                    self._controllers = [];
            };
            return ControllersStack;
        }());
        var Application = /** @class */ (function () {
            function Application() {
                this._controllersStack = new ControllersStack();
                this._model = new kendo.data.ObservableObject({
                    "labelOk": "Ok"
                });
                this.Initailize();
            }
            Object.defineProperty(Application.prototype, "Controller", {
                get: function () {
                    return this._controller;
                },
                enumerable: true,
                configurable: true
            });
            Application.prototype.resize = function (e) {
            };
            Application.prototype.backButtonClick = function (e) {
                this._controllersStack.Pop();
                this.RestoreController();
            };
            Application.prototype.Initailize = function () {
                this.progressControl = $("#progress-container");
                this.Resize = $.proxy(this.resize, this);
                this.BackButtonClick = $.proxy(this.backButtonClick, this);
                this.loadAppView();
            };
            Application.prototype.RestoreController = function () {
                if (this._controllersStack.Current)
                    this.OpenView(this._controllersStack.Current);
            };
            Application.prototype.ShowLoading = function () {
                this.progressControl.show();
            };
            Application.prototype.HideLoading = function () {
                this.progressControl.hide();
            };
            Application.prototype.loadAppView = function () {
                var _this = this;
                var self = this;
                $.when($.ajax({ url: "/Content/view/main.html", cache: false })).done(function (template) {
                    try {
                        $("#mainview").html(template);
                        kendo.bind($("#mainview"), _this._model);
                    }
                    finally {
                        self.HideLoading();
                    }
                }).fail(function (e) {
                    self.HideLoading();
                    alert(e.responseText);
                });
            };
            Application.prototype.OpenView = function (controller, backController) {
                var self = this;
                if ($("#" + controller.Options.Id).length > 0)
                    return; //Already loaded and current
                //self.ShowLoading();
                $.when($.ajax({ url: controller.Options.Url, cache: false })).done(function (template) {
                    try {
                        self._controller = controller;
                        // self._appTitle.html(controller.Header);
                        //let view: kendo.View = self._controller.CreateView(template);
                        //self.contentLayout.showIn("#content-layout", view);
                        //$("#" + self._controller.Id).css("visibility", "visible");
                        self._controllersStack.Push(backController);
                    }
                    finally {
                        //self.HideLoading();
                    }
                }).fail(function (e) {
                    //self.HideLoading();
                });
            };
            return Application;
        }());
        App.Application = Application;
    })(App = exports.App || (exports.App = {}));
});
//# sourceMappingURL=application.js.map