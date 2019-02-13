using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Models.Report
{
    public class ReportFilterWithDates
    {
        public ReportFilterWithDates()
        {
            datefrom = new DateTime(1899, 12, 30);
            dateto = new DateTime(1899, 12, 30);
        }

        public DateTime datefrom { get; set; }
        public DateTime dateto { get; set; }

    }
    public class ReportBaseFilter : ReportFilterWithDates
    {
        public ReportBaseFilter()
        {
        }
        public salepoint salepoint { get; set; }
        public bool IsShowSalepoint { get; set; }
    }

    public class ReportFilterWithProduct : ReportBaseFilter
    {
        public ReportFilterWithProduct() : base()
        {
        }
        public product product { get; set; }
        public bool IsShowProduct { get; set; }
    }

    public class ReportSaleFilter : ReportFilterWithProduct
    {
        public ReportSaleFilter() : base()
        {
        }

        public employeecard employee { get; set; }
        public client client { get; set; }

        public bool IsShowEmployee { get; set; }
        public bool IsShowClient { get; set; }
    }

    public class ReportStockFilter : ReportFilterWithProduct
    {
    }
}