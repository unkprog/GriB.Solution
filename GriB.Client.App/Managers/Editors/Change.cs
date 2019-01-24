using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Change
    {

        private static change readFromValues(object[] values) => new change() { id = (int)values[0], cd = (DateTime)values[1], cu = (int)values[2], ud = (DateTime)values[3], uu = (int)values[4], salepoint = new salepoint() { id = (int)values[5], name = (string)values[6] } };

        private const string cmdGet = @"Editor\Change\[get]";
        public static List<change> GetChange(this Query query)
        {
            List<change> result = new List<change>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@salepoint", Value = 0 } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static List<change> GetChange(this Query query, int id)
        {
            List<change> result = new List<change>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@salepoint", Value = 0 } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static List<change> GetChangeBySalepoint(this Query query, int salepoint)
        {
            List<change> result = new List<change>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@salepoint", Value = salepoint } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

    }
}