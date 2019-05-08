using System;
using System.IO;

namespace GriB.Installer.UI.Models
{
    internal static class Constants
    {
        internal static string AppsPath => "POSCloud";
        internal static string TempPath => Path.GetTempPath() + $@"\{AppsPath}\";
        internal static string ProgramPath =>  Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles) + $@"\{AppsPath}\";
        internal static string StartMenyAppPath => Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData) + $@"\Microsoft\Windows\Start Menu\Programs\{AppsPath}\";
        internal static string DesktopAppPath => Environment.GetFolderPath(Environment.SpecialFolder.Desktop) + $@"{AppsPath}\";

    }
}
