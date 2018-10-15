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

        public ViewShow(e: any): boolean {
            M.updateTextFields();
            return true;
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
                this.OpenView(this._controllersStack.Current, undefined, true);
        }

        public OpenController(urlController: string, backController?: Interfaces.IController) {
            _app.OpenController(urlController, backController);
        }

        public OpenView(controller: Interfaces.IController, backController?: Interfaces.IController, isRestore: boolean = false) {
            var self = this;
            if ($("#" + controller.Options.Id).length > 0) return;     //Already loaded and current
            _app.ShowLoading();

            $.when($.ajax({ url: controller.Options.Url, cache: false })).done((template) => {
                let isInit: boolean = false;
                try {
                    if (self._controller)
                        self._controller.ViewHide(this);

                    self._controller = controller;
                    if (!isRestore)
                        self._controllersStack.Push(backController);

                    self.SetHeader(self._controller);
                    try {
                        let view = $(template);
                        isInit = self._controller.ViewInit(view);
                        self._content.html(view[0]);
                        isInit = isInit && self._controller.ViewShow(this);
                        self._controller.ViewResize(this);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                } finally {
                    if (isInit)
                        _app.HideLoading();
                }
            }).fail((e) => {
                _app.HideLoading();
            });
        }

        protected SetHeader(controller: Interfaces.IController) {
             //TODO: Пока не заморачиваемся с заголовком
                    //let header = controller.Header;
                    //if (header)
                    //    self._model.set("AppHeader", header); // + ' ' + self.contentControl.width()
                    //else
                    //    if ("POS Cloud" !== self._model.get("AppHeader"))
                    //        self._model.set("AppHeader", "POS Cloud");
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

            let navbarHeader: string = '<div class="navbar-fixed editor-header z-depth-1">';
            navbarHeader += '        <nav class="editor-header-nav">';
            navbarHeader += '            <div class="nav-wrapper editor-header">';
            navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
            navbarHeader += '                <ul id="editButtons" class="right"></ul>';
            navbarHeader += '            </div>';
            navbarHeader += '        </nav>';
            navbarHeader += '    </div>';

            this.navHeader = $(navbarHeader);

            this.btnSave = $('<li><a id="editor-btn-save" class="editor-header-button"><i class="material-icons editor-header">done</i></a></li>');
            this.btnCancel = $('<li><a id="editor-btn-cancel" class="editor-header-button"><i class="material-icons editor-header">close</i></a></li>');

            this.navHeader.find("#editButtons").append(this.btnSave);
            this.navHeader.find("#editButtons").append(this.btnCancel);

            view.prepend(this.navHeader);

            super.ViewInit(view);

            return this.loadData();
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

        public get EditorModel(): Interfaces.Model.IBaseModel {
            return null;
        }

        public SaveButtonClick: { (e: any): void; };
        private saveButtonClick(e): void {
            if (this.validate()) {
                this.Save();
            }
        }

        public CancelButtonClick: { (e: any): void; };
        private cancelButtonClick(e): void {
            this.Cancel();
            _main.ControllerBack(e);
        }

        protected loadData(): boolean {
            this.afterLoad();
            return true;
        }

        protected afterLoad(): void {
            M.updateTextFields();
            _app.HideLoading();
            this.View.show();
        }

        protected validate(): boolean {
            return true;
        }

        protected afterSave(): void {
            _main.ControllerBack(this);
        }

        public Save(): void {
            this.afterSave();
        }

        public Cancel(): void {
        }
    }

    export class BaseCard extends Base implements Interfaces.IControllerCard {

        constructor() {
            super();
        }

        private navHeader: JQuery;
        private btnAdd: JQuery;
        private btnDelete: JQuery;
        private btnEdit: JQuery;
        private btnClose: JQuery;

        private navSearch: JQuery;
        private inputSearch: JQuery;

        private tableRow: JQuery;
        private tableHead: JQuery;
        private tableBody: JQuery;

        public ViewInit(view: JQuery): boolean {

            let navbarHeader: string = '<div class="navbar-fixed editor-header z-depth-1">';
            navbarHeader += '        <nav class="editor-header-nav">';
            navbarHeader += '            <div class="nav-wrapper editor-header">';
            navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
            navbarHeader += '                <ul id="cardButtons" class="right"></ul>';
            navbarHeader += '            </div>';
            navbarHeader += '        </nav>';
            navbarHeader += '    </div>';

            this.navHeader = $(navbarHeader);

            this.btnEdit = $('<li><a id="card-btn-edit" class="editor-header-button"><i class="material-icons editor-header">edit</i></a></li>');
            this.btnAdd = $('<li><a id="card-btn-add" class="editor-header-button"><i class="material-icons editor-header">add</i></a></li>');
            this.btnDelete = $('<li><a id="card-btn-delete" class="editor-header-button"><i class="material-icons editor-header">remove</i></a></li>');
            this.btnClose = $('<li><a id="card-btn-close" class="editor-header-button"><i class="material-icons editor-header">close</i></a></li>');

            let cardButtons: JQuery = this.navHeader.find("#cardButtons");
            cardButtons.append(this.btnEdit).append(this.btnAdd).append(this.btnDelete).append(this.btnClose);

            navbarHeader = '<nav class="card-search-nav editor-header z-depth-1">';
            navbarHeader += '   <div class="nav-wrapper">';
            navbarHeader += '       <form>';
            navbarHeader += '           <div class="input-field">';
            navbarHeader += '               <input id="card-view-search" type="search" required>';
            navbarHeader += '               <label class="label-icon" for="search"><i class="material-icons editor-header">search</i></label>';
            navbarHeader += '               <i class="material-icons editor-header">close</i>';
            navbarHeader += '           </div>';
            navbarHeader += '       </form>';
            navbarHeader += '   </div>';
            navbarHeader += '</nav>';
            this.navSearch = $(navbarHeader);
            this.inputSearch = this.navSearch.find('card-view-search');



            navbarHeader  = '<div class="row row-table">';
            navbarHeader += '    <div class="col s12 m12 l12 xl12 col-table">';
            navbarHeader += '        <table class="highlight z-depth-1">';
            navbarHeader += '            <thead></thead>';
            navbarHeader += '            <tbody></tbody>';
            navbarHeader += '        </table>';
            navbarHeader += '    </div>';
            navbarHeader += '</div>';
            this.tableRow = $(navbarHeader);
            this.tableHead = this.tableRow.find('thead');
            this.tableBody = this.tableRow.find('tbody');

            view.append([this.navHeader, this.navSearch, this.tableRow]);

            super.ViewInit(view);

            return this.loadData();
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);

            let tbody: JQuery = this.tableBody;
            if (tbody && tbody.length > 0) {
                tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
            }
        }

        public ViewHide(e) {
            super.ViewHide(e);
            if (this.btnEdit)
                this.btnEdit.remove();
            if (this.btnAdd)
                this.btnAdd.remove();
            if (this.btnDelete)
                this.btnDelete.remove();
            if (this.btnClose)
                this.btnClose.remove();
        }

        protected createEvents(): void {
            this.EditButtonClick = this.createClickEvent(this.btnEdit, this.editButtonClick);
            this.AddButtonClick = this.createClickEvent(this.btnAdd, this.addButtonClick);
            this.DeleteButtonClick = this.createClickEvent(this.btnDelete, this.deleteButtonClick);
            this.CloseButtonClick = this.createClickEvent(this.btnClose, this.closeButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyClickEvent(this.rows, this.rowClick);
            this.destroyClickEvent(this.btnEdit, this.EditButtonClick);
            this.destroyClickEvent(this.btnAdd, this.AddButtonClick);
            this.destroyClickEvent(this.btnDelete, this.DeleteButtonClick);
            this.destroyClickEvent(this.btnClose, this.CloseButtonClick);
        }

        protected loadData(): boolean {
            this.afterLoad();
            return true;
        }

        protected afterLoad(): void {
            this.setupTable();
            M.updateTextFields();
            _app.HideLoading();
        }

        protected getCardSettings(): Interfaces.ICardSettings  {
            return {
                FieldId: "",
                Columns: []
            };
        }

        private rows: JQuery;
        private setupTable(): void {
            this.tableHead.html(this.getTableHeaderHtml());
            this.setupRows();
            this.rows = this.tableBody.find('tr');
            this.createClickEvent(this.rows, this.rowClick);
        }

        private setupRows(): void {
            if (this.rows)
                this.destroyClickEvent(this.rows, this.rowClick);

            this.tableBody.html(this.getTableBodyHtml());
            this.rows = this.tableBody.find('tr');
            this.createClickEvent(this.rows, this.rowClick);
        }

        protected getTableHeaderHtml(): string {
            let columns: Interfaces.ICardColumn[] = this.getCardSettings().Columns;
            let html: string = '';

            html += '<tr>';
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                html += '   <th';
                if (columns[i].HeaderStyle) {
                    html += ' class="';
                    html += columns[i].HeaderStyle;
                    html += '"';
                }
                html += '>';
                html += (columns[i].HeaderTemplate ? columns[i].HeaderTemplate : columns[i].Header);
                html += '</th>';
            }
            html += '</tr>';

            return html;
        }

        private templateRow: Function;
        protected getTableRowTemplate(): string {
            let setting: Interfaces.ICardSettings = this.getCardSettings();
            let columns: Interfaces.ICardColumn[] = setting.Columns;
            let html: string = '';

            html += '<tr';
            if (setting.FieldId) {
                html += ' id="table-row-#=';
                html += setting.FieldId;
                html += '#"';
            }
            html += '>';

            for (let i = 0, icount = (columns && columns.length ? columns.length : 0); i < icount; i++) {
                html += '   <td';
                if (columns[i].FieldStyle) {
                    html += ' class="';
                    html += columns[i].FieldStyle;
                    html += '"';
                }
                html += '>';
                if (columns[i].FieldTemplate)
                    html += columns[i].FieldTemplate;
                else {
                    html += '#=';
                    html += columns[i].Field;
                    html += '#';
                }
                html += '</td>';
            }
            html += '</tr>';

            return html;
        }


        protected getTableBodyHtml(): string {
            let html: string = '';
            let data = this.Model.get("editModel");
            if (data && data.length > 0) {
                let item: Interfaces.Model.ISalepointModel;
                if (!this.templateRow)
                    this.templateRow = kendo.template(this.getTableRowTemplate());
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    item = data[i];
                    html += this.templateRow(item);
                }
            }
            return html;
        }

        private selectedRow: JQuery;
        private rowClick(e): void {
            if (this.selectedRow)
                this.selectedRow.removeClass("row-active z-depth-1 grey lighten-5");
            this.selectedRow = $(e.currentTarget);
            if (this.selectedRow)
                this.selectedRow.addClass("row-active z-depth-1 grey lighten-5");
        }


        public EditButtonClick: { (e: any): void; };
        private editButtonClick(e): void {
            if (this.selectedRow) {
                this.Edit();
            }
        }

        protected getSelectedRowId(): any {
            if (this.selectedRow && this.selectedRow.length > 0 && this.selectedRow[0].id) {
                return this.selectedRow[0].id.replace("table-row-", "");
            }
        }

        public AddButtonClick: { (e: any): void; };
        private addButtonClick(e): void {
            this.Add();
        }

        public DeleteButtonClick: { (e: any): void; };
        private deleteButtonClick(e): void {
            this.Delete();
        }

        public CloseButtonClick: { (e: any): void; };
        private closeButtonClick(e): void {
            this.Close();
            _main.ControllerBack(e);

        }

        public Edit(): void {
           
        }

        public Add(): void {
        }

        protected afterAdd(): void {

        }

        public Delete(): void {
            this.afterDelete();
        }

        protected afterDelete(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let model: any[] = this.Model.get("editModel");
                for (let i = model.length - 1; i >= 0; i--) {
                    if (model[i].id === _id) {
                        model.splice(i, 1);
                    }
                }
                this.setupRows();
            }
        }

        public Close(): void {
        }
    }
}