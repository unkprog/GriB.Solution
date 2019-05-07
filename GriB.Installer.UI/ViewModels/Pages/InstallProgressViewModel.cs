using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using GriB.Installer.UI.Models.Pages;
using GriB.Installer.UI.Views.Pages;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public partial class InstallProgressViewModel : BaseViewModel
    {
        public InstallProgressViewModel()
        {
            _intallProgress = new InstallProgress() { DataContext = this };
            OnDownloadAppsComplite += ConfigurateApplications;
        }

        private UserControl _intallProgress;
        public override UserControl Page => _intallProgress;

        internal static string GetTempPath(string  applicationName) => Path.GetTempPath() + $@"{applicationName}\";
        public void StartUploadAndInstall(string installPath, List<ApplicationModel> installItems)
        {
            InstallPath = installPath;
            TitleMessage = "Идет установка приложений, дождитесь завершения...";
            DownloadMessage = "Ожидание загрузки...";
            InstallMessage = "Ожидание установки...";
            InstallItems = installItems;

            Task.Factory.StartNew(() =>
            {
                if (!CreateTempDirectory())
                {
                    MessageBox.Show("Ошибка при установке приложения. Не удалось создать временную папку установки.");
                    return;
                }
                if (!CreateApplicationDirectories())
                {
                    MessageBox.Show("Ошибка при установке приложения. Не удалось создать каталог приложений.");
                    return;
                }
            }).ContinueWith((t) =>
            {
                DownloadAppliactions();
            });
        }

        string _installPath;
        public string InstallPath { get { return _installPath; } set { if (_installPath != value) { _installPath = value; RaisePropertyChanged("InstallPath"); } } }

        List<ApplicationModel> _installItems;
        public List<ApplicationModel> InstallItems
        {
            get { return _installItems; }
            set
            {
                if (_installItems != value)
                {
                    _installItems = value; RaisePropertyChanged("InstallItems");
                }
            }
        }

        public int InstallCount 
        {
            get { return _installItems == null ? 0 : _installItems.Count; }
        }

        string _titleMessage = "Идет установка приложений, дождитесь завершения...";
        public string TitleMessage
        {
            get { return _titleMessage; }
            set { _titleMessage = value; RaisePropertyChanged("TitleMessage"); }
        }

        int _downloadedCount = 0;
        public int DownloadedCount
        {
            get { return _downloadedCount; }
            set { _downloadedCount = value; RaisePropertyChanged("DownloadedCount"); }
        }

        string _downloadMessage = "Ожидание загрузки...";
        public string DownloadMessage
        {
            get { return _downloadMessage; }
            set { _downloadMessage = value; RaisePropertyChanged("DownloadMessage"); }
        }

        int _installedCount = 0;
        public int InstalledCount
        {
            get { return _installedCount; }
            set { _installedCount = value; RaisePropertyChanged("InstalledCount"); }
        }

        string _installMessage = "";
        public string InstallMessage
        {
            get { return _installMessage; }
            set { _installMessage = value; RaisePropertyChanged("InstallMessage"); }
        }
    }
}
