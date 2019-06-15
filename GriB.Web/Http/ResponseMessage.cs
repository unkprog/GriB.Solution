using System.Collections.Generic;
using GriB.Common.Models.pos;
using GriB.Common.Models.pos.settings;

namespace GriB.Web.Http
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

    public class HttpRegisterSiteMessage
    {
        public bool IsCreated { get; set; }
        public string msg { get; set; }
    }

    public class HttpEmployeeMessage
    {
        public employee Employee { get; set; }
    }

    public class HttpEmployeesMessage
    {
        public List<employee> Employees { get; set; }
    }

    public class HttpScMessage
    {
        public List<sqldb_full> Sc { get; set; }
    }
}
