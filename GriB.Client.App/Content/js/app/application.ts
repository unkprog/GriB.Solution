﻿import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export module App {
    export class Application implements Interfaces.IApplication {

        private _model: kendo.data.ObservableObject;
        private _controllerNavigation: Interfaces.IControllerNavigation;
        constructor() {
            vars._app = this;
            this._controllersStack = new base.Controller.ControllersStack();
            this._model = new kendo.data.ObservableObject({
                "AppHeader": "POS Cloud",
                "labelOk": vars._statres("button$label$ok"),
                "labelError": vars._statres("label$error"),
                "contentError":""
            });
            this.Initailize();
        }

        private _controllersStack: Interfaces.IControllerStack;
        private _controller: Interfaces.IController;
        public get Controller(): Interfaces.IController {
            return this._controller;
        }

        public Resize: { (e: any): void; };
        private resize(e) {
            let heigth = window.innerHeight;

            heigth = heigth - (this.navbarControl ? this.navbarControl.height() : 0);
            if (this.contentControl)
                this.contentControl.height(heigth);

            if (this._controller)
                this._controller.ViewResize(e);
        }

        public GlobalAjaxSetup() {
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                //jqXHR.setRequestHeader("X-Application-Language", _config.Language);

                if (vars._identity && vars._identity.auth && vars._identity.token) {
                    jqXHR.setRequestHeader("Authorization", "POSCloud-ApiKey " + vars._identity.token);
                }
            });

            // $(document).ajaxError(this.GlobalAjaxErrorHandler);
        }

        private progressControl: JQuery;
        private navbarControl: JQuery;
        private contentControl: JQuery;
        public Initailize(): void {
            let app = this;

            app.GlobalAjaxSetup();
          
            app.progressControl = $("#progress-container");
            app.contentControl = $("#app-content");

            app.Resize = $.proxy(app.resize, app);
            app.ControllerBack = $.proxy(app.controllerBack, app);
            app.loadAppView();
        }

        public ShowLoading() {
            this.progressControl.show();
            if (this.contentControl)
                this.contentControl.hide();
        }

        public HideLoading() {
            this.progressControl.hide();
            if (this.contentControl) {
                this.contentControl.show();
                //if (this._controller)
                //    this._controller.AfterShow(this);
            }
            this.resize({});
        }

      
        private loadAppView() {
            let self = this;
            $.when($.ajax({ url: "/Content/view/app.html", cache: false })).done((template) => {
                try {
                    $("#app-view").html(template);
                    kendo.bind($("#app-view"), this._model);

                    self.contentControl = $("#app-content");
                    self.navbarControl = $("#app-navbar");
                    $('.sidenav').sidenav();
                    self.resize(undefined);
                    self.initAfterLoaded();
                    self.SetControlNavigation(this);
                } finally {
                   
                }
            }).fail((e) => {
                self.HideLoading();
                alert(e.responseText);
            });
        }

        public SetControlNavigation(controlNavigation: Interfaces.IControllerNavigation): void {
            if (controlNavigation)
                this._controllerNavigation = controlNavigation;
        }

        public ControllerBack: { (e: any): void; };
        private controllerBack(e): void {
            if (this._controllerNavigation === this) {
                this._controllersStack.Pop();
                this.RestoreController();
            }
            else
                this._controllerNavigation.ControllerBack(e);
        }

        public RestoreController() {
            if (this._controllerNavigation === this) {
                if (this._controllersStack.Current)
                    this.OpenView({ controller: this._controllersStack.Current });
            }
            else
                this._controllerNavigation.RestoreController();
        }

        public OpenController(options: Interfaces.IOpenControllerOptions) { //urlController: string, backController?: Interfaces.IController, onLoadController?: (controller: Interfaces.IController) => void) {
            var self = this;
            let ctrlCreate: any = vars._controllers[options.urlController]
            if (ctrlCreate) {
                let url: string = "/Content/js/app/controller/" + options.urlController + ".js";
                require([url], function (module) {
                    let controller: Interfaces.IController = ctrlCreate(module);
                    if (options.onLoadController)
                        options.onLoadController(controller);
                    self.OpenView({ controller: controller, backController: options.backController });
                });
            }
        }

        protected SetHeader(controller: Interfaces.IController) {
            let header = controller.Header;
            if (header)
                this._model.set("AppHeader", header); // + ' ' + self.contentControl.width()
            else
                if ("POS Cloud" !== this._model.get("AppHeader"))
                    this._model.set("AppHeader", "POS Cloud");
        }

        public OpenView(options: Interfaces.IOpenViewTemplate) {
            let self = this;

            if (self._controllerNavigation !== self) {
                self._controllerNavigation.OpenView(options);
                return;
            }

            if (options.isModal && options.isModal === true) {
                self.OpenViewModal(options);
                return;
            }

            if ($("#" + options.controller.Options.Id).length > 0) return;     //Already loaded and current
            self.ShowLoading();

            //<div id="main-view-content-modal" style="display:none"></div>
            $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done((template) => {
                self.OpenViewTemplate({ controller: options.controller, template: template, backController: options.backController, isRestore: options.isRestore });
            }).fail((e) => {
                self.HideLoading();
            });
        }

        public OpenViewModal(options: Interfaces.IOpenViewOptions): void {
            //self.OpenViewTemplate({ controller: options.controller, template: template, backController: options.backController, isRestore: options.isRestore });
        }

        public OpenViewTemplate(options: Interfaces.IOpenViewTemplate) {
            let self = this;
            let isInit: boolean = false;
            try {
                if (self._controller)
                    self._controller.ViewHide(this);

                self._controller = options.controller;
                if (!options.isRestore)
                    self._controllersStack.Push(options.backController);

                self.SetHeader(self._controller);

                let view: any = $(options.template);
                isInit = self._controller.ViewInit(view);
                self.contentControl.html(view[0]);
                isInit = isInit && self._controller.ViewShow(this);
            } finally {
                if (isInit)
                    self.HideLoading();
            }
        }

        private login(): void {
            this.OpenController({ urlController: "security/login" });
        }

        private initAfterLoaded() {
            this.login();
        }

        public HandleError(e: any): void {
            this.ShowError(e.responseJSON ? (e.responseJSON.error ? e.responseJSON.error : (e.responseJSON.Message ? e.responseJSON.Message : e)) : e);
        }

        public ShowError(e: string): void {
            this.ShowMessage(vars._statres("label$error"), e);
        }

        public ShowMessage(header: string, message: string, onClose?: () => void): void {
            require(['app/controller/dialog/modaldialog'], function (dialog) {
                let messagerDialog: Interfaces.IDialog = new dialog.Controller.Dialog.ModalDialog();
                messagerDialog.OnClose = onClose;
                messagerDialog.Show(header, message);
            });
        }

        private _identity: Interfaces.Model.IIdentity;
        public get Identity(): Interfaces.Model.IIdentity {
            return this._identity;
        }

        public set Identity(identity: Interfaces.Model.IIdentity) {
            this._identity = identity;
        }

    }
}