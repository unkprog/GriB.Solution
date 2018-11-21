using GriB.Client.App.Managers.POSTerminal;
using GriB.Client.App.Models.POSTerminal;
using GriB.Common.Models.Security;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    public class POSTerminalController : BaseController
    {
        [HttpGet]
        [ActionName("enter")]
        public HttpResponseMessage GetEnter()
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;

            // principal.Data.User.id
            return Request.CreateResponse(HttpStatusCode.OK, new {employee = AccountController.AccountData(query, principal) });
            });
        }

        [HttpGet]
        [ActionName("sale_products")]
        public HttpResponseMessage GetSaleProducts(int category, int salepoint)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;

                // principal.Data.User.id
                return Request.CreateResponse(HttpStatusCode.OK, new { items = Terminal.GetSaleProducts(query, new posparamsselect() { category = category, salepoint = salepoint }) });
            });
        }
    }
}