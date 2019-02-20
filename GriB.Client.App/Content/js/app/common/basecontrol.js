define(["require", "exports", "app/common/utils", "app/common/variables"], function (require, exports, utils, vars) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Control;
    (function (Control) {
        var BaseCardFilterSettings = /** @class */ (function () {
            function BaseCardFilterSettings(setupRows) {
                this.fieldSearch = "name";
                this.setupRows = setupRows;
            }
            BaseCardFilterSettings.prototype.saveFilter = function () {
                throw new Error("Method not implemented.");
            };
            BaseCardFilterSettings.prototype.restoreFilter = function () {
                throw new Error("Method not implemented.");
            };
            Object.defineProperty(BaseCardFilterSettings.prototype, "FieldSearch", {
                get: function () {
                    return this.fieldSearch;
                },
                set: function (val) {
                    this.fieldSearch = val;
                },
                enumerable: true,
                configurable: true
            });
            BaseCardFilterSettings.prototype.InitControls = function () {
                var navbarHeader = '<nav class="card-search-nav editor-header z-depth-1">';
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
            };
            BaseCardFilterSettings.prototype.ViewControls = function () {
            };
            BaseCardFilterSettings.prototype.ResizeControls = function () {
            };
            BaseCardFilterSettings.prototype.createEvents = function () {
                if (this.clearSearch)
                    this.ClearButtonClick = utils.createTouchClickEvent(this.clearSearch, this.clearButtonClick, this);
                if (this.formSearch) {
                    this.proxySearch = $.proxy(this.search, this);
                    this.formSearch.on('submit', this.proxySearch);
                }
            };
            BaseCardFilterSettings.prototype.search = function (e) {
                e.preventDefault();
                if (this.setupRows)
                    this.setupRows();
                return false;
            };
            BaseCardFilterSettings.prototype.destroyEvents = function () {
                if (this.formSearch)
                    this.formSearch.off('submit', this.proxySearch);
                if (this.clearSearch)
                    utils.destroyTouchClickEvent(this.clearSearch, this.ClearButtonClick);
            };
            BaseCardFilterSettings.prototype.clearButtonClick = function (e) {
                if (this.inputSearch)
                    this.inputSearch.val("");
                if (this.setupRows)
                    this.setupRows();
            };
            BaseCardFilterSettings.prototype.GetItemsForView = function (data) {
                var result = [];
                var strSearch = (this.inputSearch ? this.inputSearch.val() : ""); // ($("#card-view-search").val() as string);
                var fieldSearch = this.FieldSearch;
                var isNotSearch = (utils.isNullOrEmpty(fieldSearch) || utils.isNullOrEmpty(strSearch));
                if (!isNotSearch)
                    strSearch = strSearch.toLowerCase();
                for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                    if (isNotSearch) {
                        result.push(data[i]);
                    }
                    else if (data[i][fieldSearch].toLowerCase().indexOf(strSearch) > -1) {
                        result.push(data[i]);
                    }
                }
                return result;
            };
            return BaseCardFilterSettings;
        }());
        Control.BaseCardFilterSettings = BaseCardFilterSettings;
        var BaseTable = /** @class */ (function () {
            function BaseTable() {
                this.columns = [];
            }
            Object.defineProperty(BaseTable.prototype, "Columns", {
                get: function () {
                    return this.columns;
                },
                set: function (columns) {
                    this.columns = columns;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseTable.prototype, "Rows", {
                get: function () {
                    return this.rows;
                },
                set: function (rows) {
                    this.rows = rows;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseTable.prototype, "TableBody", {
                get: function () {
                    return this.tableBody;
                },
                enumerable: true,
                configurable: true
            });
            BaseTable.prototype.InitView = function () {
                this.SortButtonClick = $.proxy(this.sortButtonClick, this);
                this.RowClick = $.proxy(this.rowClick, this);
                var htmlTable = '<table class="highlight">';
                htmlTable += '   <thead></thead>';
                htmlTable += '   <tbody style="overflow-y: scroll;"></tbody>';
                htmlTable += '</table>';
                this.tableControl = $(htmlTable);
                this.tableHead = this.tableControl.find('thead');
                this.tableBody = this.tableControl.find('tbody');
                return this.tableControl;
            };
            BaseTable.prototype.DestroyView = function () {
                this.detachSortEvents();
                if (this.rows)
                    utils.destroyDblTouchClickEvent(this.tableRows, this.RowClick, this.tableControl);
            };
            BaseTable.prototype.Setup = function () {
                this.detachSortEvents();
                var headerHtml = this.getTableHeaderHtml();
                this.tableHead.html(headerHtml);
                this.attachSortEvents();
                this.setupRows();
            };
            BaseTable.prototype.setupRows = function () {
                if (this.tableRows)
                    utils.destroyDblTouchClickEvent(this.tableRows, this.RowClick, this.tableBody);
                this.tableBody.html(this.getTableBodyHtml());
                var valueSum;
                for (var j = 0, jcount = (this.sumFieldsInfo.fields && this.sumFieldsInfo.fields.length ? this.sumFieldsInfo.fields.length : 0); j < jcount; j++) {
                    valueSum = this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]];
                    this.tableHead.find('#' + this.sumFieldsInfo.fields[j] + '_sum').html(utils.numberToString(valueSum ? valueSum : 0, 2));
                }
                this.tableRows = this.tableBody.find('tr');
                utils.createDblTouchClickEvent(this.tableRows, this.RowClick, this.tableBody);
            };
            BaseTable.prototype.getTableHeaderHtml = function () {
                var columns = this.Columns;
                var html = '';
                this.sumFieldsInfo = { fields: [], sumFied: {}, orderfields: [] };
                var knSupport = kendo;
                html += '<tr>';
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    html += '   <th';
                    if (columns[i].HeaderStyle || columns[i].IsOrder === true) {
                        if (columns[i].IsOrder === true) {
                            html += ' id="sort_' + i + '"';
                        }
                        html += ' class="';
                        if (columns[i].HeaderStyle)
                            html += columns[i].HeaderStyle;
                        if (columns[i].IsOrder === true) {
                            this.sumFieldsInfo.orderfields.push({ field: columns[i].Field, typeSort: 0, index: i });
                            html += (columns[i].HeaderStyle ? ' ' : '') + 'ccursor';
                        }
                        html += '"';
                    }
                    html += '>';
                    html += (columns[i].HeaderTemplate ? columns[i].HeaderTemplate : columns[i].Header);
                    if (columns[i].IsSum && columns[i].IsSum === true) {
                        html += ('<br/><span id="' + columns[i].Field + '_sum">0.00</span>');
                        this.sumFieldsInfo.fields.push(columns[i].Field);
                        this.sumFieldsInfo.sumFied[columns[i].Field] = 0;
                    }
                    html += '</th>';
                }
                html += '<th style="width:' + (knSupport.support.browser.chrome === true ? "18" : "17") + 'px;"></th>';
                html += '</tr>';
                return html;
            };
            BaseTable.prototype.attachSortEvents = function () {
                var columns = this.Columns;
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    if (columns[i].IsOrder === true) {
                        var strId = 'sort_' + i;
                        utils.createTouchClickEvent(strId, this.SortButtonClick, this.tableHead);
                    }
                }
            };
            BaseTable.prototype.detachSortEvents = function () {
                var columns = this.Columns;
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    if (columns[i].IsOrder === true) {
                        var strId = 'sort_' + i;
                        utils.destroyTouchClickEvent(strId, this.SortButtonClick, this.tableHead);
                    }
                }
            };
            BaseTable.prototype.getTableRowTemplate = function () {
                var columns = this.Columns;
                var html = '';
                html += '<tr id="table-row-#=rowtmpitem#">';
                for (var i = 0, icount = (columns && columns.length ? columns.length : 0); i < icount; i++) {
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
            };
            BaseTable.prototype.getTableBodyHtml = function () {
                var html = '';
                var data = this.Rows;
                if (data && data.length > 0) {
                    var templateRow = vars.getTemplate(this.getTableRowTemplate());
                    if (templateRow) {
                        for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                            data[i]["rowtmpitem"] = i;
                            html += templateRow(data[i]);
                            for (var j = 0, jcount = (this.sumFieldsInfo.fields && this.sumFieldsInfo.fields.length ? this.sumFieldsInfo.fields.length : 0); j < jcount; j++) {
                                if (i === 0)
                                    this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]] = data[i][this.sumFieldsInfo.fields[j]];
                                else
                                    this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]] += data[i][this.sumFieldsInfo.fields[j]];
                            }
                        }
                    }
                }
                return html;
            };
            BaseTable.prototype.rowClick = function (e) {
                if (this.OnDetalize) {
                    var index = +e.currentTarget.id.replace('table-row-', '');
                    var row = this.Rows[index];
                    this.OnDetalize(row);
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
            BaseTable.prototype.sortButtonClick = function (e) {
                var self = this;
                var strId = e.currentTarget.id;
                strId = strId.replace('sort_', '');
                var i = +strId;
                var columns = this.Columns;
                var orderfields = [];
                var colName = columns[i].Field;
                orderfields = self.sumFieldsInfo.orderfields;
                orderfields.filter(function (x) { return x.field == colName; });
                var findResult = $.grep(orderfields, function (x) { return x.field == colName; });
                var typeSort = 0;
                if (findResult && findResult.length > 0) {
                    typeSort = findResult[0].typeSort;
                }
                var colNameSplit = colName.split('.');
                var data = this.Rows;
                if (columns[i].IsSum === true) {
                    data.sort(function (a, b) {
                        var aval = a[colNameSplit[0]];
                        for (var i_1 = 1, icount = colNameSplit.length; i_1 < icount; i_1++)
                            aval = aval[colNameSplit[i_1]];
                        var bval = b[colNameSplit[0]];
                        for (var i_2 = 1, icount = colNameSplit.length; i_2 < icount; i_2++)
                            bval = bval[colNameSplit[i_2]];
                        return (typeSort === 0 || typeSort === 2 ? aval - bval : bval - aval);
                    });
                }
                else {
                    data.sort(function (a, b) {
                        var aval = a[colNameSplit[0]];
                        for (var i_3 = 1, icount = colNameSplit.length; i_3 < icount; i_3++)
                            aval = aval[colNameSplit[i_3]];
                        var bval = b[colNameSplit[0]];
                        for (var i_4 = 1, icount = colNameSplit.length; i_4 < icount; i_4++)
                            bval = bval[colNameSplit[i_4]];
                        return (typeSort === 0 || typeSort === 2 ? aval.localeCompare(bval) : bval.localeCompare(aval));
                    });
                }
                if (findResult && findResult.length > 0) {
                    findResult[0].typeSort = (typeSort === 0 || typeSort === 2 ? 1 : 2);
                }
                self.rows = data;
                self.setupRows();
            };
            return BaseTable;
        }());
        Control.BaseTable = BaseTable;
    })(Control = exports.Control || (exports.Control = {}));
});
//# sourceMappingURL=basecontrol.js.map