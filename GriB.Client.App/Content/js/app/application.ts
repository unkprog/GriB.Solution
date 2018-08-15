import vars = require('app/common/variables');
import int = require('app/interfaces/icontroller');
import sc = require('app/controllers/startcontroller');

export module App {
    class ControllersStack {
        private _controllers: int.Interfaces.IController[] = [];
        private _current: int.Interfaces.IController;

        public get Current(): int.Interfaces.IController {
            return this._current;
        }

        public Pop() {
            if (this._controllers.length > 0)
                this._current = this._controllers.pop();
            else
                this._current = undefined;
        }

        public Push(controller: int.Interfaces.IController) {
            var self = this;
            if (controller) {
                self._controllers.push(controller);
                history.pushState({}, '');
            }
            else
                self._controllers = [];
        }
    }

    export class Application {

        private _model: kendo.data.ObservableObject;
        constructor() {

            this._controllersStack = new ControllersStack();
            this._model = new kendo.data.ObservableObject({
                "AppHeader": "POS Cloud",
                "labelOk" : "Ok"
            });
            this.Initailize();
        }

        private _controllersStack: ControllersStack;
        private _controller: int.Interfaces.IController;
        public get Controller(): int.Interfaces.IController {
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
            this.progressControl = $("#progress-container");
            this.contentControl = $("#app-content");

            this.Resize = $.proxy(this.resize, this);
            this.BackButtonClick = $.proxy(this.backButtonClick, this);
            this.loadAppView();
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
                    self.openStartView();
                } finally {
                    self.HideLoading();
                }
            }).fail((e) => {
                self.HideLoading();
                alert(e.responseText);
            });
        }

        public OpenView(controller: int.Interfaces.IController, backController?: int.Interfaces.IController) {
            var self = this;
            if ($("#" + controller.Options.Id).length > 0) return;     //Already loaded and current
            self.ShowLoading();
            $.when($.ajax({ url: controller.Options.Url, cache: false })).done((template) => {
                try {
                    if (self._controller)
                        self._controller.ViewHide(this);

                    self._controller = controller;
                    self._controllersStack.Push(backController);

                    let header = controller.Header;
                    if (header)
                        self._model.set("AppHeader", header);

                    let view = $(template);//.find("#" + self._controller.Options.Id);
                    if (view.length > 0) {
                        kendo.bind(view, self._controller.Model);
                        self._controller.ViewInit(this);
                    }
                    self.contentControl.html(view[0]);
                    self._controller.ViewShow(this);
 
                } finally {
                    //self.HideLoading();
                }
            }).fail((e) => {
                self.HideLoading();
            });
        }

        private openStartView() {
            this.OpenView(new sc.controllers.StartController({ Url: "/Content/view/start.html", Id: "app-start" }));
        }
    }
}