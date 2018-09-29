using System.Web.Http;
using GriB.Client.App.Handlers;

namespace GriB.Client.App
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Конфигурация и службы веб-API
            //config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new AuthorizeAttribute());

            // Маршруты веб-API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            GlobalConfiguration.Configuration.MessageHandlers.Add(new AuthorizationHeaderHandler());
        }
    }
}
