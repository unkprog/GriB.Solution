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
define(["require", "exports", "app/common/variables", "app/common/basecontroller"], function (require, exports, vars, base) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Controller;
    (function (Controller) {
        var Document;
        (function (Document) {
            var Index = /** @class */ (function (_super) {
                __extends(Index, _super);
                function Index() {
                    return _super.call(this) || this;
                }
                Index.prototype.createOptions = function () {
                    return { Url: "/Content/view/document/index.html", Id: "document-view" };
                };
                Index.prototype.createModel = function () {
                    return new kendo.data.ObservableObject({
                        "Header": "POS Cloud",
                        "labelDocuments": vars._statres("label$documents"),
                        "labelArrival": vars._statres("label$arrival"),
                        "labelConsumption": vars._statres("label$consumptions"),
                        "labelReturn": vars._statres("label$return"),
                        "labelWriteOff": vars._statres("label$writeoff"),
                        "labelMovement": vars._statres("label$movement"),
                        "labelProduction": vars._statres("label$roduction"),
                    });
                };
                Index.prototype.createEvents = function () {
                    this.ArrivalButtonClick = this.createTouchClickEvent("btn-arrival", this.arrivalButtonClick);
                    this.ConsumptionButtonClick = this.createTouchClickEvent("btn-consumption", this.consumptionButtonClick);
                    this.ReturnButtonClick = this.createTouchClickEvent("btn-return", this.returnButtonClick);
                    this.WriteoffButtonClick = this.createTouchClickEvent("btn-writeoff", this.writeoffButtonClick);
                    this.MovementButtonClick = this.createTouchClickEvent("btn-movement", this.movementButtonClick);
                    this.ProductionButtonClick = this.createTouchClickEvent("btn-production", this.productionButtonClick);
                };
                Index.prototype.destroyEvents = function () {
                    this.destroyTouchClickEvent("btn-arrival", this.ArrivalButtonClick);
                    this.destroyTouchClickEvent("btn-consumption", this.ConsumptionButtonClick);
                    this.destroyTouchClickEvent("btn-return", this.ReturnButtonClick);
                    this.destroyTouchClickEvent("btn-writeoff", this.WriteoffButtonClick);
                    this.destroyTouchClickEvent("btn-movement", this.MovementButtonClick);
                    this.destroyTouchClickEvent("btn-production", this.ProductionButtonClick);
                };
                Index.prototype.arrivalButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "document/card/arrival", backController: this });
                };
                Index.prototype.consumptionButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "document/card/consumption", backController: this });
                };
                Index.prototype.returnButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "document/card/return", backController: this });
                };
                Index.prototype.writeoffButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "document/card/writeoff", backController: this });
                };
                Index.prototype.movementButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "document/card/movement", backController: this });
                };
                Index.prototype.productionButtonClick = function (e) {
                    vars._main.OpenController({ urlController: "document/card/production", backController: this });
                };
                return Index;
            }(base.Controller.Base));
            Document.Index = Index;
        })(Document = Controller.Document || (Controller.Document = {}));
    })(Controller = exports.Controller || (exports.Controller = {}));
    vars.registerController("document/index", function (module) { return new module.Controller.Document.Index(); });
});
//# sourceMappingURL=index.js.map