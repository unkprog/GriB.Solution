using Android.App;
using Android.OS;
using Android.Support.V7.App;
using Android.Runtime;
using Android.Webkit;
using Android.Content.PM;
using Grib.App.Windows.JavaScript;

namespace GriB.Droid.POSCloud
{
    [Activity(Label = "@string/app_name", Theme = "@style/AppTheme", MainLauncher = true, ScreenOrientation = ScreenOrientation.Landscape)]
    public class MainActivity : AppCompatActivity
    {
        WebView web_view;
        Bridge bridge;
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.activity_main);

            web_view = FindViewById<WebView>(Resource.Id.webview);
            InitBridge(web_view);
        }

        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }

        private void InitBridge(WebView browser)
        {
            browser.Settings.JavaScriptEnabled = true;

            bridge = new Bridge(this);
            bridge.AddCommand("CloseApp", (string data) => { POSCloud.UI.Helper.CloseApp(); });
            //bridge.AddCommand("PrintCheck", this.PrintCheck);

            browser.AddJavascriptInterface(bridge, "nativeBridge");
            browser.SetWebViewClient(new MainWebViewClient());

            browser.LoadUrl("http://poscloudgb.ru?isnativeapp");
        }
    }
}