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
define(["require", "exports", "app/common/variables", "app/controller/document/editor/editor"], function (require, exports, vars, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var Sale = /** @class */ (function (_super) {
                    __extends(Sale, _super);
                    function Sale() {
                        var _this = _super.call(this) || this;
                        if (_this.EditorSettings.ButtonSetings)
                            _this.EditorSettings.ButtonSetings.IsSave = false;
                        return _this;
                    }
                    Object.defineProperty(Sale.prototype, "Header", {
                        get: function () {
                            return vars._statres("label$sale");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Sale.prototype, "EditIdName", {
                        get: function () {
                            return "id_sale";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Sale.prototype.createEditorSettings = function () {
                        return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetSale, this.Service), Save: $.proxy(this.Service.SetDocument, this.Service) };
                    };
                    Sale.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        return result;
                    };
                    return Sale;
                }(edit.Controller.Document.Editor.Editor));
                Editor.Sale = Sale;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/sale", function (module) { return new module.Controller.Document.Editor.Sale(); });
});
//# sourceMappingURL=sale.js.map