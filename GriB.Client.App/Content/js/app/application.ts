import vars = require('app/common/variables');
import svc = require('app/services/settingsservice');
import sc = require('app/controllers/security/logincontroller');

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
        private _settingsService: svc.Services.SettingsService;
        constructor() {
            vars._app = this;
            this._controllersStack = new ControllersStack();
            this._settingsService = new svc.Services.SettingsService(null);
            this._model = new kendo.data.ObservableObject({
                "AppHeader": "POS Cloud",
                "labelOk": "Ok",
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
            heigth = heigth - this.navbarControl.height();
            this.contentControl.height(heigth);

            if (this._controller)
                this._controller.ViewResize(e);
        }

        public BackButtonClick: { (e: any): void; };
        private backButtonClick(e) {
            this._controllersStack.Pop();
            this.RestoreController();
        }

        private progressControl: JQuery;
        private navbarControl: JQuery;
        private contentControl: JQuery;
        public Initailize(): void {
            let app = this;
            app.progressControl = $("#progress-container");
            app.contentControl = $("#app-content");

            app.Resize = $.proxy(app.resize, app);
            app.BackButtonClick = $.proxy(app.backButtonClick, app);
            app._settingsService.GetSettings((e) => {
                vars._appSettings = e;
                app.loadAppView();
            });
            
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
            $.when($.ajax({ url: "/Content/view/main.html", cache: false })).done((template) => {
                try {
                    $("#mainview").html(template);
                    kendo.bind($("#mainview"), this._model);

                    self.contentControl = $("#app-content");
                    self.navbarControl = $("#app-navbar");
                    $('.sidenav').sidenav();
                    self.resize(undefined);
                    self.openLoginView();
                } finally {
                   
                }
            }).fail((e) => {
                self.HideLoading();
                alert(e.responseText);
            });
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
                        self._model.set("AppHeader", header);

                    let view = $(template);
                    isInit = self._controller.ViewInit(view);
                    self.contentControl.html(view[0]);
                    
                    self._controller.ViewShow(this);
                } finally {
                    if (isInit)
                        self.HideLoading();
                }
            }).fail((e) => {
                self.HideLoading();
            });
        }

        private openLoginView() {
            this.OpenView(new sc.Controllers.Security.LoginController({ Url: "/Content/view/security/login.html", Id: "app-login" }));
        }



        private dialogError: JQuery;
        private dialogErrorContent: JQuery;
        public ShowError(e: string) {

            if (!this.dialogError) {
                this.dialogError = $("#app-error-dialog");
                this.dialogErrorContent = $("#app-error-dialog-content");
                this.dialogError.modal();
            }

            this.dialogErrorContent.html(e);
            this.dialogError.modal("open");

        //    //this._model.set("contentError", )
        }
    }
}