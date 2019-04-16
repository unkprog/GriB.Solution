using System;
using System.Collections.Generic;
using GriB.Client.App.Managers;
using GriB.Common.Models.pos;
using GriB.Web.Http;

namespace GriB.Client.App.App_Start
{
    public static class WebCacheConfig
    {
        internal static List<sqldb_full> scList = new List<sqldb_full>();

        public static void Init()
        {
            try
            {
                HttpScMessage scMsg = Common.Net.Json.Get<HttpScMessage>(AppSettings.Server.Register, "api/account/sc");
                scList = scMsg.Sc;
            }
            catch (Exception)
            {

            }
        }

        //public static void Init()
        //{
        //    try
        //    {
        //        HttpScMessage scMsg = Common.Net.Json.Get<HttpScMessage>(AppSettings.Server.Register, "api/account/sc");
        //        scList = scMsg.Sc;
        //    }
        //    catch (Exception)
        //    {

        //    }
        //}
    }
}