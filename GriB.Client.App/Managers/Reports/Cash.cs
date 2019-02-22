using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Models.Report;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Reports
{
    public static class Cash
    {
        private static ReportCashRow readFromValues(object[] values)
        {
            int cnt = 0;
            ReportCashRow result = new ReportCashRow();
            result.salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] };

            result.sumDebBeg = (double)values[cnt++];
            result.sumCreBeg = (double)values[cnt++];
            result.sumDeb = (double)values[cnt++];
            result.sumCre = (double)values[cnt++];
            return result;
        }

        private const string cmdGet = @"Report\Cash\[cash]";
        public static List<ReportCashRow> GetCash(this Query query, ReportBaseFilter filter)
        {
            List<ReportCashRow> result = new List<ReportCashRow>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = Helper.GetSqlParamValue(filter.salepoint) }}
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }


        private static ReportCashDetailRow readFromValuesDetail(object[] values)
        {
            int cnt = 0;
            ReportCashDetailRow result = new ReportCashDetailRow()
            {
                id = (int)values[cnt++],
                cd = (DateTime)values[cnt++],
                cu = (int)values[cnt++],
                salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] },
                doctype = (int)values[cnt++],
                sum = (double)values[cnt++]
            };
            return result;
        }

        private const string cmdGetDetail = @"Report\Cash\[cashdetail]";
        public static List<ReportCashDetailRow> GetCashDetail(this Query query, ReportBaseFilter filter, Dictionary<int, employeecard> employees)
        {
            List<ReportCashDetailRow> result = new List<ReportCashDetailRow>();
            query.Execute(cmdGetDetail, new SqlParameter[] { new SqlParameter() { ParameterName = "@datefrom", Value = Helper.Date(filter.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Helper.DateReportEnd(filter.dateto) }
            , new SqlParameter() { ParameterName = "@salepoint", Value = Helper.GetSqlParamValue(filter.salepoint) } }
            , (values) =>
            {
                ReportCashDetailRow item = readFromValuesDetail(values);
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