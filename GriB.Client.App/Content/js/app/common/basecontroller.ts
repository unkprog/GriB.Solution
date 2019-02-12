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
       

        public get Header(): string { return this._model ? this._model.get("Header") : ""; }
        public set Header(value: string) { if(this._model) this._model.set("Header", value); }

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

        protected createTouchClickEvent(elemName: string | JQuery, clickFunc: any): any {
            return utils.createTouchClickEvent(elemName, clickFunc, this, this.View);
        }

        protected createDblTouchClickEvent(elemName: string | JQuery, clickFunc: any): any {
            return utils.createDblTouchClickEvent(elemName, clickFunc, this, this.View);
        }

        protected createClickEvent(elemName: string | JQuery, clickFunc: any): any {
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

        protected destroyTouchClickEvent(elemName: string | JQuery, proxyFunc: any): any {
            utils.destroyTouchClickEvent(elemName, proxyFunc, this.View);
        }

        protected destroyDblTouchClickEvent(elemName: string | JQuery, proxyFunc: any): any {
            utils.destroyDblTouchClickEvent(elemName, proxyFunc, this.View);
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
                    self._controller.ViewHide(self);

                self._controller = options.controller;
                if (!options.isRestore)
                    if (options.backController)
                        self._controllersStack.Push(options.backController);

                self.SetHeader(self._controller);
                try {
                    let view: any = $(options.template);
                    isInit = self._controller.ViewInit(view);
                    self._content.html(view[0]);
                    isInit = self._controller.ViewShow(self) && isInit;
                    self._controller.ViewResize(self);
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
            if (!this.editorSettings.ButtonSetings)
                this.editorSettings.ButtonSetings = { IsSave: true, IsCancel: true };
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

            if (this.editorSettings.ButtonSetings.IsSave === true) this.navHeader.find("#editButtons").append(this.btnSave);
            if (this.editorSettings.ButtonSetings.IsCancel === true) this.navHeader.find("#editButtons").append(this.btnCancel);

            if (this.editorSettings.ButtonSetings.IsSave === true || this.editorSettings.ButtonSetings.IsCancel === true)
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
            this.SaveButtonClick = this.createTouchClickEvent(this.btnSave, this.saveButtonClick);
            this.CancelButtonClick = this.createTouchClickEvent(this.btnCancel, this.cancelButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent(this.btnSave, this.SaveButtonClick);
            this.destroyTouchClickEvent(this.btnSave, this.CancelButtonClick);
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
                    if (vars._editorData.isCopy === true)
                        responseData.record.id = 0;
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

    export class BaseCardFilterSettings implements Interfaces.ICardFilterSettings {
        public saveFilter(): void {
            throw new Error("Method not implemented.");
        }
        public restoreFilter() {
            throw new Error("Method not implemented.");
        }

        constructor(setupRows: { (): void; }) {
            this.fieldSearch = "name";
            this.setupRows = setupRows;
        }

        private setupRows: { (): void; };

        private fieldSearch: string;
        public get FieldSearch(): string {
            return this.fieldSearch;
        }
        public set FieldSearch(val: string) {
            this.fieldSearch = val;
        }

        private navSearch: JQuery;
        private formSearch: JQuery;
        private inputSearch: JQuery;
        private clearSearch: JQuery;

        private proxySearch;

        public InitControls(): JQuery {
            let navbarHeader: string = '<nav class="card-search-nav editor-header z-depth-1">';
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

            return this.navSearch;
        }

        public ViewControls(): void {

        }
        public ResizeControls(): void {
        }

        public createEvents(): void {
            if (this.clearSearch) this.ClearButtonClick = utils.createTouchClickEvent(this.clearSearch, this.clearButtonClick, this);
            if (this.formSearch) {
                this.proxySearch = $.proxy(this.search, this);
                this.formSearch.on('submit', this.proxySearch);
            }
        }

        private search(e: any) {
            e.preventDefault();
            if (this.setupRows)
                this.setupRows();
            return false;
        }

        public destroyEvents(): void {
            if (this.formSearch) this.formSearch.off('submit', this.proxySearch);
            if (this.clearSearch) utils.destroyTouchClickEvent(this.clearSearch, this.ClearButtonClick);
        }

        public ClearButtonClick: { (e: any): void; };
        private clearButtonClick(e): void {
            if (this.inputSearch)
                this.inputSearch.val("");
            if (this.setupRows)
                this.setupRows();
        }

        public GetItemsForView(data: Interfaces.Model.IEditorModel[]): Interfaces.Model.IEditorModel[] {
            let result: Interfaces.Model.IEditorModel[] = [];
            let strSearch: string = (this.inputSearch ? this.inputSearch.val() as string : ""); // ($("#card-view-search").val() as string);
            let fieldSearch: string = this.FieldSearch;
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
        private btnAddCopy: JQuery;
        private btnDelete: JQuery;
        private btnEdit: JQuery;
        private btnSelect: JQuery;
        private btnClose: JQuery;

        private tableRow: JQuery;
        private tableHead: JQuery;
        private tableBody: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controls: Array<JQuery> = [];

            controls.push(this.initNavHeader());
            let filterControl: JQuery = (this.cardSettings && this.cardSettings.FilterSettings ? this.cardSettings.FilterSettings.InitControls() : undefined);
            if (filterControl)
                controls.push(filterControl);
            controls.push(this.initTableRow());

            view.append(controls);
            super.ViewInit(view);
            return this.loadData();
        }

        protected initNavHeader(): JQuery {

            let navbarHeader: string = '<div class="navbar-fixed editor-header">';
            navbarHeader += '        <nav class="editor-header-nav">';
            navbarHeader += '            <div class="nav-wrapper editor-header">';
            navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
            navbarHeader += '                <ul id="cardButtons" class="right"></ul>';
            navbarHeader += '            </div>';
            navbarHeader += '        </nav>';
            navbarHeader += '    </div>';
            this.navHeader = $(navbarHeader);

            if (this.CardSettings.IsEdit) this.btnEdit = $('<li><a id="card-btn-edit" class="editor-header-button"><i class="material-icons editor-header">edit</i></a></li>');
            if (this.CardSettings.IsAdd) this.btnAdd = $('<li><a id="card-btn-add" class="editor-header-button"><i class="material-icons editor-header">add</i></a></li>');
            if (this.CardSettings.IsAddCopy) this.btnAddCopy = $('<li><a id="card-btn-addcopy" class="editor-header-button"><i class="material-icons editor-header">exposure_plus_1</i></a></li>');
            if (this.CardSettings.IsDelete) this.btnDelete = $('<li><a id="card-btn-delete" class="editor-header-button"><i class="material-icons editor-header">delete_forever</i></a></li>');
            if (this.CardSettings.IsSelect) this.btnSelect = $('<li><a id="editor-btn-select" class="editor-header-button"><i class="material-icons editor-header">done</i></a></li>');

            this.btnClose = $('<li><a id="card-btn-close" class="editor-header-button"><i class="material-icons editor-header">close</i></a></li>');

            let cardButtons: JQuery = this.navHeader.find("#cardButtons");
            cardButtons.append(this.btnEdit).append(this.btnAdd).append(this.btnAddCopy).append(this.btnDelete).append(this.btnSelect).append(this.btnClose);

            return this.navHeader;
        }

       

        protected initTableRow(): JQuery {
            let navbarHeader: string =  '<div class="row row-table">';
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

            return this.tableRow;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            if (this.cardSettings && this.cardSettings.FilterSettings)
                this.cardSettings.FilterSettings.ResizeControls();

            let tbody: JQuery = this.tableBody;
            if (tbody && tbody.length > 0) {
                tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
            }
        }

        public ViewShow(e): boolean {
            if (this.cardSettings && this.cardSettings.FilterSettings)
                this.cardSettings.FilterSettings.ViewControls();
            return super.ViewShow(e);
        }

        public ViewHide(e) {
            super.ViewHide(e);
            if (this.btnEdit)
                this.btnEdit.remove();
            if (this.btnAdd)
                this.btnAdd.remove();
            if (this.btnAddCopy)
                this.btnAddCopy.remove();
            if (this.btnDelete)
                this.btnDelete.remove();
            if (this.btnClose)
                this.btnClose.remove();
            if (this.btnSelect)
                this.btnSelect.remove();
        }

        private proxySearch;
        protected createEvents(): void {
            this.EditButtonClick = this.createTouchClickEvent(this.btnEdit, this.editButtonClick);
            this.AddButtonClick = this.createTouchClickEvent(this.btnAdd, this.addButtonClick);
            this.AddCopyButtonClick = this.createTouchClickEvent(this.btnAddCopy, this.addCopyButtonClick);
            this.DeleteButtonClick = this.createTouchClickEvent(this.btnDelete, this.deleteButtonClick);
            this.CloseButtonClick = this.createTouchClickEvent(this.btnClose, this.closeButtonClick);
            this.SelectButtonClick = this.createTouchClickEvent(this.btnSelect, this.selectButtonClick);
            if (this.cardSettings && this.cardSettings.FilterSettings)
                this.cardSettings.FilterSettings.createEvents();
        }

        protected destroyEvents(): void {
            if (this.cardSettings && this.cardSettings.FilterSettings)
                this.cardSettings.FilterSettings.destroyEvents();
            this.destroyTouchClickEvent(this.rows, this.rowClick);
            this.destroyTouchClickEvent(this.btnSelect, this.SelectButtonClick);
            this.destroyTouchClickEvent(this.btnEdit, this.EditButtonClick);
            this.destroyTouchClickEvent(this.btnAdd, this.AddButtonClick);
            this.destroyTouchClickEvent(this.btnAddCopy, this.AddCopyButtonClick);
            this.destroyTouchClickEvent(this.btnDelete, this.DeleteButtonClick);
            this.destroyTouchClickEvent(this.btnClose, this.CloseButtonClick);
        }

        protected createCardFilterSettings(): Interfaces.ICardFilterSettings {
            return new BaseCardFilterSettings($.proxy(this.setupRows, this));
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return { FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "", IsAdd: false, IsAddCopy: false, IsEdit: false, IsDelete: false, IsSelect: false, EditController: "", Load: undefined, Delete: undefined, Columns: [] };
        }


        private rows: JQuery;
        private setupTable(): void {
            this.tableHead.html(this.getTableHeaderHtml());
            this.setupRows();
            this.rows = this.tableBody.find('tr');
            this.createTouchClickEvent(this.rows, this.rowClick);
        }

        protected setupRows(): void {
            this.selectedRow = null;

            if (this.rows)
                this.destroyTouchClickEvent(this.rows, this.rowClick);

            this.tableBody.html(this.getTableBodyHtml());
            this.rows = this.tableBody.find('tr');
            this.createTouchClickEvent(this.rows, this.rowClick);
        }

       
        protected getTableHeaderHtml(): string {
            let columns: Interfaces.IBaseColumn[] = this.CardSettings.Columns;
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

        protected getTableRowTemplate(): string {
            let setting: Interfaces.ICardSettings = this.CardSettings;
            let columns: Interfaces.IBaseColumn[] = setting.Columns;
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
            let data: Interfaces.Model.IEditorModel[] = (this.cardSettings && this.cardSettings.FilterSettings ? this.cardSettings.FilterSettings.GetItemsForView(this.Model.get("cardModel")) : this.Model.get("cardModel"));

            if (data && data.length > 0) {
                let templateRow = vars.getTemplate(this.getTableRowTemplate());
                if (templateRow) {
                    for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                        html += templateRow(data[i]);
                    }
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

        public getSelectedRecord(): Interfaces.Model.IBaseModel {
            let result: Interfaces.Model.IBaseModel;
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                let data: Interfaces.Model.IBaseModel[] = this.Model.get("cardModel");
                for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    if (data[i].id == _id) {
                        result = data[i];
                        break;
                    }
                }
            }
            return result;
        }

        public AddButtonClick: { (e: any): void; };
        private addButtonClick(e): void {
            this.Add();
        }

        public AddCopyButtonClick: { (e: any): void; };
        private addCopyButtonClick(e): void {
            this.addCopy();
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


        public addCopy(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                if (_id > 0) {
                    vars._editorData[this.CardSettings.EditIdName] = _id;
                    vars._editorData["isCopy"] = true;
                    vars._app.OpenController({ urlController: this.CardSettings.EditController, backController: this });
                }
            }
        }
        

        public Edit(): void {
            let id: any = this.getSelectedRowId();
            if (id) {
                let _id: number = +id;
                if (_id > 0) {
                    vars._editorData[this.CardSettings.EditIdName] = _id;
                    vars._editorData["isCopy"] = false;
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

    export class BaseReport extends BaseEditor implements Interfaces.IControllerReport {

        constructor() {
            super();
            this.reportSettings = this.createReportSettings();
            this.RestoreFilter();
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "filterModel": {},
                "reportModel": {},
            });
        }

        protected get FilterName(): string {
            return "reportFilter";
        }

        public SaveFilter(): void {
            window.localStorage.setItem(this.FilterName, this.getSaveFilter());
        }

        protected getSaveFilter(): string {
            return JSON.stringify(this.Filter);
        }

        public RestoreFilter(): void {
            let filter: Interfaces.Model.IReportFilter;
            let saved: any = window.localStorage.getItem(this.FilterName);
            if (!saved || saved === "\"{}\"") {
                filter = this.getDefaultFilter();
            }
            else
                filter = JSON.parse(saved);
            this.Model.set("filterModel", filter);
           // this.Filter = filter;
        }

        protected getDefaultFilter(): Interfaces.Model.IReportFilter {
            return undefined;
        }

        public get Filter(): Interfaces.Model.IReportFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportFilter;
        }

        public set Filter(filter: Interfaces.Model.IReportFilter) {
            this.Model.set("filterModel", filter);
        }

        protected createReportSettings(): Interfaces.IReportSettings {
            return { Columns: this.Columns };
        }

        private reportSettings: Interfaces.IReportSettings;
        public get ReportSettings(): Interfaces.IReportSettings {
            return this.reportSettings;
        }


        public get Columns(): Interfaces.IReportColumn[] {
            return this.columns();
        }

        protected columns(): Interfaces.IReportColumn[] {
            return [];
        }

        private tableRow: JQuery;
        private tableHead: JQuery;
        private tableBody: JQuery;

        public ViewInit(view: JQuery): boolean {
            let result: boolean = super.ViewInit(view);
            let controls: Array<JQuery> = [];

            controls.push(this.initTableRow());

            view.append(controls);
            
            this.setupTable();
            return result;
        }

        protected initTableRow(): JQuery {
            let navbarHeader: string = '<div class="row row-table-report">';
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

            return this.tableRow;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            let tbody: JQuery = this.tableBody;
            if (tbody && tbody.length > 0) {
                tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
            }
        }

        public ViewShow(e): boolean {
            return super.ViewShow(e);
        }

        public ViewHide(e: any) {
            this.SaveFilter();
            super.ViewHide(e);
        }

        protected destroyEvents() {
            this.detachSortEvents();
            if (this.rows)
                this.destroyDblTouchClickEvent(this.rows, this.rowClick);
            super.destroyEvents();
        }

        protected buildButtonClick(e) {
            let self = this;
            self.detachSortEvents();
        }

        private rows: JQuery;
        protected setupTable(): void {
            this.detachSortEvents();
            let headerHtml: string = this.getTableHeaderHtml();
            this.tableHead.html(headerHtml);
            this.attachSortEvents();
            this.setupRows();
            //this.createTouchClickEvent(this.rows, this.rowClick);
        }

        protected setupRows(): void {
            //this.selectedRow = null;

            if (this.rows)
                this.destroyDblTouchClickEvent(this.rows, this.rowClick);

            this.tableBody.html(this.getTableBodyHtml());
            let valueSum: number;
            for (let j = 0, jcount = (this.sumFieldsInfo.fields && this.sumFieldsInfo.fields.length ? this.sumFieldsInfo.fields.length : 0); j < jcount; j++) {
                valueSum = this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]];
                this.tableHead.find('#' + this.sumFieldsInfo.fields[j] + '_sum').html(utils.numberToString(valueSum ? valueSum : 0, 2));
            }
            this.rows = this.tableBody.find('tr');
            this.createDblTouchClickEvent(this.rows, this.rowClick);
        }

        private sumFieldsInfo: any;
        protected getTableHeaderHtml(): string {
            let columns: Interfaces.IReportColumn[] = this.ReportSettings.Columns;
            let html: string = '';
            let isSum: boolean = false;

            this.sumFieldsInfo = { fields: [], sumFied: {}, orderfields: [] };

            html += '<tr>';
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                if (columns[i].IsSum && columns[i].IsSum === true)
                    isSum = true;
                html += '   <th';
                if (columns[i].HeaderStyle || columns[i].IsOrder === true) {
                    if (columns[i].IsOrder === true) {
                        html += ' id="sort_' + i + '"';
                    }

                    html += ' class="';
                    if (columns[i].HeaderStyle)  html += columns[i].HeaderStyle;
                    if (columns[i].IsOrder === true) {
                        this.sumFieldsInfo.orderfields.push({ field: columns[i].Field, typeSort: 0, index: i });
                        html += (columns[i].HeaderStyle ? ' ' : '') + 'ccursor';
                    }
                    html += '"';
                }
                html += '>';
                html += (columns[i].HeaderTemplate ? columns[i].HeaderTemplate : columns[i].Header);
                html += '</th>';
            }
            html += '</tr>';

            if (isSum === true) {
                html += '<tr>';
                for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    html += '   <th';
                    if (columns[i].IsSum === true) {
                        html += (' id="' + columns[i].Field + '_sum"');
                        this.sumFieldsInfo.fields.push(columns[i].Field);
                        this.sumFieldsInfo.sumFied[columns[i].Field] = 0;
                    }
                    if (columns[i].HeaderStyle || columns[i].IsOrder === true) {
                        html += ' class="';
                        html += columns[i].HeaderStyle;
                        html += '"';
                    }
                    html += '>';
                    if (columns[i].IsSum === true) {
                        html += '0.00';
                    }
                    html += '</th>';
                }
                html += '</tr>';
            }

            return html;
        }

        protected attachSortEvents(): void {
            let columns: Interfaces.IReportColumn[] = this.ReportSettings.Columns;
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                if (columns[i].IsOrder === true) {
                    let strId: string = 'sort_' + i;
                    this.createTouchClickEvent(strId, this.sortButtonClick);
                }
            }
        }

        protected detachSortEvents(): void {
            let columns: Interfaces.IReportColumn[] = this.ReportSettings.Columns;
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                if (columns[i].IsOrder === true) {
                    let strId: string = 'sort_' + i;
                    this.destroyTouchClickEvent(strId, this.sortButtonClick);
                }
            }
        }

        protected getTableRowTemplate(): string {
            let setting: Interfaces.IReportSettings = this.ReportSettings;
            let columns: Interfaces.IReportColumn[] = setting.Columns;
            let html: string = '';

            html += '<tr id="table-row-#=rowtmpitem#">';

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
            let data: Interfaces.Model.IReportModel[] = this.Model.get("reportModel");

            if (data && data.length > 0) {
                let templateRow = vars.getTemplate(this.getTableRowTemplate());
                if (templateRow) {
                    for (let i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                        data[i]["rowtmpitem"] = i;
                        html += templateRow(data[i]);
                        for (let j = 0, jcount = (this.sumFieldsInfo.fields && this.sumFieldsInfo.fields.length ? this.sumFieldsInfo.fields.length : 0); j < jcount; j++) {
                            if (i === 0)
                                this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]] = data[i][this.sumFieldsInfo.fields[j]];
                            else
                                this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]] += data[i][this.sumFieldsInfo.fields[j]];
                        }
                    }
                }
            }
            return html;
        }

        
        private rowClick(e) {
            this.OnDetalize(e);
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        protected OnDetalize(e) {

        }

        private sortButtonClick(e) {
            let self = this;
            let strId: string = e.currentTarget.id;
            strId = strId.replace('sort_', '');
            let i: number = +strId;
            let setting: Interfaces.IReportSettings = self.ReportSettings;
            let columns: Interfaces.IReportColumn[] = setting.Columns;

            let orderfields = [];
            let colName: string = columns[i].Field;
            orderfields = self.sumFieldsInfo.orderfields;
            //orderfields.push({ field: columns[i].Field, typeSort: 0, index: i });
            orderfields.filter(x => x.field == colName)
            var findResult = $.grep(orderfields, function (x) { return x.field == colName; });
            let typeSort: number = 0;
            if (findResult && findResult.length > 0) {
                typeSort = findResult[0].typeSort;
            }

            let colNameSplit: Array<string> = colName.split('.');

            let data: Interfaces.Model.IReportModel[] = this.Model.get("reportModel");
            if (columns[i].IsSum === true) {
                data.sort(function (a, b: any) {
                    let aval: any = a[colNameSplit[0]];
                    for (let i = 1, icount = colNameSplit.length; i < icount; i++) aval = aval[colNameSplit[i]];
                    let bval: any = b[colNameSplit[0]];
                    for (let i = 1, icount = colNameSplit.length; i < icount; i++) bval = bval[colNameSplit[i]];
                    return (typeSort === 0 || typeSort === 2 ? aval - bval : bval - aval);
                });
            }
            else {
                data.sort(function (a, b: any) {
                    let aval: any = a[colNameSplit[0]];
                    for (let i = 1, icount = colNameSplit.length; i < icount; i++) aval = aval[colNameSplit[i]];
                    let bval: any = b[colNameSplit[0]];
                    for (let i = 1, icount = colNameSplit.length; i < icount; i++) bval = bval[colNameSplit[i]];
                    return (typeSort === 0 || typeSort === 2 ? aval.localeCompare(bval) : bval.localeCompare(aval));
                });

            }
            if (findResult && findResult.length > 0) {
                findResult[0].typeSort = (typeSort === 0 || typeSort === 2 ? 1 : 2);
            }
            self.Model.set("reportModel", data);
            self.setupRows();
        }
    }
}