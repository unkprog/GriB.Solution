var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/controller/setting/editor/productmapbase"], function (require, exports, vars, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Editor;
            (function (Editor) {
                var ProductMap = /** @class */ (function (_super) {
                    __extends(ProductMap, _super);
                    function ProductMap() {
                        return _super.call(this) || this;
                    }
                    ProductMap.prototype.createEditorSettings = function () {
                        return { EditIdName: "id_productmap", Load: $.proxy(this.Service.GetProduct, this.Service), Save: $.proxy(this.Service.SetProduct, this.Service) };
                    };
                    return ProductMap;
                }(edit.Controller.Setting.Editor.ProductMapBase));
                Editor.ProductMap = ProductMap;
            })(Editor = Setting.Editor || (Setting.Editor = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/editor/productmap", function (module) { return new module.Controller.Setting.Editor.ProductMap(); });
});
//# sourceMappingURL=productmap.js.map