﻿using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using GriB.Common.Diagnostics;
using GriB.Common.Sql;
using Newtonsoft.Json.Linq;

namespace GriB.Web.Http
{
    public class BaseApiController : ApiController
    {
        protected ILogger logger;

        public BaseApiController()
        {
            string logPath = string.Concat(PhysicalApplicationPath, "Logs");
            if (!Directory.Exists(logPath))
                Directory.CreateDirectory(logPath);

            logger = new Logger(logPath) { IsLogging = true };
        }

        public string PhysicalApplicationPath => HttpContext.Current.Request.PhysicalApplicationPath;

        protected Query CreateQuery(string connectionString, string path)
        {
            return new Query(connectionString, string.Concat(PhysicalApplicationPath, path), logger);
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
                return this.CreateResponse(HttpStatusCode.OK, new
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
                return this.CreateResponse(HttpStatusCode.InternalServerError, new HttpResponseException(ex));
            }
        }

        public async Task<HttpResponseMessage> CheckResponseError(Func<Task<JObject>> funcGet, Func<JObject, HttpResponseMessage> func)
        {
            try
            {
                Task<JObject> responseTask = funcGet.Invoke();
                JObject response = await responseTask;

                HttpResponseException ex = response.ToObject<HttpResponseException>();
                if (ex != null && !string.IsNullOrEmpty(ex.error))
                    return this.CreateResponse(HttpStatusCode.OK, ex);

                return func.Invoke(response);
            }
            catch (Exception ex)
            {
                logger.WriteError(ex);
                return this.CreateResponse(HttpStatusCode.InternalServerError, new HttpResponseException(ex));
            }
        }

        public HttpResponseMessage CreateResponse(HttpStatusCode statusCode)
        {
            return Request.CreateResponse(statusCode);
        }

        public HttpResponseMessage CreateResponse(HttpStatusCode statusCode, object value)
        {
            return Request.CreateResponse(statusCode, value);
        }
    }
}