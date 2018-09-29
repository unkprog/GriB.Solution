using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Models;
using GriB.Common.Models.pos;
using GriB.Common.Models.Security;
using GriB.Common.Sql;
using GriB.Common.Web.Http;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class SettingsController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        [ActionName("settings")]
        public HttpResponseMessage GetSettings()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            System.Reflection.AssemblyName assemblyName = assembly.GetName();
            Version version = assemblyName.Version;

            return Request.CreateResponse(HttpStatusCode.OK, new {
                IsDebug =
#if DEBUG
                true,
#else
                false,
#endif
                Version = version.ToString(),
                Language = "ru"
            });
        }

        [HttpGet]
        [ActionName("get_organization")]
        public HttpResponseMessage GetOrganization()
        {
            return TryCatchResponse(() =>
            {
                Principal principal = (Principal)HttpContext.Current.User;

                using (Query query = CreateQuery(principal.Data.Database.ConnectionString(principal.Data.Server), AppSettings.Database.Path.Query))
                {
                    List<t_org> orgs = Organization.GetOrganizations(query);

                    t_org org = Organization.GetOrganizationInfo(query, (orgs != null && orgs.Count > 0 ? orgs[0] : new t_org() { type = 1 }));

                    return Request.CreateResponse(HttpStatusCode.OK, org);
                }
            });
        }

        [HttpPost]
        [ActionName("post_organization")]
        public HttpResponseMessage PostOrganization(t_org org)
        {
            return TryCatchResponse(() =>
            {
                Principal principal = (Principal)HttpContext.Current.User;

                using (Query query = CreateQuery(principal.Data.Database.ConnectionString(principal.Data.Server), AppSettings.Database.Path.Query))
                {
                    t_org _org = org;
                    _org.cu = principal.Data.User.id;
                    _org.uu = principal.Data.User.id;
                    Organization.SetOrganization(query, _org);
                    Organization.SetOrganizationInfo(query, _org);
                    return Request.CreateResponse(HttpStatusCode.OK, "Ok");
                }
            });
        }
    }
}