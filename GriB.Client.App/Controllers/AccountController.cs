﻿using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using GriB.Client.App.Managers;
using GriB.Common.Models.pos;
using GriB.Common.Web.Http;
using GriB.Common.Models.Security;
using GriB.Common.Sql;
using System.Web.Hosting;

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
                                            return await CheckResponseError(
                                               async () => await Common.Net.Json.PostAsync<JObject, register_user>(AppSettings.Server.Register, "api/account/register", register_user)
                                                   , (response) =>
                                                   {
                                                       HttpRegisterMessage registerMessage = response.ToObject<HttpRegisterMessage>();
                                                       Database.CreateDatabase(registerMessage.server.ConnectionString(), registerMessage.database.catalog);
                                                       Database.CreateDatabaseUser(registerMessage.server.ConnectionString(), registerMessage.database.catalog, registerMessage.database.user, registerMessage.database.pass);
                                                       string path = string.Concat(HostingEnvironment.ApplicationPhysicalPath, AppSettings.Database.Path.Sql);
                                                       Database.CreateTables(path, registerMessage.database.ConnectionString(registerMessage.server));
                                                       return Request.CreateResponse(HttpStatusCode.OK, new { result = "Ok", response });
                                                   });
                                        });

        [HttpPost]
        [ActionName("login")]
        public async Task<HttpResponseMessage> login(login_user login)
        => await TryCatchResponseAsync(async () =>
        {
            return await CheckResponseError(
                async () => await Common.Net.Json.PostAsync<JObject, login_user>(AppSettings.Server.Register, "api/account/login", login)
                    , (response) =>
                    {
                        PrincipalData principalData = response.ToObject<PrincipalData>();
                        if (principalData.User == null)
                            throw new ApiException("Невозможно произвести авторизацию!");
                        //// TODO: Добавить проверку Expires!!!
                        SetPrincipal(new Principal(principalData));
                        return Request.CreateResponse(HttpStatusCode.OK, new { result = "Ok", principal = principalData });
                    });
        });

        [HttpPost]
        [ActionName("recovery")]
        public async Task<HttpResponseMessage> recovery(register_user register_user)
        => await TryCatchResponseAsync(async () =>
                                        {
                                            var resultPost = await Common.Net.Json.PostAsync<object, register_user>(AppSettings.Server.Register, "api/account/recovery", register_user);
                                            return Request.CreateResponse(HttpStatusCode.OK, resultPost);
                                        });

    }
}