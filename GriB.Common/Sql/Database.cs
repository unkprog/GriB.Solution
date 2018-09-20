using System;
using System.IO;
using System.Data.SqlClient;

namespace GriB.Common.Sql
{
    public static class Database
    {

        public static void CreateDatabase(string connectionString, string catalog)
        {
            Helper.CreateCommand(connectionString, string.Empty,
                (connection, command) =>
                {
                    string instPath = string.Empty, logPath = string.Empty;
                    command.CommandTimeout = 0;

                    command.CommandText = "select [InstanceDefaultDataPath] = serverproperty('InstanceDefaultDataPath'), [InstanceDefaultLogPath] = serverproperty('InstanceDefaultLogPath')";
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        object[] values = new object[reader.FieldCount];
                        if (reader.Read())
                        {
                            reader.GetValues(values);
                            instPath = (string)values[0];
                            logPath = (string)values[1];
                        }
                    }

                    command.CommandText = string.Concat("use master"
                                                       , Environment.NewLine, "declare @result bit"
                                                       , Environment.NewLine, "set @result = case when db_id (N'", catalog, "') is null then 1 else 0 end"
                                                       , Environment.NewLine, "if db_id (N'", catalog, "') is null"
                                                       , Environment.NewLine, "   create database [", catalog, "]"
                                                       , Environment.NewLine, "          on primary (name = N'", catalog, "', filename = '", instPath, catalog, "', size = 5120KB , maxsize = unlimited, filegrowth = 1024KB)"
                                                       , Environment.NewLine, "          log on (name = N'", catalog, "_log', filename = '", logPath, catalog, "_log', size = 1024KB , maxsize = 2048GB, filegrowth = 10%)"
                                                       , Environment.NewLine, "          collate Cyrillic_General_CI_AS"
                                                       , Environment.NewLine, "select @result");
                    if ((bool)command.ExecuteScalar())
                    {
                        command.CommandText = string.Concat("use master", Environment.NewLine, "alter database [", catalog, "] set recovery simple, auto_shrink on");
                        command.ExecuteNonQuery();
                    }
                }
            );
        }

        public static void CreateTables(string path, string connectionString)
        {
            Helper.CreateCommand(connectionString, string.Empty,
                (connection, command) =>
                {
                    IO.Helper.ForEachDirectoryFiles(path, "*.sql", SearchOption.TopDirectoryOnly,
                        (fileInfo) =>
                        {
                            Helper.LoadSqlScript(fileInfo.FullName,
                                (script) =>
                                {
                                    command.CommandText = script;
                                    command.ExecuteNonQuery();
                                }
                            );
                        }
                    );
                }
            );
        }

        //private const string cmdIns_sqldb = @"01.001.[pos_sqldb_ins]";
        //private static void CreateData(string path, string connectionString)
        //{
        //    Common.Sql.Query query = new Common.Sql.Query(connectionString, path, null);
        //    query.Execute(cmdIns_sqldb, new SqlParameter[] { new SqlParameter("@address", AppSettings.Database.DataSource), new SqlParameter("@user", AppSettings.Database.UserID), new SqlParameter("@pass", AppSettings.Database.Password) }
        //    , (values) =>{ });
        //}
    }
}