using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GriB.Common.Sql;
using GriB.Common.Web.Http;
using GriB.General.App.Managers;
using GriB.Common.Models.pos;
using GriB.Common.Models.Security;

namespace GriB.General.App.Controllers
{
    public class AccountController : BaseApiController
    {
        private Query _query;

        public AccountController() : base()
        {
            _query = new Query(AppSettings.Database.ConnectionString, string.Concat(HttpContext.Current.Request.PhysicalApplicationPath, AppSettings.Database.Path.Query), logger);
        }

        private user_sec setPassword(user user, string subject)
        {
            user_sec user_sec = new user_sec() { id = user.id, pass = Managers.pos.Users.GeneratePassword(8) };

            Managers.pos.Users.SetPassword(_query, user_sec);
            if (!string.IsNullOrEmpty(user.phone))
            {
                string body = string.Concat("Ваш пароль для входа: ", user_sec.pass);
                //var resultSMS = Common.Net.SMS.SendSMS(user.phone, body);
            }

            //if (!string.IsNullOrEmpty(user.email))
            //{
            //    string body = string.Concat("Ваш пароль для входа: ", user_sec.pass);
            //    Common.Net.EMail.SendEMail(AppSettings.Mail.Address, AppSettings.Mail.Password, user.email, subject, body);
            //}
            return user_sec;
        }

        [HttpPost]
        [ActionName("register")]
        public HttpResponseMessage register(register_user register)
        {
            return TryCatchResponse(() =>
            {
                if (register == null)
                    throw new ApiException("Неверные параметры авторизации.");
               
                List<user> users = Managers.pos.Users.GetUsers(_query, register.phone);

                if (users != null && users.Count > 0)
                    throw new ApiException("Пользователь уже зарегистрирован.");

                user user = Managers.pos.Users.Insert(_query, new user() { phone = register.phone });
                user_role user_role = Managers.pos.Users.InsertRole(_query, new user_role() { user = user.id, role = 1 });
                user_sec user_sec = setPassword(user, "Регистрация в POS Cloud");

                List<sqlsrv> servers = Managers.pos.Server.GetServers(_query);
                if (servers == null || servers.Count == 0)
                    throw new ApiException("Невозможно создать персональную базу. Обратитесь в техподдержку.");

                sqldb newdb = Managers.pos.Server.InsertServerDatabases(_query, new sqldb() { server = servers[0].id, catalog = string.Concat("pdb_", register.phone), user = string.Concat("pdbu_", register.phone), pass = user_sec.pass });

                Managers.pos.Users.DatabaseIns(_query, new user_db() { id = user.id, db = newdb.id });

                return Request.CreateResponse(HttpStatusCode.OK, new HttpRegisterMessage() { server = servers[0], database = newdb });
            });
        }


        [HttpPost]
        [ActionName("recovery")]
        public HttpResponseMessage recovery(register_user register)
        {
            return TryCatchResponse(() =>
            {
                if (register == null)
                    throw new ApiException("Неверные параметры для восстановления.");

                List<user> users = Managers.pos.Users.GetUsers(_query, register.phone);

                if (users == null || users.Count == 0)
                    throw new ApiException("Пользователь не найден.");

                setPassword(users[0], "Восстановление пароля в POS Cloud");

                return Request.CreateResponse(HttpStatusCode.OK, new { result = "Ok" });
            });
        }

        [HttpPost]
        [ActionName("login")]
        public HttpResponseMessage login(login_user login)
        {
            return TryCatchResponse(() =>
            {
                if (login == null)
                    throw new ApiException("Неверные параметры для входа.");

                List<user> users = Managers.pos.Users.GetUsers(_query, login.phone);

                if (users == null || users.Count == 0)
                    throw new ApiException("Пользователь не найден.");

                user user = null;
                for(int i = 0, icount = users.Count; user == null && i < icount; i++)
                {
                    user_sec sec = Managers.pos.Users.GetPassword(_query, users[i].id);
                    if (sec.pass == login.pass)
                        user = users[i];
                }

                if (user == null || user.d != 0)
                    throw new ApiException("Пользователь не найден.");

                user_person user_person = Managers.pos.Users.GetPerson(_query, user.id);
                user_db user_db = Managers.pos.Users.GetDatabase(_query, user.id);
                sqldb database = Managers.pos.Server.GetServerDatabase(_query, user_db.id);
                sqlsrv server = Managers.pos.Server.GetServer(_query, database.server);

                return Request.CreateResponse(HttpStatusCode.OK, new PrincipalData() { User = user, Person = user_person, Server = server, Database = database });
            });
        }

    }
}
