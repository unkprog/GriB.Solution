define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        var Application = /** @class */ (function () {
            function Application() {
                vars._app = this;
                this._controllersStack = new base.Controller.ControllersStack();
                this._model = new kendo.data.ObservableObject({
                    "AppHeader": "POS Cloud",
                    "labelOk": vars._statres("button$label$ok"),
                    "labelError": vars._statres("label$error"),
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
                heigth = heigth - (this.navbarControl ? this.navbarControl.height() : 0);
                if (this.contentControl)
                    this.contentControl.height(heigth);
                if (this._controller)
                    this._controller.ViewResize(e);
            };
            Application.prototype.GlobalAjaxSetup = function () {
                $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                    //jqXHR.setRequestHeader("X-Application-Language", _config.Language);
                    if (vars._identity && vars._identity.auth && vars._identity.token) {
                        jqXHR.setRequestHeader("Authorization", "POSCloud-ApiKey " + vars._identity.token);
                    }
                });
                // $(document).ajaxError(this.GlobalAjaxErrorHandler);
            };
            Application.prototype.Initailize = function () {
                var app = this;
                app.GlobalAjaxSetup();
                app.progressControl = $("#progress-container");
                app.contentControl = $("#app-content");
                app.Resize = $.proxy(app.resize, app);
                app.ControllerBack = $.proxy(app.controllerBack, app);
                app.loadAppView();
            };
            Application.prototype.ShowLoading = function () {
                this.progressControl.show();
                if (this.contentControl)
                    this.contentControl.hide();
            };
            Application.prototype.HideLoading = function () {
                this.progressControl.hide();
                if (this.contentControl) {
                    this.contentControl.show();
                    //if (this._controller)
                    //    this._controller.AfterShow(this);
                }
                this.resize({});
            };
            Application.prototype.loadAppView = function () {
                var _this = this;
                var self = this;
                $.when($.ajax({ url: "/Content/view/app.html", cache: false })).done(function (template) {
                    try {
                        $("#app-view").html(template);
                        kendo.bind($("#app-view"), _this._model);
                        self.contentControl = $("#app-content");
                        self.navbarControl = $("#app-navbar");
                        $('.sidenav').sidenav();
                        self.resize(undefined);
                        self.initAfterLoaded();
                        self.SetControlNavigation(_this);
                    }
                    finally {
                    }
                }).fail(function (e) {
                    self.HideLoading();
                    alert(e.responseText);
                });
            };
            Application.prototype.SetControlNavigation = function (controlNavigation) {
                if (controlNavigation)
                    this._controllerNavigation = controlNavigation;
            };
            Application.prototype.controllerBack = function (e) {
                if (this._controllerNavigation === this) {
                    this._controllersStack.Pop();
                    this.RestoreController();
                }
                else
                    this._controllerNavigation.ControllerBack(e);
            };
            Application.prototype.RestoreController = function () {
                if (this._controllerNavigation === this) {
                    if (this._controllersStack.Current)
                        this.OpenView(this._controllersStack.Current);
                }
                else
                    this._controllerNavigation.RestoreController();
            };
            Application.prototype.OpenController = function (urlController, backController, onLoadController) {
                var self = this;
                var ctrlCreate = vars._controllers[urlController];
                if (ctrlCreate) {
                    var url = "/Content/js/app/controller/" + urlController + ".js";
                    require([url], function (module) {
                        var controller = ctrlCreate(module);
                        if (onLoadController)
                            onLoadController(controller);
                        self.OpenView(controller, backController);
                    });
                }
            };
            Application.prototype.SetHeader = function (controller) {
                var header = controller.Header;
                if (header)
                    this._model.set("AppHeader", header); // + ' ' + self.contentControl.width()
                else if ("POS Cloud" !== this._model.get("AppHeader"))
                    this._model.set("AppHeader", "POS Cloud");
            };
            Application.prototype.OpenView = function (controller, backController, isRestore) {
                if (isRestore === void 0) { isRestore = false; }
                var self = this;
                if (self._controllerNavigation !== self) {
                    self._controllerNavigation.OpenView(controller, backController);
                    return;
                }
                if ($("#" + controller.Options.Id).length > 0)
                    return; //Already loaded and current
                self.ShowLoading();
                $.when($.ajax({ url: controller.Options.Url, cache: false })).done(function (template) {
                    self.OpenViewTemplate(controller, template, backController, isRestore);
                }).fail(function (e) {
                    self.HideLoading();
                });
            };
            Application.prototype.OpenViewTemplate = function (controller, template, backController, isRestore) {
                if (isRestore === void 0) { isRestore = false; }
                var self = this;
                var isInit = false;
                try {
                    if (self._controller)
                        self._controller.ViewHide(this);
                    self._controller = controller;
                    if (!isRestore)
                        self._controllersStack.Push(backController);
                    self.SetHeader(self._controller);
                    var view = $(template);
                    isInit = self._controller.ViewInit(view);
                    self.contentControl.html(view[0]);
                    isInit = isInit && self._controller.ViewShow(this);
                    //self._controller.ViewResize(this);
                }
                finally {
                    if (isInit)
                        self.HideLoading();
                }
            };
            Application.prototype.login = function () {
                this.OpenController("security/login");
            };
            Application.prototype.initAfterLoaded = function () {
                this.login();
            };
            Application.prototype.HandleError = function (e) {
                this.ShowError(e.responseJSON ? (e.responseJSON.error ? e.responseJSON.error : (e.responseJSON.Message ? e.responseJSON.Message : e)) : e);
            };
            Application.prototype.ShowError = function (e) {
                this.ShowMessage(vars._statres("label$error"), e);
            };
            Application.prototype.ShowMessage = function (header, message, onClose) {
                require(['app/controller/dialog/modaldialog'], function (dialog) {
                    var messagerDialog = new dialog.Controller.Dialog.ModalDialog();
                    messagerDialog.OnClose = onClose;
                    messagerDialog.Show(header, message);
                });
            };
            Object.defineProperty(Application.prototype, "Identity", {
                get: function () {
                    return this._identity;
                },
                set: function (identity) {
                    this._identity = identity;
                },
                enumerable: true,
                configurable: true
            });
            return Application;
        }());
        App.Application = Application;
    })(App = exports.App || (exports.App = {}));
});
//# sourceMappingURL=application.js.map