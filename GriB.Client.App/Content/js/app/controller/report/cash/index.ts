import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');
import ctrl = require('app/common/basecontrol');

export namespace Controller.Report.Cash {
    export class Index extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            this.Model.set("Header", vars._statres("report$cash"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/cash/index.html", Id: "report-cash-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "filterModel": {},
                "labelDateFrom": vars._statres("label$date$from"),
                "labelDateTo": vars._statres("label$date$to"),
                "labelShowFields": vars._statres("label$showfields"),
                "labelSalepoint": vars._statres("label$salePoint"),
                "labelBuild": vars._statres("label$build"),
            });
        }

        protected get FilterName(): string {
            return "reportFilterCash";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportBaseFilter {
            return {
                datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined };
        }

        protected getSaveFilter(): string {
            let controller = this;
            let _datefrom: Date = controller.Model.get("filterModel.datefrom");
            let _dateto: Date = controller.Model.get("filterModel.dateto");
            let filterToSave = {
                datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto)
                , salepoint: this.Model.get("filterModel.salepoint")
            };
            return JSON.stringify(filterToSave);

        }

        private dateFromControl: JQuery;
        private dateToControl: JQuery;
        protected salepointControl: JQuery;
        private salepointClearControl: JQuery;

        private buildButton: JQuery;
        public ViewInit(view: JQuery): boolean {
            
            let controller = this;

            controller.dateFromControl = view.find("#report-cash-view-date-start");
            controller.dateFromControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.datefrom", utils.date_ddmmyyyy(newDate));
                }
            });
            controller.dateToControl = view.find("#report-cash-view-date-end");
            controller.dateToControl.datepicker({
                format: "dd.mm.yyyy", onSelect: function (newDate: Date) {
                    controller.Model.set("filterModel.dateto", utils.date_ddmmyyyy(newDate));
                }
            });

            controller.dateFromControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.datefrom")));
            controller.dateToControl.val(utils.date_ddmmyyyy(controller.Model.get("filterModel.dateto")));

            controller.salepointControl = view.find("#report-cash-view-salepoint-row");
            controller.salepointClearControl = view.find("#report-cash-view-salepoint-clear");

            controller.buildButton = view.find("#report-cash-view-btn-build");

            let result: boolean = super.ViewInit(view);
            return result;
        }

        public ViewResize(e: any): void {
            super.ViewResize(e);
            //try {
            //    this.showFieldsControl.formSelect();
            //}
            //catch (ex) {
            //    console.log(JSON.stringify( ex));
            //}
        }

        public ViewShow(e: any): boolean {
            return super.ViewShow(e);
        }

        public get Filter(): Interfaces.Model.IReportBaseFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportBaseFilter;
        }

        public get Columns(): Interfaces.Control.ITableColumn[] {
            let columns: Interfaces.Control.ITableColumn[] = [];

            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });

            columns.push({ Header: vars._statres("label$beginofperiod"), HeaderGroupName: vars._statres("label$beginofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumBeg", FieldTemplate: '#=numberToString(sumBeg,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$arrival"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumDeb", FieldTemplate: '#=numberToString(sumDeb,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$expense"), HeaderGroupName: vars._statres("label$overperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumCre", FieldTemplate: '#=numberToString(sumCre,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$endofperiod"), HeaderGroupName: vars._statres("label$endofperiod"), HeaderStyle: "product-col-quantity-auto-right", Field: "sumEnd", FieldTemplate: '#=numberToString(sumEnd,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            return columns;
        }

        
        public createEvents(): void {
            super.createEvents();
            if (this.buildButton) this.BuildButtonClick = utils.createTouchClickEvent(this.buildButton, this.buildButtonClick, this);

            this.SalepointButtonClick = this.createTouchClickEvent(this.salepointControl, this.salepointButtonClick);
            this.ClearSalepointButtonClick = this.createTouchClickEvent(this.salepointClearControl, this.clearSalepointButtonClick);
        }

        public destroyEvents(): void {
            this.destroyTouchClickEvent(this.salepointClearControl, this.ClearSalepointButtonClick);
            this.destroyTouchClickEvent(this.salepointControl, this.SalepointButtonClick);
            if (this.buildButton) utils.destroyTouchClickEvent(this.buildButton, this.BuildButtonClick);
            super.destroyEvents();
        }

        public SalepointButtonClick: { (e: any): void; };
        private salepointButtonClick(e) {
            let self = this;
            vars._app.OpenController({
                urlController: 'setting/card/salepoint', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlSalepoint: Interfaces.IControllerCard = controller as Interfaces.IControllerCard;
                    ctrlSalepoint.CardSettings.IsAdd = false;
                    ctrlSalepoint.CardSettings.IsAddCopy = false;
                    ctrlSalepoint.CardSettings.IsDelete = false;
                    ctrlSalepoint.CardSettings.IsEdit = false;
                    ctrlSalepoint.CardSettings.IsSelect = true;
                    ctrlSalepoint.OnSelect = $.proxy(self.selectSalepoint, self);
                }
            });
        }

        private selectSalepoint(controller: Interfaces.IControllerCard) {
            let salepoint: Interfaces.Model.ISalepoint = controller.getSelectedRecord() as Interfaces.Model.ISalepoint;
            if (salepoint)
                this.Model.set("filterModel.salepoint", salepoint);
            M.updateTextFields();
        }

        public ClearSalepointButtonClick: { (e: any): void; };
        private clearSalepointButtonClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.Model.set("filterModel.salepoint", {});
            M.updateTextFields();
            return false;
        }

        public BuildButtonClick: { (e: any): void; };
        protected buildButtonClick(e) {
            let self = this;
            super.buildButtonClick(e);
            let filter: Interfaces.Model.IReportBaseFilter = self.Filter;
            this.Service.GetCash(filter, (responseData: any) => {
                self.SetupTable(responseData);
            });
        }

        protected OnDetalize(row: Interfaces.Model.ITableRowModel) {
            let self = this;
            let curfilter: Interfaces.Model.IReportBaseFilter = self.Filter;
            let item: any = row;

            vars._app.OpenController({
                urlController: 'report/cash/detalize', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlDetalize: Interfaces.IControllerReport = controller as Interfaces.IControllerReport;
                    let filter: Interfaces.Model.IReportBaseFilter = { datefrom: curfilter.datefrom, dateto: curfilter.dateto, salepoint: curfilter.salepoint }
                    if (item.salepoint && item.salepoint.id && item.salepoint.id !== 0) filter.salepoint = item.salepoint;

                    ctrlDetalize.Model.set("filterModel", filter);
                }
            });
        }
    }
}

vars.registerController("report/cash/index", function (module: any): Interfaces.IController { return new module.Controller.Report.Cash.Index(); });