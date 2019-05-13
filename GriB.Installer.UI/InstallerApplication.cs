using System;
using System.Diagnostics;
using System.Windows.Threading;
using GriB.Installer.UI.ViewModels;
using Microsoft.Tools.WindowsInstallerXml.Bootstrapper;

namespace GriB.Installer.UI
{
    public partial class InstallerApplication : BootstrapperApplication
    {
        public static string[] Args { get; private set; }
        public static Dispatcher AppDispatcher { get; private set; }

        public static MainWindow MainView { get; private set; }
        public static MainViewModel MainViewModel { get; private set; }
        protected override void Run()
        {
          
            Args = Command.GetCommandLineArgs();
            Engine.Log(LogLevel.Verbose, "Launching");

            AppDispatcher = Dispatcher.CurrentDispatcher;

            if (!Launcher.IsRunAsAdmin())
                Launcher.RunAsAdministrator();

            Debugger.Launch();

            MainViewModel = new MainViewModel(this);
            //viewModel.Bootstrapper.Engine.Detect();
            this.ApplyComplete += InstallerApplication_ApplyComplete;
            this.DetectPackageComplete += InstallerApplication_DetectPackageComplete;
            this.PlanComplete += InstallerApplication_PlanComplete;
            Engine.Detect();
            MainView = new MainWindow() { DataContext = MainViewModel };
            MainView.Closed += (sender, e) => AppDispatcher.InvokeShutdown();
            MainView.Show();

            Dispatcher.Run();

            Engine.Quit(0);
        }

        private void InstallerApplication_PlanComplete(object sender, PlanCompleteEventArgs e)
        {
            //throw new NotImplementedException();
        }

        private void InstallerApplication_DetectPackageComplete(object sender, DetectPackageCompleteEventArgs e)
        {
            //throw new NotImplementedException();
        }

        private void InstallerApplication_ApplyComplete(object sender, ApplyCompleteEventArgs e)
        {
            //throw new NotImplementedException();
        }
    }
}
