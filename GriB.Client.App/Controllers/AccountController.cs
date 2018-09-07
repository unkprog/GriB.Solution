using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using GriB.Client.App.Managers;
using GriB.Common.Models.pos;
using GriB.Common.Web.Http;

namespace GriB.Client.App.Controllers
{
    public class AccountController : BaseApiController
    {
        [HttpPost]
        [ActionName("register")]
        public async Task<HttpResponseMessage> register(register_user register_user)
        {
            return await TryCatchResponseAsync(async () =>
            {
                var resultPost = await PostJsonAsync<object, register_user>(AppSettings.Server.Register, register_user);
                return Request.CreateResponse(HttpStatusCode.OK, new { response = "Ok" });
            });
        }


    }
}