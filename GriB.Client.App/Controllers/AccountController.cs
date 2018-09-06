using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GriB.Common.Models.pos;
using GriB.Common.Web.Http;

namespace GriB.Client.App.Controllers
{
    public class AccountController : BaseApiController
    {
        [HttpPost]
        [ActionName("register")]
        public HttpResponseMessage register(register_user register_user)
        {
            return TryCatchResponse(() =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, new { response = "Ok" });
            });
        }
    }
}