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
    }
}
