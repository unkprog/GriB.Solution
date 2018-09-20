using GriB.Common.Models.pos;

namespace GriB.Common.Web.Http
{
    public class HttpBaseMessage
    {

    }

    public class HttpResponseException
    {
        public HttpResponseException()
        {
        }
        public HttpResponseException(System.Exception ex)
        {
            error = ex?.Message;
            trace = ex?.StackTrace;
        }

        public string error { get; set; }
        public string trace { get; set; }
    }

    public class HttpRegisterMessage
    {
        public sqlsrv server   { get; set; }
        public sqldb  database { get; set; }
    }
}
