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
define(["require", "exports", "app/common/basecontroller", "app/services/documentservice"], function (require, exports, base, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor_1) {
                var Editor = /** @class */ (function (_super) {
                    __extends(Editor, _super);
                    function Editor() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Editor.prototype, "Service", {
                        get: function () {
                            if (!this.documentService)
                                this.documentService = new svc.Services.DocumentService();
                            return this.documentService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Editor.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/editor/document.html", Id: "document-view" };
                    };
                    Editor.prototype.createModel = function () {
                        var oo = new kendo.data.ObservableObject({
                            "Header": this.Header,
                            "editModel": {},
                        });
                        return oo;
                    };
                    Object.defineProperty(Editor.prototype, "EditorModel", {
                        get: function () {
                            return this.Model.get("editModel").toJSON();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Editor.prototype.createEditorSettings = function () {
                        return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetDocument, this.Service), Save: $.proxy(this.Service.SetDocument, this.Service) };
                    };
                    Object.defineProperty(Editor.prototype, "EditIdName", {
                        get: function () {
                            return "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Editor.prototype.validate = function () {
                        var result = true;
                        var model = this.EditorModel;
                        return result;
                    };
                    Editor.prototype.ViewInit = function (view) {
                        return _super.prototype.ViewInit.call(this, view);
                    };
                    Editor.prototype.ViewShow = function (e) {
                        return _super.prototype.ViewShow.call(this, e);
                    };
                    Editor.prototype.createEvents = function () {
                        _super.prototype.createEvents.call(this);
                    };
                    Editor.prototype.destroyEvents = function () {
                        _super.prototype.destroyEvents.call(this);
                    };
                    Editor.prototype.ViewResize = function (e) {
                        _super.prototype.ViewResize.call(this, e);
                    };
                    Editor.prototype.afterLoad = function (responseData) {
                        _super.prototype.afterLoad.call(this, responseData);
                        this.setupPositions(responseData);
                    };
                    Editor.prototype.setupPositions = function (responseData) {
                    };
                    return Editor;
                }(base.Controller.BaseEditor));
                Editor_1.Editor = Editor;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=editor.js.map