using System;
using System.Diagnostics.CodeAnalysis;
using System.Reflection;
using Chromely.CefGlue.Winapi;
using Chromely.CefGlue.Winapi.BrowserWindow;
using Chromely.Core;
using Chromely.Core.Host;
using Chromely.Core.Infrastructure;


namespace GriB.Desktop.App
{
    [SuppressMessage("StyleCop.CSharp.MaintainabilityRules", "SA1400:AccessModifierMustBeDeclared", Justification = "Reviewed. Suppression is OK here.")]
    [SuppressMessage("StyleCop.CSharp.DocumentationRules", "SA1600:ElementsMustBeDocumented", Justification = "Reviewed. Suppression is OK here.")]
    class Program
    {
        static int Main(string[] args)
        {
            try
            {
                HostHelpers.SetupDefaultExceptionHandlers();
                var appDirectory = AppDomain.CurrentDomain.BaseDirectory;

                var startUrl = "https://google.com";

                var config = ChromelyConfiguration.Create()
                .WithHostMode(WindowState.Fullscreen)
                .WithHostTitle("POS Cloud")
                //.WithHostIconFile("chromely.ico")
                .WithAppArgs(args)
                //.WithHostSize(1200, 700)
                .WithAppArgs(args)
                //.WithHostSize(1200, 700)
                // .WithLogFile("logs\\chromely.cef_new.log")
                .WithStartUrl(startUrl)
                .WithLogSeverity(LogSeverity.Info)
                //  .UseDefaultLogger("logs\\chromely_new.log")
                .UseDefaultResourceSchemeHandler("local", string.Empty)
                .UseDefaultHttpSchemeHandler("http", "poscloudgb.ru");
                // .UseDefaultWebsocketHandler(string.Empty, 8181, true);

                using (var window = new CefGlueBrowserWindow(config))
                {
                    // Register external url schemes
                   //window.RegisterUrlScheme(new UrlScheme("https://github.com/chromelyapps/Chromely", true));

                    /*
                     * Register service assemblies
                     * Uncomment relevant part to register assemblies
                     */

                    // 1. Register current/local assembly:
                    window.RegisterServiceAssembly(Assembly.GetExecutingAssembly());

                    // 2. Register external assembly with file name:
                    var externalAssemblyFile = System.IO.Path.Combine(appDirectory, "Chromely.Service.Demo.dll");
                    window.RegisterServiceAssembly(externalAssemblyFile);

                    // 3. Register external assemblies with list of filenames:
                    // string serviceAssemblyFile1 = @"C:\ChromelyDlls\Chromely.Service.Demo.dll";
                    // List<string> filenames = new List<string>();
                    // filenames.Add(serviceAssemblyFile1);
                    // app.RegisterServiceAssemblies(filenames);

                    // 4. Register external assemblies directory:
                    // var serviceAssembliesFolder = @"C:\ChromelyDlls";
                    // window.RegisterServiceAssemblies(serviceAssembliesFolder);

                    // Scan assemblies for Controller routes 
                    window.ScanAssemblies();
                    return window.Run(args);
                }
            }
            catch (Exception exception)
            {
                Log.Error(exception);
            }

            return 0;
        }
    }
}
