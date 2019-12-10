using GriB.Site.Managers;
using GriB.Site.Models;
using Microsoft.AspNetCore.Mvc;

namespace GriB.Site.Controllers
{
    public class ContactController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult RegisterSend([FromBody]MessageViewModel model)
        {
            return TryCatchResponse(() =>
            {
                string subject = string.Concat("Site: Сообщение от посетителя ", model.name);
                string body = string.Concat("Сообщение от посетителя ", model.name, ", ", model.email
                    , System.Environment.NewLine, System.Environment.NewLine
                    , model.message);
                Common.Net.EMail.SendEMail(AppSettings.Mail.Address, AppSettings.Mail.Password, model.email, subject, body);
                return new JsonResult(new { result = "Ok" });
            });
        }
    }
}