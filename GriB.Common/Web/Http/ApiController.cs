using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using GriB.Common.Diagnostics;
using GriB.Common.Sql;
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


        protected Query CreateQuery(string connectionString, string path)
        {
            return new Query(connectionString, string.Concat(HttpContext.Current.Request.PhysicalApplicationPath, path), logger);
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
