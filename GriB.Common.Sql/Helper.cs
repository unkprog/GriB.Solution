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
    }
}
