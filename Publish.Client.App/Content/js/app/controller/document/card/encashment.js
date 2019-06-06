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
define(["require", "exports", "app/common/variables", "app/controller/document/card/paymentbase"], function (require, exports, vars, card) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Card;
            (function (Card) {
                var Encashment = /** @class */ (function (_super) {
                    __extends(Encashment, _super);
                    function Encashment() {
                        var _this = _super.call(this) || this;
                        _this.Model.set("Header", vars._statres("label$deposit"));
                        return _this;
                    }
                    Encashment.prototype.columns = function () {
                        return [
                            { Header: "", HeaderStyle: "doc-col-conduct", Field: "options", FieldStyle: "doc-col-conduct", FieldTemplate: '#if ((options & 1) === 1) {#<label><input type="checkbox" checked="checked" disabled="disabled"/><span></span></label>#}#' },
                            { Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" },
                            { Header: vars._statres("label$salePoint"), Field: "salepoint.name" },
                            { Header: vars._statres("label$employee"), Field: "employee.name" },
                            { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                        ];
                    };
                    Object.defineProperty(Encashment.prototype, "EditIdName", {
                        get: function () {
                            return "id_encashment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Encashment.prototype, "FilterId", {
                        get: function () {
                            return "EncashmentCardFilterSettings";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Encashment.prototype, "EditController", {
                        get: function () {
                            return "document/editor/encashment";
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Object.defineProperty(Encashment.prototype, "DocType", {
                        get: function () {
                            return 40;
                        },
                        enumerable: true,
                        configurable: true
                    });
                    Encashment.prototype.ViewInit = function (view) {
                        var result = _super.prototype.ViewInit.call(this, view);
                        var settings = this.CardSettings.FilterSettings;
                        if (settings) {
                            settings.showClient(false);
                            settings.showType(false);
                            settings.showWithout(false);
                        }
                        return result;
                    };
                    return Encashment;
                }(card.Controller.Document.Card.PaymentBase));
                Card.Encashment = Encashment;
            })(Card = Document.Card || (Document.Card = {}));
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/card/encashment", function (module) { return new module.Controller.Document.Card.Encashment(); });
});
//# sourceMappingURL=encashment.js.map