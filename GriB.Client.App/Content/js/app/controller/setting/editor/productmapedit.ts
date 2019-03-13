import vars = require('app/common/variables');
import edit = require('app/controller/setting/editor/productmapbase');

export namespace Controller.Setting.Editor {
    export class ProductMapEdit extends edit.Controller.Setting.Editor.ProductMapBase {
        constructor() {
            super();
        }
    }
}

vars.registerController("setting/editor/productmapedit", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.ProductMapEdit(); });