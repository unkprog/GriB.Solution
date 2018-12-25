import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');


export namespace Controller.Terminal {
    export class CheckComment extends base.Controller.BaseEditor implements Interfaces.IControllerCheckComment {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$commenttoorder"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/checkcomment.html", Id: "checkcomment-view" };
        }

        public get EditorModel(): Interfaces.Model.ICheckCommetModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": "",
                "editModel": {
                    comment: "",
                },
                "labelComment": vars._statres("label$comment"),
                "labelCancel": vars._statres("button$label$cancel"),
                "labelSave": vars._statres("button$label$save"),
            });

            return result;
        }

        public get Comment(): string { return this.Model.get("editModel.comment"); }
        public set Comment(value: string) { this.Model.set("editModel.comment", value); }

        public OnApply: { (controller: Interfaces.IControllerCheckComment): void; };

        protected btnSaveComment: JQuery;
        protected btnCancelComment: JQuery;

        public ViewInit(view: JQuery): boolean {
            this.btnSaveComment = view.find("#btn-num-apply");
            this.btnCancelComment = view.find("#btn-num-cancel");
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            $("#checkcomment-view-description").characterCounter();
            M.textareaAutoResize($("#checkcomment-view-description"));
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();

            this.SaveCommentButtonClick = this.createTouchClickEvent(this.btnSaveComment, this.saveCommentButtonClick);
            this.CancelCommentButtonClick = this.createTouchClickEvent(this.btnCancelComment, this.cancelCommentButtonClick);
        }

        protected destroyEvents(): void {
            //this.Model.unbind("change");
            if (this.btnSaveComment) this.destroyTouchClickEvent(this.btnSaveComment, this.SaveCommentButtonClick);
            if (this.btnCancelComment) this.destroyTouchClickEvent(this.btnCancelComment, this.CancelCommentButtonClick);
            super.destroyEvents();
        }

        public SaveCommentButtonClick: { (e: any): void; };
        private saveCommentButtonClick(e): void {
            this.SaveButtonClick(e);
        }

        public CancelCommentButtonClick: { (e: any): void; };
        private cancelCommentButtonClick(e): void {
            this.CancelButtonClick(e);
        }

        public validate(): boolean {
            let controller = this;
            let result: boolean = super.validate();


            if (!utils.isNullOrEmpty(controller.Comment) && controller.Comment.length > 226) {
                M.toast({ html: utils.stringFormat(vars._statres("msg$error$fieldexceedscharacters"), vars._statres("label$comment"), 226) });
                result = false;
            }

            if (result === true && this.OnApply)
                this.OnApply(controller);
            return result;
        }
    }
}

vars.registerController("terminal/checkcomment", function (module: any): Interfaces.IController { return new module.Controller.Terminal.CheckComment(); });