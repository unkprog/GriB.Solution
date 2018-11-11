var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/utils", "app/common/variables", "./variables"], function (require, exports, utils, vars, variables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Base = /** @class */ (function () {
            function Base() {
                this._options = this.createOptions();
                this._model = this.createModel();
            }
            Base.prototype.createOptions = function () {
                return {
                    Url: "",
                    Id: ""
                };
            };
            Object.defineProperty(Base.prototype, "Options", {
                get: function () {
                    return this._options;
                },
                enumerable: true,
                configurable: true
            });
            Base.prototype.createModel = function () {
                return new kendo.data.ObservableObject({
                    "Header": ""
                });
            };
            Object.defineProperty(Base.prototype, "Model", {
                get: function () {
                    return this._model;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Base.prototype, "View", {
                get: function () {
                    return this._view;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Base.prototype, "Header", {
                get: function () {
                    return this._model ? this._model.get("Header") : "";
                },
                enumerable: true,
                configurable: true
            });
            Base.prototype.ViewInit = function (view) {
                this._view = view;
                kendo.bind(view, this._model);
                this.createEvents();
                return true;
            };
            Base.prototype.createEvents = function () {
            };
            Base.prototype.ViewShow = function (e) {
                M.updateTextFields();
                return true;
            };
            //public AfterShow(e: any): void {
            //}
            Base.prototype.ViewHide = function (e) {
                this.destroyEvents();
            };
            Base.prototype.destroyEvents = function () {
            };
            Base.prototype.ViewResize = function (e) {
            };
            Base.prototype.createClickEvent = function (elemName, clickFunc /*, controller: Interfaces.IController*/) {
                return utils.createClickEvent(elemName, clickFunc, this, this.View);
            };
            Base.prototype.createKeyPress = function (elemName, clickFunc, controller) {
                var result = $.proxy(clickFunc, controller);
                $.each(elemName, function (index, el) {
                    var $inp = $("#" + el);
                    if ($inp.length > 0) {
                        $inp[0].addEventListener("keypress", result, false);
                    }
                });
                return result;
            };
            Base.prototype.destroyClickEvent = function (elemName, proxyFunc) {
                utils.destroyClickEvent(elemName, proxyFunc, this.View);
            };
            Base.prototype.deleteKeyPress = function (elemName, proxyFunc) {
                $.each(elemName, function (index, el) {
                    var $inp = $("#" + el);
                    if ($inp.length > 0)
                        $inp[0].removeEventListener("keypress", proxyFunc);
                });
            };
            return Base;
        }());
        Controller.Base = Base;
        var ControllersStack = /** @class */ (function () {
            function ControllersStack() {
                this._controllers = [];
            }
            Object.defineProperty(ControllersStack.prototype, "Current", {
                get: function () {
                    return this._current;
                },
                enumerable: true,
                configurable: true
            });
            ControllersStack.prototype.Pop = function () {
                if (this._controllers.length > 0)
                    this._current = this._controllers.pop();
                else
                    this._current = undefined;
            };
            ControllersStack.prototype.Push = function (controller) {
                var self = this;
                if (controller) {
                    self._controllers.push(controller);
                    history.pushState({}, '');
                }
                else
                    self._controllers = [];
            };
            return ControllersStack;
        }());
        Controller.ControllersStack = ControllersStack;
        var BaseContent = /** @class */ (function (_super) {
            __extends(BaseContent, _super);
            function BaseContent() {
                var _this = _super.call(this) || this;
                _this._controllersStack = new ControllersStack();
                _this.ControllerBack = $.proxy(_this.controllerBack, _this);
                _this._controllers = _this.ControllersInit();
                return _this;
            }
            BaseContent.prototype.ControllersInit = function () {
                return {};
            };
            BaseContent.prototype.GetContent = function () {
                return null;
            };
            BaseContent.prototype.ViewInit = function (view) {
                var result = _super.prototype.ViewInit.call(this, view);
                this._content = this.GetContent();
                return result;
            };
            BaseContent.prototype.ViewResize = function (e) {
                if (this._content) {
                    var heigth = window.innerHeight;
                    heigth = heigth - this._content.offset().top;
                    this._content.height(heigth);
                }
                if (this._controller)
                    this._controller.ViewResize(e);
            };
            BaseContent.prototype.controllerBack = function (e) {
                this._controllersStack.Pop();
                this.RestoreController();
            };
            BaseContent.prototype.RestoreController = function () {
                if (this._controllersStack.Current)
                    this.OpenView({ controller: this._controllersStack.Current, isRestore: true });
            };
            BaseContent.prototype.OpenController = function (options) {
                variables_1._app.OpenController(options);
            };
            BaseContent.prototype.OpenView = function (options) {
                var self = this;
                if (options.isModal && options.isModal === true) {
                    variables_1._app.OpenViewModal(options);
                    return;
                }
                if ($("#" + options.controller.Options.Id).length > 0)
                    return; //Already loaded and current
                variables_1._app.ShowLoading();
                $.when($.ajax({ url: options.controller.Options.Url, cache: false })).done(function (template) {
                    self.OpenViewTemplate({ controller: options.controller, template: template, backController: options.backController, isRestore: options.isRestore });
                }).fail(function (e) {
                    variables_1._app.HideLoading();
                });
            };
            BaseContent.prototype.OpenViewTemplate = function (options) {
                var self = this;
                var isInit = false;
                try {
                    if (self._controller)
                        self._controller.ViewHide(this);
                    self._controller = options.controller;
                    if (!options.isRestore)
                        self._controllersStack.Push(options.backController);
                    self.SetHeader(self._controller);
                    try {
                        var view = $(options.template);
                        isInit = self._controller.ViewInit(view);
                        self._content.html(view[0]);
                        isInit = isInit && self._controller.ViewShow(this);
                        //self._controller.ViewResize(this);
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                finally {
                    if (isInit)
                        variables_1._app.HideLoading();
                }
            };
            BaseContent.prototype.SetHeader = function (controller) {
                //TODO: Пока не заморачиваемся с заголовком
                //let header = controller.Header;
                //if (header)
                //    self._model.set("AppHeader", header); // + ' ' + self.contentControl.width()
                //else
                //    if ("POS Cloud" !== self._model.get("AppHeader"))
                //        self._model.set("AppHeader", "POS Cloud");
            };
            return BaseContent;
        }(Base));
        Controller.BaseContent = BaseContent;
        var BaseEditor = /** @class */ (function (_super) {
            __extends(BaseEditor, _super);
            function BaseEditor() {
                var _this = _super.call(this) || this;
                _this.editorSettings = _this.createEditorSettings();
                return _this;
            }
            BaseEditor.prototype.createModel = function () {
                return new kendo.data.ObservableObject({
                    "Header": "",
                    "editModel": {},
                });
            };
            Object.defineProperty(BaseEditor.prototype, "EditorModel", {
                get: function () {
                    return this.Model.get("editModel").toJSON();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseEditor.prototype, "EditorSettings", {
                get: function () {
                    return this.editorSettings;
                },
                enumerable: true,
                configurable: true
            });
            BaseEditor.prototype.createEditorSettings = function () {
                return { EditIdName: "", Load: undefined, Save: undefined };
            };
            BaseEditor.prototype.ViewInit = function (view) {
                var navbarHeader = '<div class="navbar-fixed editor-header z-depth-1">';
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
                _super.prototype.ViewInit.call(this, view);
                return this.loadData();
            };
            BaseEditor.prototype.ViewHide = function (e) {
                _super.prototype.ViewHide.call(this, e);
                if (this.btnSave)
                    this.btnSave.remove();
                if (this.btnCancel)
                    this.btnCancel.remove();
            };
            BaseEditor.prototype.createEvents = function () {
                this.SaveButtonClick = this.createClickEvent(this.btnSave, this.saveButtonClick);
                this.CancelButtonClick = this.createClickEvent(this.btnCancel, this.cancelButtonClick);
            };
            BaseEditor.prototype.destroyEvents = function () {
                this.destroyClickEvent(this.btnSave, this.SaveButtonClick);
                this.destroyClickEvent(this.btnSave, this.CancelButtonClick);
            };
            BaseEditor.prototype.saveButtonClick = function (e) {
                if (this.validate()) {
                    this.Save();
                }
            };
            BaseEditor.prototype.cancelButtonClick = function (e) {
                this.Cancel();
                variables_1._main.ControllerBack(e);
            };
            BaseEditor.prototype.loadData = function () {
                var controller = this;
                if (controller.EditorSettings && controller.EditorSettings.Load) {
                    var id = (vars._editorData[controller.EditorSettings.EditIdName] ? vars._editorData[controller.EditorSettings.EditIdName] : 0);
                    controller.EditorSettings.Load(id, function (responseData) {
                        controller.Model.set("editModel", responseData.record);
                        controller.afterLoad(responseData);
                        controller.endLoad();
                    });
                    return false;
                }
                controller.afterLoad();
                controller.endLoad();
                return true;
            };
            BaseEditor.prototype.afterLoad = function (responseData) {
            };
            BaseEditor.prototype.endLoad = function () {
                M.updateTextFields();
                variables_1._app.HideLoading();
                this.View.show();
            };
            BaseEditor.prototype.validate = function () {
                return true;
            };
            BaseEditor.prototype.endSave = function () {
                variables_1._main.ControllerBack(this);
            };
            BaseEditor.prototype.getSaveModel = function () {
                return this.EditorModel;
            };
            BaseEditor.prototype.Save = function () {
                var controller = this;
                if (controller.EditorSettings && controller.EditorSettings.Save) {
                    var model = controller.getSaveModel();
                    controller.EditorSettings.Save(model, function (responseData) {
                        controller.endSave();
                    });
                    return;
                }
                controller.endSave();
            };
            BaseEditor.prototype.Cancel = function () {
            };
            return BaseEditor;
        }(Base));
        Controller.BaseEditor = BaseEditor;
        var BaseCard = /** @class */ (function (_super) {
            __extends(BaseCard, _super);
            function BaseCard() {
                var _this = _super.call(this) || this;
                _this.cardSettings = _this.createCardSettings();
                return _this;
            }
            BaseCard.prototype.createModel = function () {
                return new kendo.data.ObservableObject({
                    "Header": "",
                    "cardModel": [],
                });
            };
            Object.defineProperty(BaseCard.prototype, "CardModel", {
                get: function () {
                    return this.Model.get("cardModel").toJSON();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseCard.prototype, "CardSettings", {
                get: function () {
                    return this.cardSettings;
                },
                enumerable: true,
                configurable: true
            });
            BaseCard.prototype.ViewInit = function (view) {
                var navbarHeader = '<div class="navbar-fixed editor-header z-depth-1">';
                navbarHeader += '        <nav class="editor-header-nav">';
                navbarHeader += '            <div class="nav-wrapper editor-header">';
                navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
                navbarHeader += '                <ul id="cardButtons" class="right"></ul>';
                navbarHeader += '            </div>';
                navbarHeader += '        </nav>';
                navbarHeader += '    </div>';
                this.navHeader = $(navbarHeader);
                if (this.CardSettings.IsEdit)
                    this.btnEdit = $('<li><a id="card-btn-edit" class="editor-header-button"><i class="material-icons editor-header">edit</i></a></li>');
                if (this.CardSettings.IsAdd)
                    this.btnAdd = $('<li><a id="card-btn-add" class="editor-header-button"><i class="material-icons editor-header">add</i></a></li>');
                if (this.CardSettings.IsDelete)
                    this.btnDelete = $('<li><a id="card-btn-delete" class="editor-header-button"><i class="material-icons editor-header">remove</i></a></li>');
                if (this.CardSettings.IsSelect)
                    this.btnSelect = $('<li><a id="editor-btn-select" class="editor-header-button"><i class="material-icons editor-header">done</i></a></li>');
                this.btnClose = $('<li><a id="card-btn-close" class="editor-header-button"><i class="material-icons editor-header">close</i></a></li>');
                var cardButtons = this.navHeader.find("#cardButtons");
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
                navbarHeader = '<div class="row row-table">';
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
                _super.prototype.ViewInit.call(this, view);
                return this.loadData();
            };
            BaseCard.prototype.ViewResize = function (e) {
                _super.prototype.ViewResize.call(this, e);
                var tbody = this.tableBody;
                if (tbody && tbody.length > 0) {
                    tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
                }
            };
            BaseCard.prototype.ViewHide = function (e) {
                _super.prototype.ViewHide.call(this, e);
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
            };
            BaseCard.prototype.createEvents = function () {
                this.EditButtonClick = this.createClickEvent(this.btnEdit, this.editButtonClick);
                this.AddButtonClick = this.createClickEvent(this.btnAdd, this.addButtonClick);
                this.DeleteButtonClick = this.createClickEvent(this.btnDelete, this.deleteButtonClick);
                this.CloseButtonClick = this.createClickEvent(this.btnClose, this.closeButtonClick);
                this.SelectButtonClick = this.createClickEvent(this.btnSelect, this.selectButtonClick);
                this.ClearButtonClick = this.createClickEvent(this.clearSearch, this.clearButtonClick);
                this.proxySearch = $.proxy(this.search, this);
                this.formSearch.on('submit', this.proxySearch);
            };
            BaseCard.prototype.destroyEvents = function () {
                this.formSearch.off('submit', this.proxySearch);
                this.destroyClickEvent(this.clearSearch, this.ClearButtonClick);
                this.destroyClickEvent(this.rows, this.rowClick);
                this.destroyClickEvent(this.btnSelect, this.SelectButtonClick);
                this.destroyClickEvent(this.btnEdit, this.EditButtonClick);
                this.destroyClickEvent(this.btnAdd, this.AddButtonClick);
                this.destroyClickEvent(this.btnDelete, this.DeleteButtonClick);
                this.destroyClickEvent(this.btnClose, this.CloseButtonClick);
            };
            BaseCard.prototype.createCardSettings = function () {
                return { FieldId: "", FieldSearch: "", ValueIdNew: 0, EditIdName: "", IsAdd: false, IsEdit: false, IsDelete: false, IsSelect: false, EditController: "", Load: undefined, Delete: undefined, Columns: [] };
            };
            BaseCard.prototype.setupTable = function () {
                this.tableHead.html(this.getTableHeaderHtml());
                this.setupRows();
                this.rows = this.tableBody.find('tr');
                this.createClickEvent(this.rows, this.rowClick);
            };
            BaseCard.prototype.setupRows = function () {
                this.selectedRow = null;
                if (this.rows)
                    this.destroyClickEvent(this.rows, this.rowClick);
                this.tableBody.html(this.getTableBodyHtml());
                this.rows = this.tableBody.find('tr');
                this.createClickEvent(this.rows, this.rowClick);
            };
            BaseCard.prototype.search = function (e) {
                e.preventDefault();
                this.setupRows();
                return false;
            };
            BaseCard.prototype.getTableHeaderHtml = function () {
                var columns = this.CardSettings.Columns;
                var html = '';
                html += '<tr>';
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
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
            };
            BaseCard.prototype.getTableRowTemplate = function () {
                var setting = this.CardSettings;
                var columns = setting.Columns;
                var html = '';
                html += '<tr';
                if (setting.FieldId) {
                    html += ' id="table-row-#=';
                    html += setting.FieldId;
                    html += '#"';
                }
                html += '>';
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
            BaseCard.prototype.getItemsForView = function () {
                var result = [];
                var data = this.Model.get("cardModel");
                var strSearch = this.inputSearch.val(); // ($("#card-view-search").val() as string);
                var fieldSearch = this.CardSettings.FieldSearch;
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
            BaseCard.prototype.getTableBodyHtml = function () {
                var html = '';
                var data = this.getItemsForView();
                if (data && data.length > 0) {
                    if (!this.templateRow)
                        this.templateRow = kendo.template(this.getTableRowTemplate());
                    for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                        html += this.templateRow(data[i]);
                    }
                }
                return html;
            };
            BaseCard.prototype.rowClick = function (e) {
                if (this.selectedRow)
                    this.selectedRow.removeClass("row-active z-depth-1 brown lighten-5");
                this.selectedRow = $(e.currentTarget);
                if (this.selectedRow)
                    this.selectedRow.addClass("row-active z-depth-1 brown lighten-5");
            };
            BaseCard.prototype.editButtonClick = function (e) {
                if (this.selectedRow) {
                    this.Edit();
                }
            };
            BaseCard.prototype.getSelectedRowId = function () {
                if (this.selectedRow && this.selectedRow.length > 0 && this.selectedRow[0].id) {
                    return this.selectedRow[0].id.replace("table-row-", "");
                }
            };
            BaseCard.prototype.addButtonClick = function (e) {
                this.Add();
            };
            BaseCard.prototype.deleteButtonClick = function (e) {
                this.Delete();
            };
            BaseCard.prototype.selectButtonClick = function (e) {
                var self = this;
                if (this.OnSelect)
                    this.OnSelect(self);
                this.Close();
                variables_1._main.ControllerBack(e);
            };
            BaseCard.prototype.closeButtonClick = function (e) {
                this.Close();
                variables_1._main.ControllerBack(e);
            };
            BaseCard.prototype.clearButtonClick = function (e) {
                this.inputSearch.val("");
                this.setupRows();
            };
            BaseCard.prototype.loadData = function () {
                var controller = this;
                if (this.CardSettings && this.CardSettings.Load) {
                    this.CardSettings.Load(function (responseData) {
                        controller.Model.set("cardModel", responseData);
                        controller.afterLoad();
                    });
                    return false;
                }
                controller.afterLoad();
                return true;
            };
            BaseCard.prototype.afterLoad = function () {
                this.setupTable();
                variables_1._app.HideLoading();
            };
            BaseCard.prototype.Add = function () {
                vars._editorData[this.CardSettings.EditIdName] = this.CardSettings.ValueIdNew;
                vars._app.OpenController({ urlController: this.CardSettings.EditController, backController: this });
            };
            BaseCard.prototype.afterAdd = function () {
            };
            BaseCard.prototype.Edit = function () {
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    if (_id > 0) {
                        vars._editorData[this.CardSettings.EditIdName] = _id;
                        vars._app.OpenController({ urlController: this.CardSettings.EditController, backController: this });
                    }
                }
            };
            BaseCard.prototype.Delete = function () {
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    var controller_1 = this;
                    if (this.CardSettings && this.CardSettings.Delete) {
                        this.CardSettings.Delete(_id, function (responseData) {
                            controller_1.afterDelete();
                        });
                    }
                }
            };
            BaseCard.prototype.afterDelete = function () {
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    var model = this.Model.get("cardModel");
                    for (var i = model.length - 1; i >= 0; i--) {
                        if (model[i].id === _id) {
                            model.splice(i, 1);
                        }
                    }
                    this.setupRows();
                }
            };
            BaseCard.prototype.Close = function () {
            };
            return BaseCard;
        }(Base));
        Controller.BaseCard = BaseCard;
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=basecontroller.js.map