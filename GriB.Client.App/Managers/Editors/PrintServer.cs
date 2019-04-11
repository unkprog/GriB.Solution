using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;
using GriB.Common.Models.Print;

namespace GriB.Client.App.Managers.Editors
{
    public static class PrintServer
    {
        private static printserver readFromValues(object[] values) => new printserver() { id = (int)values[0], name = (string)values[1], pskey = (string)values[2], description = (string)values[3] };

        private const string cmdGet = @"Editor\PrintServer\[get]";
        public static List<printserver> GetPrintServers(this Query query)
        {
            List<printserver> result = new List<printserver>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static printserver GetPrintServer(this Query query, int id)
        {
            printserver result = new printserver() { pskey = System.Guid.NewGuid().ToString().Replace("-", "") };
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\PrintServer\[set]";
        public static printserver SetPrintServer(this Query query, printserver printserver, int user)
        {
            printserver result = printserver;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", printserver.id), new SqlParameter("@u", user), new SqlParameter("@name", printserver.name), new SqlParameter("@pskey", printserver.pskey), new SqlParameter("@description", printserver.description) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetPrintServer(query, result.id);
        }

        private const string cmdDel = @"Editor\PrintServer\[del]";
        public static void DelPrintServer(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}