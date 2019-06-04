﻿using GriB.Common.Models.pos;
using System;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace GriB.Common.Sql
{
    public static class Helper
    {
        public static void CreateCommand(string connectionString, string commandText, Action<SqlConnection, SqlCommand> action)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand(commandText, connection))
                {
                    if (connection.State != System.Data.ConnectionState.Open) connection.Open();
                    action?.Invoke(connection, command);
                }
            }
        }

        public static void ExecuteNonQuery(string connectionString, string commandText, SqlParameter[] sqlParameters = null)
        {
            CreateCommand(connectionString, commandText,
                 (connection, command) =>
                 {
                     if (sqlParameters != null && sqlParameters.Length > 0)
                         command.Parameters.AddRange(sqlParameters);

                     command.ExecuteNonQuery();
                 }
            );
        }


        public static void ExecuteQuery(string connectionString, string commandText, SqlParameter[] sqlParameters, Action<object[]> action)
        {
            if (action == null)
                return;

            CreateCommand(connectionString, commandText,
                 (connection, command) =>
                 {
                     if (sqlParameters != null && sqlParameters.Length > 0)
                         command.Parameters.AddRange(sqlParameters);

                     using (SqlDataReader reader = command.ExecuteReader())
                     {
                         object[] values = new object[reader.FieldCount];
                         while(reader.Read())
                         {
                             reader.GetValues(values);
                             action(values);
                         }
                     }
                 }
            );
        }

        public static void LoadSqlScript(string file, Action<string> action)
        {
            if (!File.Exists(file))
                return;

            if (action == null)
                return;

            using (StreamReader reader = File.OpenText(file))
            {
                string line = string.Empty;
                StringBuilder script = new StringBuilder();

                Action<string> actionInoke = new Action<string>((sqlScript) =>
                {
                    if (!string.IsNullOrEmpty(sqlScript))
                        action(sqlScript);
                });

                while ((line = reader.ReadLine()) != null)
                {
                    if (string.Compare(line.Trim().ToLower(), "go") == 0)
                    {
                        actionInoke(script.ToString());
                        script.Clear();
                    }
                    else
                        script.AppendLine(line);
                }
                actionInoke(script.ToString());
            }
        }

        public static string MinReportDate() => Constants.minReportDate.ToString(Constants.dateFormat);

        public static bool IsExistsDate(string _date, out DateTime outdate)
        {
            outdate = Date(_date);
            return outdate > Constants.minReportDate;
        }

        public static DateTime Date(string _date, string formatDate = "")
        {
            DateTime result = Constants.minReportDate;
            if (!DateTime.TryParseExact(_date, string.IsNullOrEmpty(formatDate) ? Constants.dateFormat : formatDate, null, System.Globalization.DateTimeStyles.None, out result))
                result = Constants.minReportDate;
            return result;
        }

        public static DateTime DateReportEnd(string _date)
        {
            DateTime result = Constants.minReportDate;
            if (DateTime.TryParseExact(_date, Constants.dateFormat, null, System.Globalization.DateTimeStyles.None, out result) && result > Constants.minReportDate)
                result = result.AddDays(1);
            return result;
        }

        public static bool IsEmptyValue(this model_base value)
        {
            return (value == null || value.id == 0);
        }

        public static int GetSqlParamValue(this model_base value)
        {
            return (value == null ? 0 : value.id);
        }
    }
}
