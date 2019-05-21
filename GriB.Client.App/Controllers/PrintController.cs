﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using GriB.Common.Diagnostics;
using GriB.Common.Models.Print;
using GriB.Web.Http;

namespace GriB.Client.App.Controllers
{
    public class PrintController : BaseController
    {
        private static Dictionary<string, printserverremote> printServers = new Dictionary<string, printserverremote>();
       

        //private static printserverremote FindServerRemote(string pskey, ILogger logger)
        //{
        //    printserverremote result = null;
        //    List<sqldb_full> scList = WebCacheConfig.scList;

        //    for(int i=0, icount = scList == null ? 0 : scList.Count; i< icount; i++)
        //    {
        //        using (Query query = new Query(scList[i].ConnectionString(), AppSettings.Database.Path.Query, logger))
        //        {
        //            List<printserver> printservers = PrintServer.GetPrintServers(query, pskey);
        //            if(printservers != null && printservers.Count > 0)
        //            {
        //                result = new printserverremote() { pskey = printservers[0].pskey };
        //            }
        //        }
        //    }
        //    return result;
        //}

        private static printserverremote GetServerRemote(string pskey, ILogger logger)
        {
            printserverremote result;
            if (!printServers.TryGetValue(pskey, out result))
            {
                //result = FindServerRemote(pskey, logger);
                //if (result == null)
                result = new printserverremote() { pskey = pskey };
                printServers.Add(pskey, result);
            }
            return result;
        }

        [AllowAnonymous]
        [HttpPost]
        [ActionName("registerserver")]
        public JsonResult<printserverremote> RegisterServer(registerserver registerServer)
        {
            printserverremote psr = GetServerRemote(registerServer.pskey, logger);
            psr.port = registerServer.port;
            psr.ipaddress = Request.GetClientIpString();
            return Json(psr);
        }

        [HttpPost]
        [ActionName("printcheck")]
        public HttpResponseMessage PrintCheck(printserverdata data)
        {
            HttpResponseMessage result = null;
            printserverremote psr = GetServerRemote(data?.pskey, logger);
            string _serviceAddress = string.Concat("http://", psr.ipaddress, ":", psr.port, "/print/printcheck");
            try
            {
                printserverdata dataToSent = data;
                result = Common.Net.Json.Post<HttpResponseMessage, printserverdata>(_serviceAddress, "/print/printcheck", dataToSent);
            }
            catch(Exception ex)
            {
                logger?.WriteError(ex);
                result = CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            
            return result;
        }
    }
}