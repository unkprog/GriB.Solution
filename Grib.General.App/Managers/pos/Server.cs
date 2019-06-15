﻿using System.Linq;
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
            sqldb result = new sqldb();
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

        private const string cmdDbGetFree = @"server\db\[getfree]";
        public static List<sqldb> GetFreeServerDatabases(this Query query, sqlsrv server)
        {
            List<sqldb> result = new List<sqldb>();
            query.Execute(cmdDbGetFree, sqlParameters: null, action: (values) =>
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
        public static sqldb InsertServerDatabases(this Query query, sqldb_full database)
        {
            sqldb result = database;
            query.Execute(cmdDbIns, sqlParameters: new SqlParameter[] { new SqlParameter("@server", Helper.GetSqlParamValue(database.sqlsrv)), new SqlParameter("@catalog", database.catalog), new SqlParameter("@user", database.user), new SqlParameter("@pass", database.pass) }
            , action: (values) =>
            {
                result.id = (int)values[0];
            });

            return result;
        }

        private const string cmdDbSet = @"server\db\[set]";
        public static sqldb SetServerDatabases(this Query query, sqldb_full database)
        {
            sqldb result = database;
            query.Execute(cmdDbSet, sqlParameters: new SqlParameter[] { new SqlParameter("@id", database.id), new SqlParameter("@server", Helper.GetSqlParamValue(database.sqlsrv)), new SqlParameter("@catalog", database.catalog), new SqlParameter("@user", database.user), new SqlParameter("@pass", database.pass) }
            , action: (values) =>
            {
                result.id = (int)values[0];
            });

            return result;
        }


        private const string cmdDbDel = @"server\db\[del]";
        public static void DelServerDatabases(this Query query, int id)
        {
            query.Execute(cmdDbDel, sqlParameters: new SqlParameter[] { new SqlParameter("@id", id) }
            , action: (values) => { });
        }

        private const string cmdDbGetAll = @"server\db\[get_all]";
        public static List<sqldb_full> GetListDatabases(this Query query, int id = 0)
        {
            List<sqldb_full> result = new List<sqldb_full>();
            query.Execute(cmdDbGetAll, sqlParameters: new SqlParameter[] { new SqlParameter("@id", id) }
            , action: (values) =>
            {
                result.Add(new sqldb_full() { id = (int)values[0], catalog = (string)values[1], user = (string)values[2], pass = (string)values[3], server = (int)values[4], sqlsrv = new sqlsrv() { id = (int)values[4], address = (string)values[5] } });
            });

            return result;
        }
    }
}