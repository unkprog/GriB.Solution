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

    public class ReportSaleBaseDashboardRow
    {
        public ReportSaleBaseDashboardRow()
        {

        }

        public double count    { get; set; }
        public double countpos { get; set; }
        public double sum      { get; set; }


        public int countzone { get; set; }
        public int countposzone { get; set; }
        public int sumzone { get; set; }

        public double countpercent { get; set; }
        public double countpospercent { get; set; }
        public double sumpercent { get; set; }

        //public int countpercentzone { get; set; }
        //public int countpospercentzone { get; set; }
        //public int sumpercentzone { get; set; }

        public double avgsum => count == 0 ? 0 : sum / count;
        public double avgsumpercent { get; set; }
        public int avgsumzone { get; set; }
    }


    public class ReportSaleTimeTableRow : ReportSaleBaseDashboardRow
    {
        public ReportSaleTimeTableRow()
        {
            time = string.Empty;
        }
        public string time { get; set; }

    }

    public class ReportSaleDayWeekTableRow : ReportSaleBaseDashboardRow
    {
        public ReportSaleDayWeekTableRow()
        {
            dayweek = 0;
        }
        public int dayweek { get; set; }
    }

}