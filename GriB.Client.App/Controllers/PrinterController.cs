using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    [AllowAnonymous]
    public class PrinterController : BaseController
    {
        private const string testPrintServerKey = "0CF584EC-AEFB-4434-AA68-25104B2B6BD7";
        private static Dictionary<string, string> printServers = null;


    }
}