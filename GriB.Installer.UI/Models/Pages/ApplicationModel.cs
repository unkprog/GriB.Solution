using GriB.Installer.UI.ViewModels;

namespace GriB.Installer.UI.Models.Pages
{
    public class ApplicationModel : ObservableObject
    {
        public string ImageIcon { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsInstall { get; set; }

        public string DownloadSource { get; set; }
        public string DestinationSource { get; set; }
        public string ExecutableFile { get; set; }

        public string GUID { get; set; }
    }
}
