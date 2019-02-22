using System;
using GriB.Client.App.Managers.Reports;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Models.Report
{
    public class ReportFilterWithDates
    {
        public ReportFilterWithDates()
        {
            datefrom = Helper.MinReportDate();
            dateto = Helper.MinReportDate();
        }

        public string datefrom { get; set; }
        public string dateto { get; set; }

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
        public category category { get; set; }
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

    public class ReportSaleDetailFilter : ReportSaleFilter
    {
        public ReportSaleDetailFilter() : base()
        {
            time = string.Empty;
        }

        public int    dayweek { get; set; }
        public string time    { get; set; }
    }

    public class ReportStockFilter : ReportFilterWithProduct
    {
    }
}