using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Models.Report
{
    

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

    public class ReportSaleDetailRow : ReportSaleRow
    {
        public ReportSaleDetailRow() : base()
        {
        }
        public int id { get; set; }
        public DateTime cd { get; set; }
        public double discount { get; set; }
    }

    public class ReportSaleBaseTimeRow
    {
        public ReportSaleBaseTimeRow()
        {

        }

        public double count    { get; set; }
        public double countpos { get; set; }
        public double sum      { get; set; }
    }

    public class ReportSaleTimeRow : ReportSaleBaseTimeRow
    {
        public ReportSaleTimeRow()
        {
            time = string.Empty;
        }
        public string time { get; set; }

    }


    public class ReportSaleTimeTableRow : ReportSaleTimeRow
    {
        public double countpercent { get; set; }
        public double countpospercent { get; set; }
        public double sumpercent   { get; set; }
        public double avgsumpos => count == 0 ? 0 : sum / count;
        public double avgsumcountpos => countpos == 0 ? 0 : sum / countpos;
        public double avgsum => count == 0 ? 0 : sum / count;
    }

    public class ReportSaleDayWeekRow : ReportSaleBaseTimeRow
    {
        public ReportSaleDayWeekRow()
        {
            dayweek = 0;
        }
        public int dayweek { get; set; }
    }

    public class ReportSaleDayWeekTableRow : ReportSaleDayWeekRow
    {
        public double countpercent { get; set; }
        public double countpospercent { get; set; }
        public double sumpercent { get; set; }
        public double avgsumpos => count == 0 ? 0 : sum / count;
        public double avgsumcountpos => countpos == 0 ? 0 : sum / countpos;
        public double avgsum => count == 0 ? 0 : sum / count;
    }
}