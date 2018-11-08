using GriB.Client.App.Handlers;
using GriB.Common.Models.Security;
using System.Collections.Generic;

namespace GriB.Client.App.Managers
{
    public static class AuthUser
    {
        private static Dictionary<string, Principal> authorizedList = new Dictionary<string, Principal>();

        public static void LogIn(Principal principal)
        {
            string key = principal.GetKey();
            if (!authorizedList.ContainsKey(key))
                authorizedList.Add(key, principal);
            else
            {
                authorizedList[key] = principal;
                AuthorizationHeaderHandler.SetPrincipal(principal);
            }
        }

        public static void LogOut(string key)
        {
            if (authorizedList.ContainsKey(key))
                authorizedList.Remove(key);
        }

        public static Principal GetLogIn(string key)
        {
            Principal principal = null;
            if (!authorizedList.TryGetValue(key, out principal))
                principal = null;
            return principal;
        }

    }
}