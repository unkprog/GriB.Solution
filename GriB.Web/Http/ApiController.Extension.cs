using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GriB.Web.Http
{
    public static class ApiControllerExtension
    {
        public static HttpResponseMessage CreateResponse(this ApiController controller, HttpStatusCode statusCode, object value = null)
        {
            return controller.Request.CreateResponse(statusCode, value);
        }

        public static HttpResponseMessage CreateResponse<T>(this ApiController controller, HttpStatusCode statusCode, T value)
        {
            return controller.Request.CreateResponse(statusCode, value);
        }

    }
}
