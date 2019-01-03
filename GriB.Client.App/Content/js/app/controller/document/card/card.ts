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
            return { Url: "/Content/view/setting/card/card.html", Id: "card-view" };
        }
    }
}