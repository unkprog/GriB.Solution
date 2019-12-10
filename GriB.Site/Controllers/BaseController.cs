using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GriB.Site.Controllers
{
    public class BaseController : Controller
    {
        public JsonResult TryCatchResponse(Func<JsonResult> func)
        {
            try
            {
                return func.Invoke();
            }
            catch (Exception ex)
            {
                //WriteError(ex);
                return new JsonResult(ex.Message);
            }
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
