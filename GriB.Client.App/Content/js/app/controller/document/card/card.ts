import vars = require('app/common/variables');
import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');

export namespace Controller.Document.Card {
    export class Card extends base.Controller.BaseCard {
        constructor() {
            super();
        }

        private documentService: svc.Services.DocumentService;
        protected get Service(): svc.Services.DocumentService {
            if (!this.documentService)
                this.documentService = new svc.Services.DocumentService();
            return this.documentService;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/document/card/card.html", Id: "card-view" };
        }

        protected createCardSettings(): Interfaces.ICardSettings {
            return {
                FieldId: "id", FieldSearch: "name", ValueIdNew: -1, EditIdName: this.EditIdName, EditController: this.EditController,
                IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                Load: $.proxy(this.getDocs, this), Delete: $.proxy(this.Service.DelDocument, this.Service),
                Columns: this.Columns
            };
        }

        protected get Columns(): Interfaces.ICardColumn[] {
            return [
                { Header: vars._statres("label$date"), Field: "date" },
                { Header: vars._statres("label$stock"), Field: "salepointname" },
                { Header: vars._statres("label$sum"), Field: "sum" },
            ];
        }

        protected get EditIdName(): string {
            return "";
        }

        protected get EditController(): string {
            return "";
        }

        protected get DocType(): number {
            return 0;
        }

        protected get SalePoint(): number {
            return 0;
        }

        protected get DateFrom(): Date {
            return new Date();
        }

        protected get DateTo(): Date {
            return new Date();
        }

        private getDocs(Callback: (responseData: any) => void) {
            let params: Interfaces.Model.IDocumentParams = { id: 0, doctype: this.DocType, salepoint: this.SalePoint, datefrom: this.DateFrom, dateto: this.DateTo }
            this.Service.GetDocuments(params, (responseData: any) => {
                if (Callback)
                    Callback(responseData);
            });
        }
    }
}