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
define(["require", "exports", "app/common/utils", "./variables"], function (require, exports, utils, variables_1) {
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
                    this.OpenView(this._controllersStack.Current, undefined, true);
            };
            BaseContent.prototype.OpenController = function (urlController, backController) {
                variables_1._app.OpenController(urlController, backController);
            };
            BaseContent.prototype.OpenView = function (controller, backController, isRestore) {
                var _this = this;
                if (isRestore === void 0) { isRestore = false; }
                var self = this;
                if ($("#" + controller.Options.Id).length > 0)
                    return; //Already loaded and current
                variables_1._app.ShowLoading();
                $.when($.ajax({ url: controller.Options.Url, cache: false })).done(function (template) {
                    var isInit = false;
                    try {
                        if (self._controller)
                            self._controller.ViewHide(_this);
                        self._controller = controller;
                        if (!isRestore)
                            self._controllersStack.Push(backController);
                        self.SetHeader(self._controller);
                        try {
                            var view = $(template);
                            isInit = self._controller.ViewInit(view);
                            self._content.html(view[0]);
                            isInit = isInit && self._controller.ViewShow(_this);
                            self._controller.ViewResize(_this);
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                    finally {
                        if (isInit)
                            variables_1._app.HideLoading();
                    }
                }).fail(function (e) {
                    variables_1._app.HideLoading();
                });
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
                return _super.call(this) || this;
            }
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
            Object.defineProperty(BaseEditor.prototype, "EditorModel", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
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
                this.afterLoad();
                return true;
            };
            BaseEditor.prototype.afterLoad = function () {
                M.updateTextFields();
                variables_1._app.HideLoading();
                this.View.show();
            };
            BaseEditor.prototype.validate = function () {
                return true;
            };
            BaseEditor.prototype.afterSave = function () {
                variables_1._main.ControllerBack(this);
            };
            BaseEditor.prototype.Save = function () {
                this.afterSave();
            };
            BaseEditor.prototype.Cancel = function () {
            };
            return BaseEditor;
        }(Base));
        Controller.BaseEditor = BaseEditor;
        var BaseCard = /** @class */ (function (_super) {
            __extends(BaseCard, _super);
            function BaseCard() {
                return _super.call(this) || this;
            }
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
                this.btnEdit = $('<li><a id="card-btn-edit" class="editor-header-button"><i class="material-icons editor-header">edit</i></a></li>');
                this.btnAdd = $('<li><a id="card-btn-add" class="editor-header-button"><i class="material-icons editor-header">add</i></a></li>');
                this.btnDelete = $('<li><a id="card-btn-delete" class="editor-header-button"><i class="material-icons editor-header">remove</i></a></li>');
                this.btnClose = $('<li><a id="card-btn-close" class="editor-header-button"><i class="material-icons editor-header">close</i></a></li>');
                var cardButtons = this.navHeader.find("#cardButtons");
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
                navbarHeader = '<div class="row row-table">';
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
            };
            BaseCard.prototype.createEvents = function () {
                this.EditButtonClick = this.createClickEvent(this.btnEdit, this.editButtonClick);
                this.AddButtonClick = this.createClickEvent(this.btnAdd, this.addButtonClick);
                this.DeleteButtonClick = this.createClickEvent(this.btnDelete, this.deleteButtonClick);
                this.CloseButtonClick = this.createClickEvent(this.btnClose, this.closeButtonClick);
            };
            BaseCard.prototype.destroyEvents = function () {
                this.destroyClickEvent(this.rows, this.rowClick);
                this.destroyClickEvent(this.btnEdit, this.EditButtonClick);
                this.destroyClickEvent(this.btnAdd, this.AddButtonClick);
                this.destroyClickEvent(this.btnDelete, this.DeleteButtonClick);
                this.destroyClickEvent(this.btnClose, this.CloseButtonClick);
            };
            BaseCard.prototype.loadData = function () {
                this.afterLoad();
                return true;
            };
            BaseCard.prototype.afterLoad = function () {
                this.setupTable();
                M.updateTextFields();
                variables_1._app.HideLoading();
            };
            BaseCard.prototype.getCardSettings = function () {
                return {
                    FieldId: "",
                    Columns: []
                };
            };
            BaseCard.prototype.setupTable = function () {
                this.tableHead.html(this.getTableHeaderHtml());
                this.setupRows();
                this.rows = this.tableBody.find('tr');
                this.createClickEvent(this.rows, this.rowClick);
            };
            BaseCard.prototype.setupRows = function () {
                if (this.rows)
                    this.destroyClickEvent(this.rows, this.rowClick);
                this.tableBody.html(this.getTableBodyHtml());
                this.rows = this.tableBody.find('tr');
                this.createClickEvent(this.rows, this.rowClick);
            };
            BaseCard.prototype.getTableHeaderHtml = function () {
                var columns = this.getCardSettings().Columns;
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
                var setting = this.getCardSettings();
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
                var data = this.Model.get("editModel");
                if (data && data.length > 0) {
                    var item = void 0;
                    if (!this.templateRow)
                        this.templateRow = kendo.template(this.getTableRowTemplate());
                    for (var i = 0, icount = (data && data.length ? data.length : 0); i < icount; i++) {
                        item = data[i];
                        html += this.templateRow(item);
                    }
                }
                return html;
            };
            BaseCard.prototype.rowClick = function (e) {
                if (this.selectedRow)
                    this.selectedRow.removeClass("row-active z-depth-1 grey lighten-5");
                this.selectedRow = $(e.currentTarget);
                if (this.selectedRow)
                    this.selectedRow.addClass("row-active z-depth-1 grey lighten-5");
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
            BaseCard.prototype.closeButtonClick = function (e) {
                this.Close();
                variables_1._main.ControllerBack(e);
            };
            BaseCard.prototype.Edit = function () {
            };
            BaseCard.prototype.Add = function () {
            };
            BaseCard.prototype.afterAdd = function () {
            };
            BaseCard.prototype.Delete = function () {
                this.afterDelete();
            };
            BaseCard.prototype.afterDelete = function () {
                var id = this.getSelectedRowId();
                if (id) {
                    var _id = +id;
                    var model = this.Model.get("editModel");
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