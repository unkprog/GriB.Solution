using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Models.Report
{
    public class ReportSaleFilter
    {
        public ReportSaleFilter()
        {
            datefrom = new DateTime(1899, 12, 30);
            dateto = new DateTime(1899, 12, 30);
        }
        public DateTime datefrom { get; set; }
        public DateTime dateto { get; set; }
    }

    public class ReportSaleRow
    {
        public salepoint salepoint { get; set; }
        public product product { get; set; }
        public double quantity { get; set; }
        public double sum { get; set; }
    }
}