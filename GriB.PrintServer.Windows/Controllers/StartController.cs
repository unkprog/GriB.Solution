using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using GriB.Common.Models.Print;

namespace GriB.PrintServer.Windows.Controllers
{
    public class StartController : ApiController
    {
        static int _counter = 0;
        static printserverremote remoteParams = null;
        
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
                    registerserver registerServer = new registerserver() { pskey = Properties.Settings.Default.pskey, port = Properties.Settings.Default.ServicePort };
                    remoteParams = GriB.Common.Net.Json.Post<printserverremote, registerserver>(Properties.Settings.Default.CloudServer, "/print/registerserver", registerServer);
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
