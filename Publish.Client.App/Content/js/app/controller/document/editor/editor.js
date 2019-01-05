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
                    return Editor;
                }(base.Controller.BaseEditor));
                Editor_1.Editor = Editor;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=editor.js.map