﻿using GriB.Common.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
                authorizedList[key] = principal;
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