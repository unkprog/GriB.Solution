﻿using System;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading.Tasks;
using GriB.Common.Diagnostics;
using Newtonsoft.Json.Linq;

namespace GriB.Common.Web.Http
{
    public class BaseApiController : System.Web.Http.ApiController
    {
        protected ILogger logger;

        public BaseApiController()
        {
            logger = new Logger();
        }

        protected void SetPrincipal(IPrincipal principal)
        {
            //Thread.CurrentPrincipal = principal;
            //if (HttpContext.Current != null)
            //{
            //    HttpContext.Current.User = principal;
            //}
        }

        public HttpResponseMessage TryCatchResponse(Func<HttpResponseMessage> func)
        {
            try
            {
                return func.Invoke();
            }
            catch (ApiException ex)
            {
                logger.WriteError(ex);
                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    error = ex.Message,
                    trace = ex.StackTrace
                });
            }
        }

        public async Task<HttpResponseMessage> TryCatchResponseAsync(Func<Task<HttpResponseMessage>> func)
        {
            try
            {
                Task<HttpResponseMessage> taskInvoke = func.Invoke();
                return await taskInvoke;
            }
            catch (ApiException ex)
            {
                logger.WriteError(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new HttpResponseException(ex));
            }
        }

        public async Task<HttpResponseMessage> CheckResponseError(Func<Task<JObject>> funcGet, Func<JObject, HttpResponseMessage> func)
        {
            Task<JObject> responseTask = funcGet.Invoke();
            JObject response = await responseTask;

            HttpResponseException ex = response.ToObject<HttpResponseException>();
            if (ex != null && !string.IsNullOrEmpty(ex.error))
               return Request.CreateResponse(HttpStatusCode.OK, ex);

            return func.Invoke(response);
        }
    }
}
