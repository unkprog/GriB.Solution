using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Models.Report
{
    public class ReportStockRow
    {
        public ReportStockRow()
        {
            salepoint = new salepoint();
            product = new product();
        }
        public salepoint    salepoint { get; set; }
        public product      product { get; set; }

        public double quantityDebBeg { get; set; }
        public double quantityCreBeg { get; set; }
        public double quantityBeg    => quantityDebBeg - quantityCreBeg;
        public double quantityDeb    { get; set; }
        public double quantityCre    { get; set; }
        public double quantity       => quantityDeb - quantityCre;
        public double quantityDebEnd => quantityDebBeg + quantityDeb;
        public double quantityCreEnd => quantityCreBeg + quantityCre;
        public double quantityEnd    => quantityDebEnd - quantityCreEnd;
    }

    public class ReportStocksDetailRow
    {
        public ReportStocksDetailRow()
        {
            salepoint = new salepoint();
            product = new product();
            employee = new employeecard(new Common.Models.pos.settings.employee());
        }
        public salepoint salepoint { get; set; }
        public product product { get; set; }
        public employeecard employee { get; set; }

        public int id { get; set; }
        public DateTime cd { get; set; }
        public int cu { get; set; }
        public int doctype { get; set; }
        public double quantity { get; set; }
        public double sum { get; set; }
    }
}