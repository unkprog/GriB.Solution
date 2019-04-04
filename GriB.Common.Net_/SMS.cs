using System.IO;
using System.Net;
using System.Web;

namespace GriB.Common.Net
{
    public class SMS
    {
        //public class SMS_RU
        //{
        //    public string status { get; set; }
        //    public int status_code { get; set; }
        //    public int balance { get; set; }



        //    //"sms": {
        //    //    "79264042915": {
        //    //        "status": "OK",
        //    //        "status_code": 100,
        //    //        "sms_id": "201837-1000001"
        //    //    }
        //    //}
        //}

        public static object SendSMS(string _url, string phone, string body)
        {
            string url = string.Concat(_url, phone, "&msg=", HttpUtility.UrlEncode(body), "&json=1");
            string responseString = string.Empty;
            HttpWebRequest myReq = (HttpWebRequest)WebRequest.Create(url);
            using (HttpWebResponse myResp = (HttpWebResponse)myReq.GetResponse())
            {
                using (StreamReader respStreamReader = new StreamReader(myResp.GetResponseStream()))
                {
                    responseString = respStreamReader.ReadToEnd();
                    respStreamReader.Close();
                }
                myResp.Close();
            }

            return new GriB.Common.Net.Json.Parser(responseString).Decode(); // Common.Net.Json.Parse(responseString);
        }
    }
}
