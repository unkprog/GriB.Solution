
namespace GriB.Common.Web.Http
{

    public  class ApiException : System.Exception
    {
        public ApiException() : base()
        {

        }

        public ApiException(string message) : base(message)
        {

        }

        public ApiException(string message, ApiException innerException) : base(message, innerException)
        {

        }
    }
}
