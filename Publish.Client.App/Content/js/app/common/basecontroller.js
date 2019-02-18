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
                get: function () { return this._model ? this._model.get("Header") : ""; },
                set: function (value) { if (this._model)
                    this._model.set("Header", value); },
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
            Base.prototype.createTouchClickEvent = function (elemName, clickFunc) {
                return utils.createTouchClickEvent(elemName, clickFunc, this, this.View);
            };
            Base.prototype.createDblTouchClickEvent = function (elemName, clickFunc) {
                return utils.createDblTouchClickEvent(elemName, clickFunc, this, this.View);
            };
            Base.prototype.createClickEvent = function (elemName, clickFunc) {
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
            Base.prototype.destroyTouchClickEvent = function (elemName, proxyFunc) {
                utils.destroyTouchClickEvent(elemName, proxyFunc, this.View);
            };
            Base.prototype.destroyDblTouchClickEvent = function (elemName, proxyFunc) {
                utils.destroyDblTouchClickEvent(elemName, proxyFunc, this.View);
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
            Object.defineProperty(ControllersStack.prototype, "Last", {
                get: function () {
                    return (this._controllers.length > 0 ? this._controllers[this._controllers.length - 1] : undefined);
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
            BaseContent.prototype.ViewShow = function (e) {
                var result = _super.prototype.ViewShow.call(this, e);
                if (this._controller)
                    this._controller.ViewShow(e);
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
                if (variables_1._app.IsModal)
                    variables_1._app.ControllerBack(e);
                else {
                    this._controllersStack.Pop();
                    this.RestoreController();
                }
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
                    variables_1._app.OpenView(options);
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
                //if (options.isModal && options.isModal === true) {
                //    _app.OpenViewTemplate(options);
                //    return;
                //}
                var isInit = false;
                try {
                    if (self._controller)
                        self._controller.ViewHide(self);
                    self._controller = options.controller;
                    if (!options.isRestore)
                        if (options.backController)
                            self._controllersStack.Push(options.backController);
                    self.SetHeader(self._controller);
                    try {
                        var view = $(options.template);
                        isInit = self._controller.ViewInit(view);
                        self._content.html(view[0]);
                        isInit = self._controller.ViewShow(self) && isInit;
                        self._controller.ViewResize(self);
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
                if (!_this.editorSettings.ButtonSetings)
                    _this.editorSettings.ButtonSetings = { IsSave: true, IsCancel: true };
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
                var navbarHeader = '<div class="navbar-fixed editor-header">';
                navbarHeader += '        <nav class="editor-header-nav">';
                navbarHeader += '            <div class="nav-wrapper editor-header">';
                navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
                navbarHeader += '                <ul id="editButtons" class="right"></ul>';
                navbarHeader += '            </div>';
                navbarHeader += '        </nav>';
                navbarHeader += '    </div>';
                this.navHeader = $(navbarHeader);
                this.btnSave = $('<li><a id="editor-btn-save" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$save") + '"><i class="material-icons editor-header">done</i></a></li>');
                this.btnCancel = $('<li><a id="editor-btn-cancel" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$cancel") + '"><i class="material-icons editor-header">close</i></a></li>');
                if (this.editorSettings.ButtonSetings.IsSave === true)
                    this.navHeader.find("#editButtons").append(this.btnSave);
                if (this.editorSettings.ButtonSetings.IsCancel === true)
                    this.navHeader.find("#editButtons").append(this.btnCancel);
                if (this.editorSettings.ButtonSetings.IsSave === true || this.editorSettings.ButtonSetings.IsCancel === true)
                    view.prepend(this.navHeader);
                this.tooltips = this.navHeader.find(".tooltipped");
                _super.prototype.ViewInit.call(this, view);
                return this.loadData();
            };
            BaseEditor.prototype.ViewShow = function (e) {
                if (this.tooltips)
                    this.tooltips.tooltip();
                return _super.prototype.ViewShow.call(this, e);
            };
            BaseEditor.prototype.ViewHide = function (e) {
                _super.prototype.ViewHide.call(this, e);
                if (this.btnSave)
                    this.btnSave.remove();
                if (this.btnCancel)
                    this.btnCancel.remove();
                if (this.tooltips)
                    this.tooltips.tooltip("destroy");
            };
            BaseEditor.prototype.createEvents = function () {
                this.SaveButtonClick = this.createTouchClickEvent(this.btnSave, this.saveButtonClick);
                this.CancelButtonClick = this.createTouchClickEvent(this.btnCancel, this.cancelButtonClick);
            };
            BaseEditor.prototype.destroyEvents = function () {
                this.destroyTouchClickEvent(this.btnSave, this.SaveButtonClick);
                this.destroyTouchClickEvent(this.btnSave, this.CancelButtonClick);
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
        Controller.BaseCardFilterSettings = BaseCardFilterSettings;
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
                var controls = [];
                controls.push(this.initNavHeader());
                var filterControl = (this.cardSettings && this.cardSettings.FilterSettings ? this.cardSettings.FilterSettings.InitControls() : undefined);
                if (filterControl)
                    controls.push(filterControl);
                controls.push(this.initTableRow());
                view.append(controls);
                _super.prototype.ViewInit.call(this, view);
                return this.loadData();
            };
            BaseCard.prototype.initNavHeader = function () {
                var navbarHeader = '<div class="navbar-fixed editor-header">';
                navbarHeader += '        <nav class="editor-header-nav">';
                navbarHeader += '            <div class="nav-wrapper editor-header">';
                navbarHeader += '                <a class="editor-header-title">' + this.Header + '</a>';
                navbarHeader += '                <ul id="cardButtons" class="right"></ul>';
                navbarHeader += '            </div>';
                navbarHeader += '        </nav>';
                navbarHeader += '    </div>';
                this.navHeader = $(navbarHeader);
                if (this.CardSettings.IsEdit)
                    this.btnEdit = $('<li><a id="card-btn-edit" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$edit") + '"><i class="material-icons editor-header">edit</i></a></li>');
                if (this.CardSettings.IsAdd)
                    this.btnAdd = $('<li><a id="card-btn-add" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$add") + '"><i class="material-icons editor-header">add</i></a></li>');
                if (this.CardSettings.IsAddCopy)
                    this.btnAddCopy = $('<li><a id="card-btn-addcopy" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$addcopy") + '"><i class="material-icons editor-header">exposure_plus_1</i></a></li>');
                if (this.CardSettings.IsDelete)
                    this.btnDelete = $('<li><a id="card-btn-delete" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$delete") + '"><i class="material-icons editor-header">delete_forever</i></a></li>');
                if (this.CardSettings.IsSelect)
                    this.btnSelect = $('<li><a id="editor-btn-select" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$select") + '"><i class="material-icons editor-header">done</i></a></li>');
                this.btnClose = $('<li><a id="card-btn-close" class="editor-header-button tooltipped" data-position="bottom" data-tooltip="' + vars._statres("button$label$cancel") + '"><i class="material-icons editor-header">close</i></a></li>');
                var cardButtons = this.navHeader.find("#cardButtons");
                cardButtons.append(this.btnEdit).append(this.btnAdd).append(this.btnAddCopy).append(this.btnDelete).append(this.btnSelect).append(this.btnClose);
                this.tooltips = cardButtons.find(".tooltipped");
                return this.navHeader;
            };
            BaseCard.prototype.initTableRow = function () {
                var navbarHeader = '<div class="row row-table">';
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
            };
            BaseCard.prototype.ViewResize = function (e) {
                _super.prototype.ViewResize.call(this, e);
                if (this.cardSettings && this.cardSettings.FilterSettings)
                    this.cardSettings.FilterSettings.ResizeControls();
                var tbody = this.tableBody;
                if (tbody && tbody.length > 0) {
                    tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
                }
            };
            BaseCard.prototype.ViewShow = function (e) {
                if (this.cardSettings && this.cardSettings.FilterSettings)
                    this.cardSettings.FilterSettings.ViewControls();
                if (this.tooltips)
                    this.tooltips.tooltip();
                return _super.prototype.ViewShow.call(this, e);
            };
            BaseCard.prototype.ViewHide = function (e) {
                _super.prototype.ViewHide.call(this, e);
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
                if (this.tooltips)
                    this.tooltips.tooltip("destroy");
            };
            BaseCard.prototype.createEvents = function () {
                this.EditButtonClick = this.createTouchClickEvent(this.btnEdit, this.editButtonClick);
                this.AddButtonClick = this.createTouchClickEvent(this.btnAdd, this.addButtonClick);
                this.AddCopyButtonClick = this.createTouchClickEvent(this.btnAddCopy, this.addCopyButtonClick);
                this.DeleteButtonClick = this.createTouchClickEvent(this.btnDelete, this.deleteButtonClick);
                this.CloseButtonClick = this.createTouchClickEvent(this.btnClose, this.closeButtonClick);
                this.SelectButtonClick = this.createTouchClickEvent(this.btnSelect, this.selectButtonClick);
                if (this.cardSettings && this.cardSettings.FilterSettings)
                    this.cardSettings.FilterSettings.createEvents();
            };
            BaseCard.prototype.destroyEvents = function () {
                if (this.cardSettings && this.cardSettings.FilterSettings)
                    this.cardSettings.FilterSettings.destroyEvents();
                if (this.rows) {
                    this.destroyTouchClickEvent(this.rows, this.rowClick);
                    this.destroyDblTouchClickEvent(this.rows, this.rowDblClick);
                }
                this.destroyTouchClickEvent(this.btnSelect, this.SelectButtonClick);
                this.destroyTouchClickEvent(this.btnEdit, this.EditButtonClick);
                this.destroyTouchClickEvent(this.btnAdd, this.AddButtonClick);
                this.destroyTouchClickEvent(this.btnAddCopy, this.AddCopyButtonClick);
                this.destroyTouchClickEvent(this.btnDelete, this.DeleteButtonClick);
                this.destroyTouchClickEvent(this.btnClose, this.CloseButtonClick);
            };
            BaseCard.prototype.createCardFilterSettings = function () {
                return new BaseCardFilterSettings($.proxy(this.setupRows, this));
            };
            BaseCard.prototype.createCardSettings = function () {
                return { FilterSettings: this.createCardFilterSettings(), ValueIdNew: 0, EditIdName: "", IsAdd: false, IsAddCopy: false, IsEdit: false, IsDelete: false, IsSelect: false, EditController: "", Load: undefined, Delete: undefined, Columns: [] };
            };
            BaseCard.prototype.setupTable = function () {
                this.tableHead.html(this.getTableHeaderHtml());
                this.setupRows();
            };
            BaseCard.prototype.setupRows = function () {
                this.selectedRow = null;
                if (this.rows) {
                    this.destroyTouchClickEvent(this.rows, this.rowClick);
                    this.destroyDblTouchClickEvent(this.rows, this.rowDblClick);
                }
                this.tableBody.html(this.getTableBodyHtml());
                this.rows = this.tableBody.find('tr');
                this.rows = this.tableBody.find('tr');
                if (this.rows) {
                    this.createTouchClickEvent(this.rows, this.rowClick);
                    this.createDblTouchClickEvent(this.rows, this.rowDblClick);
                }
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
            BaseCard.prototype.getTableBodyHtml = function () {
                var html = '';
                var data = (this.cardSettings && this.cardSettings.FilterSettings ? this.cardSettings.FilterSettings.GetItemsForView(this.Model.get("cardModel")) : this.Model.get("cardModel"));
                if (data && data.length > 0) {
                    var templateRow = vars.getTemplate(this.getTableRowTemplate());
                    if (templateRow) {
                        for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                            html += templateRow(data[i]);
                        }
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
            BaseCard.prototype.rowDblClick = function (e) {
                if (this.selectedRow)
                    this.selectedRow.removeClass("row-active z-depth-1 brown lighten-5");
                this.selectedRow = $(e.currentTarget);
                if (this.selectedRow)
                    this.selectedRow.addClass("row-active z-depth-1 brown lighten-5");
                this.editButtonClick(e);
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
            BaseCard.prototype.getSelectedRecord = function () {
                var result;
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    var data = this.Model.get("cardModel");
                    for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                        if (data[i].id == _id) {
                            result = data[i];
                            break;
                        }
                    }
                }
                return result;
            };
            BaseCard.prototype.addButtonClick = function (e) {
                this.Add();
            };
            BaseCard.prototype.addCopyButtonClick = function (e) {
                this.addCopy();
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
            BaseCard.prototype.addCopy = function () {
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    if (_id > 0) {
                        vars._editorData[this.CardSettings.EditIdName] = _id;
                        vars._editorData["isCopy"] = true;
                        vars._app.OpenController({ urlController: this.CardSettings.EditController, backController: this });
                    }
                }
            };
            BaseCard.prototype.Edit = function () {
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    if (_id > 0) {
                        vars._editorData[this.CardSettings.EditIdName] = _id;
                        vars._editorData["isCopy"] = false;
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
        var BaseReportWithFilter = /** @class */ (function (_super) {
            __extends(BaseReportWithFilter, _super);
            function BaseReportWithFilter() {
                var _this = _super.call(this) || this;
                if (_this.EditorSettings && _this.EditorSettings.ButtonSetings)
                    _this.EditorSettings.ButtonSetings.IsSave = false;
                _this.RestoreFilter();
                return _this;
            }
            BaseReportWithFilter.prototype.createModel = function () {
                return new kendo.data.ObservableObject({
                    "Header": "",
                    "filterModel": {},
                    "reportModel": {},
                });
            };
            Object.defineProperty(BaseReportWithFilter.prototype, "FilterName", {
                get: function () {
                    return "reportFilter";
                },
                enumerable: true,
                configurable: true
            });
            BaseReportWithFilter.prototype.SaveFilter = function () {
                window.localStorage.setItem(this.FilterName, this.getSaveFilter());
            };
            BaseReportWithFilter.prototype.getSaveFilter = function () {
                return JSON.stringify(this.Filter);
            };
            BaseReportWithFilter.prototype.RestoreFilter = function () {
                var filter;
                var saved = window.localStorage.getItem(this.FilterName);
                if (!saved || saved === "\"{}\"") {
                    filter = this.getDefaultFilter();
                }
                else
                    filter = JSON.parse(saved);
                this.Model.set("filterModel", filter);
                // this.Filter = filter;
            };
            BaseReportWithFilter.prototype.getDefaultFilter = function () {
                return { datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()) };
            };
            Object.defineProperty(BaseReportWithFilter.prototype, "Filter", {
                get: function () {
                    return this.Model.get("filterModel").toJSON();
                },
                set: function (filter) {
                    this.Model.set("filterModel", filter);
                },
                enumerable: true,
                configurable: true
            });
            return BaseReportWithFilter;
        }(BaseEditor));
        Controller.BaseReportWithFilter = BaseReportWithFilter;
        var BaseReport = /** @class */ (function (_super) {
            __extends(BaseReport, _super);
            function BaseReport() {
                var _this = _super.call(this) || this;
                _this.reportSettings = _this.createReportSettings();
                return _this;
            }
            BaseReport.prototype.createReportSettings = function () {
                return { Columns: this.Columns };
            };
            Object.defineProperty(BaseReport.prototype, "ReportSettings", {
                get: function () {
                    return this.reportSettings;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseReport.prototype, "Columns", {
                get: function () {
                    return this.columns();
                },
                enumerable: true,
                configurable: true
            });
            BaseReport.prototype.columns = function () {
                return [];
            };
            BaseReport.prototype.ViewInit = function (view) {
                var result = _super.prototype.ViewInit.call(this, view);
                var controls = [];
                controls.push(this.initTableRow());
                view.append(controls);
                this.setupTable();
                return result;
            };
            BaseReport.prototype.initTableRow = function () {
                var navbarHeader = '<div class="row row-table-report">';
                navbarHeader += '    <div class="col s12 m12 l12 xl12 col-table">';
                navbarHeader += '        <table class="highlight">';
                navbarHeader += '            <thead></thead>';
                navbarHeader += '            <tbody style="overflow-y: scroll;"></tbody>';
                navbarHeader += '        </table>';
                navbarHeader += '    </div>';
                navbarHeader += '</div>';
                this.tableRow = $(navbarHeader);
                this.tableHead = this.tableRow.find('thead');
                this.tableBody = this.tableRow.find('tbody');
                return this.tableRow;
            };
            BaseReport.prototype.ViewResize = function (e) {
                _super.prototype.ViewResize.call(this, e);
                var tbody = this.tableBody;
                if (tbody && tbody.length > 0) {
                    tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
                }
            };
            BaseReport.prototype.ViewShow = function (e) {
                return _super.prototype.ViewShow.call(this, e);
            };
            BaseReport.prototype.ViewHide = function (e) {
                this.SaveFilter();
                _super.prototype.ViewHide.call(this, e);
            };
            BaseReport.prototype.destroyEvents = function () {
                this.detachSortEvents();
                if (this.rows)
                    this.destroyDblTouchClickEvent(this.rows, this.rowClick);
                _super.prototype.destroyEvents.call(this);
            };
            BaseReport.prototype.buildButtonClick = function (e) {
                var self = this;
                self.detachSortEvents();
            };
            BaseReport.prototype.setupTable = function () {
                this.detachSortEvents();
                var headerHtml = this.getTableHeaderHtml();
                this.tableHead.html(headerHtml);
                this.attachSortEvents();
                this.setupRows();
            };
            BaseReport.prototype.setupRows = function () {
                //this.selectedRow = null;
                if (this.rows)
                    this.destroyDblTouchClickEvent(this.rows, this.rowClick);
                this.tableBody.html(this.getTableBodyHtml());
                var valueSum;
                for (var j = 0, jcount = (this.sumFieldsInfo.fields && this.sumFieldsInfo.fields.length ? this.sumFieldsInfo.fields.length : 0); j < jcount; j++) {
                    valueSum = this.sumFieldsInfo.sumFied[this.sumFieldsInfo.fields[j]];
                    this.tableHead.find('#' + this.sumFieldsInfo.fields[j] + '_sum').html(utils.numberToString(valueSum ? valueSum : 0, 2));
                }
                this.rows = this.tableBody.find('tr');
                this.createDblTouchClickEvent(this.rows, this.rowClick);
            };
            BaseReport.prototype.getTableHeaderHtml = function () {
                var columns = this.ReportSettings.Columns;
                var html = '';
                var isSum = false;
                var isGroupHeader = false;
                this.sumFieldsInfo = { fields: [], sumFied: {}, orderfields: [] };
                var knSupport = kendo;
                html += '<tr>';
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    //if (columns[i].IsSum && columns[i].IsSum === true)
                    //    isSum = true;
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
            BaseReport.prototype.attachSortEvents = function () {
                var columns = this.ReportSettings.Columns;
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    if (columns[i].IsOrder === true) {
                        var strId = 'sort_' + i;
                        this.createTouchClickEvent(strId, this.sortButtonClick);
                    }
                }
            };
            BaseReport.prototype.detachSortEvents = function () {
                var columns = this.ReportSettings.Columns;
                for (var i = 0, icount = columns && columns.length ? columns.length : 0; i < icount; i++) {
                    if (columns[i].IsOrder === true) {
                        var strId = 'sort_' + i;
                        this.destroyTouchClickEvent(strId, this.sortButtonClick);
                    }
                }
            };
            BaseReport.prototype.getTableRowTemplate = function () {
                var setting = this.ReportSettings;
                var columns = setting.Columns;
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
            BaseReport.prototype.getTableBodyHtml = function () {
                var html = '';
                var data = this.Model.get("reportModel");
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
            BaseReport.prototype.rowClick = function (e) {
                this.OnDetalize(e);
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
            BaseReport.prototype.OnDetalize = function (e) {
            };
            BaseReport.prototype.sortButtonClick = function (e) {
                var self = this;
                var strId = e.currentTarget.id;
                strId = strId.replace('sort_', '');
                var i = +strId;
                var setting = self.ReportSettings;
                var columns = setting.Columns;
                var orderfields = [];
                var colName = columns[i].Field;
                orderfields = self.sumFieldsInfo.orderfields;
                //orderfields.push({ field: columns[i].Field, typeSort: 0, index: i });
                orderfields.filter(function (x) { return x.field == colName; });
                var findResult = $.grep(orderfields, function (x) { return x.field == colName; });
                var typeSort = 0;
                if (findResult && findResult.length > 0) {
                    typeSort = findResult[0].typeSort;
                }
                var colNameSplit = colName.split('.');
                var data = this.Model.get("reportModel");
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
                self.Model.set("reportModel", data);
                self.setupRows();
            };
            return BaseReport;
        }(BaseReportWithFilter));
        Controller.BaseReport = BaseReport;
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=basecontroller.js.map