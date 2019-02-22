using System;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Models.Report
{

    public class ReportCashRow
    {
        public ReportCashRow()
        {
            salepoint = new salepoint();
        }
        public salepoint salepoint { get; set; }

        public double sumDebBeg { get; set; }
        public double sumCreBeg { get; set; }
        public double sumBeg => sumDebBeg - sumCreBeg;
        public double sumDeb { get; set; }
        public double sumCre { get; set; }
        public double quantity => sumDeb - sumCre;
        public double sumDebEnd => sumDebBeg + sumDeb;
        public double sumCreEnd => sumCreBeg + sumCre;
        public double sumEnd => sumDebEnd - sumCreEnd;
    }

    public class ReportCashDetailRow
    {
        public ReportCashDetailRow()
        {
            salepoint = new salepoint();
            employee = new employeecard(new Common.Models.pos.settings.employee());
        }
        public salepoint salepoint { get; set; }
        public employeecard employee { get; set; }

        public int id { get; set; }
        public DateTime cd { get; set; }
        public int cu { get; set; }
        public int doctype { get; set; }
        public double sum { get; set; }
    }
}