using System;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Common.Sql;


namespace GriB.Client.App.Managers.Reports
{
    public static class Sales
    {
       
        private static ReportSaleRow readFromValues(ReportSaleFilter filter, object[] values)
        {
            int cnt = 0;
            ReportSaleRow result = new ReportSaleRow();
            if (filter.IsShowSalepoint) result.salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] };
            if (filter.IsShowProduct)   result.product   = new product()   { id = (int)values[cnt++], name = (string)values[cnt++] };
            if (filter.IsShowEmployee)  result.cu = (int)values[cnt++];
            if (filter.IsShowClient)    result.client = new client() { id = (int)values[cnt++], fname = (string)values[cnt++], mname = (string)values[cnt++], lname = (string)values[cnt++] };

            result.quantity = (double)values[cnt++];
            result.sum      = (double)values[cnt++];
            return result;
        }

        private static string cmdGet(ReportSaleFilter filter)
        {
            string fields = "";
            if (filter.IsShowSalepoint) fields = string.Concat(fields, "[rep].[salepoint], [salepointname]=isnull([s].[name], ''),");
            if (filter.IsShowProduct)   fields = string.Concat(fields, "[rep].[product], [productname]=isnull([p].[name], ''),");
            if (filter.IsShowEmployee)  fields = string.Concat(fields, "[rep].[cu],");
            if (filter.IsShowClient)    fields = string.Concat(fields, "[rep].[client], [clientfname]=isnull([cp].[fname], ''), [clientmname]=isnull([cp].[mname],''), [clientlname]=isnull([cp].[lname], ''),");


            string groupBy = "";
            if (filter.IsShowProduct)   groupBy = string.Concat(groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[p].[product]");
            if (filter.IsShowSalepoint) groupBy = string.Concat(groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[d].[salepoint]");
            if (filter.IsShowEmployee)  groupBy = string.Concat(groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[d].[cu]");
            if (filter.IsShowClient)    groupBy = string.Concat(groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[d].[client]");

            string join = "";
            if (filter.IsShowProduct)   join = string.Concat(join, Environment.NewLine, "left outer join [t_product]       [p]  with(nolock) on [p].[d]  = 0 and [rep].[product]   = [p].[id]");
            if (filter.IsShowSalepoint) join = string.Concat(join, Environment.NewLine, "left outer join [t_org]           [s]  with(nolock) on [s].[d]  = 0 and [rep].[salepoint] = [s].[id]");
            if (filter.IsShowClient)    join = string.Concat(join, Environment.NewLine, "left outer join [t_client_person] [cp] with(nolock) on [rep].[client]    = [cp].[id]");

            DateTime datefrom, dateto;

            string result = string.Concat("select ", fields, "[rep].[quantity], [rep].[totalsum]"
                                         , Environment.NewLine, "from (select ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[quantity] = sum([p].[quantity]), [totalsum]=sum((1.0 - ([d].[discount]/100.0)) * [p].[quantity] * [p].[price])"
                                         , Environment.NewLine, "      from [t_check_position] [p] with(nolock)"
                                         , Environment.NewLine, "      inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "      where [d].[d] = 0 and ([d].[options] & 1) = 1"
                                         , Helper.IsExistsDate(filter.datefrom, out datefrom) ? string.Concat(Environment.NewLine, "      and [d].[cd] >= @datefrom") : ""
                                         , Helper.IsExistsDate(filter.dateto, out dateto) ? string.Concat(Environment.NewLine, "      and [d].[cd] <= @dateto") : ""
                                         , filter.salepoint == null || filter.salepoint .id == 0 ? "" : string.Concat(Environment.NewLine, "      and [d].[salepoint] = @salepoint")
                                         , filter.product == null || filter.product .id == 0? "" : string.Concat(Environment.NewLine, "      and [p].[product] = @product")
                                         , filter.employee == null || filter.employee.id == 0 ? "" : string.Concat(Environment.NewLine, "      and [d].[cu] = @employee")
                                         , filter.client   == null || filter.client.id == 0 ? "" : string.Concat(Environment.NewLine, "      and [d].[client] = @client")
                                         , string.IsNullOrEmpty(groupBy) ? "" : string.Concat(Environment.NewLine, "      group by ", groupBy)
                                         , Environment.NewLine, "    ) [rep]"
                                         , join);
                                         //, Environment.NewLine, "order by [rep].[salepoint], [rep].[product]");
            return result;
        }

        //private const string cmdGet = @"Report\[sales]";
        public static List<ReportSaleRow> GetSales(this Query query, ReportSaleFilter filter, Dictionary<int, employeecard> employees)
        {
            List<ReportSaleRow> result = new List<ReportSaleRow>();
            query.ExecuteQuery(cmdGet(filter), new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }
            , new SqlParameter() { ParameterName = "@employee", Value = filter.employee == null ? 0 : filter.employee.id }, new SqlParameter() { ParameterName = "@client", Value = filter.client == null ? 0 : filter.client.id }}
            , (values) =>
            {
                ReportSaleRow item = readFromValues(filter, values);
                if (employees != null)
                {
                    employeecard empl;
                    if (employees.TryGetValue(item.cu, out empl))
                        item.employee = empl;
                }
                result.Add(item);
            });

            return result;
        }


        private static ReportSaleDetailRow readFromValuesDetail(object[] values)
        {
            int cnt = 0;
            ReportSaleDetailRow result = new ReportSaleDetailRow()
            {
                id = (int)values[cnt++],
                cd = (DateTime)values[cnt++],
                cu = (int)values[cnt++],
                salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] },
                product = new product() { id = (int)values[cnt++], name = (string)values[cnt++] },
                client = new client() { id = (int)values[cnt++], fname = (string)values[cnt++], mname = (string)values[cnt++], lname = (string)values[cnt++] },
                quantity = (double)values[cnt++], discount= (double)values[cnt++], sum = (double)values[cnt++]
            };
            return result;
        }

        private const string cmdGetDetail = @"Report\Sales\[salesdetail]";
        public static List<ReportSaleDetailRow> GetSalesDetail(this Query query, ReportSaleDetailFilter filter, Dictionary<int, employeecard> employees)
        {
            List<ReportSaleDetailRow> result = new List<ReportSaleDetailRow>();
            query.Execute(cmdGetDetail, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }
            , new SqlParameter() { ParameterName = "@employee", Value = filter.employee == null ? 0 : filter.employee.id }, new SqlParameter() { ParameterName = "@client", Value = filter.client == null ? 0 : filter.client.id }
            , new SqlParameter() { ParameterName = "@dayweek", Value = filter.dayweek }, new SqlParameter() { ParameterName = "@time", Value = filter.time }
            }
            , (values) =>
            {
                ReportSaleDetailRow item = readFromValuesDetail(values);
                if (employees != null)
                {
                    employeecard empl;
                    if (employees.TryGetValue(item.cu, out empl))
                        item.employee = empl;
                }
                result.Add(item);
            });

            return result;
        }

        private const string cmdGetTimeDashboard = @"Report\Sales\Dashboard\[salestime]";
        public static List<ReportSaleTimeTableRow> GetReportSalesTimeDashboard(this Query query, ReportSaleFilter filter)
        {
            List<ReportSaleTimeTableRow> result = new List<ReportSaleTimeTableRow>();
            query.Execute(cmdGetTimeDashboard, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }}
            , (values) =>
            {
                result.Add(new ReportSaleTimeTableRow() { time = (string)values[0], count = (double)values[1], countpos = (double)values[2], sum = (double)values[3] });
            });

            while (result.Count > 0 && (result[result.Count - 1].count == 0 && result[result.Count - 1].countpos == 0))
                result.RemoveAt(result.Count - 1);

            while (result.Count > 0 && (result[0].count == 0 && result[0].countpos == 0))
                result.RemoveAt(0);

            return result;
        }


        private const string cmdGetDayWeekeDashboard = @"Report\Sales\Dashboard\[salesdayweek]";
        public static List<ReportSaleDayWeekTableRow> GetReportSalesDayWeekDashboard(this Query query, ReportSaleFilter filter)
        {
            List<ReportSaleDayWeekTableRow> result = new List<ReportSaleDayWeekTableRow>();
            query.Execute(cmdGetDayWeekeDashboard, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }}
            , (values) =>
            {
                result.Add(new ReportSaleDayWeekTableRow() { dayweek = (int)values[0], count = (double)values[1], countpos = (double)values[2], sum = (double)values[3] });
            });

            return result;
        }



        public static List<T> CalculateDashboardParams<T>(List<T> dItems, out double avgSum) where T : ReportSaleBaseDashboardRow
        {
            List<T> _items = dItems;

            double count = _items.Sum(f => f.count);
            double countpos = _items.Sum(f => f.countpos);
            double sum = _items.Sum(f => f.sum);
            double avgsum = _items.Sum(f => f.avgsum);

            avgSum = Math.Round(count > 0 ? sum / count : 0);

            T item;
            List<T> sortItems = new List<T>(_items.Count);
            for (int i = 0, icount = _items.Count; i < icount; i++)
            {
                item = _items[i];
                sortItems.Add(item);
                item.countpercent = Math.Round(count > 0 ? 100.0f * (item.count / count) : 0, 2);
                item.countpospercent = Math.Round(countpos > 0 ? 100.0f * (item.countpos / countpos) : 0, 2);
                item.sumpercent = Math.Round(sum > 0 ? 100.0f * (item.sum / sum) : 0, 2);
                item.avgsumpercent = Math.Round(avgsum > 0 ? 100.0f * (item.avgsum / avgsum) : 0, 2);
            }

            //sortItems.Sort((x, y) => y.count.CompareTo(x.count));
            double sumZone = 0;
            //foreach (var zoneItem in sortItems)
            //{
            //    if (sumZone < 30) { zoneItem.countzone = 4; }
            //    else if (sumZone < 50) { zoneItem.countzone = 3; }
            //    else if (sumZone < 70) { zoneItem.countzone = 2; }
            //    else if (sumZone < 85) { zoneItem.countzone = 1; }
            //    else { zoneItem.countzone = 0; }
            //    sumZone += zoneItem.count;
            //}

            sortItems.Sort((x, y) => { int result = y.countpercent.CompareTo(x.countpercent); if (result == 0) result = y.sum.CompareTo(x.sum); return result; });
            sumZone = 0;
            foreach (var zoneItem in sortItems)
            {
                if (sumZone < 30) { zoneItem.countzone = 4; }
                else if (sumZone < 40) { zoneItem.countzone = 3; }
                else if (sumZone < 70) { zoneItem.countzone = 2; }
                else if (sumZone < 85) { zoneItem.countzone = 1; }
                else { zoneItem.countzone = 0; }
                sumZone += zoneItem.countpercent;
            }

            //sortItems.Sort((x, y) => y.countpos.CompareTo(x.countpos));
            //sumZone = 0;
            //foreach (var zoneItem in sortItems)
            //{
            //    if (sumZone < 30) { zoneItem.countposzone = 4; }
            //    else if (sumZone < 50) { zoneItem.countposzone = 3; }
            //    else if (sumZone < 70) { zoneItem.countposzone = 2; }
            //    else if (sumZone < 85) { zoneItem.countposzone = 1; }
            //    else { zoneItem.countposzone = 0; }
            //    sumZone += zoneItem.countpos;
            //}

            sortItems.Sort((x, y) => { int result = y.countpospercent.CompareTo(x.countpospercent); if (result == 0) result = y.sum.CompareTo(x.sum); return result; });
            sumZone = 0;
            foreach (var zoneItem in sortItems)
            {
                if (sumZone < 30) { zoneItem.countposzone = 4; }
                else if (sumZone < 50) { zoneItem.countposzone = 3; }
                else if (sumZone < 70) { zoneItem.countposzone = 2; }
                else if (sumZone < 85) { zoneItem.countposzone = 1; }
                else { zoneItem.countposzone = 0; }
                sumZone += zoneItem.countpospercent;
            }

            //sortItems.Sort((x, y) => y.sum.CompareTo(x.sum));
            //sumZone = 0;
            //foreach (var zoneItem in sortItems)
            //{
            //    if (sumZone < 30) { zoneItem.sumzone = 4; }
            //    else if (sumZone < 50) { zoneItem.sumzone = 3; }
            //    else if (sumZone < 70) { zoneItem.sumzone = 2; }
            //    else if (sumZone < 85) { zoneItem.sumzone = 1; }
            //    else { zoneItem.sumzone = 0; }
            //    sumZone += zoneItem.sum;
            //}

            sortItems.Sort((x, y) => { int result = y.sumpercent.CompareTo(x.sumpercent); if (result == 0) result = y.sum.CompareTo(x.sum); return result; });
            sumZone = 0;
            foreach (var zoneItem in sortItems)
            {
                if (sumZone < 30) { zoneItem.sumzone = 4; }
                else if (sumZone < 50) { zoneItem.sumzone = 3; }
                else if (sumZone < 70) { zoneItem.sumzone = 2; }
                else if (sumZone < 85) { zoneItem.sumzone = 1; }
                else { zoneItem.sumzone = 0; }
                sumZone += zoneItem.sumpercent;
            }

            sortItems.Sort((x, y) => { int result = y.avgsumpercent.CompareTo(x.avgsumpercent); if (result == 0) result = y.sum.CompareTo(x.sum); return result; });
            sumZone = 0;
            foreach (var zoneItem in sortItems)
            {
                if (sumZone < 30) { zoneItem.avgsumzone = 4; }
                else if (sumZone < 50) { zoneItem.avgsumzone = 3; }
                else if (sumZone < 70) { zoneItem.avgsumzone = 2; }
                else if (sumZone < 85) { zoneItem.avgsumzone = 1; }
                else { zoneItem.avgsumzone = 0; }
                sumZone += zoneItem.avgsumpercent;
            }
            return _items;
        }
    }
}