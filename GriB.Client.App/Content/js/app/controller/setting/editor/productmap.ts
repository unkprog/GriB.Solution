import vars = require('app/common/variables');
import edit = require('app/controller/setting/editor/productmapbase');

export namespace Controller.Setting.Editor {
    export class ProductMap extends edit.Controller.Setting.Editor.ProductMapBase {
        constructor() {
            super();
        }

        protected createEditorSettings(): Interfaces.Control.IEditorSettings {
            return { EditIdName: "id_productmap", Load: $.proxy(this.Service.GetProduct, this.Service), Save: $.proxy(this.Service.SetProduct, this.Service) };
        }

    }
}

vars.registerController("setting/editor/productmap", function (module: any): Interfaces.IController { return new module.Controller.Setting.Editor.ProductMap(); });