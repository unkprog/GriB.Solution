using GriB.Common.Models.pos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Grib.Console.Test
{
    class Program
    {
        static void Main(string[] args)
        {
            register_user user = new register_user
            {
                phone = "+79264042915",
                email = "bsisoftx@mail.ru"
            };

            Task<object> task = PostJsonAsync<object, register_user>("http://localhost:50962", user);
            //task.Start();
            task.Wait();
            System.Console.WriteLine(task.Result);
        }

        static async Task<TResult> PostJsonAsync<TResult, TParam>(string server, TParam data)
        {
            TResult result = default(TResult);
            HttpResponseMessage response = null;
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(server);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                response = await client.PostAsJsonAsync("api/account/register", data);
                response.EnsureSuccessStatusCode();
            }

            if(response!= null)
                result = await response.Content.ReadAsAsync<TResult>();

            return result;
        }

        //static async Task<T> RunAsync<T>()
        //{
        //    T result = default(T);
        //    try
        //    {
        //        // Create a new user
        //        register_user user = new register_user
        //        {
        //            phone = "+79264042915",
        //            email = "bsisoftx@mail.ru"
        //        };

        //        HttpResponseMessage response = await PostJsonAsync("http://localhost:50962", user);
        //        result = await response.Content.ReadAsAsync<T>();

                
        //    }
        //    catch (Exception e)
        //    {
        //        System.Console.WriteLine(e.Message);
        //    }

        //    return result;
        //}
    }
}
