import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import { _app } from 'app/common/variables';

export namespace Controller.Setting.Editor {
    export class Employee extends base.Controller.BaseEditor {
        constructor() {
            super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/setting/editor/employee.html", Id: "editor-view-employee" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
            });
        }
    }
}