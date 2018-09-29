import utils = require('app/common/utils');
import { _app, _main } from './variables';

export namespace Controller {
    export class Base implements Interfaces.IController {
        constructor() {
            this._options = this.createOptions();
            this._model = this.createModel();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return {
                Url: "",
                Id: ""
            };
        }
        private _options: Interfaces.IControllerOptions;
        public get Options(): Interfaces.IControllerOptions {
            return this._options;
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": ""
            });
        }

        private _model: kendo.data.ObservableObject;
        public get Model(): kendo.data.ObservableObject {
            return this._model;
        }

        private _view: JQuery;
        public get View(): JQuery {
            return this._view;
        }
       

        public get Header(): string {
            return this._model ? this._model.get("Header") : "";
        }

        public ViewInit(view: JQuery): boolean {
            this._view = view;
            kendo.bind(view, this._model);
            this.createEvents();
            return true;
        }

        protected createEvents(): void {
        }

        public ViewShow(e: any): void {
            M.updateTextFields();
        }

        public ViewHide(e: any): void {
            this.destroyEvents();

        }

        protected destroyEvents(): void {
        }

        public ViewResize(e?: any): void {
        }

        protected createClickEvent(elemName: string | JQuery, clickFunc: any/*, controller: Interfaces.IController*/): any {
            return utils.createClickEvent(elemName, clickFunc, this, this.View);
        }

        protected createKeyPress(elemName: string[], clickFunc: (e: any) => any, controller: Interfaces.IController): any {
            var result = $.proxy(clickFunc, controller);
            $.each(elemName, function (index, el) {
                var $inp = $("#" + el);
                if ($inp.length > 0) {
                    $inp[0].addEventListener("keypress", result, false);
                }
            });
            return result;
        }

        protected destroyClickEvent(elemName: string | JQuery, proxyFunc: any): any {
            utils.destroyClickEvent(elemName, proxyFunc, this.View);
        }

        protected deleteKeyPress(elemName: string[], proxyFunc: (e: any) => any): any {
            $.each(elemName, function (index, el) {
                var $inp = $("#" + el);
                if ($inp.length > 0)
                    $inp[0].removeEventListener("keypress", proxyFunc);
            });
        }
    }

    export class ControllersStack implements Interfaces.IControllerStack {
        private _controllers: Interfaces.IController[] = [];
        private _current: Interfaces.IController;

        public get Current(): Interfaces.IController {
            return this._current;
        }

        public Pop() : void {
            if (this._controllers.length > 0)
                this._current = this._controllers.pop();
            else
                this._current = undefined;
        }

        public Push(controller: Interfaces.IController) : void {
            var self = this;
            if (controller) {
                self._controllers.push(controller);
                history.pushState({}, '');
            }
            else
                self._controllers = [];
        }
    }

    export class BaseContent extends Base implements Interfaces.IControllerNavigation {

        constructor() {
            super();
            this._controllersStack = new ControllersStack();
            this.ControllerBack = $.proxy(this.controllerBack, this);
            this._controllers = this.ControllersInit();
        }

        private _controllersStack: Interfaces.IControllerStack;
        private _controller: any;
        private _controllers: any;
        private _content: JQuery;
        protected ControllersInit(): any {
            return {};
        }

        protected GetContent(): JQuery {
            return null;
        }

        public ViewInit(view): boolean {
            let result: boolean = super.ViewInit(view);
            this._content = this.GetContent();
            return result;
        }

        public ViewResize(e) {
            if (this._content) {
                let heigth = window.innerHeight;
                heigth = heigth - this._content.offset().top;
                this._content.height(heigth);
            }

            if (this._controller)
                this._controller.ViewResize(e);
        }

        public ControllerBack: { (e: any): void; };
        private controllerBack(e): void {
            this._controllersStack.Pop();
            this.RestoreController();
        }

        public RestoreController() {
            if (this._controllersStack.Current)
                this.OpenView(this._controllersStack.Current);
        }

        public OpenController(urlController: string, backController?: Interfaces.IController) {
            var self = this;
            let ctrlCreate: any = this._controllers[urlController]
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
            _app.ShowLoading();

            $.when($.ajax({ url: controller.Options.Url, cache: false })).done((template) => {
                let isInit: boolean = false;
                try {
                    if (self._controller)
                        self._controller.ViewHide(this);

                    self._controller = controller;
                    self._controllersStack.Push(backController);

                    //TODO: Пока не заморачиваемся с заголовком
                    //let header = controller.Header;
                    //if (header)
                    //    self._model.set("AppHeader", header); // + ' ' + self.contentControl.width()
                    //else
                    //    if ("POS Cloud" !== self._model.get("AppHeader"))
                    //        self._model.set("AppHeader", "POS Cloud");

                    let view = $(template);
                    isInit = self._controller.ViewInit(view);
                    self._content.html(view[0]);

                    self._controller.ViewShow(this);
                    self._controller.ViewResize(this);
                } finally {
                    if (isInit)
                        _app.HideLoading();
                }
            }).fail((e) => {
                _app.HideLoading();
            });
        }
    }

    export class BaseEditor extends Base implements Interfaces.IControllerEditor {

        constructor() {
            super();
        }

        private navHeader: JQuery;
        private btnSave: JQuery;
        private btnCancel: JQuery;
        public ViewInit(view: JQuery): boolean {

            let navbarHeader: string = '<div class="navbar-fixed">';
            navbarHeader += '        <nav class="editor-header-nav">';
            navbarHeader += '            <div class="nav-wrapper editor-header">';
            navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
            navbarHeader += '                <ul id="editButtons" class="right"></ul>';
            navbarHeader += '            </div>';
            navbarHeader += '        </nav>';
            navbarHeader += '    </div>';

            this.navHeader = $(navbarHeader);

            this.btnSave = $('<li><a id="editor-btn-save" class="editor-header-button editor-header-button-apply"><i class="material-icons editor-header">done</i></a></li>');
            this.btnCancel = $('<li><a id="editor-btn-cancel" class="editor-header-button editor-header-button-cancel"><i class="material-icons editor-header">close</i></a></li>');

            this.navHeader.find("#editButtons").append(this.btnSave);
            this.navHeader.find("#editButtons").append(this.btnCancel);

            view.prepend(this.navHeader);

            super.ViewInit(view);

            return this.loadData(function () {
                _app.HideLoading();
            });
        }

        public ViewHide(e) {
            super.ViewHide(e);
            if (this.btnSave)
                this.btnSave.remove();
            if (this.btnCancel)
                this.btnCancel.remove();
        }

        protected createEvents(): void {
            this.SaveButtonClick = this.createClickEvent(this.btnSave, this.saveButtonClick);
            this.CancelButtonClick = this.createClickEvent(this.btnCancel, this.cancelButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent(this.btnSave, this.SaveButtonClick);
            this.destroyClickEvent(this.btnSave, this.CancelButtonClick);
        }

        public SaveButtonClick: { (e: any): void; };
        private saveButtonClick(e): void  {
            let data: Interfaces.Model.IModelBase = this.getDataToSave();

            if (this.validate(data)) {
                this.Save(data, function () {
                    _main.ControllerBack(e);
                });
            }
        }

        public CancelButtonClick: { (e: any): void; };
        private cancelButtonClick(e): void {
            this.Cancel(e);
            _main.ControllerBack(e);
        }

        protected loadData(afterLoad: () => void): boolean {
            if (afterLoad)
                afterLoad();
            return true;
        }

        protected getDataToSave(): Interfaces.Model.IModelBase {
            return null;
        }

        protected validate(editModel: Interfaces.Model.IModelBase): boolean {
            return true;
        }

        public Save(editModel: Interfaces.Model.IModelBase, afterSave: () => void): void {
            if (afterSave)
                afterSave();
        }

        public Cancel(e: any): void {
        }


    }
}