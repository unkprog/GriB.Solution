using System;
using System.IO;
using System.Data.SqlClient;

namespace GriB.General.App.Managers
{
    public static class Database
    {
        public static void CheckAndUpdate(string rootPath)
        {
            CreateDatabase();
            CreateTables(rootPath);
        }

        private static void CreateDatabase()
        {
            Common.Sql.Helper.CreateCommand(AppSettings.Database.ConnectionStringEmpty, string.Empty, 
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
                                                       , Environment.NewLine, "set @result = case when db_id (N'", AppSettings.Database.InitialCatalog, "') is null then 1 else 0 end"
                                                       , Environment.NewLine, "if db_id (N'", AppSettings.Database.InitialCatalog, "') is null"
                                                       , Environment.NewLine, "   create database [", AppSettings.Database.InitialCatalog, "]"
                                                       , Environment.NewLine, "          on primary (name = N'", AppSettings.Database.InitialCatalog, "', filename = '", instPath, AppSettings.Database.InitialCatalog, "', size = 5120KB , maxsize = unlimited, filegrowth = 1024KB)"
                                                       , Environment.NewLine, "          log on (name = N'", AppSettings.Database.InitialCatalog, "_log', filename = '", logPath, AppSettings.Database.InitialCatalog, "_log', size = 1024KB , maxsize = 2048GB, filegrowth = 10%)"
                                                       , Environment.NewLine, "          collate Cyrillic_General_CI_AS"
                                                       , Environment.NewLine, "select @result");
                    if ((bool)command.ExecuteScalar())
                    {
                        command.CommandText = string.Concat("use master", Environment.NewLine, "alter database [", AppSettings.Database.InitialCatalog, "] set recovery simple, auto_shrink on");
                        command.ExecuteNonQuery();
                    }
                }
            );
        }

        private static void CreateTables(string rootPath)
        {
            string path = string.Concat(rootPath, AppSettings.Database.Path.Sql);

            Common.Sql.Helper.CreateCommand(AppSettings.Database.ConnectionString, string.Empty,
                (connection, command) =>
                {
                    Common.IO.Helper.ForEachDirectoryFiles(path, "*.sql", SearchOption.TopDirectoryOnly,
                        (fileInfo) =>
                        {
                            Common.Sql.Helper.LoadSqlScript(fileInfo.FullName,
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

       
    }
}