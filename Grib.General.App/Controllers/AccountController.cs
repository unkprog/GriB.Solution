using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GriB.Common.Sql;
using GriB.Web.Http;
using GriB.General.App.Managers;
using GriB.Common.Models.pos;
using GriB.Common.Models.Security;
using GriB.Common.Models.pos.settings;
using GriB.Common.Net;
using GriB.General.App.Handlers;
using System.Web.Hosting;

namespace GriB.General.App.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseApiController
    {
        private Query _query;

        public AccountController() : base()
        {
            _query = CreateQuery(AppSettings.Database.ConnectionString, AppSettings.Database.Path.Query);
        }

        private user_sec setPassword(user user, string email, string subject)
        {
            user_sec user_sec = new user_sec() { id = user.id, pass = Managers.pos.Users.GeneratePassword(8) };

            Managers.pos.Users.SetPassword(_query, user_sec);
            if (!string.IsNullOrEmpty(user.phone))
            {
                string body = string.Concat("Ваш пароль для входа: ", user_sec.pass);
                var resultSMS = SMS.SendSMS("https://sms.ru/sms/send?api_id=112D81F5-A8AD-6687-4914-0DD89D0528A0&to=7", user.phone, body);
            }

            if (!string.IsNullOrEmpty(email))
            {
                string body = string.Concat("Ваш пароль для входа: ", user_sec.pass);
                Common.Net.EMail.SendEMail(AppSettings.Mail.Address, AppSettings.Mail.Password, email, subject, body);
            }
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
                user_sec user_sec = setPassword(user, string.Empty, "Регистрация в POS Cloud");

                List<sqlsrv> servers = Managers.pos.Server.GetServers(_query);
                if (servers == null || servers.Count == 0)
                    throw new ApiException("Невозможно создать персональную базу. Обратитесь в техподдержку.");

                sqldb newdb = Managers.pos.Server.InsertServerDatabases(_query, new sqldb() { server = servers[0].id, catalog = string.Concat("pdb_", register.phone), user = string.Concat("pdbu_", register.phone), pass = user_sec.pass });

                Managers.pos.Users.DatabaseIns(_query, new user_db() { id = user.id, db = newdb.id });

                return this.CreateResponse(HttpStatusCode.OK, new HttpRegisterMessage() { server = servers[0], database = newdb });
            });
        }

        [HttpPost]
        [ActionName("registersite")]
        public HttpResponseMessage registerSite(register_usersite register)
        {
            return TryCatchResponse(() =>
            {
                if (register == null)
                    throw new ApiException("Неверные параметры регистрации.");

                List<user> users = Managers.pos.Users.GetUsers(_query, register.phone);

                if (users != null && users.Count > 0)
                    throw new ApiException("Пользователь уже зарегистрирован.");

                user user = Managers.pos.Users.Insert(_query, new user() { phone = register.phone });
                user_role user_role = Managers.pos.Users.InsertRole(_query, new user_role() { user = user.id, role = 1 });
                Managers.pos.Settings.Employee.SetPerson(_query, 0, new employee() { id = user.id, mname = register.name, email = register.email });

                user_sec user_sec = setPassword(user, register.email, "Регистрация в POS Cloud");

                List<sqlsrv> servers = Managers.pos.Server.GetServers(_query);
                if (servers == null || servers.Count == 0)
                    throw new ApiException("Невозможно создать персональную базу. Обратитесь в техподдержку.");

                List<sqldb> freeDatabses = Managers.pos.Server.GetFreeServerDatabases(_query, servers[0]);
                if (freeDatabses != null && freeDatabses.Count > 0)
                {
                    Managers.pos.Users.DatabaseIns(_query, new user_db() { id = user.id, db = freeDatabses[0].id });
                    string path = string.Concat(HostingEnvironment.ApplicationPhysicalPath, AppSettings.Database.Path.UserDb);
                    Database.CreateTables(path, freeDatabses[0].ConnectionString(servers[0]));
                    return this.CreateResponse(HttpStatusCode.OK, new HttpRegisterSiteMessage() { IsCreated = true, msg = "" });
                }
                else
                {
                    return this.CreateResponse(HttpStatusCode.OK, new HttpRegisterSiteMessage() { IsCreated = false, msg = "В ближайшее время Вам будет создана персональная база." });
                }
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

                setPassword(users[0], string.Empty, "Восстановление пароля в POS Cloud");

                return this.CreateResponse(HttpStatusCode.OK, new { result = "Ok" });
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
                for (int i = 0, icount = users.Count; user == null && i < icount; i++)
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

                return this.CreateResponse(HttpStatusCode.OK, new PrincipalData() { User = user, Person = user_person, Server = server, Database = database });
            });
        }

        #region Employee
        [HttpGet]
        [ActionName("employees")]
        public HttpResponseMessage Employees(int db)
        {
            return TryCatchResponse(() =>
            {
                List<employee> result = Managers.pos.Settings.Employee.GetEmployees(_query, db);
                return this.CreateResponse(HttpStatusCode.OK, new HttpEmployeesMessage() { Employees = result });
            });
        }

        [HttpGet]
        [ActionName("employee")]
        public HttpResponseMessage Employee(int id)
        {
            return TryCatchResponse(() =>
            {
                employee result = Managers.pos.Settings.Employee.GetEmployee(_query, id);
                return this.CreateResponse(HttpStatusCode.OK, new HttpEmployeeMessage() { Employee = result });
            });
        }

        [HttpPost]
        [ActionName("upd_employee")]
        public HttpResponseMessage UpdateEmployees(employeedb empldb)
        {
            return TryCatchResponse(() =>
            {
                employee empl = new employee(empldb.empl);
                Managers.pos.Settings.Employee.SetEmployee(_query, empldb.db, empl);
                employee result = Managers.pos.Settings.Employee.GetEmployee(_query, empl.id);
                return this.CreateResponse(HttpStatusCode.OK, new HttpEmployeeMessage() { Employee = result });
            });
        }


        [HttpGet]
        [ActionName("del_employee")]
        public HttpResponseMessage DeleteEmployees(int id)
        {
            return TryCatchResponse(() =>
            {
                Managers.pos.Settings.Employee.DelEmployee(_query, id);
                return this.CreateResponse(HttpStatusCode.OK, new HttpEmployeeMessage() { Employee = Managers.pos.Settings.Employee.GetEmployee(_query, id) });
            });
        }
        #endregion


        #region settings
        [HttpGet]
        [AllowAnonymous]
        [ActionName("sc")]
        public HttpResponseMessage SC()
        {
            return TryCatchResponse(() =>
            {
                List<sqldb_full> result = Managers.pos.Server.GetListDatabases(_query);
                return this.CreateResponse(HttpStatusCode.OK, new HttpScMessage() { Sc = result });
            });
        }
        #endregion settings


        [HttpPost]
        [ActionName("loginadm")]
        public HttpResponseMessage loginadmin(login_user login)
        {
            return TryCatchResponse(() =>
            {
                if (login == null)
                    throw new ApiException("Неверные параметры для входа.");

                if(login.phone == AppSettings.Admin.UserID && login.pass == AppSettings.Admin.Password)
                {
                    PrincipalData principalData = new PrincipalData()
                    {
                        Database = new sqldb() { user = AppSettings.Database.UserID, pass = AppSettings.Database.Password, catalog = AppSettings.Database.InitialCatalog },
                        Server = new sqlsrv() { address = AppSettings.Database.DataSource, user = AppSettings.Database.UserID, pass = AppSettings.Database.Password },
                        User = new user() { phone = login.phone },
                        Person = new user_person() { fname = login.phone }
                    };

                    //// TODO: Добавить проверку Expires!!!
                    Principal principal = new Principal(principalData);
                    AuthUser.LogIn(principal);
                    AuthorizationHeaderHandler.SetPrincipal(principal);
                    
                    return this.CreateResponse(HttpStatusCode.OK, new { result = "Ok", indetity = new { auth = true, token = principal.GetKey() } });
                }
                else
                    throw new ApiException("Неверный логин или пароль.");

                
            });
        }
    }
}
