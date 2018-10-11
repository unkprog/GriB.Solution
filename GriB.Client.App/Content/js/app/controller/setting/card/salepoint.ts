import vars = require('app/common/variables');
import utils = require('app/common/utils');
import card = require('app/controller/setting/card/card');

export namespace Controller.Setting.Card {
    export class SalePoint extends card.Controller.Setting.Card.Card {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/card/salepoint.html", Id: "card-view-salepoint" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": vars._statres("label$salesPoints"),
            });
        }

        protected loadData(): boolean {
            let controller = this;
            this.Service.GetSalePoints((responseData) => {
                controller.Model.set("editModel", responseData);
                this.setupRows(responseData);
                controller.afterLoad();
            });
            return false;
        }

        private setupRows(data: any) {
            let html: string = '';
            let rows: JQuery = this.View.find("#card-view-salepoint-rows");
            if (data && data.length > 0) {
                let item: Interfaces.Model.ISalepointModel;
                for (let i = 0, icount = data.length; i < icount; i++) {
                    item = data[i];
                    html += ' <tr><td>' + item.name + '</td><td>' + item.city + '</td><td class="hide-on-small-only">' + item.address + '</td><td class="hide-on-small-only">' + item.schedule + '</td></tr>';
                }
                rows.html(html);
            }
            else
                rows.html('');

            $('#card-view-salepoint-table').tablePagination({
                pagerSelector: '#card-view-salepoint-table-pager',
                activeColor: 'green',
                prevText: 'Anterior',
                nextText: 'Siguiente',
                showPrevNext: true,
                hidePageNumbers: false,
                perPage: 30
            });
        }

        public Add() {
            vars._editorData["id_salepoint"] = 100;
            vars._app.OpenController("setting/editor/salepoint", this);
        }

        public ViewResize(e: any): void {
            let tbody: JQuery = $('#card-view-salepoint-table').find('tbody');
            if (tbody && tbody.length > 0) {
                tbody.height($(window).height() - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
            }
        }
    }
}