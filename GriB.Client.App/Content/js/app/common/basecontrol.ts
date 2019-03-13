﻿import utils = require('app/common/utils');
import vars = require('app/common/variables');

export namespace Control {
    export class ReferenceFieldControl {
        constructor() {

        }

        fieldControl: JQuery;
        fieldClearControl: JQuery;
        cardController: string;
        field: string;
        model: kendo.data.ObservableObject;
        public InitControl(view: JQuery, name: string, field: string, fieldout: string, header: string, cardcontroller: string, model: kendo.data.ObservableObject): JQuery {
            let controlHtml: string = '<input id="' + name + '" type="text" disabled class="truncate black-text" data-bind="value: ' + fieldout + '" style="cursor:pointer;font-weight:bold;">';
            controlHtml += '<label for="' + name + '">' + header + '</label>';
            controlHtml += '<i id="' + name + '-clear" class="material-icons editor-header right doc-edit-ref-del">close</i>';

            let result: JQuery = $(controlHtml);

            this.cardController = cardcontroller;
            this.field = field;
            this.model = model;
            this.fieldControl = view;
            this.fieldClearControl = result.find("#" + name + "-clear");

            view.append(result);
            return result;
        }

        public createEvents(): void {
            if (this.fieldControl) this.FieldButtonClick = utils.createTouchClickEvent(this.fieldControl, this.fieldButtonClick, this, this.fieldControl);
            if (this.fieldClearControl) this.FieldClearButtonClick = utils.createTouchClickEvent(this.fieldClearControl, this.fieldClearButtonClick, this, this.fieldControl);

        }

        public destroyEvents(): void {
            if (this.fieldClearControl) utils.destroyTouchClickEvent(this.fieldClearControl, this.FieldClearButtonClick, this.fieldControl);
            if (this.fieldControl) utils.destroyTouchClickEvent(this.fieldControl, this.FieldButtonClick, this.fieldControl);
        }

        public FieldButtonClick: { (e: any): void; };
        private fieldButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: self.cardController, isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlUnit: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlUnit.CardSettings.IsAdd = false;
                    ctrlUnit.CardSettings.IsAddCopy = false;
                    ctrlUnit.CardSettings.IsDelete = false;
                    ctrlUnit.CardSettings.IsEdit = false;
                    ctrlUnit.CardSettings.IsSelect = true;
                    ctrlUnit.OnSelect = $.proxy(self.selectValue, self);
                }
            });
        }

        public SelectValue: { (value: Interfaces.Model.IBaseModel): void; };

        private selectValue(controller: Interfaces.IControllerCard) {
            let value: Interfaces.Model.IBaseModel = controller.getSelectedRecord();
            if (value) {
                if (this.SelectValue)
                    this.SelectValue(value);
                else
                    this.model.set(this.field, value);
            }
            M.updateTextFields();
        }

        public FieldClearButtonClick: { (e: any): void; };
        private fieldClearButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.model.set(this.field, {});
            M.updateTextFields();
            return false;
        }
    }

    export class BaseCardFilterSettings implements Interfaces.Control.ICardFilterSettings {
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

    export class BaseTable implements Interfaces.Control.IControlTable {

        private columns: Interfaces.Control.ITableColumn[] = [];
        public get Columns(): Interfaces.Control.ITableColumn[] {
            return this.columns;
        }

        public set Columns(columns: Interfaces.Control.ITableColumn[]) {
            this.columns = columns;
        }

        private rows: Interfaces.Model.ITableRowModel[];
        public get Rows(): Interfaces.Model.ITableRowModel[] {
            return this.rows;
        }

        public set Rows(rows: Interfaces.Model.ITableRowModel[]) {
            this.rows = rows;
        }

        private isScroll: boolean = true;
        public get IsScroll(): boolean {
            return this.isScroll;
        }

        public set IsScroll(isScroll: boolean) {
            this.isScroll = isScroll;
        }

        protected tableControl: JQuery;
        protected tableHead: JQuery;
        protected tableBody: JQuery;
        protected tableRows: JQuery;

        public get TableBody(): JQuery {
            return this.tableBody;
        }

        public InitView(): JQuery {
            this.SortButtonClick = $.proxy(this.sortButtonClick, this);
            this.RowDoubleClick = $.proxy(this.rowDoubleClick, this);
         
            let htmlTable: string = '<table class="highlight">';
            htmlTable += '   <thead></thead>';
            htmlTable += '   <tbody></tbody>';
            htmlTable += '</table>';
            this.tableControl = $(htmlTable);
            this.tableHead = this.tableControl.find('thead');
            this.tableBody = this.tableControl.find('tbody');

         
            return this.tableControl;
        }

        public DestroyView() {
            this.detachSortEvents();
            this.destroyRowsEvents();
           
        }

        public Setup(): void {
            this.detachSortEvents();
            let headerHtml: string = this.getTableHeaderHtml();
            this.tableHead.html(headerHtml);
            if (this.tableBody) {
                if (this.IsScroll === true) {
                    if (this.tableBody.hasClass("scroll-y") === false)
                        this.tableBody.addClass("scroll-y");
                }
                else
                    this.tableBody.removeClass("scroll-y");
            }
            this.attachSortEvents();
            this.setupRows();

        }

        protected createRowsEvents() {
            utils.createDblTouchClickEvent(this.tableRows, this.RowDoubleClick, this, this.tableBody);
        }

        protected destroyRowsEvents() {
            if (this.tableRows)
                utils.destroyDblTouchClickEvent(this.tableRows, this.RowDoubleClick, this.tableBody);
        }

        protected setupRows(): void {
            this.destroyRowsEvents();

            this.tableBody.html(this.getTableBodyHtml());
            let valueSum: number;
            for (let j = 0, jcount = (this.sumFieldsInfo.fields && this.sumFieldsInfo.fields.length ? this.sumFieldsInfo.fields.length : 0); j < jcount; j++) {
                valueSum = this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]];
                this.tableHead.find('#' + this.sumFieldsInfo.fields[j] + '_sum').html(utils.numberToString(valueSum ? valueSum : 0, 2));
            }
            this.tableRows = this.tableBody.find('tr');

            this.createRowsEvents();
           
        }

        protected sumFieldsInfo: any;

        protected getTableHeaderHtml(): string {
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;
            let html: string = '';
            this.sumFieldsInfo = { fields: [], sumFied: {}, orderfields: [] };
            let knSupport: any = kendo;

            html += '<tr>';
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                html += '   <th';

                if (columns[i].HeaderStyle || columns[i].IsOrder === true) {
                    if (columns[i].IsOrder === true) {
                        html += ' id="sort_' + i + '"';
                    }

                    html += ' class="';
                    if (columns[i].HeaderStyle) html += columns[i].HeaderStyle;
                    if (columns[i].IsOrder === true) {
                        this.sumFieldsInfo.orderfields.push({ field: columns[i].Field, typeSort: 0, index: i });
                        html += (columns[i].HeaderStyle ? ' ' : '') + 'ccursor';
                    }
                    html += '"';
                }
                if (columns[i].HeaderColSpan) {
                    html += ' colspan="' + columns[i].HeaderColSpan + '"';
                }
                html += '>';
                html += (columns[i].HeaderTemplate ? columns[i].HeaderTemplate : columns[i].Header);
                if (columns[i].IsSum && columns[i].IsSum === true) {
                    html += ('<br/><span id="' + columns[i].Field + '_sum">0.00</span>');
                    this.sumFieldsInfo.fields.push(columns[i].Field);
                    this.sumFieldsInfo.sumFied[columns[i].Field] = 0;
                }
                html += '</th>';
                //if (columns[i].HeaderColSpan) {
                //    i = i + (columns[i].HeaderColSpan - 1);
                //}
            }
            if (this.IsScroll === true)
                html += '<th style="width:' + (knSupport.support.browser.chrome === true ? "17" : "17") + 'px;"></th>';
            html += '</tr>';

            return html;
        }


        protected attachSortEvents(): void {
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                if (columns[i].IsOrder === true) {
                    let strId: string = 'sort_' + i;
                    utils.createTouchClickEvent(strId, this.SortButtonClick, this, this.tableHead);
                }
            }
        }


        protected detachSortEvents(): void {
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;
            for (let i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                if (columns[i].IsOrder === true) {
                    let strId: string = 'sort_' + i;
                    utils.destroyTouchClickEvent(strId, this.SortButtonClick, this.tableHead);
                }
            }
        }

        protected getTableRowTemplate(): string {
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;
            let html: string = '';

            html += '<tr id="table-row-#=rowtmpitem#">';

            for (let i = 0, icount = (columns && columns.length ? columns.length : 0); i < icount; i++) {
                html += '   <td';
                if (columns[i].FieldStyle || this.OnDetalize) {
                    html += ' class="';
                    if (columns[i].FieldStyle) {
                        html += columns[i].FieldStyle;
                    }
                    if (this.OnDetalize) {
                        html += ' ccursor';
                    }
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
            let data: Interfaces.Model.ITableRowModel[] = this.Rows;

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

        private RowDoubleClick: { (e: any): void; };
        private rowDoubleClick(e) {
            if (this.OnDetalize) {
                let index: number = +e.currentTarget.id.replace('table-row-', '');
                let row: Interfaces.Model.ITableRowModel = this.Rows[index];
                this.OnDetalize(row);
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

       
        public OnDetalize: { (row: Interfaces.Model.ITableRowModel): void; };

        private SortButtonClick: { (e: any): void; };
        protected sortButtonClick(e) {
            let self = this;
            let strId: string = e.currentTarget.id;
            strId = strId.replace('sort_', '');
            let i: number = +strId;
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;

            let orderfields = [];
            let colName: string = columns[i].Field;
            let isSum: boolean = columns[i].IsSum;
            let isNum: boolean = columns[i].IsNumber;
            orderfields = self.sumFieldsInfo.orderfields;

            orderfields.filter(x => x.field == colName)
            var findResult = $.grep(orderfields, function (x) { return x.field == colName; });
            let typeSort: number = 0;
            if (findResult && findResult.length > 0) {
                typeSort = findResult[0].typeSort;
            }

            let colNameSplit: Array<string> = colName.split('.');

            let data: Interfaces.Model.ITableRowModel[] = this.Rows;
            if (isNum == true || isSum === true) {
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
            self.Rows = data;
            self.setupRows();
        }
    }


    export class BaseEditTable extends BaseTable implements Interfaces.Control.IControlEditTable {

        public InitView(): JQuery {
            let result: JQuery = super.InitView();
            this.RowHeaderContextClick = $.proxy(this.rowHeaderContextClick, this);
            this.RowContextClick = $.proxy(this.rowContextClick, this);

            if (this.tableHead) {
                this.tableHead.addClass("ccursor");
                utils.createContextMenuEvent(this.tableHead, this.RowHeaderContextClick, this, result);
            }
            return result;
        }

        public DestroyView() {
            if (this.tableHead)
                utils.destroyContextMenuEvent(this.tableHead, this.RowHeaderContextClick, this.tableControl);
            if (!this.rowEditControl) {
                this.rowEditModel.unbind("change");
            }
            super.DestroyView();
        }

        protected createRowsEvents() {
            super.createRowsEvents();
            if (this.tableRows)
                utils.createContextMenuEvent(this.tableRows, this.RowContextClick, this, this.tableBody);
        }

        protected destroyRowsEvents() {
            if (this.tableRows)
                utils.destroyContextMenuEvent(this.tableRows, this.RowContextClick, this.tableBody);
            super.destroyRowsEvents();
        }

        public RowHeaderContextClick: { (e: any): void; };
        private rowHeaderContextClick(e) {
            if (this.OnHeaderContextMenu) {
                this.OnHeaderContextMenu(e);
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }


        public RowContextClick: { (e: any): void; };
        private rowContextClick(e) {
            if (this.OnContextMenu) {
                let index: number = +e.currentTarget.id.replace('table-row-', '');
                let row: Interfaces.Model.ITableRowModel = this.Rows[index];
                this.OnContextMenu(e, row);
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        public OnHeaderContextMenu: { (e: any): void; };
        public OnContextMenu: { (e: any, row: Interfaces.Model.ITableRowModel): void; };

        protected getTableEditRowTemplate(): string {
            let columns: Interfaces.Control.ITableColumn[] = this.Columns;
            let html: string = '';

            html += '<tr id="table-row-edit">';

            for (let i = 0, icount = (columns && columns.length ? columns.length : 0); i < icount; i++) {
                html += '   <td';
                if (columns[i].FieldEditStyle || columns[i].FieldStyle) {
                    html += ' class="';
                    if (columns[i].FieldEditStyle) {
                        html += columns[i].FieldEditStyle;
                    }
                    else if (columns[i].FieldStyle) {
                        html += columns[i].FieldStyle;
                    }
                    html += '"';
                }
                html += '>';
                if (columns[i].FieldEditTemplate)
                    html += columns[i].FieldEditTemplate;
                else if (columns[i].FieldTemplate)
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

        protected createEditRowModel(): kendo.data.ObservableObject {
            let model: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "editRowModel": {},
            });
            return model;
        }


        private rowEditControl: JQuery;
        private rowConrol: JQuery;
        private rowEditModel: kendo.data.ObservableObject;
        public EditRow(rowModel: Interfaces.Model.ITableRowModel, rowConrol: JQuery) {
            if (!this.rowEditControl) {
                let templateRow = vars.getTemplate(this.getTableEditRowTemplate());
                if (templateRow) {
                    let html = templateRow(rowModel);
                    this.rowEditControl = $(html);
                    this.rowEditModel = new kendo.data.ObservableObject({ "editRowModel": rowModel });

                    kendo.bind(this.rowEditControl, this.rowEditModel);
                    this.rowEditModel.bind("change", $.proxy(this.changeEditRowModel, this));
                }

            }
            else {
                this.rowEditModel.set("editRowModel", rowModel);
            }
            this.rowConrol = rowConrol;
            rowConrol.replaceWith(this.rowEditControl);
            //html += templateRow(data[i]);
        }

        private changeEditRowModel(e: any): void {
        }

    }
}