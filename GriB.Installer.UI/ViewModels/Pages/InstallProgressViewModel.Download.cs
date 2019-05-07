using System;
using System.Net;
using System.Threading.Tasks;
using GriB.Installer.UI.Models;
using GriB.Installer.UI.Models.Pages;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public partial class InstallProgressViewModel
    {
        //public delegate void OnGetSize(long size);
        //public event OnGetSize OnGetSizeInstallItem;

        public delegate void OnDownloadComplite();
        public event OnDownloadComplite OnDownloadAppsComplite;

        public async void DownloadAppliactions()
        {
            DownloadedCount = 0;
            foreach (var installItem in InstallItems)
            {
                currentInstallItem = installItem;
                DownloadMessage = string.Concat("Получение размера файла загрузки ", currentInstallItem.Name, "...");

                sizeBytesIn = GetFileSizeAsync(currentInstallItem.DownloadSource).Result;
                //OnGetSizeInstallItem?.Invoke(sizeBytesIn);

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
                DownloadedCount = DownloadedCount + 1;
            }
            OnDownloadAppsComplite?.Invoke();
        }

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

        private ApplicationModel currentInstallItem; // Bytes received. Used to calculate the current size of the received bytes
        private long bytesIn; // Bytes received. Used to calculate the current size of the received bytes
        private long sizeBytesIn, downloadedBytesIn;
        private void ClientOnDownloadProgressChanged(object sender, DownloadProgressChangedEventArgs downloadProgressChangedEventArgs)
        {
            long downloadBytes = downloadProgressChangedEventArgs.BytesReceived - bytesIn;
            bytesIn = downloadProgressChangedEventArgs.BytesReceived;
            downloadedBytesIn += downloadBytes;
            UpdateDownloadMessage();
        }

        private void UpdateDownloadMessage()
        {
            DownloadMessage = string.Concat("Загрузка файла ", currentInstallItem.Name, " (", downloadedBytesIn, " из ", sizeBytesIn, ")...");
        }
    }
}
