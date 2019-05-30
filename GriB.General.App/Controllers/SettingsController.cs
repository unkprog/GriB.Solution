using GriB.Common.Models.pos;
using GriB.General.App.Managers.pos;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GriB.General.App.Controllers
{
    public class SettingsController : BaseController
    {
        #region Счет
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
        public HttpResponseMessage DeleteAccount(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                //Server.DelServer(query, id);
                return CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion
    }
}