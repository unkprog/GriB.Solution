using GriB.Common.Net;
using GriB.PrintServer.Windows.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

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
                JObject data = Json.Get<JObject>(_serviceAddress, "/print/printers");
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
                PrintCheckModel printCheck = new PrintCheckModel() { dataPrint = "test print data" };
                JObject data = Json.Post<JObject, PrintCheckModel>(_serviceAddress, "/print/printCheck", printCheck);
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
