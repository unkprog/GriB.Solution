using System.Net;
using System.Net.Http;
using System.Web.Http;
using GriB.Common.Sql;
using GriB.Common.Web.Http;
using GriB.General.App.Managers;
using GriB.Common.Models.pos;

namespace GriB.General.App.Controllers
{
    public class AccountController : BaseApiController
    {
        private Query _query;

        public AccountController() : base()
        {
            _query = new Query(AppSettings.Database.ConnectionString, AppSettings.Database.Path.Query, logger);
        }

        [HttpPost]
        [ActionName("register")]
        public HttpResponseMessage register(register_user register)
        {
            return TryCatchResponse(() =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, new { response = "Ok" });
            });
        }

        [HttpGet]
        [ActionName("test")]
        public HttpResponseMessage test()
        {
            return TryCatchResponse(() =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, new { response = "Ok" });
            });
        }
    }
}
