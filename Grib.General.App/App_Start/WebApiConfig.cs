using GriB.General.App.Handlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dispatcher;

namespace GriB.General.App
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Конфигурация и службы веб-API
            config.Filters.Add(new AuthorizeAttribute());

            // Маршруты веб-API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }//,
                //constraints: null,
                //handler: new NormalizeHandler(config)
            );

            GlobalConfiguration.Configuration.MessageHandlers.Add(new AuthorizationHeaderHandler());
        }
    }

    public class NormalizeHandler : DelegatingHandler
    {
        public NormalizeHandler(HttpConfiguration httpConfiguration)
        {
            InnerHandler = new HttpControllerDispatcher(httpConfiguration);
        }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var source = await request.Content.ReadAsStringAsync();
            source = source.Replace("json=", "");
            source = HttpUtility.UrlDecode(source);

            request.Content = new StringContent(source, Encoding.UTF8, "application/json");

            return await base.SendAsync(request, cancellationToken);
        }
    }
}
