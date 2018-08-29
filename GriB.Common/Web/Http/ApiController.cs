using System;
using System.Net;
using System.Net.Http;
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
            catch (Exception ex)
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
