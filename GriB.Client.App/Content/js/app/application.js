define(["require", "exports", "app/common/variables", "app/services/settingsservice"], function (require, exports, vars, svc) {
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
                vars._app = this;
                this._controllersStack = new ControllersStack();
                this._settingsService = new svc.Services.SettingsService(null);
                this._model = new kendo.data.ObservableObject({
                    "AppHeader": "POS Cloud",
                    "labelOk": "Ok",
                    "contentError": ""
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
                var heigth = window.innerHeight;
                heigth = heigth - this.navbarControl.height();
                this.contentControl.height(heigth);
                if (this._controller)
                    this._controller.ViewResize(e);
            };
            Application.prototype.backButtonClick = function (e) {
                this._controllersStack.Pop();
                this.RestoreController();
            };
            Application.prototype.Initailize = function () {
                var app = this;
                app.progressControl = $("#progress-container");
                app.contentControl = $("#app-content");
                app.Resize = $.proxy(app.resize, app);
                app.BackButtonClick = $.proxy(app.backButtonClick, app);
                app._settingsService.GetSettings(function (e) {
                    vars._appSettings = e;
                    app.loadAppView();
                });
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
                        self.contentControl = $("#app-content");
                        self.navbarControl = $("#app-navbar");
                        $('.sidenav').sidenav();
                        self.resize(undefined);
                        self.openLoginView();
                    }
                    finally {
                    }
                }).fail(function (e) {
                    self.HideLoading();
                    alert(e.responseText);
                });
            };
            Application.prototype.OpenController = function (options, backController) {
                var self = this;
                var url = "/Content/js/app/controller/" + options.Url + ".js";
                require([url], function (module) {
                    var controller = options.getController(module); // new controllerLoaded();
                    self.OpenView(controller, backController);
                });
                //$.when($.ajax({ url: options.Url, cache: false })).done((template) => {
                //}).fail((e) => {
                //    //self.HideLoading();
                //});
            };
            Application.prototype.OpenView = function (controller, backController) {
                var _this = this;
                var self = this;
                if ($("#" + controller.Options.Id).length > 0)
                    return; //Already loaded and current
                self.ShowLoading();
                $.when($.ajax({ url: controller.Options.Url, cache: false })).done(function (template) {
                    var isInit = false;
                    try {
                        if (self._controller)
                            self._controller.ViewHide(_this);
                        self._controller = controller;
                        self._controllersStack.Push(backController);
                        var header = controller.Header;
                        if (header)
                            self._model.set("AppHeader", header);
                        var view = $(template);
                        isInit = self._controller.ViewInit(view);
                        self.contentControl.html(view[0]);
                        self._controller.ViewShow(_this);
                    }
                    finally {
                        if (isInit)
                            self.HideLoading();
                    }
                }).fail(function (e) {
                    self.HideLoading();
                });
            };
            Application.prototype.openLoginView = function () {
                this.OpenController({ Url: "security/login", getController: function (module) { return new module.Controller.Security.Login(); } });
                //this.OpenView(new sc.Controllers.Security.LoginController());
            };
            Application.prototype.ShowError = function (e) {
                if (!this.dialogError) {
                    this.dialogError = $("#app-error-dialog");
                    this.dialogErrorContent = $("#app-error-dialog-content");
                    this.dialogError.modal();
                }
                this.dialogErrorContent.html(e);
                this.dialogError.modal("open");
                //    //this._model.set("contentError", )
            };
            return Application;
        }());
        App.Application = Application;
    })(App = exports.App || (exports.App = {}));
});
//# sourceMappingURL=application.js.map