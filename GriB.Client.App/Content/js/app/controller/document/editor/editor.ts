import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');
import { _app } from 'app/common/variables';

export namespace Controller.Document.Editor {
    export class Editor extends base.Controller.BaseEditor {
        constructor() {
            super();
        }

        private documentService: svc.Services.DocumentService;
        protected get Service(): svc.Services.DocumentService {
            if (!this.documentService)
                this.documentService = new svc.Services.DocumentService();
            return this.documentService;
        }

    }
}