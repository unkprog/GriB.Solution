using GriB.Common.Sql;
using GriB.Common.Web.Http;
using GriB.General.App.Managers;

namespace GriB.General.App.Controllers
{
    public class RegisterController : BaseApiController
    {
        Query query;

        public RegisterController():base()
        {
            query = new Query(AppSettings.Database.ConnectionString, AppSettings.Database.Path.Query, logger);
        }


    }
}
