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

        private _model: any;
        constructor() {
            this._controllersStack = new ControllersStack();
            this._model = new kendo.data.ObservableObject({
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
        }

        public BackButtonClick: { (e: any): void; };
        private backButtonClick(e) {
            this._controllersStack.Pop();
            this.RestoreController();
        }

        private progressControl: JQuery;
        public Initailize(): void {
            this.progressControl = $("#progress-container");
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

        appContent: JQuery;
        appTitle: JQuery;
        private loadAppView() {
            let self = this;
            $.when($.ajax({ url: "/Content/view/main.html", cache: false })).done((template) => {
                try {
                    $("#mainview").html(template);
                    kendo.bind($("#mainview"), this._model);

                    self.appTitle = $("#app-title");
                    self.appContent = $("#app-content");
                    $('.sidenav').sidenav();
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
                        self.appTitle.html(header);

                    let view = $(template);//.find("#" + self._controller.Options.Id);
                    if (view.length > 0) {
                        kendo.bind(view, self._controller.Model);
                        self._controller.ViewInit(this);
                    }
                    self.appContent.html(view[0]);
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