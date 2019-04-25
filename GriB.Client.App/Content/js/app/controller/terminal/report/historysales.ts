import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import ctrl = require('app/common/basecontrol');
import posctrl = require('app/common/poscontrol');
import svcReport = require('app/services/reportsservice');
import svcTerminal = require('app/services/posterminalservice');
import svcPrint = require('app/services/printservice');

export namespace Controller.Terminal.Report {
    export class HistorySales extends base.Controller.BaseEditor implements Interfaces.IControllerHistorySales {
        constructor() {
            super();
            if (this.EditorSettings) {
                if (this.EditorSettings.ButtonSetings) {
                    this.EditorSettings.ButtonSetings.IsPrint = true;
                    this.EditorSettings.ButtonSetings.IsSave = false;
                    this.EditorSettings.ButtonSetings.IsCancel = true;
                }
            }
            
        }

        private reportsService: svcReport.Services.ReportsService;
        protected get ReportService(): svcReport.Services.ReportsService {
            if (!this.reportsService)
                this.reportsService = new svcReport.Services.ReportsService();
            return this.reportsService;
        }

        private terminalService: svcTerminal.Services.POSTerminalService;
        protected get TerminalService(): svcTerminal.Services.POSTerminalService {
            if (!this.terminalService)
                this.terminalService = new svcTerminal.Services.POSTerminalService();
            return this.terminalService;
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/terminal/report/historysales.html", Id: "historysales-view" };
        }

        public get EditorModel(): Interfaces.Model.ICheckCommetModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": "",
                "HeaderHisorySales": vars._statres("label$historysales"),
                "reportModel": {
                    "historyRows": [],
                    "historyCheck": {},
                },
                "currentChange": 0,
                "currentSalePoint": 0,
            });

            return result;
        }

        public get CurrentChange(): number {
            return this.Model.get("currentChange");
        };

        public set CurrentChange(value: number) {
            this.Model.set("currentChange", value);
        };

        protected tableSalesControl: ctrl.Control.BaseTable;
        protected checkViewContainer: JQuery;
        protected checkViewControl: posctrl.POSControl.CheckViewControl;
        public ViewInit(view: JQuery): boolean {
            let controller = this;
            
            controller.tableSalesControl = new ctrl.Control.BaseTable();
            view.find("#historysales-view-table").append(controller.tableSalesControl.InitView());

            controller.checkViewContainer = view.find("#historysales-view-check");
            controller.checkViewControl = new posctrl.POSControl.CheckViewControl();
            controller.checkViewControl.PrintService = new svcPrint.Services.PrintService();
            if (vars._identity.printers && vars._identity.printers.length > 0)
                controller.checkViewControl.Printer = vars._identity.printers[0];
            controller.checkViewContainer.append(controller.checkViewControl.InitView());

            return super.ViewInit(view);
        }

        protected loadData(): boolean {
            let controller = this;
            controller.ReportService.GetHistorySales(controller.CurrentChange, (responseData) => {
                controller.Model.set("reportModel.historyRows", responseData);
                controller.afterLoad(responseData);
                controller.endLoad();
            });
            return false;
        }

        protected loadCheckData(id:number){
            let controller = this;
            controller.TerminalService.GetCheckHistory(id, (responseData) => {
                controller.Model.set("reportModel.historyCheck", responseData);
                controller.setupCheckView();
            });
            return false;
        }


        protected afterLoad(responseData?: any): void {
            this.setupTable();
            let historyRows: Array<any> = this.Model.get("reportModel.historyRows");
            this.loadCheckData((historyRows && historyRows.length > 0 && historyRows[0] && historyRows[0].checkid ? historyRows[0].checkid: 0));
            super.afterLoad(responseData);
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
            this.tableSalesControl.OnSelect = $.proxy(this.onSelect, this);

            //this.EncashmentButtonClick = this.createTouchClickEvent(this.btnEncashment, this.encashmentButtonClick);
            //this.DepositButtonClick = this.createTouchClickEvent(this.btnDeposit, this.depositButtonClick);
            //this.WithdrawalButtonClick = this.createTouchClickEvent(this.btnWithDrawing, this.withdrawalButtonClick);
            //this._CancelButtonClick = this.createTouchClickEvent(this.btnCancelButton, this._cancelButtonClick);
        }

        protected destroyEvents(): void {
            this.tableSalesControl.OnDetalize = undefined;

            //if (this.btnEncashment) this.destroyTouchClickEvent(this.btnEncashment, this.EncashmentButtonClick);
            //if (this.btnDeposit) this.destroyTouchClickEvent(this.btnDeposit, this.DepositButtonClick);
            //if (this.btnWithDrawing) this.destroyTouchClickEvent(this.btnWithDrawing, this.WithdrawalButtonClick);
            //if (this.btnCancelButton) this.destroyTouchClickEvent(this.btnCancelButton, this._CancelButtonClick);
            super.destroyEvents();
        }

        public ViewResize(e?: any): void {
            super.ViewResize();
            let wWidth: number = $(window).width();
            let wHeight: number = $(window).height();

            if (this.checkViewContainer && this.checkViewContainer.length > 0) {
                if (wWidth >= 600) this.checkViewContainer.height(wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1 - 27);
                else this.checkViewContainer.height((wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1) / 2.5);
            }

            let tbody: JQuery = (this.tableSalesControl ? this.tableSalesControl.TableBody : undefined);
            if (tbody && tbody.length > 0) {
                tbody.height((wHeight - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1));
            }
        }


        private onSelect(row: Interfaces.Model.ITableRowModel): void {
            let controller = this;
            this.TerminalService.GetCheckHistory((row as any).checkid, (responseData) => {
                controller.Model.set("reportModel.historyCheck", responseData);
                controller.setupCheckView();
            });
        }

        //public DepositButtonClick: { (e: any): void; };
        //private depositButtonClick(e) {
        //    this.Model.set("editModel.result", 2);
        //    this.SaveButtonClick(e);
        //}

        //public WithdrawalButtonClick: { (e: any): void; };
        //private withdrawalButtonClick(e) {
        //    this.Model.set("editModel.result", 3);
        //    this.SaveButtonClick(e)
        //}

        //public _CancelButtonClick: { (e: any): void; };
        //private _cancelButtonClick(e) {
        //    this.Model.set("editModel.result", 0);
        //    this.SaveButtonClick(e)
        //}

        //public validate(): boolean {
        //    let controller = this;
        //    let result: boolean = super.validate();

        //    if (result === true && this.OnResult)
        //        this.OnResult(controller);
        //    return result;
        //}

        protected setupTable() {

            this.tableSalesControl.Rows = this.Model.get("reportModel.historyRows");
            let payMethod: string = '#if (payment.ptype === 1) {#<i class="material-icons left">attach_money</i># } else if (payment.ptype === 2) {#<i class="material-icons left">credit_card</i># } else if (payment.ptype === 3) {#<i class="material-icons left">money_off</i>#}#';

            this.tableSalesControl.Columns = [
                { Header: vars._statres("label$date"), Field: "payment.cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(payment.cd))#" },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "payment.sum", FieldTemplate: '#=numberToString(payment.sum,2)#', FieldStyle: "product-col-sum-auto-rigth" },
                { Header: vars._statres("label$methodpayment"), Field: "payment.ptype", FieldTemplate: payMethod },
            ];
            this.tableSalesControl.Setup();
        }

        protected setupCheckView() {
            //let check: Interfaces.Model.IPOSCheck = this.Model.get("reportModel.historyCheck");
            this.checkViewControl.POSCheck = this.Model.get("reportModel.historyCheck"); //.Rows = check.positions;

            //this.checkViewControl.Columns = [
            //    { Header: "№", Field: "index" },
            //    { Header: vars._statres("label$namecheck"), Field: "product.name" },
            //    { Header: vars._statres("label$quantitycheck"), HeaderStyle: "product-col-sum-auto-rigth", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-sum-auto-rigth" },
            //    { Header: vars._statres("label$price"), HeaderStyle: "product-col-sum-auto-rigth", Field: "price", FieldTemplate: '#=numberToString(price,2)#', FieldStyle: "product-col-sum-auto-rigth" },
            //];
            //this.checkViewControl.Setup();
        }

        public Print(): void {
            let pskey: string = (this.checkViewControl.Printer && this.checkViewControl.Printer.printserver ? this.checkViewControl.Printer.printserver.pskey : '');
            this.checkViewControl.Print(pskey);
        }
    }
}

vars.registerController("terminal/report/historysales", function (module: any): Interfaces.IController { return new module.Controller.Terminal.Report.HistorySales(); });