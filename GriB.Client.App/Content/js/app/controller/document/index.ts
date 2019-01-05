import vars = require('app/common/variables');
import base = require('app/common/basecontroller');

export namespace Controller.Document {
    export class Index extends base.Controller.Base {
        constructor() {
           super();
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/document/index.html", Id: "document-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "POS Cloud",
                "labelDocuments": vars._statres("label$documents"),
                "labelArrival": vars._statres("label$arrival"),
                "labelConsumption": vars._statres("label$consumption"),
                "labelReturn": vars._statres("label$return"),
                "labelWriteOff": vars._statres("label$writeoff"),
                "labelMovement": vars._statres("label$movement"),
                "labelProduction": vars._statres("label$productionmake"),
            });
        }

        protected createEvents(): void {
            this.ArrivalButtonClick = this.createTouchClickEvent("btn-arrival", this.arrivalButtonClick);
            this.ConsumptionButtonClick = this.createTouchClickEvent("btn-consumption", this.consumptionButtonClick);
            this.ReturnButtonClick = this.createTouchClickEvent("btn-return", this.returnButtonClick);
            this.WriteoffButtonClick = this.createTouchClickEvent("btn-writeoff", this.writeoffButtonClick);
            this.MovementButtonClick = this.createTouchClickEvent("btn-movement", this.movementButtonClick);
            this.ProductionButtonClick = this.createTouchClickEvent("btn-production", this.productionButtonClick);
        }

        protected destroyEvents(): void {
            this.destroyTouchClickEvent("btn-arrival", this.ArrivalButtonClick);
            this.destroyTouchClickEvent("btn-consumption", this.ConsumptionButtonClick);
            this.destroyTouchClickEvent("btn-return", this.ReturnButtonClick);
            this.destroyTouchClickEvent("btn-writeoff", this.WriteoffButtonClick);
            this.destroyTouchClickEvent("btn-movement", this.MovementButtonClick);
            this.destroyTouchClickEvent("btn-production", this.ProductionButtonClick);
        }

        public ArrivalButtonClick: { (e: any): void; };
        private arrivalButtonClick(e) {
            vars._main.OpenController({ urlController: "document/card/arrival", backController: this });
        }

        public ConsumptionButtonClick: { (e: any): void; };
        private consumptionButtonClick(e) {
            vars._main.OpenController({ urlController: "document/card/consumption", backController: this });
        }

        public ReturnButtonClick: { (e: any): void; };
        private returnButtonClick(e) {
            vars._main.OpenController({ urlController: "document/card/return", backController: this });
        }

        public WriteoffButtonClick: { (e: any): void; };
        private writeoffButtonClick(e) {
            vars._main.OpenController({ urlController: "document/card/writeoff", backController: this });
        }

        public MovementButtonClick: { (e: any): void; };
        private movementButtonClick(e) {
            vars._main.OpenController({ urlController: "document/card/movement", backController: this });
        }

        public ProductionButtonClick: { (e: any): void; };
        private productionButtonClick(e) {
            vars._main.OpenController({ urlController: "document/card/production", backController: this });
        }

    }
}

vars.registerController("document/index", function (module: any): Interfaces.IController { return new module.Controller.Document.Index(); });