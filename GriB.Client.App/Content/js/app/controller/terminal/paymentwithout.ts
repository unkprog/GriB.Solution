import vars = require('app/common/variables');
import utils = require('app/common/utils');
import payment = require('app/controller/terminal/payment');


export namespace Controller.Terminal {
    export class PaymentWithOut extends payment.Controller.Terminal.Payment implements Interfaces.IControllerPaymentWithOut {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("label$withoutpayment"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/paymentwithout.html", Id: "paymentwithout-view" };
        }

        private inputClient: JQuery;
        public ViewInit(view: JQuery): boolean {
            this.inputTotalSum = view.find("#paymentwithout-view-totalsum");
            this.inputClient = view.find("#paymentwithout-view-client-row");

            this.btnPayment = view.find("#btn-num-apply");
            this.btnPaymentCancel = view.find("#btn-num-cancel");

            return super.ViewInit(view);
        }

        protected createEvents(): void {
            super.createEvents();
            this.ClientClick = this.createTouchClickEvent(this.inputClient, this.clientClick);
        }

        protected destroyEvents(): void {
            if (this.inputClient) this.destroyTouchClickEvent(this.inputClient, this.ClientClick);
            super.destroyEvents();
        }

        protected changeModel(e: any): void {
            if (e.field === "editModel.typeWithOut") {
                if (this.TypeWithOut == 1)
                    $("#paymentwithout-view-client-row").show();
                else
                    $("#paymentwithout-view-client-row").hide();
            }
            super.changeModel(e);
        }

        public validate(): boolean {
            let controller: Interfaces.IControllerPaymentWithOut = this;
            let result: boolean = true;

            if (!this.TypeWithOut || this.TypeWithOut < 1 || this.TypeWithOut > 3) {
                M.toast({ html: vars._statres("error$without$reasonnotspecified") });
                result = false;
            }

            if (this.TypeWithOut == 1 && (!this.Client || this.Client.id == 0)) {
                M.toast({ html: vars._statres("error$without$clientnotspecified") });
                result = false;
            }


            if (result === true && this.OnPaymentApply)
                this.OnPaymentApply(controller);
            return result;
        }

        public ClientClick: { (e: any): void; };
        private clientClick(e): void {
            let self = this;

            vars._app.OpenController({
                urlController: 'setting/card/client', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlProduct: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlProduct.CardSettings.IsAdd = false;
                    ctrlProduct.CardSettings.IsEdit = false;
                    ctrlProduct.CardSettings.IsDelete = false;
                    ctrlProduct.CardSettings.IsSelect = true;
                    ctrlProduct.OnSelect = $.proxy(self.selectClient, self);
                }
            });
        }

        private selectClient(controller: Interfaces.IControllerCard) {
            let record: Interfaces.Model.IClientModel = controller.getSelectedRecord() as Interfaces.Model.IClientModel;
            if (record)
                this.Client = { id: record.id, name: record.name + (utils.isNullOrEmpty(record.phone) ? "" : " (" + record.phone + ")") };
        }

    }
}

vars.registerController("terminal/paymentwithout", function (module: any): Interfaces.IController { return new module.Controller.Terminal.PaymentWithOut(); });