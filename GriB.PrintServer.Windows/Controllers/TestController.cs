using GriB.PrintServer.Windows.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace GriB.PrintServer.Windows.Controllers
{
    public class TestController : ApiController
    {
        [HttpGet]
        [ActionName("Printers")]
        public HttpResponseMessage Printers()
        {
            string _serviceAddress = string.Concat("http://localhost:", Properties.Settings.Default.ServicePort == 0 ? 25599 : Properties.Settings.Default.ServicePort);
            //_serviceAddress = string.Concat(_serviceAddress, "/Print/PrintCheck");
            string result = string.Empty;
            try
            {
                JObject data = GriB.Common.Net.Json.Get<JObject>(_serviceAddress, "/print/printers");
                result = data.ToString();
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(string.IsNullOrEmpty(result) ? string.Empty : result);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html") { CharSet = Encoding.UTF8.HeaderName };
            return response;
        }

        
        [HttpGet]
        [ActionName("PrintCheck")]
        public HttpResponseMessage PrintCheck()
        {
            string _serviceAddress = string.Concat("http://localhost:", Properties.Settings.Default.ServicePort == 0 ? 25599 : Properties.Settings.Default.ServicePort);
            //_serviceAddress = string.Concat(_serviceAddress, "/Print/PrintCheck");
            string result = string.Empty;
            try
            {
                string dataPrint = string.Empty;
                for(int i = 0 ; i < 10; i++)
                {
                    dataPrint = string.Concat(dataPrint, i, ". test print data ", i, " <br>");
                }
                PrintCheckModel printCheck = new PrintCheckModel() { dataPrint = dataPrint };
                JObject data = GriB.Common.Net.Json.Post<JObject, PrintCheckModel>(_serviceAddress, "/print/printCheck", printCheck);
                result = data.ToString();
            }
            catch (Exception ex)
            {
                result = ex.Message;
            }

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(string.IsNullOrEmpty(result) ? string.Empty : result);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html") { CharSet = Encoding.UTF8.HeaderName };
            return response;
        }
    }
}
