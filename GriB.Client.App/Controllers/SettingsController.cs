﻿using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GriB.Common.Web.Http;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class SettingsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        [ActionName("settings")]
        public HttpResponseMessage GetSettings()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            System.Reflection.AssemblyName assemblyName = assembly.GetName();
            Version version = assemblyName.Version;

            return Request.CreateResponse(HttpStatusCode.OK, new {
                IsDebug =
#if DEBUG
                true,
#else
                false,
#endif
                Version = version.ToString(),
                Language = "ru"
            });
        }

        [HttpGet]
        [ActionName("get_organization")]
        public HttpResponseMessage GetOrganization()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            System.Reflection.AssemblyName assemblyName = assembly.GetName();
            Version version = assemblyName.Version;

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                IsDebug =
#if DEBUG
                true,
#else
                false,
#endif
                Version = version.ToString(),
                Language = "ru",
                ServerRegister = Managers.AppSettings.Server.Register
            });
        }
    }
}