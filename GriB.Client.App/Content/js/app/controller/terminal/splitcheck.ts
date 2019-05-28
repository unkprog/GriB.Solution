import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');


export namespace Controller.Terminal {
    export class SplitCheck extends base.Controller.BaseEditor implements Interfaces.IControllerSplitCheck {
        constructor() {
            super();
            if (this.EditorSettings) {
                if (this.EditorSettings.ButtonSetings) {
                    this.EditorSettings.ButtonSetings.IsSave = true;
                    this.EditorSettings.ButtonSetings.IsCancel = true;
                }
            }
            //this.Model.set("editModel.result", -1);
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/splitcheck.html", Id: "splitcheck-view" };
        }

        public get EditorModel(): Interfaces.Model.ISplitCheckModel {
            return this.Model.get("editModel").toJSON();
        }

        public set EditorModel(value: Interfaces.Model.ISplitCheckModel) {
            let model: Interfaces.Model.ISplitCheckModel = value;
            let rows: Interfaces.Model.IPOSCheckPosition[] = model.currentCheck.positions;
            model.positions = [];
            for (let i = 0, icount = (rows ? rows.length : 0); i < icount; i++) {
                model.positions.push(JSON.parse(JSON.stringify(rows[i])));
                model.positions[i].index = i + 1;
                model.positions[i].quantityOld = model.positions[i].quantity;
                model.positions[i].quantity = 0;
            }
            this.Model.set("editModel", value);
            this.tableSplitControlSetup();
        }

        public OnResult: { (controller: Interfaces.IControllerSplitCheck): void; };

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": vars._statres("label$splitcheck"),
                "editModel": {
                    currentCheck: {},
                    positions: []
                }
            });

            return result;
        }

        private tableSplitControl: JQuery;
        private tableSplitBodyControl: JQuery;

        public ViewInit(view: JQuery): boolean {
            let controller = this;

            controller.tableSplitControl = view.find("#splitcheck-view-table");
            controller.tableSplitBodyControl = this.tableSplitControl.find("tbody");

            return super.ViewInit(view);
        }

        protected loadData(): boolean {
            let controller = this;
            controller.afterLoad();
            controller.endLoad();
            controller.tableSplitControlSetup();
            return true;
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
        }

        protected destroyEvents(): void {
            let controller = this;
            utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick);
            utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick);
            utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick);
            super.destroyEvents();
        }

        public validate(): boolean {
            let controller = this;
            let result: boolean = super.validate();

            if (result === true && this.OnResult)
                this.OnResult(controller);

            return result;
        }

        private tableSplitControlSetup() {
            if (!this.tableSplitControl)
                return;

            let controller = this;

            utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick);
            utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick);
            utils.destroyTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick);

            let model: Interfaces.Model.ISplitCheckModel = this.EditorModel;
            let html: string = '';
            let rows: Interfaces.Model.IPOSCheckPosition[] = model.currentCheck.positions;
            for (let i = 0, icount = (rows ? rows.length : 0); i < icount; i++) {
           
                html += '<tr id="check_pos_' + i + '">';
                html += '<td class="product-col-name">' + model.positions[i].product.name + '</td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_add"><i class="material-icons editor-header">add_circle_outline</i></a></td>';
                html += '<td class="product-col-quantity-auto"><div class="doc-edit-ref check_pos_q_edit">' + model.positions[i].quantity + '</div></td>';
                html += '<td class="product-col-btn"><a class="product-col-button-delete check_pos_q_del"><i class="material-icons editor-header">remove_circle_outline</i></a></td>';
                //html += '<td class="product-col-quantity-auto"><div class="doc-edit-ref check_pos_q_edit">' + model.positions[i].quantityOld + '</div></td>';
                html += '</tr>';
            }
            controller.tableSplitBodyControl.html(html);

            utils.createTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_add'), controller.checkPosAddQuantitytButtonClick, controller);
            utils.createTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_del'), controller.checkPosDelQuantitytButtonClick, controller);
            utils.createTouchClickEvent(controller.tableSplitBodyControl.find('.check_pos_q_edit'), controller.checkPosEditQuantitytButtonClick, controller);
        }


        private checkPosAddQuantitytButtonClick(e): void {
            let controller = this;
            let model: Interfaces.Model.ISplitCheckModel = controller.EditorModel;
            let positionsArray: Interfaces.Model.IPOSCheckPositionSplit[] = (model.positions ? model.positions : []);
            let curRow: JQuery = $(e.currentTarget).parent().parent();
            if (curRow && curRow.length > 0) {
                let id: number = +curRow[0].id.replace("check_pos_", "");
                if (model.currentCheck.positions[id].quantity > positionsArray[id].quantity) {
                    positionsArray[id].quantity = positionsArray[id].quantity + 1;
                    controller.Model.set("editModel", model);
                    controller.tableSplitControlSetup();
             }
            }
        }

        private checkPosDelQuantitytButtonClick(e): void {
            let controller = this;
            let model: Interfaces.Model.ISplitCheckModel = controller.EditorModel;
            let positionsArray: Interfaces.Model.IPOSCheckPositionSplit[] = (model.positions ? model.positions : []);
            let curRow: JQuery = $(e.currentTarget).parent().parent();
            if (curRow && curRow.length > 0) {
                let id: number = +curRow[0].id.replace("check_pos_", "");
                if (positionsArray[id].quantity > 0 ) {
                    positionsArray[id].quantity = positionsArray[id].quantity - 1;
                    if (positionsArray[id].quantity < 0)
                        positionsArray[id].quantity = 0;
                    this.Model.set("editModel", model);
                    controller.tableSplitControlSetup();
                }
            }
        }
        

        private editRowQuantity: number = -1;
        private checkPosEditQuantitytButtonClick(e): void {
            let self = this;
            let model: Interfaces.Model.ISplitCheckModel = self.EditorModel;
            let positionsArray: Interfaces.Model.IPOSCheckPositionSplit[] = (model.positions ? model.positions : []);
            let curRow: JQuery = $(e.currentTarget).parent().parent();
            if (curRow && curRow.length > 0) {
                self.editRowQuantity = +curRow[0].id.replace("check_pos_", "");
                vars._app.OpenController({
                    urlController: 'terminal/quantirynumpad', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlPaymentPinPad: Interfaces.IControllerPaymentNumPad = controller as Interfaces.IControllerPaymentNumPad;
                        ctrlPaymentPinPad.EditorSettings.ButtonSetings = { IsSave: false, IsCancel: false };
                        ctrlPaymentPinPad.TotalSum = positionsArray[self.editRowQuantity].quantityOld;
                        ctrlPaymentPinPad.ReceivedSum = undefined;
                        ctrlPaymentPinPad.SurrenderSum = undefined;
                        ctrlPaymentPinPad.OnPaymentApply = $.proxy(self.applyQuantity, self);
                    }
                });
            }
        }

        private applyQuantity(controller: Interfaces.IControllerPayment) {
            let self = this;
            if (self.editRowQuantity > -1) {
                let model: Interfaces.Model.ISplitCheckModel = self.EditorModel;
                let positionsArray: Interfaces.Model.IPOSCheckPositionSplit[] = (model.positions ? model.positions : []);
                positionsArray[self.editRowQuantity].quantity = controller.ReceivedSum;
                if (positionsArray[self.editRowQuantity].quantity < 0)
                    positionsArray[self.editRowQuantity].quantity = 0;
                else if (positionsArray[self.editRowQuantity].quantity > model.currentCheck.positions[self.editRowQuantity].quantity)
                    positionsArray[self.editRowQuantity].quantity = model.currentCheck.positions[self.editRowQuantity].quantity;

                self.Model.set("editModel", model);
                self.tableSplitControlSetup();
            }
        }

    }
}

vars.registerController("terminal/splitcheck", function (module: any): Interfaces.IController { return new module.Controller.Terminal.SplitCheck(); });