using System;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Windows;
using GriB.Installer.UI.Models;
using GriB.Installer.UI.Models.Pages;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public partial class InstallProgressViewModel
    {
        //public delegate void OnGetSize(long size);
        //public event OnGetSize OnGetSizeInstallItem;

        public delegate void OnEventComplite();
        public event OnEventComplite OnDownloadAppsComplite;
        public event OnEventComplite OnInstallAppsComplite;

        private async Task<long> GetFileSizeAsync(string url)
        {
            long size = 0;
            WebRequest req = WebRequest.Create(url);
            req.Timeout = 6000;
            req.Method = "HEAD";
            using (WebResponse resp = await req.GetResponseAsync().ConfigureAwait(false))
            {
                if (long.TryParse(resp.Headers.Get("Content-Length"), out long contentLength))
                {
                    size += contentLength;
                }
            }
            return size;
        }

        public void StartDownloadAppliactions()
        {
            Task.Factory.StartNew(() =>
                {
                    if (!CreateTempDirectory())
                    {
                        MessageBox.Show("Ошибка при установке приложения. Не удалось создать временную папку установки.");
                        return;
                    }
                }).ContinueWith((t) =>
                {
                    DownloadAppliactions();
                });
        }

        public async void DownloadAppliactions()
        {
            DownloadMessage = string.Concat("Получение размера файлов для загрузки...");
            DownloadCount = InstallItems.Sum(part => GetFileSizeAsync(part.DownloadSource).Result);
            foreach (var installItem in InstallItems)
            {
                currentInstallItem = installItem;
                UpdateDownloadMessage();
                bytesIn = 0;
                using (var _client = new WebClient())
                {
                    _client.DownloadProgressChanged += ClientOnDownloadProgressChanged;
                    try
                    {
                        await _client.DownloadFileTaskAsync(new Uri(currentInstallItem.DownloadSource), Constants.TempPath + currentInstallItem.DestinationSource);
                    }
                    catch (Exception)
                    {
                    }
                   // ExtractFiles(TempPath + appPair.Value, viewModel.InstallFolderPath + $@"\{ApplicationName}");
                }
                DownloadMessage = string.Concat("Загрузка файла ", currentInstallItem.Name, " завершена...");
                //DownloadedCount = DownloadedCount + 1;
            }
            OnDownloadAppsComplite?.Invoke();
        }

        private static void ExtractFiles(string zipPath, string extractPath)
        {
            try
            {
                ZipFile.ExtractToDirectory(zipPath, extractPath);
            }
            catch (Exception)
            {
                // Add event handlers
            }
        }

        public void StartInstallAppliactions()
        {
            Task.Factory.StartNew(() =>
            {
                if (!CreateApplicationDirectories())
                {
                    MessageBox.Show("Ошибка при установке приложения. Не удалось создать каталог приложений.");
                    return;
                }
            }).ContinueWith((t) =>
            {
                InstallAppliactions();
            });
        }

        public void InstallAppliactions()
        {
            InstallMessage = string.Concat("Установка приложений...");
            foreach (var installItem in InstallItems)
            {
                currentInstallItem = installItem;
                ExtractFiles(Constants.TempPath + currentInstallItem.DestinationSource, InstallPath + @"\" + currentInstallItem.DestinationSource);
                InstallMessage = string.Concat("Установка приложения ", currentInstallItem.Name, " завершена...");
                InstalledCount = InstalledCount + 1;
            }
            OnInstallAppsComplite?.Invoke();
        }



        private ApplicationModel currentInstallItem; // Bytes received. Used to calculate the current size of the received bytes
        private long bytesIn; // Bytes received. Used to calculate the current size of the received bytes
        private void ClientOnDownloadProgressChanged(object sender, DownloadProgressChangedEventArgs downloadProgressChangedEventArgs)
        {
            long downloadBytes = downloadProgressChangedEventArgs.BytesReceived - bytesIn;
            bytesIn = downloadProgressChangedEventArgs.BytesReceived;
            DownloadedCount += downloadBytes;
            UpdateDownloadMessage();
        }

        private void UpdateDownloadMessage()
        {
            DownloadMessage = string.Concat("Загрузка файла ", currentInstallItem.Name, "...");
        }

        public void DownloadAppsComplite()
        {
            DownloadMessage = string.Concat("Загрузка файлов завершена...");
            StartInstallAppliactions();
        }

        public void InstallAppsComplite()
        {
            
            ConfigurateApplications();
        }
            
    }
}
