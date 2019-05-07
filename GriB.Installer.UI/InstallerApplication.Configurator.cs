using System;
using Microsoft.Win32;

namespace GriB.Installer.UI
{
    public partial class InstallerApplication
    {
        public static class Configurator
        {
            public static string GetRegistryValue(string name, string key)
            {
                try
                {
                    string displayName;

                    // search in: LocalMachine_32
                    var registryKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall");
                    if (registryKey != null)
                    {
                        foreach (string keyName in registryKey.GetSubKeyNames())
                        {
                            RegistryKey subkey = registryKey.OpenSubKey(keyName);
                            displayName = subkey?.GetValue("DisplayName") as string;
                            if (name.Equals(displayName, StringComparison.OrdinalIgnoreCase))
                            {
                                return subkey.GetValue(key).ToString();
                            }
                        }
                    }

                    // search in: LocalMachine_64
                    registryKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall");
                    if (registryKey != null)
                    {
                        foreach (string keyName in registryKey.GetSubKeyNames())
                        {
                            RegistryKey subkey = registryKey.OpenSubKey(keyName);
                            displayName = subkey?.GetValue("DisplayName") as string;
                            if (name.Equals(displayName, StringComparison.OrdinalIgnoreCase))
                            {
                                return subkey.GetValue(key).ToString();
                            }
                        }
                    }
                }
                catch (Exception)
                {
                    return null;
                }

                // NOT FOUND
                return null;
            }
        }

        internal static bool IsApplicationInstalled(string name)
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
            catch (Exception e)
            {
                return false;
            }

            // NOT FOUND
            return false;
        }

    }
}
