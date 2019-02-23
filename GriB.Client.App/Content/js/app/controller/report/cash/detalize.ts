import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');

export namespace Controller.Report.Cash {
    export class Detalize extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            if (this.EditorSettings && this.EditorSettings.ButtonSetings)
                this.EditorSettings.ButtonSetings.IsSave = false;
            this.Model.set("Header", vars._statres("report$cash"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/cash/detalize.html", Id: "report-cash-detalize-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "filterModel": {},
            });
        }

        protected get FilterName(): string {
            return "reportFilterCashDetalize";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportStockFilter {
            return {
                datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, IsShowSalepoint:true, IsShowProduct: true };
        }

        protected getSaveFilter(): string {
            let controller = this;
            let _datefrom: Date = controller.Model.get("filterModel.datefrom");
            let _dateto: Date = controller.Model.get("filterModel.dateto");
            let filterToSave = {
                datefrom: utils.date_ddmmyyyy(_datefrom), dateto: utils.date_ddmmyyyy(_dateto)
                , salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product")
                , IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct")
            };
            return JSON.stringify(filterToSave);

        }

        public ViewInit(view: JQuery): boolean {
            let controller = this;
            let result: boolean = super.ViewInit(view);
            controller.buildButtonClick(undefined);
            return result;
        }

        public get Filter(): Interfaces.Model.IReportSaleFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportSaleFilter;
        }

        public get Columns(): Interfaces.Control.ITableColumn[] {
            let columns: Interfaces.Control.ITableColumn[] = [];
            let doctypeTemplate: string = "#if (doctype === 10) {#" + vars._statres("label$payment") + "# } else if (doctype === 20) {#" + vars._statres("label$depositmoney") + "#} else if (doctype === 30) {#" + vars._statres("label$withdrawingmoney") + "#} else if (doctype === 40) {#" + vars._statres("label$encashment") + "#}#";

            columns.push({ Header: vars._statres("label$document"), Field: "doctype", FieldTemplate: doctypeTemplate, IsOrder: true });
            columns.push({ Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" });
            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
            columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
            columns.push({ Header: vars._statres("label$sum"), HeaderStyle: "product-col-sum-auto-rigth", Field: "sum", FieldTemplate: '#=numberToString(sum,2)#', FieldStyle: "product-col-sum-auto-rigth", IsSum: true, IsOrder: true  });
            return columns;
        }

        public createEvents(): void {
            super.createEvents();
        }

        public destroyEvents(): void {
            super.destroyEvents();
        }

        public BuildButtonClick: { (e: any): void; };
        protected buildButtonClick(e) {
            let self = this;
            super.buildButtonClick(e);
            this.Service.GetCashDetail(this.Filter as Interfaces.Model.IReportBaseFilter, (responseData: any) => {
                self.SetupTable(responseData);
            });
        }

        protected OnDetalize(row: Interfaces.Model.ITableRowModel) {
            let item: any = row;
            let ctrlName: string = "";
            let ctrlId: string = "";
            if (item.doctype === 10) {
                ctrlName = 'document/editor/payment';
                ctrlId = 'id_payment';
            }
            else if (item.doctype === 20) {
                ctrlName = 'document/editor/paymentdeposit';
                ctrlId = 'id_paymentdeposit';
            }
            else if (item.doctype === 30) {
                ctrlName = 'document/editor/paymentwithdrawal';
                ctrlId = 'id_paymentwithdrawal';
            }
            else if (item.doctype === 40) {
                ctrlName = 'document/editor/encashment';
                ctrlId = 'id_encashment';
            }

            if (ctrlName !== "") {
                vars._editorData[ctrlId] = item.id;
                vars._app.OpenController({
                    urlController: ctrlName, isModal: true, onLoadController: (controller: Interfaces.IController) => {
                        let ctrlSale: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                        ctrlSale.EditorSettings.ButtonSetings.IsSave = false;
                    }
                });
            }
        }
    }
}

vars.registerController("report/cash/detalize", function (module: any): Interfaces.IController { return new module.Controller.Report.Cash.Detalize(); });