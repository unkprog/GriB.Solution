using System.Web;
using System.Web.Http;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.General.App.Managers;

namespace GriB.General.App
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            CheckAndCreateDatabase(Server.MapPath("/"));
        }

        //void Application_BeginRequest(object sender, EventArgs e)
        //{
        //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
        //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "true");
        //    if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
        //    {
        //        HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "POST");
        //        HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type");
        //        HttpContext.Current.Response.Flush();
        //        HttpContext.Current.Response.End();
        //    }
        //}

        private const string cmdIns_sqldb = @"Data\01.001.[pos_sqldb_ins]";
        private void CheckAndCreateDatabase(string mappath)
        {
            string path = string.Concat(mappath, AppSettings.Database.Path.Sql);

            Database.CreateDatabase(AppSettings.Database.ConnectionStringEmpty, AppSettings.Database.InitialCatalog);
            Database.CreateTables(path, AppSettings.Database.ConnectionString);

            Query query = new Query(AppSettings.Database.ConnectionString, path, null);
            query.Execute(cmdIns_sqldb, new SqlParameter[] { new SqlParameter("@address", AppSettings.Database.DataSource), new SqlParameter("@user", AppSettings.Database.UserID), new SqlParameter("@pass", AppSettings.Database.Password) }
            , (values) => { });
        }
    }
}
