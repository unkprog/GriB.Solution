﻿import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export namespace App {

    export class Application implements Interfaces.IApplication {

        constructor() {
            vars._app = this;
            this._controllersStack = new base.Controller.ControllersStack();
            this._controllersModalStack = new base.Controller.ControllersStack();
            this._model = this.CreateModel();
            this.Initailize();
        }

        private _model: kendo.data.ObservableObject;
        protected CreateModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({});
        }

        public get Model(): kendo.data.ObservableObject {
            return this._model;
        }

      
        private _controllerNavigation: Interfaces.IControllerNavigation;
        private _controllersStack: Interfaces.IControllerStack;
        private _controllersModalStack: Interfaces.IControllerStack;
        private _controller: Interfaces.IController;
        public get Controller(): Interfaces.IController {
            return this._controller;
        }

        public GlobalAjaxSetup() {
            $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
                //jqXHR.setRequestHeader("X-Application-Language", _config.Language);

                if (vars._identity && vars._identity.auth && vars._identity.token) {
                    jqXHR.setRequestHeader("Authorization", "POSCloudAdmin-ApiKey " + vars._identity.token);
                }
            });

            // $(document).ajaxError(this.GlobalAjaxErrorHandler);
        }


        protected navbarControl: JQuery;
        protected contentControl: JQuery;
        public Initailize(): void {
            let app = this;

            app.GlobalAjaxSetup();
            app.SetControlNavigation(this);
            app.Resize = $.proxy(app.resize, app);
            app.ControllerBack = $.proxy(app.controllerBack, app);
            app.loadAppView();
        }

        public Resize: { (e: any): void; };
        protected resize(e) {
            let heigth = window.innerHeight;

            heigth = heigth - (this.navbarControl ? this.navbarControl.height() : 0);
            if (this.contentControl)
                this.contentControl.height(heigth);

            if (this._controller)
                this._controller.ViewResize(e);
        }

        public ShowLoading(): void {
            if (this.contentControl)
                this.contentControl.hide();
        }

        public HideLoading(): void {
            if (this.IsModal)
                this.contentModals[this.contentModals.length - 1].show();
            else if (this.contentControl) {
                this.contentControl.show();
            }
            this.resize({});
        }

        protected loadAppView() {
        }

        public SetControlNavigation(controlNavigation: Interfaces.IControllerNavigation): void {
            if (controlNavigation)
                this._controllerNavigation = controlNavigation;
        }

        private _identity: Interfaces.Model.IIdentity;
        public get Identity(): Interfaces.Model.IIdentity {
            return this._identity;
        }

        public set Identity(identity: Interfaces.Model.IIdentity) {
            this._identity = identity;
        }

        protected OpenViewTemplateIsModal() {
        }

        protected SetHeader(controller: Interfaces.IController) {

        }

        public OpenViewTemplate(options: Interfaces.IOpenViewTemplate) {
            let self = this;
            let isInit: boolean = false;
            let isModal: boolean = (options.isModal && options.isModal === true);
            let content: JQuery = self.contentControl;
            try {

                if (!isModal && self._controller)
                    self._controller.ViewHide(self);

                if (isModal === true && self.IsModal === false)
                    self._controllersStack.Push(self._controller);

                self._controller = options.controller;

                if (isModal === false && options.isRestore === false)
                    self._controllersStack.Push(options.backController);

                if (!isModal)
                    self.SetHeader(self._controller);

                let view: any = $(options.template);
                isInit = self._controller.ViewInit(view);


                if (isModal) {
                    self.OpenViewTemplateIsModal();
                    if (self.IsModal)
                        self._controllersModalStack.Last.View.parent().hide();
                    content = $('<div class="main-view-content-modal"></div>');
                    content.height(self.contentControl.height());
                    self.contentModals.push(content);
                    self.contentControl.hide();
                    self.contentControl.parent().append(content);
                    self._controllersModalStack.Push(self._controller);
                }
                else
                    self.ResetScroll();

                content.html(view[0]);

                isInit = self._controller.ViewShow(this) && isInit;
                //if (isInit == false)
                //    self._controller.ViewResize({});
            } finally {
                if (isInit == true)
                    self.HideLoading();
            }
        }

        private contentModals: JQuery[] = [];
        public get IsModal(): boolean {
            return (this.contentModals.length > 0);
        }

        public get IsNativeApp(): boolean {
            return (window.location.href.toLocaleLowerCase().indexOf('isnativeapp') > -1 ? true : false);
        }

        public NativeCommand(command: string, data: any) {
            if (this.IsNativeApp)
                nativeBridge.command(command, JSON.stringify(data));
        }

        protected ControllerBackEndModal() {
        }

        public ControllerBack: { (e: any): void; };
        private controllerBack(e): void {
            if (this.IsModal === true) {
                let contentModal: JQuery = this.contentModals.pop();
                let controllerModal: Interfaces.IController = this._controllersModalStack.Last;
                controllerModal.ViewHide(this);
                contentModal.remove();
                this._controllersModalStack.Pop();
                if (this.IsModal === true)
                    this._controllersModalStack.Last.View.parent().show();
                else {
                    this.ControllerBackEndModal();
                    this._controllersStack.Pop();
                    this._controller = this._controllersStack.Current;
                    this.contentControl.show();
                    this._controller.ViewResize({});
                }
                return;
            }
            else {
                if (this._controllerNavigation === this) {
                    this._controllersStack.Pop();
                    this.RestoreController();
                }
                else
                    this._controllerNavigation.ControllerBack(e);
            }
        }
      
        public RestoreController() {
            if (this._controllerNavigation === this) {
                if (this._controllersStack.Current)
                    this.OpenView({ controller: this._controllersStack.Current });
            }
            else
                this._controllerNavigation.RestoreController();
        }

        public OpenController(options: Interfaces.IOpenControllerOptions) {
            var self = this;

            let url: string = "/Content/js/app/controller/" + options.urlController + ".js";
            require([url], function (module) {
                let ctrlCreate: any = vars._controllers[options.urlController]
                if (ctrlCreate) {
                    let controller: Interfaces.IController = ctrlCreate(module);
                    if (options.onLoadController)
                        options.onLoadController(controller);
                    self.OpenView({ controller: controller, isModal: options.isModal, backController: options.backController });
                }
            });
        }

        public OpenView(options: Interfaces.IOpenViewTemplate) {
            let self = this;

            if (options.isModal && options.isModal === true) {
                $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done((template) => {
                    self.OpenViewTemplate({ controller: options.controller, isModal: options.isModal, template: template, backController: options.backController, isRestore: options.isRestore });
                }).fail((e) => {
                    self.HideLoading();
                });
                return;
            }

            if (self._controllerNavigation !== self) {
                self._controllerNavigation.OpenView(options);
                return;
            }

            if ($("#" + options.controller.Options.Id).length > 0) return;     //Already loaded and current
            self.ShowLoading();

            //<div id="main-view-content-modal" style="display:none"></div>
            $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done((template) => {
                self.OpenViewTemplate({ controller: options.controller, isModal: options.isModal, template: template, backController: options.backController, isRestore: options.isRestore });
            }).fail((e) => {
                self.HideLoading();
            });
        }

        public ResetScroll() {
            this.contentControl.scrollTop(0);
        }

        HandleError(e: any): void {
            throw new Error("Method not implemented.");
        }
        ShowError(e: string): void {
            throw new Error("Method not implemented.");
        }
        ShowMessage(header: string, message: string, onClose?: () => void): void {
            throw new Error("Method not implemented.");
        }
    }
}