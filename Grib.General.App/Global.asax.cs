using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace GriB.General.App
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            Managers.Database.CheckAndUpdate(Server.MapPath("/"));
            GlobalConfiguration.Configure(WebApiConfig.Register);
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
    }
}
