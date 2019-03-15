import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');


export namespace Controller.Terminal {
    export class ChangeDialog extends base.Controller.BaseEditor implements Interfaces.IControllerChangeDialog {
        constructor() {
            super();
            if (this.EditorSettings) {
                if (this.EditorSettings.ButtonSetings) {
                    this.EditorSettings.ButtonSetings.IsSave = false;
                    this.EditorSettings.ButtonSetings.IsCancel = false;
                }
            }
            this.Model.set("editModel.result", -1);
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/changedialog.html", Id: "changedialog-view" };
        }

        public get EditorModel(): Interfaces.Model.ICheckCommetModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": "",
                "HeaderQuery": "",
                "editModel": {
                    result: -1
                },
                "labelYes": vars._statres("label$yes"),
                "labelNo": vars._statres("label$no"),
            });

            return result;
        }

        public get Result(): number {
            return this.Model.get("editModel.result");
        };

        public OnResult: { (controller: Interfaces.IControllerChangeDialog): void; };

        protected btnOk: JQuery;
        protected btnNo: JQuery;

        public ViewInit(view: JQuery): boolean {
            this.btnOk = view.find("#btn-change-ok");
            this.btnNo = view.find("#btn-change-no");
            return super.ViewInit(view);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();

            this.OkButtonClick = this.createTouchClickEvent(this.btnOk, this.okButtonClick);
            this.NoButtonClick = this.createTouchClickEvent(this.btnNo, this.noButtonClick);
        }

        protected destroyEvents(): void {
            //this.Model.unbind("change");
            if (this.btnOk) this.destroyTouchClickEvent(this.btnOk, this.OkButtonClick);
            if (this.btnNo) this.destroyTouchClickEvent(this.btnNo, this.NoButtonClick);
            super.destroyEvents();
        }

        public OkButtonClick: { (e: any): void; };
        private okButtonClick(e): void {
            this.Model.set("editModel.result", 0);
            this.SaveButtonClick(e);
        }

        public NoButtonClick: { (e: any): void; };
        private noButtonClick(e): void {
            this.Model.set("editModel.result", 1);
            this.CancelButtonClick(e);
        }

        public validate(): boolean {
            let controller = this;
            let result: boolean = super.validate();

            if (result === true && this.OnResult)
                this.OnResult(controller);
            return result;
        }
    }
}

vars.registerController("terminal/changedialog", function (module: any): Interfaces.IController { return new module.Controller.Terminal.ChangeDialog(); });