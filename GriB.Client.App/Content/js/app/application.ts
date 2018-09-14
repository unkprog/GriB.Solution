import vars = require('app/common/variables');

export module App {
    class ControllersStack {
        private _controllers: Interfaces.IController[] = [];
        private _current: Interfaces.IController;

        public get Current(): Interfaces.IController {
            return this._current;
        }

        public Pop() {
            if (this._controllers.length > 0)
                this._current = this._controllers.pop();
            else
                this._current = undefined;
        }

        public Push(controller: Interfaces.IController) {
            var self = this;
            if (controller) {
                self._controllers.push(controller);
                history.pushState({}, '');
            }
            else
                self._controllers = [];
        }
    }

    export class Application implements Interfaces.IApplication {

        private _model: kendo.data.ObservableObject;
        constructor() {
            vars._app = this;
            this._controllersStack = new ControllersStack();
            this._model = new kendo.data.ObservableObject({
                "AppHeader": "POS Cloud",
                "labelOk": vars._statres("button$label$ok"),
                "labelError": vars._statres("label$error"),
                "contentError":""
            });
            this.Initailize();
        }

        private _controllersStack: ControllersStack;
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

        public ControllerBack: { (e: any): void; };
        private controllerBack(e) {
            this._controllersStack.Pop();
            this.RestoreController();
        }

        private progressControl: JQuery;
        private navbarControl: JQuery;
        private contentControl: JQuery;
        public Initailize(): void {
            let app = this;

            $.support.cors = true;
          
            app.progressControl = $("#progress-container");
            app.contentControl = $("#app-content");

            app.Resize = $.proxy(app.resize, app);
            app.ControllerBack = $.proxy(app.controllerBack, app);
            app.loadAppView();
        }

        public RestoreController() {
            if (this._controllersStack.Current)
                this.OpenView(this._controllersStack.Current);
        }

        public ShowLoading() {
            this.progressControl.show();
        }

        public HideLoading() {
            this.progressControl.hide();
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
                } finally {
                   
                }
            }).fail((e) => {
                self.HideLoading();
                alert(e.responseText);
            });
        }

        public OpenController(urlController: string, backController?: Interfaces.IController) {
            var self = this;
            let ctrlCreate: any = vars._controllers[urlController]
            if (ctrlCreate) {
                let url: string = "/Content/js/app/controller/" + urlController + ".js";
                require([url], function (module) {
                    let controller: Interfaces.IController = ctrlCreate(module);
                    self.OpenView(controller, backController);
                });
            }
        }

        public OpenView(controller: Interfaces.IController, backController?: Interfaces.IController) {
            var self = this;
            if ($("#" + controller.Options.Id).length > 0) return;     //Already loaded and current
            self.ShowLoading();

            $.when($.ajax({ url: controller.Options.Url, cache: false })).done((template) => {
                let isInit: boolean = false;
                try {
                    if (self._controller)
                        self._controller.ViewHide(this);

                    self._controller = controller;
                    self._controllersStack.Push(backController);

                    let header = controller.Header;
                    if (header)
                        self._model.set("AppHeader", header + ' ' + self.contentControl.width());

                    let view = $(template);
                    isInit = self._controller.ViewInit(view);
                    self.contentControl.html(view[0]);
                    
                    self._controller.ViewShow(this);
                    self._controller.ViewResize(this);
                } finally {
                    if (isInit)
                        self.HideLoading();
                }
            }).fail((e) => {
                self.HideLoading();
            });
        }

        private login(): void {
            this.OpenController("security/login");
        }

        private initAfterLoaded() {
            this.login();
        }

        public HandleError(e: any): void {
            this.ShowError(e);
        }

        public ShowError(e: string): void {
            //require(['app/controller/dialog/errordialog'], function (dialog) {
            //    let errorDialog: Interfaces.IDialog = new dialog.Controller.Dialog.ModalDialog();
            //    errorDialog.Show(vars._statres("label$error"), e);
            //});
            this.ShowMessage(vars._statres("label$error"), e);
        }

        public ShowMessage(header: string, message: string, onClose?: () => void): void {
            require(['app/controller/dialog/modaldialog'], function (dialog) {
                let messagerDialog: Interfaces.IDialog = new dialog.Controller.Dialog.ModalDialog();
                messagerDialog.OnClose = onClose;
                messagerDialog.Show(header, message);
            });
        }
    }
}