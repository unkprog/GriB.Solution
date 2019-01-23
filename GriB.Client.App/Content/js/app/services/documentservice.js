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
define(["require", "exports", "app/common/baseservice"], function (require, exports, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Services;
    (function (Services) {
        var DocumentService = /** @class */ (function (_super) {
            __extends(DocumentService, _super);
            function DocumentService() {
                return _super.call(this) || this;
            }
            Object.defineProperty(DocumentService.prototype, "Options", {
                get: function () {
                    return { BaseUrl: '/api/document' };
                },
                enumerable: true,
                configurable: true
            });
            DocumentService.prototype.GetDocuments = function (model, Callback) {
                this.PostApi({ Action: "/get_docs", RequestData: JSON.stringify(model), Callback: Callback });
            };
            DocumentService.prototype.GetDocument = function (id, Callback) {
                this.GetApi({ Action: "/get_doc", RequestData: { id: id }, Callback: Callback });
            };
            DocumentService.prototype.SetDocument = function (model, Callback) {
                this.PostApi({ Action: "/post_doc", RequestData: JSON.stringify(model), Callback: Callback });
            };
            DocumentService.prototype.DelDocument = function (id, Callback) {
                this.GetApi({ Action: "/del_doc", RequestData: { id: id }, Callback: Callback });
            };
            DocumentService.prototype.GetDocumentNewPosition = function (id, salepoint, Callback) {
                this.GetApi({ Action: "/get_document_newposition", RequestData: { id: id, salepoint: salepoint }, Callback: Callback });
            };
            DocumentService.prototype.GetSales = function (model, Callback) {
                this.PostApi({ Action: "/get_sales", RequestData: JSON.stringify(model), Callback: Callback });
            };
            return DocumentService;
        }(base.Services.BaseService));
        Services.DocumentService = DocumentService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=documentservice.js.map