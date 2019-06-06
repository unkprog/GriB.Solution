var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "app/common/variables", "app/controller/setting/card/card"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Setting;
        (function (Setting) {
            var Card;
            (function (Card) {
                var Printer = /** @class */ (function (_super) {
                    __extends(Printer, _super);
                    function Printer() {
                        return _super.call(this) || this;
                    }
                    Printer.prototype.createModel = function () {
                        return new kendo.data.ObservableObject({
                            "Header": vars._statres("label$printers"),
                            "cardModel": []
                        });
                    };
                    Printer.prototype.createCardSettings = function () {
                        return {
                            FieldId: "id", FilterSettings: this.createCardFilterSettings(), ValueIdNew: -1, EditIdName: "id_printer", EditController: "setting/editor/printer",
                            IsAdd: true, IsAddCopy: false, IsEdit: true, IsDelete: true, IsSelect: false,
                            Load: $.proxy(this.Service.GetPrinters, this.Service), Delete: $.proxy(this.Service.DelPrinter, this.Service),
                            Columns: [
                                { Header: vars._statres("label$name"), Field: "name", },
                                { Header: vars._statres("label$printserver"), Field: "printserver.pskey", },
                                { Header: vars._statres("label$salePoint"), Field: "salepoint.name", },
                                { Header: vars._statres("label$papersize"), Field: "labelsize", FieldTemplate: '#if (labelsize === 1) {# 80 #} else {# 58 #}#' }
                            ]
                        };
                    };
                    return Printer;
                }(card.Controller.Setting.Card.Card));
                Card.Printer = Printer;
            })(Card = Setting.Card || (Setting.Card = {}));
        })(Setting = Controller.Setting || (Controller.Setting = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("setting/card/printer", function (module) { return new module.Controller.Setting.Card.Printer(); });
});
//# sourceMappingURL=printer.js.map