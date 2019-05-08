using System;
using System.IO;
using System.Runtime.InteropServices;
using GriB.Installer.UI.Models;
using Microsoft.Win32;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public partial class InstallProgressViewModel
    {
        public event OnEventComplite OnComplite;
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

        private bool IsApplicationInstalled(string name)
        {
            try
            {
                string displayName;

                // search in: LocalMachine_32
                var key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall");
                if (key != null)
                {
                    foreach (string keyName in key.GetSubKeyNames())
                    {
                        RegistryKey subkey = key.OpenSubKey(keyName, true);
                        displayName = subkey?.GetValue("DisplayName") as string;
                        if (name.Equals(displayName, StringComparison.OrdinalIgnoreCase))
                        {
                            return true;
                        }
                    }
                }

                // search in: LocalMachine_64
                key = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall");
                if (key != null)
                {
                    foreach (string keyName in key.GetSubKeyNames())
                    {
                        RegistryKey subkey = key.OpenSubKey(keyName, true);
                        displayName = subkey?.GetValue("DisplayName") as string;
                        if (name.Equals(displayName, StringComparison.OrdinalIgnoreCase))
                        {
                            return true;
                        }
                    }
                }
            }
            catch (Exception)
            {
                return false;
            }

            // NOT FOUND
            return false;
        }

        public void ConfigurateApplications()
        {
            InstallMessage = string.Concat("Настройка приложений...");
            CreateStartMenuDirectory();
            CreateShortcuts();
            InstallMessage = string.Concat("Установка приложений завершена...");
            InstallerApplication.AppDispatcher.Invoke(() => { OnComplite?.Invoke(); });
        }

        public void CreateStartMenuDirectory()
        {
            string appDirPath = Constants.StartMenyAppPath;
            try
            {
                if (!Directory.Exists(appDirPath))
                    Directory.CreateDirectory(appDirPath);
            }
            catch (Exception)
            {
                // ignored
            }
        }

        private static void CreateShorcut(string shortcutPath, string targetPath)
        {
            Type t = Type.GetTypeFromCLSID(new Guid("72C24DD5-D70A-438B-8A42-98424B88AFB8")); //Windows Script Host Shell Object
            dynamic shell = Activator.CreateInstance(t);
            try
            {
                var shortcut = shell.CreateShortcut(shortcutPath);
                try
                {

                    shortcut.TargetPath = targetPath;
                    shortcut.IconLocation = targetPath;
                    shortcut.Save();
                }
                finally
                {
                    Marshal.FinalReleaseComObject(shortcut);
                }
            }
            catch (Exception)
            {
                // ignored
            }
            finally
            {
                Marshal.FinalReleaseComObject(shell);
            }
        }

        public void CreateShortcuts()
        {
            foreach (var installItem in InstallItems)
            {
                string shortcutPath = string.Concat(Constants.DesktopAppPath, @"\", installItem.Name, ".lnk");
                string executableFile = string.Concat(InstallPath, @"\", installItem.DestinationSource, @"\", installItem.ExecutableFile);
                CreateShorcut(shortcutPath, executableFile);

                shortcutPath = string.Concat(Constants.StartMenyAppPath, @"\", installItem.Name, ".lnk");
                CreateShorcut(shortcutPath, executableFile);
            }

            
        }

        private void Complite()
        {
            //InstallCacheAndRegistry();
            InstallerApplication.MainViewModel.NextCommand.Execute(null);
        }
    }
}
