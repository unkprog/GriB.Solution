using GriB.Client.App.Managers;
using GriB.Common.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace GriB.Client.App.Handlers
{
    public class AuthorizationHeaderHandler : DelegatingHandler
    {
        private static readonly string API_KEY_HEADER = "POSCloud-ApiKey";
        #region Send method.
        /// <summary>   
        /// Send method.   
        /// </summary>   
        /// <param name="request">Request parameter</param>   
        /// <param name="cancellationToken">Cancellation token parameter</param>   
        /// <returns>Return HTTP response.</returns>   
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // Initialization.   
            AuthenticationHeaderValue authorization = request.Headers.Authorization;
            // Verification.   
            if (authorization!= null && authorization.Scheme == API_KEY_HEADER && !string.IsNullOrEmpty(authorization.Parameter))
            {
                Principal principal = AuthUser.GetLogIn(authorization.Parameter);
                if(principal != null)
                {
                    SetPrincipal(principal);
                }
            }
            // Info.   
            return base.SendAsync(request, cancellationToken);
        }
        #endregion
        #region Set principal method.  
        /// <summary>   
        /// Set principal method.   
        /// </summary>   
        /// <param name="principal">Principal parameter</param>   
        private static void SetPrincipal(Principal principal)
        {
            // setting.   
            Thread.CurrentPrincipal = principal;
            // Verification.   
            if (HttpContext.Current != null)
            {
                // Setting.   
                HttpContext.Current.User = principal;
            }
        }
        #endregion
    }
}