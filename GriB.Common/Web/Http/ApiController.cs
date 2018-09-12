using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using GriB.Common.Diagnostics;

namespace GriB.Common.Web.Http
{
    public class BaseApiController : System.Web.Http.ApiController
    {
        protected ILogger logger;

        public BaseApiController()
        {
            logger = new Logger();
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
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new
                {
                    error = ex.Message,
                    trace = ex.StackTrace
                });
            }
        }


        public async Task<TResult> PostJson<TResult, TParam>(string server, string url, TParam data)
        {
            return await PostJsonAsync<TResult, TParam>(server, url, data);
        }

        public async Task<TResult> PostJsonAsync<TResult, TParam>(string server, string url, TParam data)
        {
            TResult result = default(TResult);
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(server);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                response = await client.PostAsJsonAsync(url, data);
                response.EnsureSuccessStatusCode();
            }

            if (response != null)
                result = await response.Content.ReadAsAsync<TResult>();

            return result;
        }
    }
}
