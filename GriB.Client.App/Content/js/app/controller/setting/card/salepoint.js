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
define(["require", "exports", "app/common/variables", "app/controller/setting/card/card"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card) {
                var SalePoint = /** @class */ (function (_super) {
                    __extends(SalePoint, _super);
                    function SalePoint() {
                        return _super.call(this) || this;
                    }
                    SalePoint.prototype.createOptions = function () {
                        return { Url: "/Content/view/setting/card/salepoint.html", Id: "card-view-salepoint" };
                    };
                    SalePoint.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$salesPoints"),
                        });
                    };
                    SalePoint.prototype.getCardSettings = function () {
                        return {
                            FieldId: "id",
                            Columns: [
                                { Header: "Наименование", Field: "name" },
                                { Header: "Город", Field: "city" },
                                { Header: "Адрес", HeaderStyle: "hide-on-small-only", Field: "address", FieldStyle: "hide-on-small-only" },
                                { Header: "Расписание", HeaderStyle: "hide-on-small-only", Field: "schedule", FieldStyle: "hide-on-small-only" },
                            ]
                        };
                    };
                    SalePoint.prototype.loadData = function () {
                        var controller = this;
                        this.Service.GetSalePoints(function (responseData) {
                            controller.Model.set("editModel", responseData);
                            controller.afterLoad();
                        });
                        return false;
                    };
                    //private setupRows(data: any) {
                    //    let html: string = '';
                    //    let rows: JQuery = this.View.find("#card-view-salepoint-rows");
                    //    if (data && data.length > 0) {
                    //        let item: Interfaces.Model.ISalepointModel;
                    //        for (let i = 0, icount = data.length; i < icount; i++) {
                    //            item = data[i];
                    //            html += ' <tr><td>' + item.name + '</td><td>' + item.city + '</td><td class="hide-on-small-only">' + item.address + '</td><td class="hide-on-small-only">' + item.schedule + '</td></tr>';
                    //        }
                    //        rows.html(html);
                    //    }
                    //    else
                    //        rows.html('');
                    //    //$('#card-view-salepoint-table').tablePagination({
                    //    //    pagerSelector: '#card-view-salepoint-table-pager',
                    //    //    activeColor: 'green',
                    //    //    prevText: 'Anterior',
                    //    //    nextText: 'Siguiente',
                    //    //    showPrevNext: true,
                    //    //    hidePageNumbers: false,
                    //    //    perPage: 30
                    //    //});
                    //}
                    SalePoint.prototype.Add = function () {
                        vars._editorData["id_salepoint"] = 0;
                        vars._app.OpenController("setting/editor/salepoint", this);
                    };
                    SalePoint.prototype.Edit = function () {
                        var id = this.getSelectedRowId();
                        if (id) {
                            var _id = +id;
                            if (_id > 0) {
                                vars._editorData["id_salepoint"] = _id;
                                vars._app.OpenController("setting/editor/salepoint", this);
                            }
                        }
                    };
                    SalePoint.prototype.Delete = function () {
                        var id = this.getSelectedRowId();
                        if (id) {
                            var _id = +id;
                            var controller_1 = this;
                            this.Service.DelSalePoint(_id, function (responseData) {
                                controller_1.afterDelete();
                            });
                        }
                    };
                    return SalePoint;
                }(card.Controller.Setting.Card.Card));
                Card.SalePoint = SalePoint;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
});
//# sourceMappingURL=salepoint.js.map