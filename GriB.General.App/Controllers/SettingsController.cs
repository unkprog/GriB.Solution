using GriB.Common.Models.pos;
using GriB.General.App.Managers.pos;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GriB.General.App.Controllers
{
    public class SettingsController : BaseController
    {
        #region Сервера
        [HttpGet]
        [ActionName("get_servers")]
        public HttpResponseMessage GetServers()
        {
            return TryCatchResponseQuery((query) =>
            {
                return CreateResponse(HttpStatusCode.OK, Server.GetServers(query));
            });
        }

        [HttpGet]
        [ActionName("get_server")]
        public HttpResponseMessage GetServer(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                return CreateResponse(HttpStatusCode.OK, new { record = Server.GetServer(query, id) });
            });
        }

        [HttpPost]
        [ActionName("post_server")]
        public HttpResponseMessage PostServer(sqlsrv server)
        {
            return TryCatchResponseQuery((query) =>
            {
                //Account.SetAccount(query, account, principal.Data.User.id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_server")]
        public HttpResponseMessage DeleteServer(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                //Server.DelServer(query, id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Базы данных
        [HttpGet]
        [ActionName("get_databases")]
        public HttpResponseMessage GetDatabases()
        {
            return TryCatchResponseQuery((query) =>
            {
                return CreateResponse(HttpStatusCode.OK, Server.GetListDatabases(query));
            });
        }

        [HttpGet]
        [ActionName("get_database")]
        public HttpResponseMessage GetDatabase(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                List<sqldb_full> ldb = Server.GetListDatabases(query, id);
                sqldb_full result = (ldb != null && ldb.Count > 0 ? ldb[0] : new sqldb_full());
                Server.GetListDatabases(query, id);
                return CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }

        [HttpPost]
        [ActionName("post_database")]
        public HttpResponseMessage PostDatabase(sqldb_full database)
        {
            return TryCatchResponseQuery((query) =>
            {
                Server.SetServerDatabases(query, database);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_database")]
        public HttpResponseMessage DeleteDatabase(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Server.DelServerDatabases(query, id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion

        #region Пользователи
        [HttpGet]
        [ActionName("get_users")]
        public HttpResponseMessage GetUsers()
        {
            return TryCatchResponseQuery((query) =>
            {
                return CreateResponse(HttpStatusCode.OK, Users.GetUsersFull(query));
            });
        }

        [HttpGet]
        [ActionName("get_user")]
        public HttpResponseMessage GetUser(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                List<user_full> luser = Users.GetUsersFull(query, id);
                user_full result = (luser != null && luser.Count > 0 ? luser[0] : new user_full());
                return CreateResponse(HttpStatusCode.OK, new { record = result });
            });
        }

        [HttpPost]
        [ActionName("post_user")]
        public HttpResponseMessage PostUser(user_full user)
        {
            return TryCatchResponseQuery((query) =>
            {
               // Server.InsertServerDatabases(query, database);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_user")]
        public HttpResponseMessage DeleteUser(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                //Server.DelServerDatabases(query, id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion
    }
}