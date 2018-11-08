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
using GriB.Client.App.Models.Editor;
using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Handlers;

namespace GriB.Client.App.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseController
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
                        Principal principal = new Principal(principalData);
                        AuthUser.LogIn(principal);
                        AuthorizationHeaderHandler.SetPrincipal(principal);
                        employee empl = new employee(principal.Data);
                        return TryCatchResponseQuery((query) =>
                        {
                            empl = Employee.GetEmployee(query, empl);
                            empl = Employee.GetEmployeeSalepointAccess(query, empl);
                            return Request.CreateResponse(HttpStatusCode.OK, new { result = "Ok", indetity = new { auth = true, token = principal.GetKey(), employee = new Models.Editor.employeecard(empl) } });
                        });
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