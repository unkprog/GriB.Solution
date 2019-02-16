using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Reports
{
    public static class Stocks
    {
        private static ReportStockRow readFromValues(ReportStockFilter filter, object[] values)
        {
            int cnt = 0;
            ReportStockRow result = new ReportStockRow();
            if (filter.IsShowSalepoint) result.salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] };
            if (filter.IsShowProduct) result.product = new product() { id = (int)values[cnt++], name = (string)values[cnt++] };

            result.quantityDebBeg = (double)values[cnt++];
            result.quantityCreBeg = (double)values[cnt++];
            result.quantityDeb = (double)values[cnt++];
            result.quantityCre = (double)values[cnt++];
            return result;
        }

        private static string cmdGet(ReportStockFilter filter)
        {
            string fields = "";
            if (filter.IsShowSalepoint) fields = string.Concat(fields, string.IsNullOrEmpty(fields) ? "" : ", ", "[rep].[salepoint], [salepointname]=isnull([s].[name], '')");
            if (filter.IsShowProduct)   fields = string.Concat(fields, string.IsNullOrEmpty(fields) ? "" : ", ", "[rep].[product]  , [productname]=isnull([p].[name], '')");

            string fieldsRep = "";
            if (filter.IsShowSalepoint) fieldsRep = string.Concat(fieldsRep, string.IsNullOrEmpty(fieldsRep) ? "" : ", ", "[rep].[salepoint]");
            if (filter.IsShowProduct)   fieldsRep = string.Concat(fieldsRep, string.IsNullOrEmpty(fieldsRep) ? "" : ", ", "[rep].[product]");


            string groupBy = "";
            if (filter.IsShowSalepoint) groupBy = string.Concat(groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[d].[salepoint]");
            if (filter.IsShowProduct)   groupBy = string.Concat(groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", ", "[p].[product]");

            string join = "";
            if (filter.IsShowSalepoint) join = string.Concat(join, Environment.NewLine, "left outer join [t_org]           [s]  with(nolock) on [s].[d]  = 0 and [rep].[salepoint] = [s].[id]");
            if (filter.IsShowProduct)   join = string.Concat(join, Environment.NewLine, "left outer join [t_product]       [p]  with(nolock) on [p].[d]  = 0 and [rep].[product]   = [p].[id]");

            DateTime dateto;
            bool isExistsDateTo = Helper.IsExistsDate(filter.dateto, out dateto);

            string result = string.Concat("select ", fields, string.IsNullOrEmpty(fields) ? "" : ", ", " [rep].[quantityDebBeg], [rep].[quantityCreBeg], [rep].[quantityDeb], [rep].[quantityCre]"
                                         , Environment.NewLine, "from (select ", fieldsRep, string.IsNullOrEmpty(fieldsRep) ? "" : ", ", "[quantityDebBeg]=sum([rep].[quantityDebBeg]), [quantityCreBeg]=sum([rep].[quantityCreBeg]), [quantityDeb]=sum([rep].[quantityDeb]), [quantityCre]=sum([rep].[quantityCre])"
                                         , Environment.NewLine, "     from ("
                                         , Environment.NewLine, "           select  ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", "
                                         , Environment.NewLine, "                  [quantityDebBeg] = cast(0 as float), [quantityCreBeg] = sum(case when [d].[cd] <  @datefrom then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "     	         , [quantityDeb]    = cast(0 as float), [quantityCre]    = sum(case when [d].[cd] >= @datefrom then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "           from [t_check_position] [p] with(nolock)"
                                         , Environment.NewLine, "           inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "           where [d].[d] = 0 and ([d].[options] & 1) = 1"
                                         , isExistsDateTo ? string.Concat(Environment.NewLine, "             and [d].[cd] <= @dateto") : ""
                                         , Helper.IsEmptyValue(filter.salepoint) ? "" : string.Concat(Environment.NewLine, "             and [d].[salepoint] = @salepoint")
                                         , Helper.IsEmptyValue(filter.product) ? "" : string.Concat(Environment.NewLine, "             and [p].[product] = @product")
                                         , string.IsNullOrEmpty(groupBy) ? "" : string.Concat(Environment.NewLine, "      group by ", groupBy)
                                         , Environment.NewLine, "           union all"
                                         , Environment.NewLine, "           select ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", "
                                         , Environment.NewLine, "                  [quantityDebBeg] = sum(case when [d].[cd] <  @datefrom and [d].[doctype] = 10        then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "                , [quantityCreBeg] = sum(case when [d].[cd] <  @datefrom and [d].[doctype] in (40, 50) then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "                , [quantityDeb]    = sum(case when [d].[cd] >= @datefrom and [d].[doctype] = 10        then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "                , [quantityCre]    = sum(case when [d].[cd] >= @datefrom and [d].[doctype] in (40, 50) then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "           from [t_document_position] [p] with(nolock)"
                                         , Environment.NewLine, "           inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "           where [d].[d] = 0 and ([d].[options] & 1) = 1"
                                         , isExistsDateTo ? string.Concat(Environment.NewLine, "             and [d].[cd] <= @dateto") : ""
                                         , Helper.IsEmptyValue(filter.salepoint) ? "" : string.Concat(Environment.NewLine, "             and [d].[salepoint] = @salepoint")
                                         , Helper.IsEmptyValue(filter.product) ? "" : string.Concat(Environment.NewLine, "             and [p].[product] = @product")
                                         , string.IsNullOrEmpty(groupBy) ? "" : string.Concat(Environment.NewLine, "      group by ", groupBy)
                                         , Environment.NewLine, "           union all"
                                         , Environment.NewLine, "           select ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", "
                                         , Environment.NewLine, "                  [quantityDebBeg] = sum(case when [d].[cd] <  @datefrom then [p].[quantity] else 0 end), [quantityCreBeg] = 0"
                                         , Environment.NewLine, "                , [quantityDeb]    = sum(case when [d].[cd] >= @datefrom then [p].[quantity] else 0 end), [quantityCre] = 0"
                                         , Environment.NewLine, "           from [t_document_position] [p] with(nolock)"
                                         , Environment.NewLine, "           inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "           where [d].[d] = 0 and ([d].[options] & 1) = 1 and [d].[doctype] in (50)"
                                         , isExistsDateTo ? string.Concat(Environment.NewLine, "             and [d].[cd] <= @dateto") : ""
                                         , Helper.IsEmptyValue(filter.salepoint) ? "" : string.Concat(Environment.NewLine, "             and [d].[salepoint] = @salepoint")
                                         , Helper.IsEmptyValue(filter.product) ? "" : string.Concat(Environment.NewLine, "             and [p].[product] = @product")
                                         , string.IsNullOrEmpty(groupBy) ? "" : string.Concat(Environment.NewLine, "      group by ", groupBy)
                                         , Environment.NewLine, "          ) [rep]"
                                         , string.IsNullOrEmpty(fieldsRep) ? "" : string.Concat(Environment.NewLine, "      group by ", fieldsRep)
                                         , Environment.NewLine, ") [rep]"
                                         , join);
            //, Environment.NewLine, "order by [rep].[salepoint], [rep].[product]");
            return result;
        }

        public static List<ReportStockRow> GetStocks(this Query query, ReportStockFilter filter)
        {
            List<ReportStockRow> result = new List<ReportStockRow>();
            query.ExecuteQuery(cmdGet(filter), new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = Helper.GetSqlParamValue(filter.salepoint) }, new SqlParameter() { ParameterName = "@product", Value = Helper.GetSqlParamValue(filter.product) }}
            , (values) =>
            {
                ReportStockRow item = readFromValues(filter, values);
                result.Add(item);
            });

            return result;
        }

        private static ReportStocksDetailRow readFromValuesDetail(object[] values)
        {
            int cnt = 0;
            ReportStocksDetailRow result = new ReportStocksDetailRow()
            {
                id = (int)values[cnt++],
                cd = (DateTime)values[cnt++],
                cu = (int)values[cnt++],
                doctype = (int)values[cnt++],
                salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] },
                product = new product() { id = (int)values[cnt++], name = (string)values[cnt++] },
                quantity = (double)values[cnt++],
                sum = (double)values[cnt++]
            };
            return result;
        }

        private const string cmdGetDetail = @"Report\Stocks\[stocksdetail]";
        public static List<ReportStocksDetailRow> GetStocksDetail(this Query query, ReportStockFilter filter, Dictionary<int, employeecard> employees)
        {
            List<ReportStocksDetailRow> result = new List<ReportStocksDetailRow>();
            query.Execute(cmdGetDetail, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = Helper.GetSqlParamValue(filter.salepoint) }, new SqlParameter() { ParameterName = "@product", Value = Helper.GetSqlParamValue(filter.product) }}
            , (values) =>
            {
                ReportStocksDetailRow item = readFromValuesDetail(values);
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
    }
}