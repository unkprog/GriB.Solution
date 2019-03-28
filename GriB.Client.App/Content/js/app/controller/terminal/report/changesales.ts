import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/common/basecontroller');
import ctrl = require('app/common/basecontrol');
import posctrl = require('app/common/poscontrol');
import svcReport = require('app/services/reportsservice');
import svcTerminal = require('app/services/posterminalservice');

export namespace Controller.Terminal.Report {
    export class ChangeSales extends base.Controller.BaseEditor implements Interfaces.IControllerChangeSales {
        constructor() {
            super();
            if (this.EditorSettings) {
                if (this.EditorSettings.ButtonSetings) {
                    this.EditorSettings.ButtonSetings.IsPrint = false;
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
            return { Url: "/Content/view/terminal/report/changesales.html", Id: "changesales-view" };
        }

        public get EditorModel(): Interfaces.Model.ICheckCommetModel {
            return this.Model.get("editModel").toJSON();
        }

        protected createModel(): kendo.data.ObservableObject {
            let result: kendo.data.ObservableObject = new kendo.data.ObservableObject({
                "Header": "",
                "HeaderChangeReportSales": vars._statres("label$report$bychange"),
                "reportModel": {
                    "changeRows": [],
                },
                "currentSalePoint": 0,
                "currentChange": 0,
                "labelRevenue": vars._statres("label$revenue"),
                "labelCash": vars._statres("label$cash"),
                "labelNonCash": vars._statres("label$noncash"),
                "labelReportCash": vars._statres("label$cashname"),
                "labelEncashment": vars._statres("label$encashment"),
                "labelDeposit": vars._statres("label$depositmoney"),
                "labelWithDrawing": vars._statres("label$withdrawingmoney"),
                "TextRevenueTotal": "0.00",
                "TextCash": "0.00",
                "TextNonCash": "0.00",
                "TextCashTotal": "0.00",
                "TextEncashment": "0.00",
                "TextDeposit": "0.00",
                "TextWithDrawing": "0.00",
            });

            return result;
        }

        public get CurrentSalePoint(): number {
            return this.Model.get("currentSalePoint");
        }

        public set CurrentSalePoint(value: number) {
            this.Model.set("currentSalePoint", value);

        }
        public get CurrentChange(): number {
            return this.Model.get("currentChange");
        };
        public set CurrentChange(value: number) {
            this.Model.set("currentChange", value);
        };

        protected tableSalesControl: ctrl.Control.BaseTable;

        public ViewInit(view: JQuery): boolean {
            let controller = this;
            
            controller.tableSalesControl = new ctrl.Control.BaseTable();
            view.find("#changesales-view-table").append(controller.tableSalesControl.InitView());

            return super.ViewInit(view);
        }

        protected loadData(): boolean {
            let controller = this;
            controller.TerminalService.ChangeSumInCash(controller.CurrentSalePoint, (responseData) => {
                controller.Model.set("TextCashTotal", utils.numberToString(responseData.cashSum, 2));
            });
            controller.ReportService.GetChangeSales(controller.CurrentChange, (responseData) => {
                controller.Model.set("reportModel.changeRows", responseData.rows);
                
                this.Model.set("TextRevenueTotal", utils.numberToString(responseData.sumCash + responseData.sumNonCash, 2));
                this.Model.set("TextCash", utils.numberToString(responseData.sumCash, 2));
                this.Model.set("TextNonCash", utils.numberToString(responseData.sumNonCash, 2));
                this.Model.set("TextEncashment", utils.numberToString(responseData.sumEncashment, 2));
                this.Model.set("TextDeposit", utils.numberToString(responseData.sumDeposit, 2));
                this.Model.set("TextWithDrawing", utils.numberToString(responseData.sumWithDrawal, 2));
                this.setupTable();
                controller.afterLoad(responseData);
                controller.endLoad();
            });
            return false;
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        protected createEvents(): void {
            super.createEvents();
            //this.tableSalesControl.OnSelect = $.proxy(this.onSelect, this);

            //this.EncashmentButtonClick = this.createTouchClickEvent(this.btnEncashment, this.encashmentButtonClick);
            //this.DepositButtonClick = this.createTouchClickEvent(this.btnDeposit, this.depositButtonClick);
            //this.WithdrawalButtonClick = this.createTouchClickEvent(this.btnWithDrawing, this.withdrawalButtonClick);
            //this._CancelButtonClick = this.createTouchClickEvent(this.btnCancelButton, this._cancelButtonClick);
        }

        protected destroyEvents(): void {
            //this.tableSalesControl.OnDetalize = undefined;

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
            let tbody: JQuery = (this.tableSalesControl ? this.tableSalesControl.TableBody : undefined);
            //if (wWidth >= 600) {
            //    if (this.checkViewContainer && this.checkViewContainer.length > 0) {
            //        this.checkViewContainer.height(wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1 - 27);
            //    }
                if (tbody && tbody.length > 0) {
                    tbody.height(wHeight - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1);
                }
            //}
            //else {
            //    if (this.checkViewContainer && this.checkViewContainer.length > 0) {
            //        this.checkViewContainer.height((wHeight - this.checkViewContainer.offset().top - (0.2 * parseFloat(getComputedStyle(this.checkViewContainer[0]).fontSize)) - 1) / 2.5);
            //    }
            //    if (tbody && tbody.length > 0) {
            //        tbody.height((wHeight - (this.checkViewContainer && this.checkViewContainer.length > 0 ? this.checkViewContainer.offset().top : 0) - tbody.offset().top - (0.2 * parseFloat(getComputedStyle(tbody[0]).fontSize)) - 1));
            //    }
            //}
        }


        //private onSelect(row: Interfaces.Model.ITableRowModel): void {
        //    let controller = this;
        //    this.TerminalService.GetCheckHistory((row as any).checkid, (responseData) => {
        //        controller.Model.set("reportModel.historyCheck", responseData);
        //        controller.setupCheckView();
        //    });
        //}

       

        protected setupTable() {

            this.tableSalesControl.Rows = this.Model.get("reportModel.changeRows");
            
            this.tableSalesControl.Columns = [
                { Header: vars._statres("label$name"), Field: "product.name" },
                { Header: vars._statres("label$quantityshort"), HeaderStyle: "product-col-sum-auto-rigth", Field: "quantity", FieldStyle: "product-col-sum-auto-rigth", IsSum: true },
                { Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true },
            ];
            this.tableSalesControl.Setup();
        }
    }
}

vars.registerController("terminal/report/changesales", function (module: any): Interfaces.IController { return new module.Controller.Terminal.Report.ChangeSales(); });