using System;
using System.Linq;
using System.Collections.ObjectModel;
using System.Windows.Controls;
using GriB.Installer.UI.Models;
using GriB.Installer.UI.Models.Pages;
using GriB.Installer.UI.Views.Pages;
using Microsoft.Win32;
using System.Windows;
using Microsoft.WindowsAPICodePack.Dialogs;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public class ApplicationViewModel : BaseViewModel
    {
        public ApplicationViewModel()
        {
            _installPath = Constants.ProgramPath;
            _applicationsPage = new Applications() { DataContext = this };
        }

        private UserControl _applicationsPage;
        public override UserControl Page => _applicationsPage;

        ObservableCollection<ApplicationModel> _appsItems = null;
        public ObservableCollection<ApplicationModel> AppItems
        {
            get
            {
                if (_appsItems == null)
                {
                    _appsItems = new ObservableCollection<ApplicationModel>();
                    _appsItems.Add(new ApplicationModel() { ImageIcon = @"/Png48/poscloud.png", Name = "Приложение POS Cloud", Description = "Приложение POS Cloud для работы на локальном компьютере", DownloadSource= "http://poscloudgb.ru/Binaries/POSCloud.App.Windows.zip", DestinationSource = "App", ExecutableFile = "Grib.App.Windows.exe" });
                    _appsItems.Add(new ApplicationModel() { ImageIcon = @"/Png48/print-server.png", Name = "Принт-сервер", Description = "Приложение-сервис для печати чеков и документов", DownloadSource = "http://poscloudgb.ru/Binaries/POSCloud.PrintServer.zip", DestinationSource = "PrintServer", ExecutableFile = "GriB.PrintServer.Windows.exe" });
                }
                return _appsItems;
            }
        }

        string _installPath;
        public string InstallPath { get { return _installPath; } set { if (_installPath != value) { _installPath = value; RaisePropertyChanged("InstallPath"); } } }

        private BaseCommand selectFolderCommand;
        public BaseCommand SelectFolderCommand
        {
            get
            {
                return selectFolderCommand ??
                  (selectFolderCommand = new BaseCommand(obj =>
                  {
                      CommonOpenFileDialog dialog = new CommonOpenFileDialog();
                      {
                          //dialog.Multiselect = false;
                          dialog.Title = "Укажите путь установки"; // instead of default "Save As"
                          dialog.IsFolderPicker = true;
                          dialog.DefaultDirectory = InstallPath.Replace(@"\" + Constants.AppsPath, ""); // Filename will then be "select.this.directory"
                          dialog.InitialDirectory = dialog.DefaultDirectory;

                          dialog.AddToMostRecentlyUsedList = false;
                          dialog.AllowNonFileSystemItems = false;
                          dialog.EnsureFileExists = true;
                          dialog.EnsurePathExists = true;
                          dialog.EnsureReadOnly = false;
                          dialog.EnsureValidNames = true;
                          dialog.Multiselect = false;
                          dialog.ShowPlacesList = true;

                          if (dialog.ShowDialog() == CommonFileDialogResult.Ok)
                          {
                              string path = dialog.FileName;
                              if(!string.IsNullOrEmpty(path))
                              {
                                  int index = path.LastIndexOf(@"\");
                                  if (index >= 0)
                                  {
                                      string lastFolder = path.Substring(index);
                                      if(lastFolder != Constants.AppsPath)
                                      {
                                          path = string.Concat(path, @"\", Constants.AppsPath);
                                      }
                                  }
                              }
                              InstallPath = path;
                          }
                      }
                  }));
            }
        }

        public bool CheckNextCommand()
        {
            bool result = true;
            var selected = AppItems.FirstOrDefault(f => f.IsInstall);
            if (selected == null)
            {
                result = false;
                MessageBox.Show("Не выбрано приложение для установки", "Предупреждение", MessageBoxButton.OK, MessageBoxImage.Asterisk);
            }
            if (string.IsNullOrEmpty(InstallPath))
            {
                result = false;
                MessageBox.Show("Не задан путь для установки", "Предупреждение", MessageBoxButton.OK, MessageBoxImage.Asterisk);
            }
            return result;
        }
    }
}
