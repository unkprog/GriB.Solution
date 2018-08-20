using System.Configuration;

namespace GriB.Client.App.Managers
{
    public static class AppSettings
    {
        public static string GetAttribute(string aAttribute)
        {
            return ConfigurationManager.AppSettings.Get(aAttribute);
        }

        public static class Server
        {
            public static string Register => GetAttribute("Server.Register");
        }
    }
}