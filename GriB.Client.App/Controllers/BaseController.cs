using GriB.Client.App.Managers;
using GriB.Common.Models.pos;
using GriB.Common.Models.Security;
using GriB.Common.Sql;
using GriB.Common.Web.Http;
using System;
using System.Net.Http;
using System.Web;

namespace GriB.Client.App.Controllers
{
    public class BaseController : BaseApiController
    {
        public HttpResponseMessage TryCatchResponseQuery(Func<Query, HttpResponseMessage> func)
        {
            return TryCatchResponse(() =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                using (Query query = CreateQuery(principal.Data.Database.ConnectionString(principal.Data.Server), AppSettings.Database.Path.Query))
                {
                    return func.Invoke(query);
                }
            });
        }
    }
}