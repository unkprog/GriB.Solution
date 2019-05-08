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
            OnDownloadAppsComplite += DownloadAppsComplite;
            OnInstallAppsComplite += InstallAppsComplite;
            OnComplite += Complite;
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
            DownloadedCount = 0;
            InstalledCount = 0;
            DownloadAppliactions();
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
                    _installItems = value;
                    RaisePropertyChanged("InstallItems");
                    RaisePropertyChanged("InstallCount");
                }
            }
        }

        public int InstallCount 
        {
            get { return _installItems == null ? 1 : _installItems.Count; }
        }

        string _titleMessage = "Идет установка приложений, дождитесь завершения...";
        public string TitleMessage
        {
            get { return _titleMessage; }
            set { _titleMessage = value; RaisePropertyChanged("TitleMessage"); }
        }

        long _downloadCount = 1;
        public long DownloadCount
        {
            get { return _downloadCount; }
            set { _downloadCount = value; RaisePropertyChanged("DownloadCount"); }
        }

        long _downloadedCount = 0;
        public long DownloadedCount
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
