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

        public salepoint    salepoint { get; set; }
        public product      product   { get; set; }
        public employeecard employee  { get; set; }
        public client       client    { get; set; }

        public bool IsShowSalepoint { get; set; }
        public bool IsShowProduct   { get; set; }
        public bool IsShowEmployee  { get; set; }
        public bool IsShowClient    { get; set; }
    }

    public class ReportSaleRow
    {
        public ReportSaleRow()
        {
            salepoint = new salepoint();
            product = new product();
            employee = new employeecard(new Common.Models.pos.settings.employee());
            client = new client();
        }
        public salepoint    salepoint { get; set; }
        public product      product { get; set; }
        public employeecard employee { get; set; }
        public client       client { get; set; }

        public int    cu       { get; set; }
        public double quantity { get; set; }
        public double sum      { get; set; }
    }
}