using System.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Models.pos;
using GriB.Common.Sql;

namespace GriB.General.App.Managers.pos
{
    public static class Server
    {
        private static sqlsrv readUServerFromValues(object[] values) => new sqlsrv() { id = (int)values[0], address = (string)values[1], user = (string)values[2], pass = (string)values[3], count_db = (int)values[4] };

        private const string cmdGet = @"server\[get]";
        public static List<sqlsrv> GetServers(this Query query)
        {
            List<sqlsrv> result = new List<sqlsrv>();
            query.Execute(cmdGet, null
            , (values) =>
            {
                result.Add(readUServerFromValues(values));
            });

            return result;
        }

        public static sqlsrv GetServer(this Query query, int id)
        {
            sqlsrv result;
            List<sqlsrv> servers = GetServers(query);

            result = servers.FirstOrDefault(f => f.id == id);

            return result;
        }

        private const string cmdDbGet = @"server\db\[get]";
        public static sqldb GetServerDatabase(this Query query, int id)
        {
            sqldb result = null;
            query.Execute(cmdDbGet, sqlParameters: new SqlParameter[] { new SqlParameter("@field", "id"), new SqlParameter("@id", id), new SqlParameter() { ParameterName = "@server", Value = 0 }, new SqlParameter() { ParameterName = "@catalog", Value = string.Empty } }
            , action: (values) =>
            {
                result = new sqldb() { id = (int)values[0], server = (int)values[1], catalog = (string)values[2], user = (string)values[3], pass = (string)values[4] };
            });

            return result;
        }

        public static List<sqldb> GetServerDatabases(this Query query, sqlsrv server)
        {
            List<sqldb> result = new List<sqldb>();
            query.Execute(cmdDbGet, sqlParameters: new SqlParameter[] { new SqlParameter("@field", "server"), new SqlParameter("@id", 0), new SqlParameter("@server", server.id), new SqlParameter("@catalog", "") }
            , action: (values) =>
            {
                result.Add(new sqldb() { id = (int)values[0], server = (int)values[1], catalog = (string)values[2], user = (string)values[3], pass = (string)values[4] });
            });

            return result;
        }

        private const string cmdDbIns = @"server\db\[ins]";
        public static sqldb InsertServerDatabases(this Query query, sqldb database)
        {
            sqldb result = database;
            query.Execute(cmdDbIns, sqlParameters: new SqlParameter[] { new SqlParameter("@server", database.server), new SqlParameter("@catalog", database.catalog), new SqlParameter("@user", database.user), new SqlParameter("@pass", database.pass) }
            , action: (values) =>
            {
                result.id = (int)values[0];
            });

            return result;
        }
    }
}