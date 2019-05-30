using System;
using System.Net.Http;
using System.Web;
using GriB.Common.Models.Security;
using GriB.Common.Sql;
using GriB.General.App.Managers;
using GriB.Web.Http;

namespace GriB.General.App.Controllers
{
    public class BaseController : BaseApiController
    {
        public BaseController() : base()
        {
        }

    
        public HttpResponseMessage TryCatchResponseQuery(Func<Query, HttpResponseMessage> func)
        {
            return TryCatchResponse(() =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                using (Query query = CreateQuery(AppSettings.Database.ConnectionString, AppSettings.Database.Path.Query))
                {
                    return func.Invoke(query);
                }
            });
        }

       
    }
}