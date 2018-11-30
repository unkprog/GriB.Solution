using System;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.POSTerminal;
using System.Collections.Generic;

namespace GriB.Client.App.Managers.POSTerminal
{
    public static class Check
    {
        private static check readFromValues(object[] values)
        {
            int c = 0;
            return new check() { id = (int)values[c++],  d = (int)values[c++], cd = (DateTime)values[c++], cu = (int)values[c++], ud = (DateTime)values[c++], uu = (int)values[c++]
                               , options = (int)values[c++], client = (int)values[c++], number = (int)values[c++], change = (int)values[c++]
                               , discount = (double)values[c++], comment = (string)values[c++] };
        }

        private const string cmdNew = @"POSTerminal\Check\[new]";
        public static check NewCheck(this Query query, int user, int change)
        {
            check result = null;
            query.Execute(cmdNew, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@change", Value = change } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }


        private const string cmdNewAll = @"POSTerminal\Check\[new_all]";
        public static List<check> NewAll(this Query query, int user, int change)
        {
            List<check> result = new List<check>();
            query.Execute(cmdNewAll, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@change", Value = change } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }
    }
}