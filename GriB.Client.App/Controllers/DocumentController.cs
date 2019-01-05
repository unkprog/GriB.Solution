using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Models.Editor;
using GriB.Common.Models.Security;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace GriB.Client.App.Controllers
{
    [Authorize]
    public class DocumentController : BaseController
    {
        #region Документы
        [HttpPost]
        [ActionName("get_docs")]
        public HttpResponseMessage GetSalePoints(document_params docpar)
        {
            return TryCatchResponseQuery((query) =>
            {
                return Request.CreateResponse(HttpStatusCode.OK, Document.GetDocuments(query, docpar));
            });
        }

        [HttpGet]
        [ActionName("get_doc")]
        public HttpResponseMessage GetSalePoint(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                document result = Document.GetDocument(query, id);
                return Request.CreateResponse(HttpStatusCode.OK, new { record = result });

            });
        }

        [HttpPost]
        [ActionName("post_doc")]
        public HttpResponseMessage PostSalepoint(document document)
        {
            return TryCatchResponseQuery((query) =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                Document.SetDocument(query, document, principal.Data.User.id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }

        [HttpGet]
        [ActionName("del_doc")]
        public HttpResponseMessage DeleteSalepoint(int id)
        {
            return TryCatchResponseQuery((query) =>
            {
                Document.DelDocument(query, id, ((Principal)HttpContext.Current.User).Data.User.id);
                return Request.CreateResponse(HttpStatusCode.OK, "Ok");
            });
        }
        #endregion
    }
}
