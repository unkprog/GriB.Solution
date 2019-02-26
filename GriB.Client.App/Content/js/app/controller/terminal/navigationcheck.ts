import vars = require('app/common/variables');
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
            this.buttonCheckDiscount = this.controlContainerChecks.find("#btn-check-discount-item");
            this.buttonCheckNoDiscount = this.controlContainerChecks.find("#btn-check-nodiscount-item");
            this.buttonCheckComment = this.controlContainerChecks.find("#btn-check-comment");
            this.buttonCheckMenu = this.controlContainerChecks.find("#btn-check-menu");
            this.buttonCheckPayment = this.controlContainerChecks.find("#btn-check-payment");
            this.buttonCheckCancel = this.controlContainerChecks.find("#btn-check-cancel-item");

            this.model = new kendo.data.ObservableObject({
                "visibleCheck": false,
                "labelTime": vars._statres("label$time"),
                "checkTime": "",
                "labelClient": vars._statres("label$client"),
                "checkClient": "",
                "visibleClient": false,
                "checkDiscount": "",
                "visibleDiscount": false,
                "labelPayment": vars._statres("label$payment"),
                "checkSum": 0,
                "checkSumNoDiscount" : 0,
                "checkSumText": "0.00",
                "checkSumNoDiscountText": "0.00",
                "labetToDiscount": "со скидкой",
                "labelDiscount": vars._statres("label$discount"),
                "labelNoDiscount": vars._statres("label$withoutdiscount"),
                "labelCancelOrder": vars._statres("label$cancelorder"),
                "labelSplitCheck": vars._statres("label$splitcheck"),
                "labelPrintPreCheck": vars._statres("label$printprecheck")
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
        private buttonCheckDiscount: JQuery;
        private buttonCheckNoDiscount: JQuery;
        private buttonCheckComment: JQuery;
        private buttonCheckMenu: JQuery;
        private buttonCheckPayment: JQuery;

        private buttonCheckCancel: JQuery;

        public get ControlContainerChecks() {
            return this.controlContainerChecks;
        }

        public ViewShow(e: any): void {
            //let controller = this;
            $('.chips').chips(); //{ onChipDelete: $.proxy(controller.CheckDelete, controller) }
            $('#btn-check-discount').dropdown();
            $('#btn-check-menu').dropdown();
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
            this.DiscountButtonClick = utils.createTouchClickEvent(this.buttonCheckDiscount, this.discountButtonClick, this);
            this.NoDiscountButtonClick = utils.createTouchClickEvent(this.buttonCheckNoDiscount, this.noDiscountButtonClick, this);
            this.CancelCheckButtonClick = utils.createTouchClickEvent(this.buttonCheckCancel, this.cancelCheckButtonClick, this);
            this.CommentButtonClick = utils.createTouchClickEvent(this.buttonCheckComment, this.commentButtonClick, this);
            this.PaymentButtonClick = utils.createTouchClickEvent(this.buttonCheckPayment, this.paymentButtonClick, this);
        }

        public destroyEvents(): void {
            this.controlContainerChecks.unbind();
            utils.destroyTouchClickEvent(this.controlTableBodyPositions.find('.check_pos_q_add'), this.checkPosAddQuantitytButtonClick);
            utils.destroyTouchClickEvent(this.controlTableBodyPositions.find('.check_pos_q_edit'), this.checkPosEditQuantitytButtonClick);
            utils.destroyTouchClickEvent(this.controlTableBodyPositions.find('.check_pos_q_del'), this.checkPosDelQuantitytButtonClick);
            utils.destroyTouchClickEvent(this.buttonNewCheck, this.NewCheckButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckClient, this.ClientButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckDiscount, this.DiscountButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckNoDiscount, this.NoDiscountButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckCancel, this.CancelCheckButtonClick);
            utils.destroyTouchClickEvent(this.buttonCheckComment, this.CommentButtonClick);
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
            }
            else if (e.field === "checkClient") {
                let checkClient: string = this.model.get("checkClient");
                this.model.set("visibleClient", (checkClient && checkClient !== "" ? "display" : "none"));
            }
            else if (e.field === "checkSum") {
                this.model.set("checkSumText", utils.numberToString(this.model.get("checkSum"), 2));
            }
            else if (e.field === "checkSumNoDiscount") {
                this.model.set("checkSumNoDiscountText", utils.numberToString(this.model.get("checkSumNoDiscount"), 2));
            }
            else if (e.field === "checkDiscount") {
                let discount: number = this.model.get("checkDiscount");
                this.model.set("visibleDiscount", discount !== 0);
            }
            else if (e.field === "visibleClient" || e.field === "visibleDiscount" || e.field === "visibleCheck") {
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
                this.model.set("checkTime", utils.date_ddmmyyyy_withtime(controller.currentCheck.cd));
                this.model.set("visibleClient", (controller.currentCheck.client && controller.currentCheck.client.name && controller.currentCheck.client.name != ""));
                if (controller.currentCheck.client)
                    this.model.set("checkClient", controller.currentCheck.client.name);
            }
            else {
                this.model.set("checkTime", "");
                this.model.set("checkClient", "");
                this.model.set("visibleCheck", false);
            }

            this.controlContainerChecks.unbind();
            this.drawCheckPositions(false);
            kendo.bind(this.controlContainerChecks, this.model);
            this.model.bind("change", $.proxy(this.changeModel, this));

            controller.calcCheckSum();

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

        private drawCheckPositions(isBinded: boolean = true): void {
            let controller = this;
            let html: string = '';
            let sum: number = 0;
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck && controller.currentCheck.positions ? controller.currentCheck.positions : []);
            utils.destroyTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick);
            utils.destroyTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick);
            utils.destroyTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick);


            for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                html += '<tr id="check_pos_' + i + '">';
                html += '<td class="product-col-name">' + positionsArray[i].product.name + '</td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_add"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                html += '<td class="product-col-quantity-auto"><div class="doc-edit-ref check_pos_q_edit">' + positionsArray[i].quantity + '</div></td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_del"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                html += '<td class="product-col-sum-auto">' + utils.numberToString(positionsArray[i].price, 2) + '</td>';
                html += '</tr>';
            }

            controller.controlTableBodyPositions.html(html);
            utils.createTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick, controller);
            utils.createTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick, controller);
            utils.createTouchClickEvent(controller.controlTableBodyPositions.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick, controller);
            if (isBinded === true)
                controller.calcCheckSum();
        }

        private calcCheckSum(): number {
            let controller = this;
            let result: number = 0;
            let resultDiscount: number = 0;
            if (controller.currentCheck) {
                let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                    positionsArray[i].sum = (positionsArray[i].quantity ? positionsArray[i].quantity : 0) * (positionsArray[i].price ? positionsArray[i].price : 0);
                    result += positionsArray[i].sum;
                }
                resultDiscount = result - ((controller.currentCheck.discount / 100) * result);
            }
            this.model.set("checkDiscount", controller.currentCheck.discount + '%' + (controller.currentCheck.discountref && utils.isNullOrEmpty(controller.currentCheck.discountref.name) === false ? ' (' + controller.currentCheck.discountref.name + ')' : '') );
            this.model.set("checkSum", resultDiscount);
            this.model.set("checkSumNoDiscount", result);
            return result;
        }

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
            let id: number = +targetid.replace("check_id_", "");
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

        private updateResponsePositions(responseData:any) {
            let controller = this;
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
            let newItem: Interfaces.Model.IPOSCheckPosition = responseData.newposition;
            let isNotFound: boolean = true;
            for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                if (newItem.index === positionsArray[i].index) {
                    if (newItem.quantity <= 0)
                        positionsArray.splice(i, 1);
                    else
                        positionsArray[i] = newItem;
                    isNotFound = false;
                    break;
                }
            }
            if (isNotFound === true)
                positionsArray.push(newItem);

            this.drawCheckPositions();
        }

        public _EditPosition(product: number, qunatity: number): void {
            let controller = this;
            if (controller.currentCheck) {
                this.Service.EditPosCheck(controller.currentCheck.id, product, qunatity, (responseData) => {
                    controller.updateResponsePositions(responseData);
                });
            }
        }

        public _AddPosition(product: number, qunatity:number = 1): void {
            let controller = this;
            if (controller.currentCheck) {
                this.Service.AddToCheck(controller.currentCheck.id, product, qunatity, (responseData) => {
                    //let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
                    //let newItem: Interfaces.Model.IPOSCheckPosition = responseData.newposition;
                    //let isNotFound: boolean = true;
                    //for (let i = 0, iCount = (positionsArray ? positionsArray.length : 0); i < iCount; i++) {
                    //    if (newItem.index === positionsArray[i].index) {
                    //        if (newItem.quantity <= 0)
                    //            positionsArray.splice(i, 1);
                    //        else
                    //            positionsArray[i] = newItem;
                    //        isNotFound = false;
                    //        break;
                    //    }
                    //}
                    //if (isNotFound === true)
                    //    positionsArray.push(newItem);

                    //this.drawCheckPositions();
                    controller.updateResponsePositions(responseData);

                });
            }
        }

        private checkPosAddQuantitytButtonClick(e): void {
            let controller = this;
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
            let curRow: JQuery = $(e.currentTarget).parent().parent();
            if (curRow && curRow.length > 0) {
                let id: number = +curRow[0].id.replace("check_pos_", "");
                controller._AddPosition(positionsArray[id].product.id);
            }
        }

        private editRowQuantity: number = -1;
        private checkPosEditQuantitytButtonClick(e): void {
            let self = this;
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (self.currentCheck.positions ? self.currentCheck.positions : []);
            let curRow: JQuery = $(e.currentTarget).parent().parent();
            if (curRow && curRow.length > 0) {
                self.editRowQuantity = +curRow[0].id.replace("check_pos_", "");
                vars._app.OpenController({
                    urlController: 'terminal/quantirynumpad', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlPaymentPinPad: Interfaces.IControllerPaymentNumPad = controller as Interfaces.IControllerPaymentNumPad;
                        ctrlPaymentPinPad.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                        ctrlPaymentPinPad.TotalSum = positionsArray[self.editRowQuantity].quantity;
                        ctrlPaymentPinPad.ReceivedSum = undefined;
                        ctrlPaymentPinPad.SurrenderSum = undefined;
                        ctrlPaymentPinPad.OnPaymentApply = $.proxy(self.applyQuantity, self);
                    }
                });
            }
        }

        private applyQuantity(controller: Interfaces.IControllerPayment) {
            let self = this;
            if (this.currentCheck) {
                //this.paymentData.paymentOption = controller.TypeWithOut;
                //this.paymentData.paymentSum = controller.TotalSum; //(this.paymentData.paymentType === 3 ? 0 : controller.TotalSum);
                //this.paymentData.comment = controller.Comment;
                //this.closeCheck(this.paymentData);
                let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (self.currentCheck.positions ? self.currentCheck.positions : []);
                if (self.editRowQuantity > -1)
                    self._EditPosition(positionsArray[self.editRowQuantity].product.id, controller.ReceivedSum);
            }
        }

        private checkPosDelQuantitytButtonClick(e): void {
            let controller = this;
            let positionsArray: Interfaces.Model.IPOSCheckPosition[] = (controller.currentCheck.positions ? controller.currentCheck.positions : []);
            let curRow: JQuery = $(e.currentTarget).parent().parent();
            if (curRow && curRow.length > 0) {
                let id: number = +curRow[0].id.replace("check_pos_", "");
                controller._AddPosition(positionsArray[id].product.id, -1);
            }
        }

        public ClientButtonClick: { (e: any): void; };
        private clientButtonClick(e): void {
            let self = this;

            vars._app.OpenController({
                urlController: 'setting/card/client', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrClient: Interfaces.ICardClient = controller as Interfaces.ICardClient;
                    ctrClient.IsShowPhone(vars._identity.employee.isfullaccess === true);
                    ctrClient.CardSettings.IsAdd = false;
                    ctrClient.CardSettings.IsEdit = false;
                    ctrClient.CardSettings.IsDelete = false;
                    ctrClient.CardSettings.IsSelect = true;
                    ctrClient.OnSelect = $.proxy(self.selectClient, self);
                }
            });
        }

        private selectClient(controller: Interfaces.IControllerCard) {
            let record: Interfaces.Model.IClientModel = controller.getSelectedRecord() as Interfaces.Model.IClientModel;
            if (record) {
                let controller = this;
                controller.currentCheck.client = { id: record.id, name: record.name /*+ (utils.isNullOrEmpty(record.phone) ? "" : " (" + record.phone + ")")*/ };
                controller.Service.CheckSetClient(controller.currentCheck.id, controller.currentCheck.client.id, (responseData) => {
                    controller.model.set("checkClient", (controller.currentCheck.client ? controller.currentCheck.client.name : ""));
                });
              
            }
        }

        // Установить скидку
        public DiscountButtonClick: { (e: any): void; };
        private discountButtonClick(e) {
            let self = this;

            vars._app.OpenController({
                urlController: 'setting/card/discount', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlProduct: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlProduct.CardSettings.IsAdd = false;
                    ctrlProduct.CardSettings.IsEdit = false;
                    ctrlProduct.CardSettings.IsDelete = false;
                    ctrlProduct.CardSettings.IsSelect = true;
                    ctrlProduct.OnSelect = $.proxy(self.selectDiscount, self);
                }
            });
        }

        private selectDiscount(controller: Interfaces.IControllerCard) {
            let record: Interfaces.Model.IDiscountModel = controller.getSelectedRecord() as Interfaces.Model.IDiscountModel;
            if (record) {
                let controller = this;
                controller.Service.CheckSetDiscount(controller.currentCheck.id, record, (responseData) => {
                    controller.currentCheck.discount = record.value;
                    controller.currentCheck.discountref = record;
                    controller.drawCheckPositions();
                });

            }
        }

        // Убрать скидку
        public NoDiscountButtonClick: { (e: any): void; };
        private noDiscountButtonClick(e) {
            let controller = this;
            if (controller.currentCheck) {
                controller.Service.CheckSetDiscount(controller.currentCheck.id, undefined, (responseData) => {
                    controller.currentCheck.discount = 0;
                    controller.currentCheck.discountref = undefined;
                    controller.drawCheckPositions();
                });
            }
        }

        // Отменить чек
        public CancelCheckButtonClick: { (e: any): void; };
        private cancelCheckButtonClick(e) {
            let controller = this;
            let self = this;
            if (self.currentCheck) {
                vars._app.OpenController({
                    urlController: 'terminal/checkcomment', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlComment: Interfaces.IControllerCheckComment = controller as Interfaces.IControllerCheckComment;
                        ctrlComment.Header = vars._statres("label$specifyreasoncancel");
                        ctrlComment.IsRequireComment = true;
                        ctrlComment.Comment = self.currentCheck.comment;
                        ctrlComment.OnApply = $.proxy(self.cancelCheckComment, self);
                    }
                });
            }
        }

        private cancelCheckComment(controller: Interfaces.IControllerCheckComment) {
            let self = this;
            if (self.currentCheck) {
                self.Service.CheckCancel(self.currentCheck.id, controller.Comment, (responseData) => {
                    self.removeCurrentCheck(self.currentCheck);
                });
            }
        }

        // Комментарий к заказу
        public CommentButtonClick: { (e: any): void; };
        private commentButtonClick(e) {
            let self = this;
            if (self.currentCheck) {
                vars._app.OpenController({
                    urlController: 'terminal/checkcomment', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlComment: Interfaces.IControllerCheckComment = controller as Interfaces.IControllerCheckComment;
                        ctrlComment.Header = vars._statres("label$commenttoorder");
                        ctrlComment.Comment = self.currentCheck.comment;
                        ctrlComment.OnApply = $.proxy(self.applyCheckComment, self);
                    }
                });
            }
        }

        private applyCheckComment(controller: Interfaces.IControllerCheckComment) {
            let self = this;
            if (self.currentCheck) {
                self.Service.CheckSetComment(self.currentCheck.id, controller.Comment, (responseData) => {
                    self.currentCheck.comment = controller.Comment;
                });
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

        private paymentData: Interfaces.Model.ICheckCloseParams = { check: 0, paymentType: 0, paymentOption: 0, paymentSum: 0, salepoint: 0, client: 0, comment: '' };
        private selectTypePayment(controller: Interfaces.IControllerPaymentType) {
            let self = this;
            if (self.currentCheck) {
                let sum: number = this.model.get("checkSum");
                if (sum === undefined || sum <= 0) {
                    M.toast({ html: vars._statres("error$terminal$ammountnotset") });
                    return;
                }
                self.paymentData = { check: self.currentCheck.id, salepoint: self.terminal.CurrentSalePoint, client: self.currentCheck.client.id, paymentType: controller.SelectedPaymentType, paymentOption: 0, paymentSum: 0, comment: '' };
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