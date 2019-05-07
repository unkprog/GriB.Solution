using System;
using System.IO;

namespace GriB.Installer.UI.Models
{
    internal static class Constants
    {
        public static string AppsPath => "POSCloud";

        internal static string TempPath => Path.GetTempPath() + $@"{AppsPath}\";
    }
}
