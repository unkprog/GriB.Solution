using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using GriB.Client.App.Managers;
using GriB.Common.Models.pos;
using GriB.Common.Web.Http;
using GriB.Common.Models.Security;

namespace GriB.Client.App.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseApiController
    {
        [HttpPost]
        [ActionName("register")]
        public async Task<HttpResponseMessage> register(register_user register_user)
        => await TryCatchResponseAsync(async () =>
                                        {
                                            var resultPost = await Common.Net.Json.PostAsync<object, register_user>(AppSettings.Server.Register, "api/account/register", register_user);
                                            return Request.CreateResponse(HttpStatusCode.OK, resultPost);
                                        });

        [HttpPost]
        [ActionName("recovery")]
        public async Task<HttpResponseMessage> recovery(register_user register_user)
        => await TryCatchResponseAsync(async () =>
                                        {
                                            var resultPost = await Common.Net.Json.PostAsync<object, register_user>(AppSettings.Server.Register, "api/account/recovery", register_user);
                                            return Request.CreateResponse(HttpStatusCode.OK, resultPost);
                                        });

        [HttpPost]
        [ActionName("login")]
        public async Task<HttpResponseMessage> login(login_user login)
        => await TryCatchResponseAsync(async () =>
                                        {
                                            PrincipalData principalData = await Common.Net.Json.PostAsync<PrincipalData, login_user>(AppSettings.Server.Register, "api/account/login", login);
                                            // TODO: Добавить проверку Expires!!!
                                            SetPrincipal(new Principal(principalData));
                                            return Request.CreateResponse(HttpStatusCode.OK, new { result = "Ok", principal = principalData });
                                        });
    }
}