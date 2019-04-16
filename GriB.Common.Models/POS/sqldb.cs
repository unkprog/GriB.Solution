namespace GriB.Common.Models.pos
{
    public class sqldb : model_login
    {
        public int    server  { get; set; }
        public string catalog { get; set; }
    }

    public class sqldb_full : sqldb
    {
        public sqldb_full()
        {
            sqlsrv = new sqlsrv();
        }

        public sqlsrv sqlsrv { get; set; }
}

    public static class sqldb_ext
    {
        public static string ConnectionString(this sqldb _sqldb, sqlsrv _sqlsrv)
        {
            string result = string.Concat("Data Source=", _sqlsrv.address, ";Initial Catalog=", _sqldb.catalog
                , ";User ID=", _sqldb.user, ";Password=", _sqldb.pass
                , ";Connect Timeout=", 10
                , ";Application Name=", "POS Cloud App");

            return result;

        }

        public static string ConnectionString(this sqldb_full _sqldb)
        {
            return ConnectionString(_sqldb, _sqldb.sqlsrv);
        }
    }
}
