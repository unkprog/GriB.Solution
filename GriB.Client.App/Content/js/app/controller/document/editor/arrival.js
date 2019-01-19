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
define(["require", "exports", "app/common/variables", "app/controller/document/editor/editor"], function (require, exports, vars, edit) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Editor;
            (function (Editor) {
                var Arrival = /** @class */ (function (_super) {
                    __extends(Arrival, _super);
                    function Arrival() {
                        return _super.call(this) || this;
                    }
                    Object.defineProperty(Arrival.prototype, "Header", {
                        get: function () {
                            return vars._statres("label$arrival");
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Arrival.prototype, "EditIdName", {
                        get: function () {
                            return "id_arrival";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Arrival.prototype, "FilterId", {
                        get: function () {
                            return "DocumentFilterArrival";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Arrival.prototype, "DocType", {
                        get: function () {
                            return 10;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    return Arrival;
                }(edit.Controller.Document.Editor.Editor));
                Editor.Arrival = Arrival;
            })(Editor = Document.Editor || (Document.Editor = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/editor/arrival", function (module) { return new module.Controller.Document.Editor.Arrival(); });
});
//# sourceMappingURL=arrival.js.map