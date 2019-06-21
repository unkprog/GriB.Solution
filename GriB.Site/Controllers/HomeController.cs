using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GriB.Site.Models;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;

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


        public async Task<JsonResult> TryCatchResponseJsonAsync(Func<Task<JsonResult>> func)
        {
            try
            {
                Task<JsonResult> taskInvoke = func.Invoke();
                return await taskInvoke;
            }
            catch (Exception ex)
            {
                //WriteError(ex);
                return new JsonResult(ex.Message);
            }
        }

        public static async Task<TResult> PostAsync<TResult, TParam>(string server, string url, TParam data)
        {
            TResult result = default(TResult);
            HttpResponseMessage response = null;
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(server);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    response = await client.PostAsJsonAsync(url, data);
                    response.EnsureSuccessStatusCode();


                    if (response != null)
                        result = await response.Content.ReadAsJsonAsync<TResult>();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);

            }

            return result;
        }

        [HttpPost]
        public async Task<JsonResult> RegisterSend([FromBody]RegisterViewModel model)
        {
            return await TryCatchResponseJsonAsync(async () =>
            {
            
                JObject task = await PostAsync<JObject, RegisterViewModel>("http://localhost:50962", "api/account/registersite", model);
                //JObject task = await PostAsync<JObject, RegisterViewModel>("https://general.poscloudgb.ru", "api/account/registersite", model);
                return new JsonResult(new { result = "Ok" });
            });
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

    public static class HttpClientExtensions
    {
        public static Task<HttpResponseMessage> PostAsJsonAsync<T>(
            this HttpClient httpClient, string url, T data)
        {
            var dataAsString = JsonConvert.SerializeObject(data);//  Json.Serialize(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return httpClient.PostAsync(url, content);
        }

        public static async Task<T> ReadAsJsonAsync<T>(this HttpContent content)
        {
            var dataAsString = await content.ReadAsStringAsync();
            //return Json.Parse<T>(dataAsString);
            return JsonConvert.DeserializeObject<T>(dataAsString);
        }
    }
}
