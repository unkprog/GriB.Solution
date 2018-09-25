using System.Data.SqlClient;

namespace GriB.Common.Models.pos
{
    public class sqldb : model_login
    {
        public int    server  { get; set; }
        public string catalog { get; set; }
    }

    public static class sqldb_ext
    {
        public static string ConnectionString(this sqldb _sqldb, sqlsrv _sqlsrv)
        {

            SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder();
            sqlConnectionStringBuilder.DataSource = _sqlsrv.address;
            sqlConnectionStringBuilder.InitialCatalog = _sqldb.catalog;
            //if (IsSSPI)
            //    sqlConnectionStringBuilder.IntegratedSecurity = true;
            //else
            //{
            sqlConnectionStringBuilder.UserID = _sqldb.user;
            sqlConnectionStringBuilder.Password = _sqldb.pass;
            sqlConnectionStringBuilder.ConnectTimeout = 10;
            sqlConnectionStringBuilder.ApplicationName = "POS Cloud App";

            //sqlConnectionStringBuilder.Encrypt = true;
            //sqlConnectionStringBuilder.TrustServerCertificate = true;
            return sqlConnectionStringBuilder.ToString();

        }
    }
}
