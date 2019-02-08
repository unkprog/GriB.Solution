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
        private static ReportSaleRow readFromValues(object[] values) => new ReportSaleRow() { salepoint = new salepoint() { id = (int)values[0], name = (string)values[1] }, product = new product() { id = (int)values[2], name = (string)values[3] }, quantity = (double)values[4], sum = (double)values[5] };


        private const string cmdGet = @"Report\[sales]";
        public static List<ReportSaleRow> GetSales(this Query query, ReportSaleFilter filter)
        {
            List<ReportSaleRow> result = new List<ReportSaleRow>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = filter.datefrom }, new SqlParameter() { ParameterName = "@dateto", Value = filter.dateto } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }
    }
}