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

            string result = string.Concat("select ", fields, string.IsNullOrEmpty(fields) ? "" : ", ", " [rep].[quantityDebBeg], [rep].[quantityCreBeg], [rep].[quantityDeb], [rep].[quantityCre]"
                                         , Environment.NewLine, "from (select ", fieldsRep, string.IsNullOrEmpty(fieldsRep) ? "" : ", ", "[quantityDebBeg]=sum([rep].[quantityDebBeg]), [quantityCreBeg]=sum([rep].[quantityCreBeg]), [quantityDeb]=sum([rep].[quantityDeb]), [quantityCre]=sum([rep].[quantityCre])"
                                         , Environment.NewLine, "     from ("
                                         , Environment.NewLine, "           select  ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", "
                                         , Environment.NewLine, "                  [quantityDebBeg] = cast(0 as float), [quantityCreBeg] = sum(case when [d].[cd] <  @datefrom then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "     	         , [quantityDeb]    = cast(0 as float), [quantityCre]    = sum(case when [d].[cd] >= @datefrom then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "           from [t_check_position] [p] with(nolock)"
                                         , Environment.NewLine, "           inner join [t_check] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "           where [d].[d] = 0 and ([d].[options] & 1) = 1"
                                         , Environment.NewLine, "             and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))"
                                         , filter.salepoint == null || filter.salepoint.id == 0 ? "" : string.Concat(Environment.NewLine, "             and [d].[salepoint] = @salepoint")
                                         , filter.product == null || filter.product.id == 0 ? "" : string.Concat(Environment.NewLine, "             and [p].[product] = @product"), string.IsNullOrEmpty(groupBy) ? "" : string.Concat(Environment.NewLine, "      group by ", groupBy)
                                         , Environment.NewLine, "           union all"
                                         , Environment.NewLine, "           select ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", "
                                         , Environment.NewLine, "                  [quantityDebBeg] = sum(case when [d].[cd] <  @datefrom and [d].[doctype] = 10        then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "                , [quantityCreBeg] = sum(case when [d].[cd] <  @datefrom and [d].[doctype] in (40, 50) then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "                , [quantityDeb]    = sum(case when [d].[cd] >= @datefrom and [d].[doctype] = 10        then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "                , [quantityCre]    = sum(case when [d].[cd] >= @datefrom and [d].[doctype] in (40, 50) then [p].[quantity] else 0 end)"
                                         , Environment.NewLine, "           from [t_document_position] [p] with(nolock)"
                                         , Environment.NewLine, "           inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "           where [d].[d] = 0 and ([d].[options] & 1) = 1"
                                         , Environment.NewLine, "             and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))"
                                         , filter.salepoint == null || filter.salepoint.id == 0 ? "" : string.Concat(Environment.NewLine, "             and [d].[salepoint] = @salepoint")
                                         , filter.product == null || filter.product.id == 0 ? "" : string.Concat(Environment.NewLine, "             and [p].[product] = @product")
                                         , string.IsNullOrEmpty(groupBy) ? "" : string.Concat(Environment.NewLine, "      group by ", groupBy)
                                         , Environment.NewLine, "           union all"
                                         , Environment.NewLine, "           select ", groupBy, string.IsNullOrEmpty(groupBy) ? "" : ", "
                                         , Environment.NewLine, "                  [quantityDebBeg] = sum(case when [d].[cd] <  @datefrom then [p].[quantity] else 0 end), [quantityCreBeg] = 0"
                                         , Environment.NewLine, "                , [quantityDeb]    = sum(case when [d].[cd] >= @datefrom then [p].[quantity] else 0 end), [quantityCre] = 0"
                                         , Environment.NewLine, "           from [t_document_position] [p] with(nolock)"
                                         , Environment.NewLine, "           inner join [t_document] [d] with(nolock) on [p].[id] = [d].[id]"
                                         , Environment.NewLine, "           where [d].[d] = 0 and ([d].[options] & 1) = 1 and [d].[doctype] in (50)"
                                         , Environment.NewLine, "             and (@dateto <= '18991230' or (@dateto > '18991230' and [d].[cd] <= @dateto))"
                                         , filter.salepoint == null || filter.salepoint.id == 0 ? "" : string.Concat(Environment.NewLine, "             and [d].[salepoint] = @salepoint")
                                         , filter.product == null || filter.product.id == 0 ? "" : string.Concat(Environment.NewLine, "             and [p].[product] = @product")
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
            query.ExecuteQuery(cmdGet(filter), new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = filter.datefrom }, new SqlParameter() { ParameterName = "@dateto", Value = filter.dateto }
            , new SqlParameter() { ParameterName = "@salepoint", Value = filter.salepoint == null ? 0 : filter.salepoint.id }, new SqlParameter() { ParameterName = "@product", Value = filter.product == null ? 0 : filter.product.id }}
            , (values) =>
            {
                ReportStockRow item = readFromValues(filter, values);
                result.Add(item);
            });

            return result;
        }
    }
}