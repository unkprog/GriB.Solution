using GriB.Common.Models.Print;
using GriB.Web.Http;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using System.Web.Http.Results;

namespace GriB.Client.App.Controllers
{
    public class PrintController : BaseController
    {

        public class TestIp
        {
            public string ipString { get; set; }
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("registerserver")]
        public JsonResult<printserverremote> RegisterServer(string pskey, int port)
        {
            printserverremote psr = new printserverremote() { pskey = pskey, port = port };
            psr.ipaddress = Request.GetClientIpString();
            return Json(psr);
        }
    }
}