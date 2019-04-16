using System.Web;
using System.Web.Http;
using GriB.Client.App.App_Start;

namespace GriB.Client.App
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            WebCacheConfig.Init();
        }
    }
}
