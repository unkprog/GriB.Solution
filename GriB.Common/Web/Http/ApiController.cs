using System;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
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

        private void SetPrincipal(IPrincipal principal)
        {
            Thread.CurrentPrincipal = principal;
            if (HttpContext.Current != null)
            {
                HttpContext.Current.User = principal;
            }
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
    }
}
