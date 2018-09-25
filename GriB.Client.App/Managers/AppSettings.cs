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

        public static class Database
        {
            public static class Path
            {
                public static string Sql => GetAttribute("Database.Path.Sql");
                public static string SqlData => GetAttribute("Database.Path.Sql.Data");
                public static string Query => GetAttribute("Database.Path.Query");
            }
        }
    }
}