using CefSharp;
using CefSharp.WinForms;
using CefSharp.WinForms.Internals;
using GriB.Common.Models.Print;
using GriB.Print.Windows;
using GriB.Print.Windows.Common;
using System;
using System.Windows.Forms;

namespace Grib.App.Windows
{
    public partial class POSCloudApp : Form
    {
        public POSCloudApp()
        {
            InitializeComponent();
            WindowState = FormWindowState.Maximized;
            InitBrowser();
        }
        ChromiumWebBrowser browser;
        JavaScript.Bridge bridge;

        private void InitBrowser()
        {

            browser = new ChromiumWebBrowser("https://app.poscloudgb.ru"); // new ChromiumWebBrowser("http://localhost:50970?isnativeapp") // new ChromiumWebBrowser("www.poscloudgb.ru")
            {
                Dock = DockStyle.Fill
            };
            this.Controls.Add(browser);

            InitBridge(browser);

            browser.IsBrowserInitializedChanged += OnIsBrowserInitializedChanged;
            //browser.LoadingStateChanged += OnLoadingStateChanged;
            //browser.ConsoleMessage += OnBrowserConsoleMessage;
            //browser.StatusMessage += OnBrowserStatusMessage;
            //browser.TitleChanged += OnBrowserTitleChanged;
            //browser.AddressChanged += OnBrowserAddressChanged;

            //var bitness = Environment.Is64BitProcess ? "x64" : "x86";
            //var version = string.Format("Chromium: {0}, CEF: {1}, CefSharp: {2}, Environment: {3}", Cef.ChromiumVersion, Cef.CefVersion, Cef.CefSharpVersion, bitness);
            //DisplayOutput(version);
        }

        private void InitBridge(ChromiumWebBrowser browser)
        {
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;

            bridge = new JavaScript.Bridge(this);
            browser.RegisterJsObject("nativeBridge", bridge);

            bridge.AddCommand("CloseApp", (string data) => { Application.Exit(); });
            bridge.AddCommand("PrintCheck", this.PrintCheck);
        }

        private void PrintCheck(string data)
        {
            printserverdata check = Newtonsoft.Json.JsonConvert.DeserializeObject<printserverdata>(data);
            string printFile = GriB.Print.Windows.PrintCheck.Print(check);
            Printer _printer = new Printer();

            string folderChecks = FileHelper.GetFolderChecks();
            GriB.Print.Windows.PrintCheck.RestoreCssCheck(folderChecks);
            _ = _printer.DoWorkPrintDocument(new object[] { printFile });
        }

        private void OnIsBrowserInitializedChanged(object sender, IsBrowserInitializedChangedEventArgs e)
        {
            if (e.IsBrowserInitialized)
            {
                var b = ((ChromiumWebBrowser)sender);
                this.InvokeOnUiThreadIfRequired(() => b.Focus());
            }
        }

        //private void OnBrowserConsoleMessage(object sender, ConsoleMessageEventArgs args)
        //{
        //    DisplayOutput(string.Format("Line: {0}, Source: {1}, Message: {2}", args.Line, args.Source, args.Message));
        //}

        //private void OnBrowserStatusMessage(object sender, StatusMessageEventArgs args)
        //{
        //    //this.InvokeOnUiThreadIfRequired(() => statusLabel.Text = args.Value);
        //}

        //private void OnLoadingStateChanged(object sender, LoadingStateChangedEventArgs args)
        //{
          
        //}

        //private void OnBrowserTitleChanged(object sender, TitleChangedEventArgs args)
        //{
        //    this.InvokeOnUiThreadIfRequired(() => Text = args.Title);
        //}

        //private void OnBrowserAddressChanged(object sender, AddressChangedEventArgs args)
        //{
        //    //this.InvokeOnUiThreadIfRequired(() => urlTextBox.Text = args.Address);
        //}

        //public void DisplayOutput(string output)
        //{
        //    //this.InvokeOnUiThreadIfRequired(() => outputLabel.Text = output);
        //}

        protected override void OnClosed(EventArgs e)
        {
            Cef.Shutdown();
            base.OnClosed(e);
        }
    }
}
