using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

namespace GriB.General.App.Managers
{
    public static class AppSettings
    {
        public static string GetAttribute(string aAttribute)
        {
            return ConfigurationManager.AppSettings.Get(aAttribute);
        }

        public static bool GetAttributeBool(string aAttribute)
        {
            string value = ConfigurationManager.AppSettings.Get(aAttribute);
            return !string.IsNullOrEmpty(value) && value.ToLower() == "true";
        }

        public static class Database
        {
            public static string DataSource => GetAttribute("Database.DataSource");
            public static string InitialCatalog => GetAttribute("Database.InitialCatalog");
            public static bool IsSSPI => GetAttributeBool("Database.IsSSPI");
            public static string UserID => GetAttribute("Database.UserID");
            public static string Password => GetAttribute("Database.Password");

            private static int _ConnectTimeout = 60;
            private static readonly string _ApplicationName = "POS Cloud Api";
            public static string ConnectionString
            {
                get
                {
                    SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder();
                    sqlConnectionStringBuilder.DataSource = DataSource;
                    sqlConnectionStringBuilder.InitialCatalog = InitialCatalog;
                    if (IsSSPI)
                        sqlConnectionStringBuilder.IntegratedSecurity = true;
                    else
                    {
                        sqlConnectionStringBuilder.UserID = UserID;
                        sqlConnectionStringBuilder.Password = Password;
                    }
                    sqlConnectionStringBuilder.ConnectTimeout = _ConnectTimeout;
                    sqlConnectionStringBuilder.ApplicationName = _ApplicationName;

                    //sqlConnectionStringBuilder.Encrypt = true;
                    //sqlConnectionStringBuilder.TrustServerCertificate = true;
                    return sqlConnectionStringBuilder.ToString();
                }
            }


            public static string ConnectionStringEmpty
            {
                get
                {
                    SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder();
                    sqlConnectionStringBuilder.DataSource = DataSource;
                    if (IsSSPI)
                        sqlConnectionStringBuilder.IntegratedSecurity = true;
                    else
                    {
                        sqlConnectionStringBuilder.UserID = UserID;
                        sqlConnectionStringBuilder.Password = Password;
                    }
                    sqlConnectionStringBuilder.ConnectTimeout = _ConnectTimeout;
                    sqlConnectionStringBuilder.ApplicationName = _ApplicationName;

                    //sqlConnectionStringBuilder.Encrypt = true;
                    //sqlConnectionStringBuilder.TrustServerCertificate = true;
                    return sqlConnectionStringBuilder.ToString();
                }
            }

            public static class Path
            {
                public static string Sql   => GetAttribute("Database.Path.Sql");
                public static string Query => GetAttribute("Database.Path.Query");
            }
        }
    }
}