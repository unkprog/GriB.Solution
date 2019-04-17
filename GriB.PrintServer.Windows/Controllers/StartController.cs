using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using GriB.Common.Models.Print;
using GriB.PrintServer.Windows.Properties;

namespace GriB.PrintServer.Windows.Controllers
{
    public class StartController : ApiController
    {
       
        static int _counter = 0;
        internal static printserverremote remoteParams = null;
        
        public HttpResponseMessage Get()
        {
            PingCloud();

            var response = new HttpResponseMessage();
            response.Content = new StringContent("PSIS");
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html") { CharSet = Encoding.UTF8.HeaderName };
            return response;
        }

        private void PingCloud()
        {
            if (remoteParams == null || _counter % 10 == 0)
            {
                _counter = 0; 
                try
                {
                    registerserver registerServerData = new registerserver() { pskey = Settings.Default.pskey, port = Settings.Default.ServicePort };
                    remoteParams = GriB.Common.Net.Json.Post<printserverremote, registerserver>(Constants.CloudServer, "/api/print/registerserver", registerServerData);
                    //JObject response = GriB.Common.Net.Json.Post<JObject, registerserver>(Constants.CloudServer, "/api/print/registerserver", registerServerData);
                    //result = data.ToString();
                }
                catch (Exception)
                {
                    remoteParams = null;
                }
                _counter++;
            }
        }
    }
}
