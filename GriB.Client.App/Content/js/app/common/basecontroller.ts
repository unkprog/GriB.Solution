import utils = require('app/common/utils');
import vars = require('app/common/variables');
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

        //public AfterShow(e: any): void {
           
        //}

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

        public get Last(): Interfaces.IController {
            return (this._controllers.length > 0 ? this._controllers[this._controllers.length - 1] : undefined);
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

        public ViewShow(e: any): boolean {
            let result: boolean = super.ViewShow(e);
            if (this._controller)
                this._controller.ViewShow(e);
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
            if (_app.IsModal)
                _app.ControllerBack(e);
            else
            {
                this._controllersStack.Pop();
                this.RestoreController();
            }
        }

        public RestoreController() {
            if (this._controllersStack.Current)
                this.OpenView({ controller: this._controllersStack.Current, isRestore: true });
        }

        public OpenController(options: Interfaces.IOpenControllerOptions) {
            _app.OpenController(options);
        }

        public OpenView(options: Interfaces.IOpenViewOptions) {//controller: Interfaces.IController, backController?: Interfaces.IController, isRestore: boolean = false) {
            var self = this;

            if (options.isModal && options.isModal === true) {
                _app.OpenView(options);
                return;
            }

            if ($("#" + options.controller.Options.Id).length > 0) return;     //Already loaded and current
            _app.ShowLoading();

            $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done((template) => {
                self.OpenViewTemplate({ controller: options.controller, template: template, backController: options.backController, isRestore: options.isRestore });
            }).fail((e) => {
                _app.HideLoading();
            });
        }

        public OpenViewTemplate(options: Interfaces.IOpenViewTemplate) {
            let self = this;
            //if (options.isModal && options.isModal === true) {
            //    _app.OpenViewTemplate(options);
            //    return;
            //}

            let isInit: boolean = false;
            try {
                if (self._controller)
                    self._controller.ViewHide(this);

                self._controller = options.controller;
                if (!options.isRestore)
                    self._controllersStack.Push(options.backController);

                self.SetHeader(self._controller);
                try {
                    let view: any = $(options.template);
                    isInit = self._controller.ViewInit(view);
                    self._content.html(view[0]);
                    isInit = self._controller.ViewShow(this) && isInit;
                    //self._controller.ViewResize(this);
                }
                catch (ex) {
                    console.log(ex);
                }
            } finally {
                if (isInit)
                    _app.HideLoading();
            }
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
            this.editorSettings = this.createEditorSettings();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "editModel": {},
            });
        }

        public get EditorModel(): Interfaces.Model.IEditorModel {
            return this.Model.get("editModel").toJSON();
        }

        private editorSettings: Interfaces.IEditorSettings;
        public get EditorSettings(): Interfaces.IEditorSettings {
            return this.editorSettings;
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: "", Load: undefined, Save: undefined };
        }

        private navHeader: JQuery;
        private btnSave: JQuery;
        private btnCancel: JQuery;
        public ViewInit(view: JQuery): boolean {

            let navbarHeader: string = '<div class="navbar-fixed editor-header">';
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
            let controller = this;
            if(controller.EditorSettings && controller.EditorSettings.Load) {
                let id: number = (vars._editorData[controller.EditorSettings.EditIdName] ? vars._editorData[controller.EditorSettings.EditIdName] : 0);
                controller.EditorSettings.Load(id, (responseData) => {
                    controller.Model.set("editModel", responseData.record);
                    controller.afterLoad(responseData);
                    controller.endLoad();
                });
                return false;
            }
            controller.afterLoad();
            controller.endLoad();
            return true;
        }

        protected afterLoad(responseData?: any): void {
        }

        protected endLoad(): void {
            M.updateTextFields();
            _app.HideLoading();
            this.View.show();
        }

        protected validate(): boolean {
            return true;
        }

        private endSave(): void {
            _main.ControllerBack(this);
        }

        protected getSaveModel(): Interfaces.Model.IEditorModel {
            return this.EditorModel;
        }

        public Save(): void {
            let controller = this;
            if (controller.EditorSettings && controller.EditorSettings.Save) {
                let model: Interfaces.Model.IEditorModel = controller.getSaveModel();
                controller.EditorSettings.Save(model, (responseData) => {
                    controller.endSave();
                });
                return;
            }
            controller.endSave();
        }

        public Cancel(): void {
        }
    }

    export class BaseCard extends Base implements Interfaces.IControllerCard {

        constructor() {
            super();
            this.cardSettings = this.createCardSettings();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "cardModel": [],
            });
        }

        public get CardModel(): Interfaces.Model.IEditorModel[] {
            return this.Model.get("cardModel").toJSON();
        }

        private cardSettings: Interfaces.ICardSettings;
        public get CardSettings(): Interfaces.ICardSettings {
            return this.cardSettings;
        }

        private navHeader: JQuery;
        private btnAdd: JQuery;
        private btnDelete: JQuery;
        private btnEdit: JQuery;
        private btnSelect: JQuery;
        private btnClose: JQuery;

        private navSearch: JQuery;
        private formSearch: JQuery;
        private inputSearch: JQuery;
        private clearSearch: JQuery;

        private tableRow: JQuery;
        private tableHead: JQuery;
        private tableBody: JQuery;

        public ViewInit(view: JQuery): boolean {

            let navbarHeader: string = '<div class="navbar-fixed editor-header">';
            navbarHeader += '        <nav class="editor-header-nav">';
            navbarHeader += '            <div class="nav-wrapper editor-header">';
            navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
            navbarHeader += '                <ul id="cardButtons" class="right"></ul>';
            navbarHeader += '            </div>';
            navbarHeader += '        </nav>';
            navbarHeader += '    </div>';

            this.navHeader = $(navbarHeader);

            if (this.CardSettings.IsEdit)   this.btnEdit   = $('<li><a id="card-btn-edit" class="editor-header-button"><i class="material-icons editor-header">edit</i></a></li>');
            if (this.CardSettings.IsAdd)    this.btnAdd    = $('<li><a id="card-btn-add" class="editor-header-button"><i class="material-icons editor-header">add</i></a></li>');
            if (this.CardSettings.IsDelete) this.btnDelete = $('<li><a id="card-btn-delete" class="editor-header-button"><i class="material-icons editor-header">remove</i></a></li>');
            if (this.CardSettings.IsSelect) this.btnSelect = $('<li><a id="editor-btn-select" class="editor-header-button"><i class="material-icons editor-header">done</i></a></li>');

            this.btnClose = $('<li><a id="card-btn-close" class="editor-header-button"><i class="material-icons editor-header">close</i></a></li>');

            let cardButtons: JQuery = this.navHeader.find("#cardButtons");
            cardButtons.append(this.btnEdit).append(this.btnAdd).append(this.btnDelete).append(this.btnSelect).append(this.btnClose);

            navbarHeader = '<nav class="card-search-nav editor-header z-depth-1">';
            navbarHeader += '   <div class="nav-wrapper">';
            navbarHeader += '       <form>';
            navbarHeader += '           <div class="input-field">';
            navbarHeader += '               <input id="card-view-search" type="search" required value="">';
            navbarHeader += '               <label class="label-icon" for="search"><i class="material-icons editor-header">search</i></label>';
            navbarHeader += '               <i id="card-view-search-clear" class="material-icons editor-header">close</i>';
            navbarHeader += '           </div>';
            navbarHeader += '       </form>';
            navbarHeader += '   </div>';
            navbarHeader += '</nav>';
            this.navSearch = $(navbarHeader);
            this.formSearch = this.navSearch.find('form');
            this.inputSearch = this.formSearch.find('#card-view-search');
            this.clearSearch = this.formSearch.find('#card-view-search-clear');


            navbarHeader  = '<div class="row row-table">';
            navbarHeader += '    <div class="col s12 m12 l12 xl12 col-table">';
            navbarHeader += '        <table class="highlight">';
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
            if (this.btnSelect)
                this.btnSelect.remove();
        }

        private proxySearch;
        protected createEvents(): void {
            this.EditButtonClick = this.createClickEvent(this.btnEdit, this.editButtonClick);
            this.AddButtonClick = this.createClickEvent(this.btnAdd, this.addButtonClick);
            this.DeleteButtonClick = this.createClickEvent(this.btnDelete, this.deleteButtonClick);
            this.CloseButtonClick = this.createClickEvent(this.btnClose, this.closeButtonClick);
            this.SelectButtonClick = this.createClickEvent(this.btnSelect, this.selectButtonClick);
            this.ClearButtonClick = this.createClickEvent(this.clearSearch, this.clearButtonClick); 
            this.proxySearch = $.proxy(this.search, this);
            this.formSearch.on('submit', this.proxySearch);
        }

        protected destroyEvents(): void {
            this.formSearch.off('submit', this.proxySearch);
            this.destroyClickEvent(this.clearSearch, this.ClearButtonClick); 
            this.destroyClickEvent(this.rows, this.rowClick);
            this.destroyClickEvent(this.btnSelect, this.SelectButtonClick);
            this.destroyClickEvent(this.btnEdit, this.EditButtonClick);
            this.destroyClickEvent(this.btnAdd, this.AddButtonClick);
            this.destroyClickEvent(this.btnDelete, this.DeleteButtonClick);
            this.destroyClickEvent(this.btnClose, this.CloseButtonClick);
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return { FieldId: "", FieldSearch: "", ValueIdNew: 0, EditIdName: "", IsAdd: false, IsEdit: false, IsDelete: false, IsSelect: false, EditController: "", Load: undefined, Delete: undefined, Columns: [] };
        }


        private rows: JQuery;
        private setupTable(): void {
            this.tableHead.html(this.getTableHeaderHtml());
            this.setupRows();
            this.rows = this.tableBody.find('tr');
            this.createClickEvent(this.rows, this.rowClick);
        }

        private setupRows(): void {
            this.selectedRow = null;

            if (this.rows)
                this.destroyClickEvent(this.rows, this.rowClick);

            this.tableBody.html(this.getTableBodyHtml());
            this.rows = this.tableBody.find('tr');
            this.createClickEvent(this.rows, this.rowClick);
        }

        private search(e: any) {
            e.preventDefault();
            this.setupRows();
            return false;
        }

        protected getTableHeaderHtml(): string {
            let columns: Interfaces.ICardColumn[] = this.CardSettings.Columns;
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
            let setting: Interfaces.ICardSettings = this.CardSettings;
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

        protected getItemsForView(): Interfaces.Model.IEditorModel[] {
            let result: Interfaces.Model.IEditorModel[] = [];
            let data: Interfaces.Model.IEditorModel[] = this.Model.get("cardModel");
            let strSearch: string = (this.inputSearch.val() as string); // ($("#card-view-search").val() as string);
            let fieldSearch: string = this.CardSettings.FieldSearch;
            let isNotSearch: boolean = (utils.isNullOrEmpty(fieldSearch) || utils.isNullOrEmpty(strSearch));
            if (!isNotSearch)
                strSearch = strSearch.toLowerCase();
            for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                if (isNotSearch) {
                    result.push(data[i]);
                }
                else if ((data[i][fieldSearch] as string).toLowerCase().indexOf(strSearch) > -1) {
                    result.push(data[i]);
                }
            }
            return result;
        }

        protected getTableBodyHtml(): string {
            let html: string = '';
            let data: Interfaces.Model.IEditorModel[] = this.getItemsForView();

            if (data && data.length > 0) {
                if (!this.templateRow)
                    this.templateRow = kendo.template(this.getTableRowTemplate());
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                        html += this.templateRow(data[i]);
                }
            }
            return html;
        }

        private selectedRow: JQuery;
        private rowClick(e): void {
            if (this.selectedRow)
                this.selectedRow.removeClass("row-active z-depth-1 brown lighten-5");
            this.selectedRow = $(e.currentTarget);
            if (this.selectedRow)
                this.selectedRow.addClass("row-active z-depth-1 brown lighten-5");
        }


        public EditButtonClick: { (e: any): void; };
        private editButtonClick(e): void {
            if (this.selectedRow) {
                this.Edit();
            }
        }

        public getSelectedRowId(): any {
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

        public OnSelect: { (controller: Interfaces.IControllerCard): void; };
        public SelectButtonClick: { (e: any): void; };
        private selectButtonClick(e): void {
            let self: any = this;
            if (this.OnSelect)
                this.OnSelect(self as Interfaces.IControllerCard);
            this.Close();
            _main.ControllerBack(e);
        }

        public CloseButtonClick: { (e: any): void; };
        private closeButtonClick(e): void {
            this.Close();
            _main.ControllerBack(e);
        }

        

        public ClearButtonClick: { (e: any): void; };
        private clearButtonClick(e): void {
            this.inputSearch.val("");
            this.setupRows();
        }
        

        protected loadData(): boolean {
            let controller = this;
            if (this.CardSettings && this.CardSettings.Load) {
                this.CardSettings.Load((responseData) => {
                    controller.Model.set("cardModel", responseData);
                    controller.afterLoad();
                });
                return false;
            }
            controller.afterLoad();
            return true;
        }

        protected afterLoad(): void {
            this.setupTable();
            _app.HideLoading();
        }

        public Add(): void {
            vars._editorData[this.CardSettings.EditIdName] = this.CardSettings.ValueIdNew;
            vars._app.OpenController({ urlController: this.CardSettings.EditController, backController: this });
        }

        protected afterAdd(): void {

        }

        public Edit(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                if (_id > 0) {
                    vars._editorData[this.CardSettings.EditIdName] = _id;
                    vars._app.OpenController({ urlController: this.CardSettings.EditController, backController: this });
                }
            }
        }

        public Delete(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let controller = this;
                if (this.CardSettings && this.CardSettings.Delete) {
                    this.CardSettings.Delete(_id, (responseData) => {
                        controller.afterDelete();
                    });
                }
            }
        }


        protected afterDelete(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let model: any[] = this.Model.get("cardModel");
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