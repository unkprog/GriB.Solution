﻿import vars = require('app/common/variables');
import utils = require('app/common/utils');
import svc = require('app/services/posterminalservice');

export namespace Controller.Terminal {
    export class NavigationCheck implements Interfaces.ITerminalCheks {
        constructor(view: JQuery, terminal: Interfaces.ITerminal) {
            this.terminal = terminal;
            this.controlContainerChecks = view.find("#posterminal-view-checks-container");
            this.controlChecks = this.controlContainerChecks.find("#posterminal-view-checks");
            this.buttonNewCheck = this.ControlContainerChecks.find("#btn-check-new");
            this.controlButtons = this.controlContainerChecks.find("#posterminal-view-check-buttons");
            this.controlTablePositions = this.controlContainerChecks.find("#posterminal-view-check-positions");
            this.controlTableBodyPositions = this.controlTablePositions.find("tbody");
            this.controlTotal = this.controlContainerChecks.find("#posterminal-view-check-total");

            this.buttonCheckClient = this.controlContainerChecks.find("#btn-check-person");
            this.buttonCheckPayment = this.controlContainerChecks.find("#btn-check-payment");

            this.model = new kendo.data.ObservableObject({
                "visibleCheck": false,
                "labelTime": vars._statres("label$time"),
                "checkTime": "",
                "visibleClient": false,
                "labelClient": vars._statres("label$client"),
                "checkClient": "",
                "labelPayment": vars._statres("label$payment"),
                "checkSum": 0,
            });

        }

        private service: svc.Services.POSTerminalService;
        protected get Service(): svc.Services.POSTerminalService {
            if (!this.service)
                this.service = new svc.Services.POSTerminalService();
            return this.service;
        }

        private openedChecks: Interfaces.Model.IPOSCheck[] = [];
        private currentCheck: Interfaces.Model.IPOSCheck = undefined;

        private model: kendo.data.ObservableObject;
        public get Model(): kendo.data.ObservableObject {
            return this.model;
        }


        private terminal: Interfaces.ITerminal;
        private controlChecks: JQuery;
        private controlContainerChecks: JQuery;
        private buttonNewCheck: JQuery;
        private controlTablePositions: JQuery;
        private controlTableBodyPositions: JQuery;
        private controlTotal: JQuery;
        private controlButtons: JQuery;
        private buttonCheckClient: JQuery;
        private buttonCheckPayment: JQuery;

        public get ControlContainerChecks() {
            return this.controlContainerChecks;
        }

        public ViewShow(e: any): void {
            //let controller = this;
            $('.chips').chips(); //{ onChipDelete: $.proxy(controller.CheckDelete, controller) }
            this.ViewResize({});

        }

        public ViewResize(e: any): void {
            if (this.controlContainerChecks) {
                let height: number = $(window).height();
                let totalHeight: number = this.controlTotal.height() + 10;
                let btnheight: number = this.controlButtons.height() + 10;
                this.controlContainerChecks.height(height - this.controlContainerChecks.offset().top);

                if (this.controlTablePositions) {
                    this.controlTablePositions.height(height - this.controlTablePositions.offset().top - totalHeight - btnheight);
                    this.controlTablePositions.find('tbody').height(height - this.controlTablePositions.offset().top - totalHeight - btnheight);
                }
                //if (this.controlButtons)
                //    this.controlButtons.css({ "position": "absolute", "top": "" + (height - btnheight) + "px", "width": "" + this.controlContainerChecks.width() + "px" });
            }

        }

        public Reset(): void {
            this.openedChecks = [];
            this.currentCheck = undefined;
            this.loadData();
        }

        public loadData(): void {
            let controller = this;
          
            controller.Service.CheckOpened(controller.terminal.CurrentSalePoint, (responseData) => {
                controller.openedChecks = responseData.checkopened;
                controller.drawChecks(true);
                if (controller.openedChecks && controller.openedChecks.length > 0)
                    controller.setCurrentCheck(controller.openedChecks[0], undefined);
                else
                    controller.setCurrentCheck(undefined, undefined);
            });
        }

        public createEvents(): void {
            this.NewCheckButtonClick = utils.createTouchClickEvent(this.buttonNewCheck, this.newCheckButtonClick, this);
            this.ClientButtonClick = utils.createTouchClickEvent(this.buttonCheckClient, this.clientButtonClick, this);
            this.PaymentButtonClick = utils.createTouchClickEvent(this.buttonCheckPayment, this.paymentButtonClick, this);
        }

        public destroyEvents(): void {
            this.controlContainerChecks.unbind();
            utils.destroyTouchClickEvent(this.buttonNewCheck, this.NewCheckButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckClient, this.ClientButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckPayment, this.PaymentButtonClick);
            this.destroyEventsChecks();
        }

        public destroyEventsChecks(): void {
            utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip"), this.CheckButtonClick);
            utils.destroyTouchClickEvent(this.controlChecks.find(".check-chip i"), this.CheckDelete);
        }

        private changeModel(e) {
            if (e.field === "checkTime") {
                let checkTime: string = this.model.get("checkTime");
                let isVisible: boolean = (checkTime && checkTime !== "");
                this.model.set("visibleCheck", isVisible);
                if (isVisible === true)
                    this.ViewResize({});
            }
            else if (e.field === "checkClient") {
                let checkClient: string = this.model.get("checkClient");
                this.model.set("visibleClient", (checkClient && checkClient !== ""));
            }
            else if (e.field === "visibleCheck") {
                if (this.model.get("visibleCheck") === true)
                    this.ViewResize({});
            }
        }


        public setCurrentCheck(currentCheck: Interfaces.Model.IPOSCheck, onSetCurrent: () => void): void {
            let controller = this;
            if (controller.currentCheck)
                $('#check_id_' + controller.currentCheck.id).removeClass(['check-select', 'z-depth-1']);
            controller.currentCheck = currentCheck;
            if (controller.currentCheck) {
                $('#check_id_' + controller.currentCheck.id).addClass(['check-select', 'z-depth-1']);
                //this.model.set("checkSum", this.calcCheckSum());
                this.model.set("checkTime", utils.dateToLongString(controller.currentCheck.cd));
            }
            else {
                this.model.set("checkTime", "");
                this.model.set("checkClient", "");
                this.model.set("visibleCheck", false);
            }

            this.controlContainerChecks.unbind();
            this.drawCheckPositions();

            kendo.bind(this.controlContainerChecks, this.model);
            this.model.bind("change", $.proxy(this.changeModel, this));

            if (onSetCurrent)
                onSetCurrent();
            if (controller.currentCheck)
                this.model.set("visibleCheck", true);

        }

        public setCurrentCheckById(currentCheckId: number): void {
            let controller = this;
            for (let i = 0, iCount = (controller.openedChecks ? controller.openedChecks.length : 0); i < iCount; i++) {
                if (controller.openedChecks[i].id === currentCheckId) {
                    this.setCurrentCheck(controller.openedChecks[i], undefined);
                    break;
                }
            }
        }

        private drawChecks(isReset: boolean): void {
            let controller = this;
            let html: string = '';
            let strId: string;
            let findId: JQuery;

            if (isReset) {
                this.destroyEventsChecks();
                this.controlChecks.find(".check-chip").remove();
            }

            for (let i = 0, iCount = (controller.openedChecks ? controller.openedChecks.length : 0); i < iCount; i++) {
                strId = 'check_id_' + controller.openedChecks[i].id;
                findId = controller.controlChecks.find('#' + strId);
                if (!(findId && findId.length > 0)) 
                    html += '<div id="check_id_' + controller.openedChecks[i].id + '" class="chip check-chip">Чек №' + controller.openedChecks[i].number + '<i class="close material-icons">close</i></div>';
            }
            findId = $(html);

            this.CheckButtonClick = utils.createTouchClickEvent(findId, this.checkButtonClick, this);
            this.CheckDelete = utils.createTouchClickEvent(findId.find('i'), this.checkDelete, this);
            controller.controlChecks.append(findId);
        }

        private drawCheckPositions(): void {
            let controller = this;
            let html: string = '';
            let sum: number = 0;
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck && controller.currentCheck.positions ? controller.currentCheck.positions : []);
            for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                html += '<tr id="check_pos_' + i + '">';
                html += '<td class="product-col-name">' + positionsArray[i].product.name + '</td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                html += '<td class="product-col-quantity-auto">' + positionsArray[i].quantity + '</td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                html += '<td class="product-col-sum-auto">' + positionsArray[i].price + '</td>';
                html += '</tr>';
                positionsArray[i].sum = (positionsArray[i].quantity ? positionsArray[i].quantity : 0) * (positionsArray[i].price ? positionsArray[i].price : 0);
                sum += positionsArray[i].sum;
            }

            controller.controlTableBodyPositions.html(html);
            this.model.set("checkSum", sum);
        }

        //private calcCheckSum(): number {
        //    let controller = this;
        //    let result: number = 0;
        //    if (controller.currentCheck) {
        //        let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
        //        for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
        //            positionsArray[i].sum = (positionsArray[i].quantity * positionsArray[i].price);
        //            result += positionsArray[i].sum;
        //        }
        //    }
        //    return result;
        //}

        private NewCheckButtonClick: { (e: any): void; };
        private newCheckButtonClick(e): void {
            this.setCurrentOrNew(undefined);
        }

        private setCurrentOrNew(onSetCurrent: () => void) {
            let controller = this;
            if (controller.openedChecks && controller.openedChecks.length > 0) {
                for (let i = 0, iCount = controller.openedChecks.length; i < iCount; i++) {
                    let currentCheck: Interfaces.Model.IPOSCheck = controller.openedChecks[i];
                    if (!currentCheck.positions || currentCheck.positions.length < 1) {
                        controller.setCurrentCheck(currentCheck, onSetCurrent);
                        return;
                    }
                }
            }
            controller.Service.CheckNew(controller.terminal.CurrentSalePoint, (responseData) => {
                if (!controller.openedChecks) controller.openedChecks = [];
                controller.openedChecks.push(responseData.checknew);
                controller.drawChecks(false);
                controller.setCurrentCheck(responseData.checknew, onSetCurrent);
            });
        }

        private CheckButtonClick: { (e: any): void; };
        private checkButtonClick(e): void {
            let targetid: string = e.currentTarget.id;
            let id: number = + targetid.replace("check_id_", "");
            if (!id || id === -1) return;
            this.setCurrentCheckById(id);
        }

        private CheckDelete: { (e: any): void; };
        private checkDelete(e): void {
            e.stopPropagation();

            let targetid: string = e.currentTarget.parentElement.id;
            let id: number = +targetid.replace("check_id_", "");
            if (!id || id === -1) return;

            let controller = this;
            if (controller.openedChecks && controller.openedChecks.length > 0) {
                for (let i = 0, iCount = controller.openedChecks.length; i < iCount; i++) {
                    let currentCheck: Interfaces.Model.IPOSCheck = controller.openedChecks[i];
                    if (currentCheck.id === id && (!currentCheck.positions || currentCheck.positions.length < 1)) {
                        controller.Service.CheckDelete(currentCheck.id, (responseData) => {
                            controller.removeCurrentCheck(currentCheck);
                        });
                        return;
                    }
                }
            }
        }

        private removeCurrentCheck(currentCheck: Interfaces.Model.IPOSCheck) {
            if (!currentCheck) return;

            let controller = this;
            $("#check_id_" + currentCheck.id).remove();
            controller.openedChecks.splice(controller.openedChecks.indexOf(currentCheck), 1);
            if (controller.openedChecks.length > 0)
                controller.setCurrentCheck(controller.openedChecks[0], undefined);
            else
                controller.setCurrentCheck(undefined, undefined);
        }

        public AddPosition(product: number): void {
            let controller = this;
            if (!controller.currentCheck)
                controller.setCurrentOrNew(function () {
                    controller._AddPosition(product);
                });
            else
                controller._AddPosition(product);
        }

        public _AddPosition(product: number): void {
            let controller = this;
            if (controller.currentCheck) {
                this.Service.AddToCheck(controller.currentCheck.id, product, 1, (responseData) => {
                    let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    let newItem: Interfaces.Model.IPOSCheckPosition = responseData.newposition;
                    let isNotFound: boolean = true;
                    for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                        if (newItem.index === positionsArray[i].index) {
                            positionsArray[i] = newItem;
                            isNotFound = false;
                            break;
                        }
                    }
                    if (isNotFound === true)
                        positionsArray.push(newItem);

                    this.drawCheckPositions();
                });
            }
        }

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e): void {
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
            if (record) {
                this.currentCheck.client = { id: record.id, name: record.name + (utils.isNullOrEmpty(record.phone) ? "" : " (" + record.phone + ")") };
                this.model.set("checkClient", (this.currentCheck.client ? this.currentCheck.client.name : ""));
            }
        }

        public PaymentButtonClick: { (e: any): void; };
        private paymentButtonClick(e) {
            let self = this;

            vars._app.OpenController({
                urlController: 'terminal/paymenttype', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlTypePayment: Interfaces.IControllerPaymentType = controller as Interfaces.IControllerPaymentType;
                    ctrlTypePayment.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                    ctrlTypePayment.OnSelectPaymentType = $.proxy(self.selectTypePayment, self);
                }
            });
        }

        private paymentData: Interfaces.Model.ICheckCloseParams = { check: 0, paymentType: 0, paymentOption: 0, paymentSum: 0, client: 0, comment: '' };
        private selectTypePayment(controller: Interfaces.IControllerPaymentType) {
            let self = this;
            if (self.currentCheck) {
                self.paymentData = { check: self.currentCheck.id, client: self.currentCheck.client.id, paymentType: controller.SelectedPaymentType, paymentOption: 0, paymentSum: 0, comment: '' };
                if (this.paymentData.paymentType === 1) {
                    vars._app.OpenController({
                        urlController: 'terminal/paymentnumpad', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                            let ctrlPaymentPinPad: Interfaces.IControllerPaymentNumPad = controller as Interfaces.IControllerPaymentNumPad;
                            ctrlPaymentPinPad.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                            ctrlPaymentPinPad.TotalSum = this.model.get("checkSum");
                            ctrlPaymentPinPad.ReceivedSum = undefined;
                            ctrlPaymentPinPad.SurrenderSum = undefined;
                            ctrlPaymentPinPad.OnPaymentApply = $.proxy(self.applyPayment, self);
                        }
                    });
                } else if (this.paymentData.paymentType === 2) {
                    vars._app.OpenController({
                        urlController: 'terminal/paymentnoncash', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                            let ctrlPaymentNonCash: Interfaces.IControllerPaymentNonCash = controller as Interfaces.IControllerPaymentNonCash;
                            ctrlPaymentNonCash.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                            ctrlPaymentNonCash.TotalSum = this.model.get("checkSum");
                            ctrlPaymentNonCash.ReceivedSum = undefined;
                            ctrlPaymentNonCash.SurrenderSum = undefined;
                            ctrlPaymentNonCash.OnPaymentApply = $.proxy(self.applyPayment, self);
                        }
                    });
                } else if (this.paymentData.paymentType === 3) {
                    vars._app.OpenController({
                        urlController: 'terminal/paymentwithout', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                            let ctrlPaymentWithOut: Interfaces.IControllerPaymentWithOut = controller as Interfaces.IControllerPaymentWithOut;
                            ctrlPaymentWithOut.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                            ctrlPaymentWithOut.TotalSum = this.model.get("checkSum");
                            ctrlPaymentWithOut.ReceivedSum = this.model.get("checkSum");
                            ctrlPaymentWithOut.SurrenderSum = 0;
                            if (self.currentCheck.client)
                                ctrlPaymentWithOut.Client = self.currentCheck.client;
                            ctrlPaymentWithOut.OnPaymentApply = $.proxy(self.applyWithOut, self)
                        }
                    });
                }
            }
        }

        private applyPayment(controller: Interfaces.IControllerPayment) {
            if (this.currentCheck) {
                this.paymentData.paymentOption = controller.TypeWithOut;
                this.paymentData.paymentSum = controller.TotalSum; //(this.paymentData.paymentType === 3 ? 0 : controller.TotalSum);
                this.paymentData.comment = controller.Comment;
                this.closeCheck(this.paymentData);
            }
        }

        private applyWithOut(controller: Interfaces.IControllerPayment) {
            if (this.currentCheck) {
                this.currentCheck.client = controller.Client;
                this.paymentData.client = this.currentCheck.client.id;
                this.model.set("checkClient", (this.currentCheck.client ? this.currentCheck.client.name : ""));
            }
            this.applyPayment(controller);
        }


        private closeCheck(paymentData: Interfaces.Model.ICheckCloseParams) {
            let controller = this;
            if (controller.currentCheck) {
                this.Service.CheckClose(paymentData, (responseData) => {
                    controller.removeCurrentCheck(controller.currentCheck);
                });
            }
        }
    }
}