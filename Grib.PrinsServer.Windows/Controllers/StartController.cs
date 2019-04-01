using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace GriB.PrintServer.Windows.Controllers
{
    public class StartController : ApiController
    {
        public HttpResponseMessage Get()
        {
            var response = new HttpResponseMessage();
            response.Content = new StringContent("PSIS");
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html") { CharSet = Encoding.UTF8.HeaderName };
            return response;
        }


    }
}
