using System;
using System.IO;
using System.Net;
using System.Web.Http;
using System.Web.Http.SelfHost;

namespace GriB.PrintServer.Windows
{
    public class Server
    {
        private HttpSelfHostServer _server;
        private HttpSelfHostConfiguration _config;
        private string _serviceAddress = string.Empty;

        public void Start()
        {

            _serviceAddress = string.Concat("http://localhost:", Properties.Settings.Default.ServicePort == 0 ? 25599 : Properties.Settings.Default.ServicePort);
            _config = new HttpSelfHostConfiguration(_serviceAddress);
            //_config.ClientCredentialType = System.ServiceModel.HttpClientCredentialType.Windows;
            //Controllers.ControllersResolver controllersResolver = new Controllers.ControllersResolver();
            //_config.Services.Replace(typeof(IAssembliesResolver), controllersResolver);

            _config.Routes.MapHttpRoute("Default", "{controller}/{action}/{id}", new { controller = "Start", Action="get", id = RouteParameter.Optional });

            _server = new HttpSelfHostServer(_config);
            _server.OpenAsync();
        }

        public void Stop()
        {
            _server.CloseAsync().Wait();
            _server.Dispose();
            _serviceAddress = string.Empty;
        }

        public bool IsServerRuning()
        {
            string response = HttpRequestCheckPrintServer();
            return (response == "PSIS");
        }

        private string HttpRequestCheckPrintServer()
        {
            string result = string.Empty;
            if (!string.IsNullOrEmpty(_serviceAddress))
            {
                try
                {
                    using (WebClient webClient = new WebClient())
                    {
                        Uri result2 = null;
                        if (Uri.TryCreate(_serviceAddress, UriKind.RelativeOrAbsolute, out result2))
                        {
                            webClient.Headers.Add("Accept-Language", " en-US");
                            webClient.Headers.Add("Accept-Encoding", "gzip, deflate");
                            webClient.Headers.Add("Accept", " text/html, application/xhtml+xml, */*");
                            webClient.Headers.Add("User-Agent", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)");
                            using (StreamReader streamReader = new StreamReader(webClient.OpenRead(result2)))
                            {
                                result = streamReader.ReadToEnd();
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    result = string.Empty;
                }
            }
            return result;
        }
    }
}
