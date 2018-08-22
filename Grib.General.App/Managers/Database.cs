using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace GriB.General.App.Managers
{
    public static class Database
    {
        public static void CheckAndUpdate()
        {
            CreateDatabase();
        }

        private static void CreateDatabase()
        {
            using (SqlConnection connection = new SqlConnection(AppSettings.Database.ConnectionStringEmpty))
            {
                using (SqlCommand command = new SqlCommand(string.Empty, connection))
                {
                    if (connection.State != System.Data.ConnectionState.Open) connection.Open();

                    command.CommandText = "select [InstanceDefaultDataPath] = serverproperty('InstanceDefaultDataPath'), [InstanceDefaultLogPath] = serverproperty('InstanceDefaultLogPath')";
                    string instPath = string.Empty, logPath = string.Empty;

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
                                                       , Environment.NewLine, "if db_id (N'", AppSettings.Database.InitialCatalog, "') is null"
                                                       , Environment.NewLine, "   create database [", AppSettings.Database.InitialCatalog, "]"
                                                       , Environment.NewLine, "          on primary (name = N'", AppSettings.Database.InitialCatalog, "', filename = '", instPath, AppSettings.Database.InitialCatalog, "', size = 5120KB , maxsize = unlimited, filegrowth = 1024KB)"
                                                       , Environment.NewLine, "          log on (name = N'", AppSettings.Database.InitialCatalog, "_log', filename = '", logPath, AppSettings.Database.InitialCatalog, "_log', size = 1024KB , maxsize = 2048GB, filegrowth = 10%)"
                                                       , Environment.NewLine, "          collate Cyrillic_General_CI_AS ");
                    command.CommandTimeout = 0;
                    command.ExecuteNonQuery();

                    command.CommandText = string.Concat("use master", Environment.NewLine, "alter database [", AppSettings.Database.InitialCatalog ,"] set recovery simple, auto_shrink on");
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}