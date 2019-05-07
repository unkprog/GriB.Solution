using System;
using System.IO;
using GriB.Installer.UI.Models;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public partial class InstallProgressViewModel
    {
        public bool CreateTempDirectory()
        {
            try
            {
                if (!Directory.Exists(Constants.TempPath))
                    Directory.CreateDirectory(Constants.TempPath);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private bool CreateApplicationDirectories()
        {
            try
            {
                string subdirectoryPath = InstallPath;
                if (!Directory.Exists(subdirectoryPath))
                    Directory.CreateDirectory(subdirectoryPath);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public static void ConfigurateApplications()
        {
            //Configurator.CreateStartMenuDirectory();
            //Configurator.CreateShortcuts();

            //view.Dispatcher.Invoke(() => { OnComplite?.Invoke(); });
        }
    }
}
