using System.Configuration;

namespace GriB.Site.Managers
{
    public static class AppSettings
    {
        public static string GetAttribute(string aAttribute)
        {
            return ConfigurationManager.AppSettings.Get(aAttribute);
        }

        public static bool GetAttributeBool(string aAttribute)
        {
            string value = ConfigurationManager.AppSettings.Get(aAttribute);
            return !string.IsNullOrEmpty(value) && value.ToLower() == "true";
        }

        public static class Mail
        {
            public static string Address => GetAttribute("Mail.Address");
            public static string Password => GetAttribute("Mail.Password");
        }

    }
}