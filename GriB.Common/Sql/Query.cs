using System;
using System.Data.SqlClient;
using GriB.Common.Diagnostics;

namespace GriB.Common.Sql
{
    public class Query : Disposable
    {
        private string connectionString;
        private string path;
        private ILogger logger;
        public Query(string connectionString, string path, ILogger logger)
        {
            this.connectionString = connectionString;
            this.path = path;
            this.logger = logger;
        }

        public void Execute(string command, SqlParameter[] sqlParameters, Action<object[]> action)
        {
            if (action == null)
                return;

            string commandText = IO.Helper.ReadFileAsString(string.Concat(path, @"\", command, ".sql"));

            this.ExecuteQuery(commandText, sqlParameters, action);
        }

        public void ExecuteQuery(string commandText, SqlParameter[] sqlParameters, Action<object[]> action)
        {
            if (string.IsNullOrEmpty(commandText))
                return;

            Helper.ExecuteQuery(connectionString, commandText, sqlParameters, action);
        }

        public void ExecuteNonQuery(string command, SqlParameter[] sqlParameters)
        {

            string commandText = IO.Helper.ReadFileAsString(string.Concat(path, @"\", command, ".sql"));

            if (string.IsNullOrEmpty(commandText))
                return;

            Helper.ExecuteNonQuery(connectionString, commandText, sqlParameters);
        }
    }
}
