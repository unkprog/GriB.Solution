using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Common.Sql;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

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
        public static List<ReportSaleDetailRow> GetSalesDetail(this Query query, ReportSaleFilter filter, Dictionary<int, employeecard> employees)
        {
            List<ReportSaleDetailRow> result = new List<ReportSaleDetailRow>();
            query.Execute(cmdGetDetail, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }
            , new SqlParameter() { ParameterName = "@employee", Value = filter.employee == null ? 0 : filter.employee.id }, new SqlParameter() { ParameterName = "@client", Value = filter.client == null ? 0 : filter.client.id }}
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

        private const string cmdGetTime = @"Report\Sales\[[salestime]]";
        public static List<ReportSaleTimeRow> GetReportSalesTime(this Query query, ReportSaleFilter filter)
        {
            List<ReportSaleTimeRow> result = new List<ReportSaleTimeRow>();
            query.Execute(cmdGetTime, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }}
            , (values) =>
            {
                result.Add(new ReportSaleTimeRow() { time = (string)values[0], count = (double)values[1], countpos = (double)values[1] });
            });

            return result;
        }
    }
}