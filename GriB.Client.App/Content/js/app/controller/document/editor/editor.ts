import base = require('app/common/basecontroller');
import svc = require('app/services/documentservice');
import vars = require('app/common/variables');

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

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/document/editor/document.html", Id: "document-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            let oo: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": this.Header,
                "editModel": {},
                //"labelAccessRight": vars._statres("label$accessright"),
                //"labelCategory": vars._statres("label$category"),
                //"labelName": vars._statres("label$name"),
                //"labelIncludedInCategory": vars._statres("label$includedincategory"),
                //"labelPosTerminal": vars._statres("label$POSterminal"),
                //"labelAddPhoto": vars._statres("label$addphoto"),
                //"labelDescription": vars._statres("label$description"),
                //"labelSalePoint": vars._statres("label$salePoint"),
                //"labelAccess": vars._statres("label$access"),
            });
            return oo;
        }

        public get EditorModel(): Interfaces.Model.IDocumentModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createEditorSettings(): Interfaces.IEditorSettings {
            return { EditIdName: this.EditIdName, Load: $.proxy(this.Service.GetDocument, this.Service), Save: $.proxy(this.Service.SetDocument, this.Service) };
        }

        public get EditIdName(): string {
            return "";
        }

        protected validate(): boolean {
            let result: boolean = true;
            let model: Interfaces.Model.IDocumentModel = this.EditorModel;


            return result;
        }

        public ViewInit(view: JQuery): boolean {
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
       }

        protected destroyEvents(): void {
            super.destroyEvents();
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
          
        }

        protected afterLoad(responseData?: any): void {
            super.afterLoad(responseData);
            this.setupPositions(responseData);
        }

        private setupPositions(responseData: any) {
          
        }
    }
}