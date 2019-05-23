import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');


export namespace Controller.Terminal {
    export class SplitCheck extends base.Controller.BaseEditor implements Interfaces.IControllerSplitCheck {
        constructor() {
            super();
            if (this.EditorSettings) {
                if (this.EditorSettings.ButtonSetings) {
                    this.EditorSettings.ButtonSetings.IsSave = true;
                    this.EditorSettings.ButtonSetings.IsCancel = true;
                }
            }
            //this.Model.set("editModel.result", -1);
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/splitcheck.html", Id: "splitcheck-view" };
        }

        public get EditorModel(): Interfaces.Model.ICheckCommetModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": vars._statres("label$splitcheck"),
                "editModel": {} //Interfaces.Model.IPOSCheck
            });

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
            //this.Model.unbind("change");
           super.destroyEvents();
        }

        public validate(): boolean {
            let controller = this;
            let result: boolean = super.validate();

            //if (result === true && this.OnResult)
            //    this.OnResult(controller);
            return result;
        }
    }
}

vars.registerController("terminal/splitcheck", function (module: any): Interfaces.IController { return new module.Controller.Terminal.SplitCheck(); });