import vars = require('app/common/variables');
import utils = require('app/common/utils');
import base = require('app/controller/report/basereport');

export namespace Controller.Report.Sales {
    export class Detalize extends base.Controller.Report.ReportWithService {
        constructor() {
            super();
            if (this.EditorSettings && this.EditorSettings.ButtonSetings)
                this.EditorSettings.ButtonSetings.IsSave = false;
            this.Model.set("Header", vars._statres("report$sales"));
        }

        protected createOptions(): Interfaces.IControllerOptions {
            return { Url: "/Content/view/report/sales/detalize.html", Id: "report-sales-detalize-view" };
        }

        protected createModel(): kendo.data.ObservableObject {
            return new kendo.data.ObservableObject({
                "Header": "",
                "filterModel": {},
            });
        }

        protected get FilterName(): string {
            return "reportFilterSaleDetalize";
        }

        protected getDefaultFilter(): Interfaces.Model.IReportSaleFilter {
            return {
                datefrom: utils.date_ddmmyyyy(utils.dateToday()), dateto: utils.date_ddmmyyyy(utils.dateToday()), salepoint: undefined, product: undefined, employee: undefined, client: undefined, IsShowSalepoint:true, IsShowProduct: true, IsShowEmployee: false, IsShowClient: false };
        }

        protected getSaveFilter(): string {
            let controller = this;
            let filterToSave = {
                datefrom: controller.Model.get("filterModel.datefrom"), dateto: controller.Model.get("filterModel.dateto")
                , salepoint: this.Model.get("filterModel.salepoint"), product: this.Model.get("filterModel.product"), employee: this.Model.get("filterModel.employee"), client: this.Model.get("filterModel.client")
                , IsShowSalepoint: this.Model.get("filterModel.IsShowSalepoint"), IsShowProduct: this.Model.get("filterModel.IsShowProduct"), IsShowEmployee: this.Model.get("filterModel.IsShowEmployee"), IsShowClient: this.Model.get("filterModel.IsShowClient")
            };
            return JSON.stringify(filterToSave);

        }

        public ViewInit(view: JQuery): boolean {
            let controller = this;
            let result: boolean = super.ViewInit(view);
            controller.buildButtonClick(undefined);
            return result;
        }

        public get Filter(): Interfaces.Model.IReportSaleDetailFilter {
            return this.Model.get("filterModel").toJSON() as Interfaces.Model.IReportSaleDetailFilter;
        }

        public get Columns(): Interfaces.Control.ITableColumn[] {
            let columns: Interfaces.Control.ITableColumn[] = [];
            columns.push({ Header: vars._statres("label$date"), Field: "cd", FieldTemplate: "#=date_ddmmyyyy_withtime(new Date(cd))#" });
            columns.push({ Header: vars._statres("label$salePoint"), Field: "salepoint.name", IsOrder: true });
            columns.push({ Header: vars._statres("label$employee"), Field: "employee.name", IsOrder: true });
            columns.push({ Header: vars._statres("label$product"), Field: "product.name", IsOrder: true });
            columns.push({ Header: vars._statres("label$client"), Field: "client.name", IsOrder: true });
            columns.push({ Header: vars._statres("label$quantity"), HeaderStyle: "product-col-quantity-auto-right", Field: "quantity", FieldTemplate: '#=numberToString(quantity,2)#', FieldStyle: "product-col-quantity-auto-right", IsSum: true, IsOrder: true })
            columns.push({ Header: vars._statres("label$discount"), HeaderStyle: "product-col-quantity-auto-right", Field: "discount", FieldTemplate: '#=discount#', FieldStyle: "product-col-quantity-auto-right", IsSum: false, IsOrder: true })
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
            vars._app.ShowLoading();
            super.buildButtonClick(e);
            this.Service.GetSalesDetail(this.Filter as Interfaces.Model.IReportSaleDetailFilter, (responseData: any) => {
                self.SetupTable(responseData);
                vars._app.HideLoading();
            });
        }

        protected OnDetalize(row: Interfaces.Model.ITableRowModel) {
            let item: any = row;
            vars._editorData["id_sale"] = item.id;
            vars._app.OpenController({
                urlController: 'document/editor/sale', isModal: true, onLoadController: (controller: Interfaces.IController) => {
                    let ctrlSale: Interfaces.IControllerEditor = controller as Interfaces.IControllerEditor;
                    ctrlSale.EditorSettings.ButtonSetings.IsSave = false;
                }
            });
        }
    }
}

vars.registerController("report/sales/detalize", function (module: any): Interfaces.IController { return new module.Controller.Report.Sales.Detalize(); });