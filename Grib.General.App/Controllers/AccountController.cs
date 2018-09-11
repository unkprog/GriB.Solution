using System.Net;
using System.Net.Http;
using System.Web.Http;
using GriB.Common.Sql;
using GriB.Common.Web.Http;
using GriB.General.App.Managers;
using GriB.Common.Models.pos;
using System.Collections.Generic;
using System.Web;

namespace GriB.General.App.Controllers
{
    public class AccountController : BaseApiController
    {
        private Query _query;

        public AccountController() : base()
        {
            _query = new Query(AppSettings.Database.ConnectionString, string.Concat(HttpContext.Current.Request.PhysicalApplicationPath, AppSettings.Database.Path.Query), logger);
        }

        [HttpPost]
        [ActionName("register")]
        public HttpResponseMessage register([FromBody]register_user register )//int regtype, string phone, string email)
        {
            return TryCatchResponse(() =>
            {
                if (register == null)
                    throw new ApiException("Неверные параметры авторизации.");
                //if (string.IsNullOrEmpty(phone) || string.IsNullOrEmpty(email))
                //    throw new ApiException("Неверные параметры авторизации.");
                //register_user register = new register_user() { regtype = regtype, phone = phone, email = email };

                List<user> users = Managers.pos.Users.GetUsers(_query, register.regtype, register.regtype == 0 ? register.phone : register.email);

                if (users != null && users.Count > 0)
                    throw new ApiException("Пользователь уже зарегистрирован.");

                user user = Managers.pos.Users.Insert(_query, new user() { regtype = register.regtype, phone = register.phone, email = register.email });
                user_sec user_sec = new user_sec() { id = user.id, pass = Managers.pos.Users.GeneratePassword(8) };

                Managers.pos.Users.SetPassword(_query, user_sec);

                if (!string.IsNullOrEmpty(user.phone))
                {
                    string body = string.Concat("Ваш пароль для входа: ", user_sec.pass);
                    Common.Net.SMS.SendSMS(user.phone, body);
                }

                if (!string.IsNullOrEmpty(user.email))
                {
                    string body = string.Concat("Ваш пароль для входа: ", user_sec.pass);
                    Common.Net.EMail.SendEMail(AppSettings.Mail.Address, AppSettings.Mail.Password, user.email, "Регистрация в POS Cloud", body);
                }

                return Request.CreateResponse(HttpStatusCode.OK, new { response = "Ok" });
            });
        }

        //[HttpGet]
        //[ActionName("test")]
        //public HttpResponseMessage test()
        //{
        //    return TryCatchResponse(() =>
        //    {
        //        return Request.CreateResponse(HttpStatusCode.OK, new { response = "Ok" });
        //    });
        //}
    }
}
