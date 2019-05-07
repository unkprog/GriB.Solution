using GriB.Installer.UI.ViewModels.Pages;
using Microsoft.Tools.WindowsInstallerXml.Bootstrapper;
using System.Windows;

namespace GriB.Installer.UI.ViewModels
{
    public partial class MainViewModel : BaseViewModel
    {

        public MainViewModel(InstallerApplication installerApplication)
        {
            Bootstrapper = installerApplication;
            _welcomeViewModel = new WelcomeViewModel();
            _applicationViewModel = new ApplicationViewModel();
            _intallProgressViewModel = new InstallProgressViewModel();
            _finishViewModel = new FinishViewModel();

            _сurrentViewModel = _welcomeViewModel;

            // Bootstrapper.ApplyComplete += OnApplyComplete;
            // Bootstrapper.DetectPackageComplete += OnDetectPackageComplete;
            //  Bootstrapper.PlanComplete += OnPlanComplete;
            //Downloader.OnDownloadAppPartsComplite += Installer.Configurate;
            //Downloader.OnSizeAppPartsUpdate += DownloaderOnSizeAppPartsUpdate;
            //Installer.OnComplite += InstallerOnComplite;
        }

        BaseViewModel _сurrentViewModel;
        BaseViewModel _welcomeViewModel, _finishViewModel;
        ApplicationViewModel _applicationViewModel;
        InstallProgressViewModel _intallProgressViewModel;

        public BaseViewModel CurrentViewModel
        {
            get { return _сurrentViewModel; }
            set
            {
                if (_сurrentViewModel != value)
                {
                    _сurrentViewModel = value;
                    RaisePropertyChanged("CurrentViewModel");
                    RaisePropertyChanged("VisibilityNext");
                    RaisePropertyChanged("VisibilityBack");
                }
            }
        }

        public Visibility VisibilityNext => _сurrentViewModel == null || _сurrentViewModel == _finishViewModel ? Visibility.Collapsed : Visibility.Visible;
        public Visibility VisibilityBack => _сurrentViewModel == null || _сurrentViewModel == _welcomeViewModel ? Visibility.Collapsed : Visibility.Visible;

        public BootstrapperApplication Bootstrapper { get; private set; }

        public void WindowLoaded()
        {
            CurrentViewModel = _welcomeViewModel;
            DetectInstalledPackage();
        }

       
        private void DetectInstalledPackage()
        {
            //if (Configurator.IsApplicationInstalled(Settings.ApplicationName))
            //{
            //    UninstallEnabled = true;
            //    view.Dispatcher.Invoke(() =>
            //    {
            //        UninstallCommand?.RaiseCanExecuteChanged();
            //    });
            //}
            //else
            //{
            //    InstallEnabled = true;
            //    view.Dispatcher.Invoke(() =>
            //    {
            //        InstallCommand?.RaiseCanExecuteChanged();
            //    });

            //}
        }
    }


}
