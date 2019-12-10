using Android.App;
using Android.OS;
using Android.Support.V7.App;
using Android.Runtime;
using Android.Webkit;
using Android.Content.PM;
using Grib.App.Windows.JavaScript;
using RU.Atol.Drivers10.Fptr;
using System;
using Android.Widget;
using Android.Print;
using Android.Content;

namespace GriB.Droid.POSCloud
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true, ScreenOrientation = ScreenOrientation.Landscape)]
    public class MainActivity : AppCompatActivity
    {
        WebView webView;
        Bridge bridge;
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            SetContentView(Resource.Layout.activity_main);

            webView = FindViewById<WebView>(Resource.Id.webview);
            ConfigureWebView(webView);
        }

        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }

        private void ConfigureWebView(WebView browser)
        {
            browser.Settings.JavaScriptEnabled = true;
            browser.Settings.DomStorageEnabled = true;

            bridge = new Bridge(this);
            bridge.AddCommand("CloseApp", (string data) => { POSCloud.UI.Helper.CloseApp(); });
            bridge.AddCommand("PrintCheck", this.PrintCheck);
            bridge.AddCommand("PrintCheckAtol", this.PrintCheckAtol);

            browser.AddJavascriptInterface(bridge, "nativeBridge");
            browser.SetWebViewClient(new MainWebViewClient());

            browser.LoadUrl("http://app.poscloudgb.ru?isnativeapp");
        }

        private void PrintCheck(string data)
        {
            try
            {
                PrintManager printManager = (PrintManager)this.GetSystemService(Context.PrintService);

                PrintDocumentAdapter printAdapter = webView.CreatePrintDocumentAdapter("MyDocument");
                String jobName = GetString(Resource.String.app_name) + " Print Test";
                printManager.Print(jobName, printAdapter, new PrintAttributes.Builder().Build());
            }
            catch(Exception ex)
            {
                TostMessage(ex.Message);
            }
        }

        private void PrintCheckAtol(string data)
        {
            try
            {
                IFptr fptr = new Fptr(ApplicationContext);
                try
                {
                    string version = fptr.Version();
                    TostMessage(version);
                }
                finally
                {
                    fptr.Destroy();
                }
            }
            catch (Exception ex)
            {
                TostMessage(ex.Message);
            }
        }

        public static void TostMessage(string message)
        {
            var context = Application.Context;
            var tostMessage = message;
            var duration = ToastLength.Long;
            Toast.MakeText(context, tostMessage, duration).Show();
        }
    }
}