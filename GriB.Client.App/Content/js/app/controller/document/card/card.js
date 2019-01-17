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
define(["require", "exports", "app/common/variables", "app/common/basecontroller", "app/services/documentservice"], function (require, exports, vars, base, svc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Card;
            (function (Card_1) {
                var Card = /** @class */ (function (_super) {
                    __extends(Card, _super);
                    function Card() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Card.prototype, "Service", {
                        get: function () {
                            if (!this.documentService)
                                this.documentService = new svc.Services.DocumentService();
                            return this.documentService;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Card.prototype.createOptions = function () {
                        return { Url: "/Content/view/document/card/card.html", Id: "card-view" };
                    };
                    Card.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FieldSearch: "name", ValueIdNew: -1, EditIdName: this.EditIdName, EditController: this.EditController,
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.getDocs, this), Delete: $.proxy(this.Service.DelDocument, this.Service),
                            Columns: this.Columns
                        };
                    };
                    Object.defineProperty(Card.prototype, "Columns", {
                        get: function () {
                            return [
                                { Header: vars._statres("label$date"), Field: "date" },
                                { Header: vars._statres("label$stock"), Field: "salepointname" },
                                { Header: vars._statres("label$sum"), Field: "sum" },
                            ];
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "EditIdName", {
                        get: function () {
                            return "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "EditController", {
                        get: function () {
                            return "";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "DocType", {
                        get: function () {
                            return 0;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "SalePoint", {
                        get: function () {
                            return 0;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "DateFrom", {
                        get: function () {
                            return new Date(1899, 11, 30, 0, 0, 0, 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Card.prototype, "DateTo", {
                        get: function () {
                            return new Date(1899, 11, 30, 0, 0, 0, 0);
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Card.prototype.getDocs = function (Callback) {
                        var params = { id: 0, doctype: this.DocType, salepoint: this.SalePoint, datefrom: this.DateFrom, dateto: this.DateTo };
                        this.Service.GetDocuments(params, function (responseData) {
                            if (Callback)
                                Callback(responseData);
                        });
                    };
                    Card.prototype.initFilterControls = function () {
                        //let navbarHeader: string = '<nav class="card-search-nav editor-header z-depth-1">';
                        //navbarHeader += '   <div class="nav-wrapper">';
                        //navbarHeader += '       <form>';
                        //navbarHeader += '           <div class="input-field">';
                        //navbarHeader += '               <input id="card-view-search" type="search" required value="">';
                        //navbarHeader += '               <label class="label-icon" for="search"><i class="material-icons editor-header">search</i></label>';
                        //navbarHeader += '               <i id="card-view-search-clear" class="material-icons editor-header">close</i>';
                        //navbarHeader += '           </div>';
                        //navbarHeader += '       </form>';
                        //navbarHeader += '   </div>';
                        //navbarHeader += '</nav>';
                        //this.navSearch = $(navbarHeader);
                        //this.formSearch = this.navSearch.find('form');
                        //this.inputSearch = this.formSearch.find('#card-view-search');
                        //this.clearSearch = this.formSearch.find('#card-view-search-clear');
                        return undefined; //this.navSearch;
                    };
                    return Card;
                }(base.Controller.BaseCard));
                Card_1.Card = Card;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=card.js.map