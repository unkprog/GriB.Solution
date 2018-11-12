define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        var Application = /** @class */ (function () {
            function Application() {
                //public OpenViewModal(options: Interfaces.IOpenViewOptions): void {
                //    this._controllersModalStack.Push(options.controller);
                //    let modalContent: JQuery = $('<div class="main-view-content-modal"></div>');
                //    try {
                //        isInit = options.controller.ViewInit(view);
                //        self.contentControl.html(view[0]);
                //        isInit = isInit && self._controller.ViewShow(this);
                //    }
                //    this.contentControl.parent().add(modalContent);
                //    //self.OpenViewTemplate({ controller: options.controller, template: template, backController: options.backController, isRestore: options.isRestore });
                //}
                this.contentModals = [];
                vars._app = this;
                this._controllersStack = new base.Controller.ControllersStack();
                this._controllersModalStack = new base.Controller.ControllersStack();
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
                if (this.IsModal) {
                    var contentModal = this.contentModals.pop();
                    var controllerModal = this._controllersModalStack.Current;
                    controllerModal.ViewHide(this);
                    this._controllersModalStack.Pop();
                    contentModal.remove();
                    return;
                }
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
                        this.OpenView({ controller: this._controllersStack.Current });
                }
                else
                    this._controllerNavigation.RestoreController();
            };
            Application.prototype.OpenController = function (options) {
                var self = this;
                var ctrlCreate = vars._controllers[options.urlController];
                if (ctrlCreate) {
                    var url = "/Content/js/app/controller/" + options.urlController + ".js";
                    require([url], function (module) {
                        var controller = ctrlCreate(module);
                        if (options.onLoadController)
                            options.onLoadController(controller);
                        self.OpenView({ controller: controller, isModal: options.isModal, backController: options.backController });
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
            Application.prototype.OpenView = function (options) {
                var self = this;
                if (options.isModal && options.isModal === true) {
                    $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done(function (template) {
                        self.OpenViewTemplate({ controller: options.controller, isModal: options.isModal, template: template, backController: options.backController, isRestore: options.isRestore });
                    }).fail(function (e) {
                        self.HideLoading();
                    });
                    return;
                }
                if (self._controllerNavigation !== self) {
                    self._controllerNavigation.OpenView(options);
                    return;
                }
                if ($("#" + options.controller.Options.Id).length > 0)
                    return; //Already loaded and current
                self.ShowLoading();
                //<div id="main-view-content-modal" style="display:none"></div>
                $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done(function (template) {
                    self.OpenViewTemplate({ controller: options.controller, isModal: options.isModal, template: template, backController: options.backController, isRestore: options.isRestore });
                }).fail(function (e) {
                    self.HideLoading();
                });
            };
            Object.defineProperty(Application.prototype, "IsModal", {
                get: function () {
                    return (this.contentModals.length > 0);
                },
                enumerable: true,
                configurable: true
            });
            Application.prototype.OpenViewTemplate = function (options) {
                var self = this;
                var isInit = false;
                var isModal = (options.isModal && options.isModal === true);
                var content = self.contentControl;
                try {
                    if (!isModal && self._controller)
                        self._controller.ViewHide(this);
                    self._controller = options.controller;
                    if (!isModal && !options.isRestore)
                        self._controllersStack.Push(options.backController);
                    if (!isModal)
                        self.SetHeader(self._controller);
                    var view = $(options.template);
                    isInit = self._controller.ViewInit(view);
                    if (isModal) {
                        content = $('<div class="main-view-content-modal"></div>');
                        self.contentModals.push(content);
                        self.contentControl.hide();
                        self.contentControl.parent().append(content);
                        self._controllersModalStack.Push(options.controller);
                    }
                    content.html(view[0]);
                    isInit = isInit && self._controller.ViewShow(this);
                }
                finally {
                    if (isInit)
                        self.HideLoading();
                }
            };
            Application.prototype.login = function () {
                this.OpenController({ urlController: "security/login" });
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