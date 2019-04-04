﻿namespace GriB.Common.Models.pos
{
    public class sqlsrv : model_login
    {
        public string address { get; set; }
        public int   count_db { get; set; }
    }

    public static class sqlsrv_ext
    {
        public static string ConnectionString(this sqlsrv _sqlsrv)
        {

            //SqlConnectionStringBuilder sqlConnectionStringBuilder = new SqlConnectionStringBuilder();
            //sqlConnectionStringBuilder.DataSource = _sqlsrv.address;
            ////if (IsSSPI)
            ////    sqlConnectionStringBuilder.IntegratedSecurity = true;
            ////else
            ////{
            //sqlConnectionStringBuilder.UserID = _sqlsrv.user;
            //sqlConnectionStringBuilder.Password = _sqlsrv.pass;
            //sqlConnectionStringBuilder.ConnectTimeout = 10;
            //sqlConnectionStringBuilder.ApplicationName = "POS Cloud App";

            ////sqlConnectionStringBuilder.Encrypt = true;
            ////sqlConnectionStringBuilder.TrustServerCertificate = true;
            //return sqlConnectionStringBuilder.ToString();
            string result = string.Concat("Data Source=", _sqlsrv.address
                , ";User ID=", _sqlsrv.user, ";Password=", _sqlsrv.pass
                , ";Connect Timeout=", 10
                , ";Application Name=", "POS Cloud App");

            return result;


        }
    }
}
