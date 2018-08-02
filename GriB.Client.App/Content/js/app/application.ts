/// <reference path="interfaces/icontroller.ts" />
import vars = require('common/variables');
import int = require('interfaces/icontroller');

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

        private loadAppView() {
            let self = this;
            $.when($.ajax({ url: "/Content/view/main.html", cache: false })).done((template) => {
                try {
                    $("#mainview").html(template);
                    kendo.bind($("#mainview"), this._model);
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
            //self.ShowLoading();
            $.when($.ajax({ url: controller.Options.Url, cache: false })).done((template) => {
                try {
                    self._controller = controller;
                   // self._appTitle.html(controller.Header);

                    //let view: kendo.View = self._controller.CreateView(template);
                    //self.contentLayout.showIn("#content-layout", view);
                    //$("#" + self._controller.Id).css("visibility", "visible");
                    self._controllersStack.Push(backController);
                } finally {
                    //self.HideLoading();
                }
            }).fail((e) => {
                //self.HideLoading();
            });
        }

    }
}