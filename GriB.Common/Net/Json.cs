using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace GriB.Common.Net
{
    public static partial class Json
    {
        public static object Parse(string json)
        {
            return new Parser(json).Decode();
        }

        public static string Serialize(object obj, SerializeOptions options = null)
        {
            return new Serializer(options).ToJson(obj);
        }

        public static async Task<TResult> Post<TResult, TParam>(string server, string url, TParam data)
        {
            return await PostAsync<TResult, TParam>(server, url, data);
        }

        public static async Task<TResult> PostAsync<TResult, TParam>(string server, string url, TParam data)
        {
            TResult result = default(TResult);
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(server);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                response = await client.PostAsJsonAsync(url, data);
                response.EnsureSuccessStatusCode();
            }

            if (response != null)
                result = await response.Content.ReadAsAsync<TResult>();

            return result;
        }
    }
}
