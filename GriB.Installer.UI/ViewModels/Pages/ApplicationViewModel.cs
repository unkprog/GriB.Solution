using System;
using System.Linq;
using System.Collections.ObjectModel;
using System.Windows.Controls;
using GriB.Installer.UI.Models;
using GriB.Installer.UI.Models.Pages;
using GriB.Installer.UI.Views.Pages;
using Microsoft.Win32;
using System.Windows;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public class ApplicationViewModel : BaseViewModel
    {
        public ApplicationViewModel()
        {
            _installPath = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
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
                    _appsItems.Add(new ApplicationModel() { ImageIcon = @"/Png48/poscloud.png", Name = "Приложение POS Cloud", Description = "Приложение POS Cloud для работы на локальном компьютере", DownloadSource= "http://poscloudgb.ru/Binaries/POSCloud.App.Windows.zip", DestinationSource = "App" });
                    _appsItems.Add(new ApplicationModel() { ImageIcon = @"/Png48/print-server.png", Name = "Принт-сервер", Description = "Приложение-сервис для печати чеков и документов", DownloadSource = "http://poscloudgb.ru/Binaries/POSCloud.PrintServer.zip", DestinationSource = "PrintServer" });
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
                      SaveFileDialog dialog = new SaveFileDialog();
                      {
                          //dialog.Multiselect = false;
                          dialog.Title = "Select a Directory"; // instead of default "Save As"
                          dialog.Filter = "Directory|*.*"; // Prevents displaying files
                          dialog.FileName = Constants.AppsPath; // Filename will then be "select.this.directory"

                          dialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
                          if (dialog.ShowDialog() == true)
                          {
                              string path = dialog.FileName;
                              // If user has changed the filename, create the new directory
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
