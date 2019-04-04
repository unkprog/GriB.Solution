using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using GriB.Common.Diagnostics;
using GriB.Common.Sql;
using Newtonsoft.Json.Linq;

namespace GriB.Common.Web.Http
{
    public class BaseApiController : Microsoft.AspNetCore.Mvc.Controller
    {
        protected ILogger logger;

        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostingEnvironment;


        public BaseApiController(Microsoft.AspNetCore.Hosting.IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
        }

        public BaseApiController()
        {
            string logPath = string.Concat(_hostingEnvironment.WebRootPath, "Logs");
            if (!Directory.Exists(logPath))
                Directory.CreateDirectory(logPath);

            logger = new Logger(logPath) { IsLogging = true };
        }


        protected Query CreateQuery(string connectionString, string path)
        {
            return new Query(connectionString, string.Concat(_hostingEnvironment.WebRootPath, path), logger);
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
            try
            {
                Task<JObject> responseTask = funcGet.Invoke();
                JObject response = await responseTask;

                HttpResponseException ex = response.ToObject<HttpResponseException>();
                if (ex != null && !string.IsNullOrEmpty(ex.error))
                    return Request.CreateResponse(HttpStatusCode.OK, ex);

                return func.Invoke(response);
            }
            catch (Exception ex)
            {
                logger.WriteError(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new HttpResponseException(ex));
            }
        }
    }

    public static class BaseApiControllerExt
    {
        public static HttpResponseMessage CreateResponse<T>(this Microsoft.AspNetCore.Http.HttpRequest requestMessage, HttpStatusCode statusCode, T content)
        {
            return new HttpResponseMessage() { StatusCode = statusCode, Content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(content)) };
        }

    }
}

namespace System.Web
{
    public static class HttpContext
    {
        private static Microsoft.AspNetCore.Http.IHttpContextAccessor m_httpContextAccessor;


        public static void Configure(Microsoft.AspNetCore.Http.IHttpContextAccessor httpContextAccessor)
        {
            m_httpContextAccessor = httpContextAccessor;
        }


        public static Microsoft.AspNetCore.Http.HttpContext Current
        {
            get
            {
                return m_httpContextAccessor.HttpContext;
            }
        }

    }
}