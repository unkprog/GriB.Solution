using Microsoft.Win32;
using System;
using System.Windows.Forms;

namespace GriB.PrintServer.Windows
{
    public class Printer
    {
        private void SetupPrintSettings()
        {
            RegistryKey registryKey = Registry.CurrentUser.CreateSubKey("Software\\Microsoft\\Internet Explorer\\PageSetup");
            registryKey.SetValue("footer", "");
            registryKey.SetValue("header", "");
            registryKey.SetValue("margin_bottom", "0.0");
            registryKey.SetValue("margin_left", "0.0");
            registryKey.SetValue("margin_right", "0.0");
            registryKey.SetValue("margin_top", "0.0");
            registryKey.SetValue("Print_Background", "yes");
            registryKey.SetValue("Shrink_To_Fit", "no");
            registryKey.SetValue("font", "");
        }

        public event EventHandler<string> OnEndPrint;
        public event EventHandler<string> OnErrorPrint;

        public bool IsPrinting { get; private set; } = false;

        public void PrintDocument(string fileName)
        {
            IsPrinting = true;
            try
            {
                SetupPrintSettings();
                WebBrowser browser = new WebBrowser();
                browser.Url = new Uri(fileName);
                browser.Tag = fileName;
                browser.DocumentCompleted += DocumentLoadCompleted;
            }
            catch
            {
                OnErrorPrint?.Invoke(this, fileName);
                IsPrinting = false;
            }
        }

        private void DocumentLoadCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
        {
            WebBrowser browser = (WebBrowser)sender;
            string fileName = (string)browser.Tag;
            try
            {
                browser.Print();
                browser.Dispose();
                OnEndPrint?.Invoke(this, fileName);
            }
            catch
            {
                OnErrorPrint?.Invoke(this, fileName);
            }
            IsPrinting = false;
        }
    }
}
