using System.Net;
using System.Net.Http;
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
        => await TryCatchResponseAsync(async () =>
                                        {
                                            var resultPost = await PostJsonAsync<object, register_user>(AppSettings.Server.Register, "api/account/register", register_user);
                                            return Request.CreateResponse(HttpStatusCode.OK, resultPost);
                                        });

        [HttpPost]
        [ActionName("recovery")]
        public async Task<HttpResponseMessage> recovery(register_user register_user)
        => await TryCatchResponseAsync(async () =>
                                        {
                                            var resultPost = await PostJsonAsync<object, register_user>(AppSettings.Server.Register, "api/account/recovery", register_user);
                                            return Request.CreateResponse(HttpStatusCode.OK, resultPost);
                                        });
    }
}