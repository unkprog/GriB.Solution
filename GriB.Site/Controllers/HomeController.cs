using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GriB.Site.Models;

namespace GriB.Site.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult PrivacyPersonal()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public JsonResult RegisterSend([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                //var result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
                //if (result.Succeeded)
                //{
                //     //return RedirectToLocal(returnUrl);
                //}

                ModelState.AddModelError("", "Identifiant ou mot de passe invalide");
                return Json("error-model-wrong");
            }

            // If we got this far, something failed, redispl
            return Json("error-mode-not-valid");
        }

      //  [HttpPost]
      //  [ActionName("register")]
      //  public async Task<HttpResponseMessage> register(register_user register_user)
      //=> await TryCatchResponseAsync(async () =>
      //{
      //    return await CheckResponseError(
      //         async () => await Common.Net.Json.PostAsync<JObject, register_user>(AppSettings.Server.Register, "api/account/register", register_user)
      //             , (response) =>
      //                                           {
      //                                               HttpRegisterMessage registerMessage = response.ToObject<HttpRegisterMessage>();
      //                                               Database.CreateDatabase(registerMessage.server.ConnectionString(), registerMessage.database.catalog);
      //                                               Database.CreateDatabaseUser(registerMessage.server.ConnectionString(), registerMessage.database.catalog, registerMessage.database.user, registerMessage.database.pass);
      //                                               string path = string.Concat(HostingEnvironment.ApplicationPhysicalPath, AppSettings.Database.Path.Sql);
      //                                               Database.CreateTables(path, registerMessage.database.ConnectionString(registerMessage.server));
      //                                               return this.CreateResponse(HttpStatusCode.OK, new { result = "Ok", response });
      //                                           });
      //});

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
